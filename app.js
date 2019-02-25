var http = require('http');
var fs = require('fs');

//Load index.html
var server = http.createServer(function(req, res) {
  fs.readFile('./index.html', 'utf-8', function(error, content) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(content);
  });
});

//Load socket.io
var io = require('socket.io').listen(server);

//Quand client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
	socket.emit('message', 'You\'re connected');
	socket.broadcast.emit('message', 'Un autre client vient de se connecter !');

	socket.on('message', function (message) {
    console.log(socket.pseudo + ' me parle ! Il me dit : ' + message);
  });	
  
  socket.on('petit_nouveau', function(pseudo) {
    socket.pseudo = pseudo;
  });
});



server.listen(8080);