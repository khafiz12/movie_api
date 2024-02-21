let express = require('express');
let morganRequire = require('morgan');
let app = express();


let topTenMovies = [
 { 
  title: 'Interstellar',
  director: 'Christopher Nolan'   
 },     
 {
  title:'John Wick',
  director: 'Chad Stahelski'
 },
 {
  title: 'John Wick:Chapter 2',
  director: 'Chad Stehelski'
 },
 {
  title:'Rambo 3',
  director:'Peter Macdonald'
 },
 {
  title:'The Dark Knight',
  director:'Christopher Nolan'
 },
 {
  title:'Scarface',
  director:'Brian De Palma'
 },
 {
  title: 'Top Gun',
  director:'Tony Scott'
 },
 {
  title:"White Men Can't Jump",
  director:'Ron Shelton'
 },
 {
  title:'Men in Black',
  director:'Barry Sonnenfeld'
 },
 {title:'Saving Private Ryan',
  director:'Steven Spielberg'
 },
];

app.use(morganRequire('common'));

app.get('/', (req, res) => { 
  res.send('Welcome to my Top 10 Movies');
});

app.get ('/movies', (req, res) => {
  res.json(topTenMovies)  
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