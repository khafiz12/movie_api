const express = require('express');
const app = express();  
const morganRequire = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

 app.use(bodyParser.json());


let users = [
  {
    name:"kareem",
    id:3,
    favoriteMovies: "Scarface"

    
  },

  {
    name: "tony",
    id:15,
    favoriteMovies:"Space Jam"
  }
    
];

let movies = [ 

 { 
  title: "Interstellar",
  description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
  genre:"Science Fiction",
  director: "Christopher Nolan", 
  directorBio: "Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century.",
  year: "2014"  
 },  

 {
  title:"John Wick",
  description:"John is introduced as a legendary hitman who is thrust back into the criminal underworld after Russian-American mobsters assault him, kill his puppy, and steal his car",
  genre:"Action",
  director: "Chad Stahelski",
  directorBio:"Charles F. Stahelski (born September 20, 1968) is an American stuntman and filmmaker. He is considered a highly-influential figure in the action film genre.",
  year:"2014",
 },

 {
  title: "John Wick:Chapter 2",
  description:"Bound by an inescapable blood debt to the Italian crime lord, Santino D'Antonio, and with his precious 1969 Mustang stolen, John Wick--the taciturn and pitiless assassin who thirsts for seclusion--is forced to visit Italy to honour his promise.",
  genre:"Action",
  director: "Chad Stehelski",
  directorBio:"Charles F. Stahelski (born September 20, 1968) is an American stuntman and filmmaker. He is considered a highly-influential figure in the action film genre.",
  year:"2017",
 },

 {
  title:"Rambo 3",
  description:"The film depicts fictional events during the Soviet–Afghan War. In the film, Rambo sets out on a dangerous journey to Afghanistan in order to rescue his former",
  genre:"Action",
  director:"Peter Macdonald",
  directorBio:"Starting his career in the camera department, MacDonald subsequently spent 10 years as camera operator for renowned cinematographer Geoffrey Unsworth, working on films including Superman, The Return of the Pink Panther, Murder on the Orient Express and Cabaret.",
  year:"1988",
 },

 {
  title:"The Dark Knight",
  description:"Set within a year after the events of Batman Begins (2005), Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals",
  genre:"Action",
  director:"Christopher Nolan",
  directorBio:"Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century.",
  year:"2005",
 },

 {
  title:"Scarface",
  description:"It tells the story of Cuban refugee Tony Montana (Pacino), who arrives penniless in Miami during the Mariel boatlift and becomes a powerful drug lord.",
  genre:"Suspense",
  director:"Brian De Palma",
  directorBio:"Brian Russell De Palma is an American film director and screenwriter. With a career spanning over 50 years, he is best known for work in the suspense, crime and psychological thriller genres.",
  year:"1983",
 },

 {
  title: "Top Gun",
  description:"US Navy Lieutenant Pete Mitchell, call sign Maverick--an impetuous, daredevil pilot ace--is accepted into Top Gun, Miramar's elite Fighter School.",
  genre:"Drama",
  director:"Tony Scott",
  directorBio:"Tony Scott was a British-born film director and producer. He was the youngest of three brothers, one of whom is fellow film director Ridley Scott.",
  year:"1986",
 },

 {
  title:"White Men Can't Jump",
  description:"Black and white basketball hustlers join forces to double their chances of winning money on the street courts and in a basketball tournament.",
  genre:"Comedy",
  director:"Ron Shelton",
  directorBio:"Ron Shelton was born on September 15, 1945 in Whittier, California, USA. He is a writer and director, known for Bull Durham (1988), Hollywood Homicide",
  year:"1992",
 },

 {
  title:"Men in Black",
  description:"Men in Black is a 1997 American science fiction action comedy film based on the comic series by Marvel Comics,",
  genre:"Action",
  director:"Barry Sonnenfeld",
  directorBio:"Barry Sonnenfeld is an American filmmaker and television director. He originally worked as a cinematographer for the Coen brothers before directing films such as The Addams Family",
  year:"1997",
 },

 {
  title:"Saving Private Ryan",
  description:"Set in 1944 in France during World War II, it follows a group of soldiers, led by Captain John Miller (Tom Hanks), on their mission to locate Private James",
  genre:"War",
  director:"Steven Spielberg",
  directorBio:"Steven Allan Spielberg is an American film director, producer and screenwriter. A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director in history.",
  year:"1946",
 },
];

