function Game(field, scoreContainer, settings, popupGameOver) {
	this.settings = {};
	this.settings.size = settings.size || 2;
	this.settings.speed = settings.speed ? settings.speed * 30 : 60;
	this.settings.withBorders = settings.withBorders || false;
	this.settings.topMargin = settings.topMargin || 0;
	this.snake = new Snake();
	this.food = new Food(this.settings.size);
	this.canvas = new Canvas(field, this.snake, this.food, this.settings);
	this.scoreContainer = scoreContainer;
	this.scoreContainer.innerText = 0;
	this.interval;
	this.keydownHandler = this._keydownHandler.bind(this);
	this.popupGameOver = popupGameOver;
	this.canChangeDirection = true; //don't change direction when press arrows too often
}

Game.LEFT = 37;
Game.TOP = 38;
Game.RIGHT = 39;
Game.BOTTOM = 40;

Game.prototype.init = function () {
	this.canvas.drawCanvas();
	this._start();
};

Game.prototype.pause = function () {
	window.clearInterval(this.interval);
	this.canvas.stopAll();
	document.removeEventListener('keydown', this.keydownHandler);
};

Game.prototype.resume = function () {
	this._start();
	this.canvas.resumeAll();
};

Game.prototype._start = function () {
	var result;
	this.interval = window.setInterval(function () { // TODO bind(this)?
		this.snake.move();
		this.canChangeDirection = true;
		result = this.canvas.nextStep();
		if (result < 0) {
			this.gameOver();
		}
		else if (result > 0) {
			this.snake.eat();
			this.scoreContainer.innerText++;// = ++this.score;
		}
	}.bind(this), this.settings.speed);
	document.addEventListener('keydown',  this.keydownHandler);
};

Game.prototype._keydownHandler = function (event) {
	var direction;
	switch (event.keyCode) {
		case Game.LEFT:  direction = 'left'; break;
		case Game.RIGHT: direction = 'right'; break;
		case Game.TOP: direction = 'top'; break;
		case Game.BOTTOM: direction = 'bottom'; break;
	}
	if (direction && this.canChangeDirection) {
		this.canvas.setCorner(direction);
		this.snake.changeDirection(direction);
		this.canvas.changeDirection();
		this.canChangeDirection = false;
	}
};

Game.prototype.gameOver = function () {
	this.popupGameOver.classList.remove('not-display');
	this.popupGameOver.getElementsByTagName('button')[0].focus();
	this.pause();
	// this.canvas.showGameOver();
};

Game.prototype.clean = function () {
	this.pause();
	this.canvas.clean();
	this.settings = null;
	this.snake = null;
	this.food = null;
	this.canvas = null;
}
