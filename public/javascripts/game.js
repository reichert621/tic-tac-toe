(function(root) {
	var TTT = root.TTT = ( root.TTT || {} );
	var Game = TTT.Game = function(player1, player2) {
		this.p1 = player1;
		this.p2 = player2;
		this.turn = "x";
		this.run();
	};
	
	Game.prototype = {
		run: function() {
			this.players = { "x": new this.p1("x", this), "o": new this.p2("o", this) };
			this.board = new TTT.Board();
			this.players[this.turn].move();
		},
		
		set: function(x, y, mark) {
			this.board.set(x, y, mark);
			var $cell = $(".cell[data-row='"+y+"'][data-col='"+x+"']");
			$cell.html(mark);
			this.turn = mark == "x" ? "o" : "x";
			this.players[this.turn].move();
		}
		
	};
	
})(this);