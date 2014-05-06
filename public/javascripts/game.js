(function(root) {
	var TTT = root.TTT = ( root.TTT || {} );
	
	var Game = TTT.Game = function() {
		this.board = new TTT.Board();
		this.player = (id === 0) ? new TTT.Player("x", this) : new TTT.Player("o", this);
		this.turn = "x";
		this.alertMove();
		
		var game = this;
		$('.new-game').on('click', function(event) {
			game.newGame();
			socket.emit('alertNewGame', { message: "New game!" });
		});
		
		socket.on('mark', function(data) {
			game.makeMove(data.x, data.y, data.mark);
		});
		
		socket.on('newGame', function(data) {
			game.newGame();
		});
		
	};
	
	Game.prototype = {
		
		newGame: function() {
			$('.cell').empty().removeClass('x o');
			this.board = new TTT.Board();
			this.turn = "o";
			this.alertMove();
		},
		
		makeMove: function(x, y, mark) {
			if (mark === this.turn && !this.checkGameOver()) {
				alert(mark);
				this.board.set(x, y, mark);
				var $cell = $(".cell[data-row='"+y+"'][data-col='"+x+"']");
				$cell.html(mark).addClass(mark);
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
				$('#messages').html(won.toUpperCase() + " wins!").addClass('x');
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