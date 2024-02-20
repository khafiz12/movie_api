let express = require('express');
let morgan = require('morgan');
let app = express();


let topMovies = [
 { 
  title: '',
  author: '',
  date: '',   
 }     
];

app.use(morgan('common'));

app.get('/movies', (req, res) => { 
  res.send('Welcome to my Top 10 Movies');
});

app.get ('/', (req, res) => {
  res.send('My favorite movie selection')  
});

app.get ('/doc.html', (req,res) => {
  res.sendFile('Public/doc.html', {root:_dirname});
});

app.arguments(express.static('Public'));

app.use((err,req,res,next) => {
  console.error(err.stack);
  res.status(500).send('Something broke');
});

app.listen(8080,() => {
 console.log('Your app is listening on port 8080');   
});