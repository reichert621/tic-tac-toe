(function(root) {
	var TTT = root.TTT = ( root.TTT || {} );
	var socket = io.connect();
	
	var Game = TTT.Game = function(player1, player2) {
		this.board = new TTT.Board();
		this.players = { "x": new player1("x", this), "o": new player2("o", this) };
		this.turn = "x";
		// this.run();
	};
	
	Game.prototype = {
		run: function() {
			// this.players[this.turn].move();
		},
		
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
				socket.emit('mark', { x: x, y: y, mark: mark });
				// this.players[this.turn].move();
			}
		},
		
		open: function(x, y) { return !this.board.get(x, y); }
		
	};
	
})(this);