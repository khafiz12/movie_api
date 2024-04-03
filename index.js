const express = require('express');
const app = express();  
const passport= require('passport');
require('./passport.js');
const mongoose = require('mongoose');
const Models = require('./model.js');
const morganRequire = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const cors = require('cors');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
let auth = require('./auth.js')(app);
//Initialize Passport

//Middle wear//
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
// apply morgan middlewear//
app.use(morganRequire('common'));
app.use(bodyParser.urlencoded({extended:true}));
//app.use (cors()); allows use of CORS in application//
app.use(cors()); 
//This might need to go immediatly after const cors = require cors//
//this allows mongoose to connect to database(mongodb)//
//mongoose.connect('mongodb://localhost:27017/myflix',)
mongoose.connect(process.env.CONNECTION_URI, {
 useNewUrlParser:true, useUnifiedTopology: true });

//  .then(() => {
//    console.log('Connected to MongoDB');
//  })
//  .catch((error) => {console.error('Error connecting to MongoDB', error)
//  });

//Routes//
const Movies = Models.Movie;
const Users = Models.User;




//READ welcome to my Top 10 movies//
app.get('/', (req, res) => { 
  res.send('Welcome to my Top 10 Movies');
});

//READ query the movie collection//
app.get ('/movies', passport.authenticate('jwt', {session:false}), async(req, res) => {
  await Movies.find().then ((movies) => {
    res.status(201).json(movies);
  })
   .catch((error) => {
     console.error(error);
     res.status(500).send('Error:' + error);
   }); 
});

//READ query a movie by it's title// 
app.get('/movies/title/:titleName', passport.authenticate('jwt', {session:false}), async (req,res) => { 
  await Movies.findOne({'titleName': req.params.title})
  .then((movie) => {res.json(movie);})
  .catch((error) => {console.error(error); 
    res.status(500).send('Error:' + error); });
});

//READ query a list of movies/movie that share a particular genre//
app.get('/movies/:genre', passport.authenticate('jwt', {session:false}), async (req,res) => {
  await Movies.findOne({genre: req.params.genre})
  .then((movie) => {res.json(movie);})
  .catch((error) => {console.error(error);
    res.status(500).send('Error:' + error);});  
});

//READ query a movie document by typing the directors name//
app.get('/movies/directors/:directorName', passport.authenticate('jwt', {session:false}), async (req,res) => {
  await Movies.findOne({'director.name': req.params.directorName})
  .then ((movies) => {res.json(movies);})
  .catch ((err) => {console.error(err);
    res.status(500).send ('Error' + err);});
});

//READ query the user collection//
app.get('/User', passport.authenticate ('jwt', {session:false}), async (req, res) => {
  await Users.find(). then((User) => { res.status(201).json(User);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error' + error );
  });
});

//READ query a user by username//
app.get('/User/:Username', passport.authenticate ('jwt', {session:false}), async (req,res) => { 
  await Users.findOne({ Username: req.params.Username})
  .then((user) => { res.json (user); })
  .catch((error) => { console.error(error); res.status(500).send ('Error' + error);
});
});

//CREATE this allow new users to register//
app.post ('/User', 
          [ check ('Username', 'Username is require').isLength({min:5}),
            check('Username', 'Username contains non alphanumeric characters - not allowed').isAlphanumeric(),
            check ('Password', 'Password is required').not().isEmpty(),
            check('Email', 'Email does not appear to be valid').isEmail(), 
          ],async (req,res) => { 
      
        let errors = validationResult(req);
        if (!errors.isEmpty()) { 
          return res.status(422).json({errors: errors.array()});
        }  

  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOne({'User': req.body.Username})
   .then((user) => 
   {if (user)
     {return res.status(400).send(req.body.Username + 'already exist');
    } else {
    Users.create({
       Username:req.body.Username,
       Password: hashedPassword,
       Email: req.body.Email,
       Birthday: req.body.Birthday
    })
       .then((user) => {res.status(201).json(user)})
       .catch((error) => {
         console.error(error);
         res.status(500).send('Error:' + error);
       })
      }
    })
    .catch((error) => {
     console.error(error);
     res.status(500).send('Error:' + error)
    });
 });
 

//UPDATE this allows a user to update their user account//
app.put('/User/:Username', 
[ check ('Username', 'Username is require').isLength({min:5}),
check('Username', 'Username contains non alphanumeric characters - not allowed').isAlphanumeric(),
check ('Password', 'Password is required').not().isEmpty(),
check('Email', 'Email does not appear to be valid').isEmail(), 
], passport.authenticate ('jwt', {session:false}), async (req,res) => { 
  
  let errors = validationResult(req);
      if (!errors.isEmpty()) { 
        return res.status(422).json({errors: errors.array()});
        }  

  if(req.user.Username !== req.params.Username) {
     return res.status(400).send('Permission denied');
  }
  await Users.findOneAndUpdate({Username: req.params.Username}, 
    {
      $set:{
       Username: req.body.Username,
       Password: req.body.Password,
       Email: req.body.Email,
       Birthday: req.body.Birthday
    } 
    },
  
     { new:true} 
  )
       .then (updatedUser => { res.json(updatedUser);
  })
       .catch(error => { console.error(error); res.status(500).send('Error' + error);}
 );
     });

//UPDATE this allows user to add a movie to their list of favoritemovies//
app.put('/User/:Username/movies/:MovieID', async (req,res) => { 
  await Users.findOneAndUpdate({Username: req.params.Username}, 
    {
     $push: { Favoritemovies: req.params.MovieID } 
  },
   {new:true}
   )
    .then((updatedUser) => {res.json(updatedUser);
  })
    .catch(error => { console.error(error); res.status(500).send('Error' + error);}
 );
  });

  //DELETE this allows a user to delete a movie on their favoritemovie list//
app.delete ('/User/:Username/movies/:MovieID', passport.authenticate('jwt', {session:false}), async (req,res) => {
  await Users.findOneAndUpdate({Username: req.params.Username},
    {
      $pull: { Favoritemovies: req.params.MovieID } 
   },
    {new:true}
    )
     .then((updatedUser) => {res.json(updatedUser);
   })
     .catch(error => { console.error(error); res.status(500).send('Error' + error);}
  );
   });
 
//DELETE this allows a user to deregister//
app.delete ('/User/:Username', passport.authenticate('jwt', {session:false}), async (req,res) => { 
  await Users.findOneAndDelete({Username: req.params.Username})
    .then((user) => { 
      if (!user) 
       { res.status(400).send(req.params.Username + 'was not found');
      } else{ res.status(200).send(req.params.Username + 'was deleted.');
    }
    }) 
     .catch(err=> {console.error(err); res.status(500).send('Error' + err);
    });
  });






app.get ('/doc.html', (req,res) => {
  res.sendFile('Public/doc.html', {root:_dirname});
});

app.use(express.static('Public'));

app.use((err,req,res,next) => {
  console.error(err.stack);
  res.status(500).send('Something broke')
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});