(function(){
	var canvas = document.getElementById('canvas'),
		score = document.getElementById('score'),
		popupSettings = document.getElementById('settingsContainer'),
		bordersCheckbox = document.getElementById('withBorders'),
		scaleRadio = document.getElementsByName('scale'),
		speedRadio = document.getElementsByName('speed'),
		settings = { topMargin: document.getElementById('header').clientHeight },
		popupGameOver = document.getElementsByClassName('gameOver')[0],
		game;


	document.getElementById('startButton').addEventListener('click', start);

	document.getElementById('settingsButton').addEventListener('click', function () {
		popupSettings.classList.remove('not-display');
		if (game) game.pause();
	});

	document.getElementById('cancelSave').addEventListener('click', function() {
		popupSettings.classList.add('not-display');
		if (game) game.resume();
	});

	document.getElementById('saveSettings').addEventListener('click', function() {
		popupSettings.classList.add('not-display');
		settings.withBorders = bordersCheckbox.checked;
		for (var i = 0; i < 3; ++i) {
			if (scaleRadio[i].checked) settings.size = +scaleRadio[i].value; 
			if (speedRadio[i].checked) settings.speed = +speedRadio[i].value; 
		}
		start();
	});

	document.getElementById('gameOverButton').addEventListener('click', function() {
		popupGameOver.classList.add('not-display');
		game.clean();
		game = null;
		document.getElementById('startButton').focus();
	});

	function start() {
		if (game) game.clean();

		game = new Game(canvas, score, settings, popupGameOver);
		game.init();
	}

}());