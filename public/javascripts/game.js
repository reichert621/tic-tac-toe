(function(root) {
	var TTT = root.TTT = ( root.TTT || {} );
	
	var Game = TTT.Game = function() {
		this.board = new TTT.Board();
		this.player = (id === 0) ? new TTT.Player("x", this) : new TTT.Player("o", this);
		this.turn = "x";
		$('#messages').html(this.turn + "'s move!");
		var game = this;
		socket.on('mark', function(data) {
			game.makeMove(data.x, data.y, data.mark);
		});
		
	};
	
	Game.prototype = {
		
		makeMove: function(x, y, mark) {
			if (mark === this.turn && !this.checkGameOver()) {
				this.board.set(x, y, mark);
				var $cell = $(".cell[data-row='"+y+"'][data-col='"+x+"']");
				$cell.html(mark);
				if (!this.checkGameOver()) {
					this.swapTurn();
				}
				socket.emit('alertMark', { x: x, y: y, mark: mark });
			}
		},
		
		checkGameOver: function() {
			var won = this.board.won();
			var draw = this.board.draw();

			if (won) {
				$('#messages').html(won + " wins!");
				return true;
			} else if (draw) {
				$('#messages').html("draw!");
				return true;
			}
			return false;
		},
		
		swapTurn: function() {
			this.turn = (this.turn === "x") ? "o" : "x";
			var move = (this.player.mark === this.turn) ? "Your move!" : "Wait..."
			$('#messages').html(move);
		},
		
		open: function(x, y) { return !this.board.get(x, y); }
		
	};
	
})(this);