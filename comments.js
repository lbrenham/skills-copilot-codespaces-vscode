// Create web server

// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = require('./comments');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var uri = url.parse(request.url).pathname;
  console.log('uri = ' + uri);
  var filename = path.join(process.cwd(), uri);
  console.log('filename = ' + filename);
  var body = '';

  if (uri == '/comments') {
    if (request.method == 'POST') {
      request.on('data', function (chunk) {
        body += chunk;
      });
      request.on('end', function () {
        comments.addComment(JSON.parse(body));
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Comment added');
      });
    } else {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end(JSON.stringify(comments.getComments()));
    }
  } else {
    fs.exists(filename, function(exists) {
      if(!exists) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
      }

      if (fs.statSync(filename).isDirectory()) filename += '/index.html';

      fs.readFile(filename, "binary", function(err, file) {
        if(err) {
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(err + "\n");
          response.end();
          return;
        }

        response.writeHead(200);
        response.write(file, "binary");
        response.end();
      });
    });
  }
});

// Listen on port 8000, IP defaults to