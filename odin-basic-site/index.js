var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  const pages = ['/about', '/contact-me' ];

  var currentUrl = req.url;

  console.log('req.url ' +req.url);
  if (currentUrl == '' || currentUrl =='/'){
    currentUrl = '/index';
  } else if(!pages.includes(currentUrl)){
    currentUrl = '404';
  }

  var parameter = url.parse((currentUrl), true);
  var filename = "dir" + parameter.pathname +'.html';

  console.log(filename);
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);