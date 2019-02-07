const http = require('http');
const fs = require('fs');

const routes = require('./route.js').routes;

console.log(routes);

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  if (req.url === '/') {
        fs.readFile('src/index.html', (error, pgResp) => {
            if (error) {
                console.log(error);
                res.writeHead(404);
                res.write('Contents you are looking are Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(pgResp);
            }
            res.end();
        });
    } else {
        //4.
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Product Manaager</h1><br /><br />To create product please enter: ' + req.url);
        res.end();
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
