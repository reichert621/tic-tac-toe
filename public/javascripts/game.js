(function(root) {
	var TTT = root.TTT = ( root.TTT || {} );
	
	var Game = TTT.Game = function(player1, player2) {
		this.socket = io.connect();
	
		this.board = new TTT.Board();
		this.players = { "x": new player1("x", this), "o": new player2("o", this) };
		this.turn = "x";
	
		var game = this;
		this.socket.on('mark', function(data) {
			game.makeMove(data.x, data.y, data.mark);
		});
		
	};
	
	Game.prototype = {
		
		makeMove: function(x, y, mark) {
			if (mark === this.turn) {
				this.board.set(x, y, mark);
				var $cell = $(".cell[data-row='"+y+"'][data-col='"+x+"']");
				$cell.html(mark);
				var won = this.board.won();
				var draw = this.board.draw();
				if (won) {
					$('body').html(won + " wins!");
				} else if (draw) {
					$('body').html("draw!");
				}
				this.turn = (mark === "x") ? "o" : "x";
				
				this.socket.emit('alertMark', { x: x, y: y, mark: mark });
			}
		},
		
		open: function(x, y) { return !this.board.get(x, y); }
		
	};
	
})(this);