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

var id = 0
//websockets
io.sockets.on('connection', function(socket) {
	id++;
	socket.emit('receive', { id: id });
	
	socket.on('alertMark', function(data) {
		socket.broadcast.emit('mark', data);
	});
	
	if (id === 2) { 
		io.sockets.emit('startGame', { message: 'Have fun!' });
	}

});
