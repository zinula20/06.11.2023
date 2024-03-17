console.log('Hello nodejs!');

console.log('Running the project...');
const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    if (['/index.html'.toUpperCase(), '/'].indexOf(request.url.toUpperCase()) >= 0) {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                response.writeHead(500, { 'Content-Type': 'text/html' })
                response.end('Internal Server Error ' + err)
                return
            }
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end(data)
        })
        return
    }
    else if (request.url == '/api/todos/1') {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.write(`{"id": 1, "task": "learn js"}`)
        response.end(); //end the response
    }    
    else if (request.url == '/page1.html') {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write(`<h1 style="color:green">Welcome to my home page</h1>`)
        response.end(); //end the response
    }
    else {
        // write a response to the client
        response.writeHead(500, { 'Content-Type': 'text/html' })
        response.write(`You tried to browse to url: ${request.url} which is not supported`);
        response.end(); //end the response
    }



}).listen(3000); //the server object listens on port 8080