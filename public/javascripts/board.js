(function(root) {
	var TTT = root.TTT = ( root.TTT || {} );
	var Board = TTT.Board = function() {
		this.grid = [[null, null, null], [null, null, null], [null, null, null]];
	}
	
	Board.prototype = {
		get: function(x, y) {
			return this.grid[y][x];
		},
		
		set: function(x, y, mark) {
			this.grid[y][x] = mark;
		}
		
	};
	
})(this);