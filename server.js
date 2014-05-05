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
var players = [];

io.sockets.on('connection', function(socket) {
	var player = socket.id;
	players.push(player);
	var id = players.indexOf(player)

	socket.emit('receive', { id: id, misc: players });
	
	socket.on('alertMark', function(data) {
		socket.broadcast.emit('mark', data);
	});
	
	if (players.length === 2) { 
		io.sockets.emit('startGame', { message: 'Have fun!' });
	}
	
	socket.on('disconnect', function() {
		players.splice(id, 1);
	})

});
