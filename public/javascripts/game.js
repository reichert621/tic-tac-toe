(function(root) {
	var TTT = root.TTT = ( root.TTT || {} );
	
	var Game = TTT.Game = function(options) {
		this.board = new TTT.Board();
		this.socket = options.socket
		this.player = (options.id === 0) ? new TTT.Player("x", this) : new TTT.Player("o", this);
		this.turn = "x";
		this.alertMove();
		
		var game = this;
		
		$('.new-game').on('click', function(event) {
			game.newGame();
			game.socket.emit('alertNewGame', { message: "New game!" });
		});
		
		this.socket.on('mark', function(data) {
			game.makeMove(data.x, data.y, data.mark);
		});
		
		this.socket.on('newGame', function(data) {
			game.newGame();
		});
		
	};
	
	Game.prototype = {
		
		newGame: function() {
			$('.cell').empty().removeClass('x o');
			$('#messages').removeClass('x o');
			this.board = new TTT.Board();
			this.swapTurn();
			this.alertMove();
		},
		
		makeMove: function(x, y, mark) {
			if (mark === this.turn && !this.checkGameOver()) {
				this.board.set(x, y, mark);
				var $cell = $(".cell[data-row='"+y+"'][data-col='"+x+"']");
				$cell.html(mark).addClass(mark);
				if (!this.checkGameOver()) {
					this.swapTurn();
				}
				this.socket.emit('alertMark', { x: x, y: y, mark: mark });
			}
		},
		
		checkGameOver: function() {
			var won = this.board.won();
			var draw = this.board.draw();

			if (won) {
				$('#messages').html(won.toUpperCase() + " wins!").addClass(this.turn);
				return true;
			} else if (draw) {
				$('#messages').html("draw!");
				return true;
			}
			return false;
		},
		
		swapTurn: function() {
			this.turn = (this.turn === "x") ? "o" : "x";
			this.alertMove();
		},
		
		alertMove: function() {
			var move = (this.player.mark === this.turn) ? "Your move!" : "Wait..."
			$('#messages').html(move);
		},
		
		open: function(x, y) { return !this.board.get(x, y); }
		
	};
	
})(this);