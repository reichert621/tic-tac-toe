(function(root) {
	var TTT = root.TTT = ( root.TTT || {} );
	var Player = TTT.Player = function(mark, game) {
		this.mark = mark;
		this.game = game;
		$('.cell').on('click', function(event) {
			$cell = $(this);
			var y = $cell.data('row');
			var x = $cell.data('col');
			// if ( game.open(x, y) ) { game.set(x, y, mark); }
		});
	};
	
	Player.prototype = {
		
	};
	
})(this);