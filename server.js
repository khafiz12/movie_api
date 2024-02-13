//Import modules needed for coding//
let http = require('http');
let url = require('url');
let fs = require('fs');

//Import http module for server side//
  http.createServer((request, response) => { 
    let addr = request.url,
    q = new URL (addr, 'http://localhost:8080'),
    filePath = '';
     
    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
          console.log(err);
            } else {
          console.log('Added to log.');
            }
             });
    
    if (q.pathname.includes('documentation')) 
      {filePath = (__dirname + '/documentation.html');
       } 
      else {filePath = 'index.html';
       }

    response.writeHead(200,{'Content-Type': 'text/plain'});
    response.end('Hello Node!\n');
     }).listen(8080); 

    console.log('My first Node Test server is running on port 8080.');

