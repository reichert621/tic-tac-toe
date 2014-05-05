(function(root) {
	var TTT = root.TTT = ( root.TTT || {} );
	
	var Game = TTT.Game = function() {
		this.board = new TTT.Board();
		this.player = (id === 1) ? new TTT.Player("x", this) : new TTT.Player("o", this);
		this.turn = "x";
	
		var game = this;
		socket.on('mark', function(data) {
			game.makeMove(data.x, data.y, data.mark);
		});
		
	};
	
	Game.prototype = {
		
		makeMove: function(x, y, mark) {
			if (mark === this.turn) {
				this.board.set(x, y, mark);
				var $cell = $(".cell[data-row='"+y+"'][data-col='"+x+"']");
				$cell.html(mark);
				this.checkGameOver();
				this.turn = (mark === "x") ? "o" : "x";
				socket.emit('alertMark', { x: x, y: y, mark: mark });
			}
		},
		
		checkGameOver: function() {
			var won = this.board.won();
			var draw = this.board.draw();
			if (won) {
				$('body').html(won + " wins!");
			} else if (draw) {
				$('body').html("draw!");
			}
		},
		
		open: function(x, y) { return !this.board.get(x, y); }
		
	};
	
})(this);