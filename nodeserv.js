var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
  res.end('Loged in\n');
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');