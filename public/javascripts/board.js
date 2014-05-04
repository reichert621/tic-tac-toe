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
		},
		
		won: function() {
			return ( this.checkRowsCols() || this.checkDiag() );
		},
		
		draw: function() {
			for (var x = 0; x < 3; x++) {
				for (var y = 0; y < 3; y++) {
					if (!this.get(x, y)) { return false; }
				}
			}
			return true;
		},
		
		
		checkRowsCols: function() {
			return ( this.checkHoriz(this.grid) || this.checkHoriz(this._transpose()) );
		},
		
		checkDiag: function() {
			if (this.get(0,0) === this.get(1,1) && this.get(1,1) === this.get(2,2) ||
					this.get(0,2) === this.get(1,1) && this.get(1,1) === this.get(2,0)) {
						return this.get(1,1);
					}
		},
		
		checkHoriz: function(grid) {
			for (var i = 0; i < 3; i++) {
				var row = grid[i];
				if (row[0] === row[1] && row[1] === row[2]) { return row[0] }
			}
		},
		
		_transpose: function() {
			return _.zip.apply(_, this.grid);
		}
		
	};
	
})(this);