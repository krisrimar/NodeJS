var http = require('http'),
    fs   = require('fs'),
    path = require('path'),
    host = "127.0.0.1",
    port = "8080";

var mimes = {
    ".htm" : "text/html",
    ".html" : "text/html",
    ".js" : "text/javascript",
    ".gif" : "image/gif",
    ".jpg" : "image/jpg",
    ".png" : "image/png"
}

var server = http.createServer(function(req, res){
  //console.log(req.url);
  var filepath = (req.url === "/") ? ("./index.html") : ("." + req.url);
  //Based on the extension we will set the content type
  var contentType = mimes[path.extname(filepath)]; //returns the extention of the path based on the last occurance of the .

  //Check to see if the file exists
  fs.exists(filepath, function (file_exists){
    if(file_exists) {
      //Read the file and serve
      fs.readFile(filepath, function(error, content){
        if(error) {
          res.writeHead(500);
          res.end();
        } else {
          res.writeHead(200, { "Content-Type" : contentType});
          res.end(content, 'utf-8');
        }
      })
    } else {
      res.writeHead(404);
      res.end("sorry we could not find the file you requested");
    }
  })
}).listen(port, host, function(){
  console.log("Server running on http://" + host + ":" + port);
})
