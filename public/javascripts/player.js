(function(root) {
	var TTT = root.TTT = ( root.TTT || {} );
	var Player = TTT.Player = function(mark, game) {
		this.mark = mark;
		this.game = game;
	};
	
	Player.prototype = {
		move: function() {
			var player = this;
			$('.cell').on('click', function(event) {
				$cell = $(this);
				var y = $cell.data('row');
				var x = $cell.data('col');
				player.game.set(x, y, player.mark);
			});
		}
	};
	
})(this);