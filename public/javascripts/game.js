(function(root) {
	var TTT = root.TTT = ( root.TTT || {} );
	
	var Game = TTT.Game = function(options) {
		this.board = new TTT.Board();
		this.socket = options.socket;
		this.player = options.player;
		$('#options').empty();
		
		var game = this;
		
		$('.new-game').on('click', function(event) {
			game.newGame();
			if (game.socket) {
				game.socket.emit('alertNewGame', { message: "New game!" });	
			}
		});
		
		if (this.player == 'human') {
			this.players = { x: new TTT.Player("x", this), o: new TTT.Player("o", this) }
		}
		
		if (this.socket) {
			this.player = (options.id === 0) ? new TTT.Player("x", this) : new TTT.Player("o", this);
		
			this.socket.on('mark', function(data) {
				game.makeMove(data.x, data.y, data.mark);
			});
		
			this.socket.on('newGame', function(data) {
				game.newGame();
			});	
		}
		
		this.turn = "x";
		this.alertMove();
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
				if (this.socket) { 
					this.socket.emit('alertMark', { x: x, y: y, mark: mark });
				}
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
			var game = this;
			var move = this.turn.toUpperCase() + "'s move!";
			if (this.socket) { 
				move = (game.player.mark === game.turn) ? "Your move!" : "Wait...";
			}
			$('#messages').html(move);
		},
		
		open: function(x, y) { return !this.board.get(x, y); }
		
	};
	
})(this);