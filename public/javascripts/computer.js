(function(root) {
	var TTT = root.TTT = ( root.TTT || {} );
	var Computer = TTT.Computer = function(mark, game) {
		this.mark = mark;
		this.game = game;
	};
	
	Computer.prototype = {
		move: function() {}
	};
	
})(this);