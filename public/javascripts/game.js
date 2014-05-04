(function(root) {
	var TTT = root.TTT = ( root.TTT || {} );
	var Game = TTT.Game = function(player1, player2) {
		this.p1 = player1;
		this.p2 = player2;
		this.run();
	};
	
	Game.prototype = {
		run: function() {
			this.players = { "x": new this.p1(this, "x"), "o": new this.p2(this, "o") };
			this.board = new TTT.Board();
		}
		
	};
	
})(this);