var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(process.env.PORT || 3000, function() {
  console.log('server online');
});

//middleware
app.use(express.static('public'));

//routes
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});


//websockets
io.sockets.on('connection', function(socket) {
  socket.emit('receive', { welcome: 'connected!' });
	
	socket.on('mark', function(data) {
		console.log(data);
		socket.broadcast.emit('mark', data);
	});
});