// apply morgan middlewear//
app.use(morganRequire('common'));

//READ welcome to my Top 10 movies//
app.get('/', (req, res) => { 
  res.send('Welcome to my Top 10 Movies');
});

//READ list of movies using movies endpoint//
app.get ('/movies', (req, res) => {
  res.json(movies)  
});

//READ an object given it's title endpoint//
app.get ('/movies/:title', (req,res) => { 
  const { title } = req.params;
  const movie = movies.find( movie => movie.title === title);
     
     if (movie) { res.status(200).json(movie)
    } else { res.status(400).send('no such movie')
     }


});

//READ object based on the genre name endpoint//
app.get ('/movies/genre/:genreName', (req,res) => { 
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.genre === genreName).genre;
     
     if (genre) { res.status(200).json(genre)
    } else { res.status(400).send('no such genre')
     }


});

//READ object based on the director name endpoint//
app.get ('/movies/director/:directorName', (req,res) => { 
  const { directorName } = req.params;
  const director = movies.find( movie => movie.director === directorName).director;
     
     if (director) { res.status(200).json(director)
    } else { res.status(400).send('no such director')
     }


});

//CREATE allow new users to register//
app.post ('/users', (req,res) => { 
  const newUser = req.body;
       
     if(newUser.name){
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(201).json(newUser);
     } else {res.status(400).send('users needs name')
      }

});

//UPDATE allow users to update their username//
app.put ('/users/:id', (req,res) => { 
  const { id } = req.params;
  const updatedUser = req.body;
       
    let user = users.find(user => user.id == id);
        if(user) {user.name = updatedUser.name
          res.status(200).json(user);
        } else{res.status(400).send('no such user')
         }
       

});

//CREATE this allows user to add a movie to their list of favorites//
app.post ('/users/:id/:movieTitle', (req,res) => { 
  const {id, movieTitle } = req.params;
  
   let user = users.find(user => user.id == id);
     if (user)
     {
      // Ensure user.favoriteMovies is initialized as an array
      if (!Array.isArray(user.favoriteMovies)) {
          user.favoriteMovies = []; // Initialize as an empty array
      }
      //push moviTitle into user.favoriteMovies  
       user.favoriteMovies.push(movieTitle);
       //Respond with the updated user object
       res.status(200).json(user);
    } else{res.status(400).send("Not able to add movie to favorites");
     }


});

app.delete ('/users/:id/:movieTitle', (req,res) => {
  const {id, movieTitle} = req.params
  
   let user = users.find(user => user.id == id);
    if (user)  {
      // Ensure user.favoriteMovies is initialized as an array
      if (!Array.isArray(user.favoriteMovies)) {
          user.favoriteMovies = []; // Initialize as an empty array
      }
      user.favoriteMovies =user.favoriteMovies.filter( title => title !== favoriteMovies );
      res.status(200).send("Movie has been removed");
    } else{res.status(400).send("Movie was not removed");
     }
           
});

app.delete ('/users/:id', (req,res) => {
  const {id} = req.params
  
   let user = users.find(user => user.id == id);
    if (user) {
      users = users.filter( user => user.id != id );
      res.json(user);//.send("User has been deleted");
    } else{res.status(400).send("No such user");
     }
           
});







app.get ('/doc.html', (req,res) => {
  res.sendFile('Public/doc.html', {root:_dirname});
});

app.use(express.static('Public'));

app.use((err,req,res,next) => {
  console.error(err.stack);
  res.status(500).send('Something broke')
});

app.listen(8080,() => {
 console.log('Your app is listening on port 8080');   
});