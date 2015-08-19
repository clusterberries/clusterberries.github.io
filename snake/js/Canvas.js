function Canvas (field, snake, food, settings) {
	this.field = field;
	this.snake = snake;
	this.food = food;
	this.size = settings.size * 10 + 5;
	this.speed = settings.speed;
	this.topMargin = settings.topMargin;
	this.withBorders = settings.withBorders;
	this.timeouts = [];
	this.snakeClass = 'snake';
	this.headClass = 'head';
}

Canvas.SNAKE_CLASSES = {
	snake: {
		right: 'snake',
		left: 'snakeL',
		top: 'snakeT',
		bottom: 'snakeB'
	},
	head: {
		right: 'head',
		left: 'headL',
		top: 'headT',
		bottom: 'headB'
	}
};

Canvas.SNAKE_CORNER_CLASSES = {
	left: {
		top: 'snakeCornerRT',
		bottom: 'snakeCornerRotateRB'
	},
	right: {
		top: 'snakeCornerRotateLT',
		bottom: 'snakeCornerLB'
	},
	top: {
		right: 'snakeCornerRB',
		left: 'snakeCornerRotateLB'
	},
	bottom: {
		right: 'snakeCornerRotateRT',
		left: 'snakeCornerLT'
	},
};

Canvas.prototype._createField = function () {
	var rows = '';

	// calculate count of rows and col depends on window sizes
	this.rows = Math.floor((window.innerHeight - this.topMargin) / this.size); 
	this.cols = Math.floor(window.innerWidth / this.size);

	for (var i = 0; i < this.rows; ++i) {
		rows += '<tr>';
		for (var j = 0; j < this.cols; ++j) {
			// id=cellX_Y
			rows +='<td id="cell' + j + '_' + i + '"></td>'; 
		}
		rows += '</tr>';
	}
	this.field.innerHTML = rows;
};

Canvas.prototype._createSnake = function () {
	var cell;
	var snakeClass = this.snakeClass;
	var headClass = this.headClass;
	for (var i = 0; i < this.snake.length; ++i) {
		cell = document.getElementById('cell' + i + '_0');
		cell.classList.add(snakeClass);
		this.timeouts.push(new Timer(function() {
			this.classList.remove(snakeClass);
		}.bind(cell), this.speed * (i + 1)));

		if (i === this.snake.length - 1) {
			cell.classList.add(headClass);
			this.timeouts.push(new Timer(function() {
				this.classList.remove(headClass);
			}.bind(cell), this.speed));
		}
	}
};

Canvas.prototype._setFood = function () {
	var position,
		cell;
	this.food.renewPosition(this.cols, this.rows);
	position = this.food.getPosition();
	cell = document.getElementById('cell' + position.x + '_' + position.y);
	if (cell.classList.length > 0) {
		this._setFood();
	}
	else cell.classList.add('food');
};

Canvas.prototype._renewFood = function () {
	var foodPosition = this.food.getPosition();
	document.getElementById('cell' + foodPosition.x + '_' + foodPosition.y).classList.remove('food');
	this._setFood();
};

Canvas.prototype.drawCanvas = function() {
	this._createField();
	this._createSnake();
	this._setFood();
};

Canvas.prototype.nextStep = function () {
	var position = this.snake.getPosition(),
		cell = document.getElementById('cell' + position.x + '_' + position.y),
		snakeClass = this.snakeClass,
		headClass = this.headClass,
		addSnakeClass;

	addSnakeClass = function (times) {
		cell.classList.add(snakeClass);
		this.timeouts.push(new Timer(function() {
			this.classList.remove(snakeClass);
		}.bind(cell), this.speed * times));

		cell.classList.add(headClass);
		this.timeouts.push(new Timer(function() {
			this.classList.remove(headClass);
		}.bind(cell), this.speed));
	}.bind(this);

	if (position.x < 0 || position.y < 0 || position.x >= this.cols || position.y >= this.rows) {
		if (this.withBorders) return -1;
		else this.snake.setCorrectPosition(this.cols, this.rows);
		position = this.snake.getPosition();
		cell = document.getElementById('cell' + position.x + '_' + position.y);
	}

	if (cell.classList.contains('food')) {
		this._renewFood();
		addSnakeClass(this.snake.length + 2);

		return 1;
	}
	else {
		// check if new cell belongs to snake. Game is over if true
		if (cell.classList.length > 0) return -1;
		else addSnakeClass(this.snake.length);
	}

	return 0;
};

Canvas.prototype.stopAll = function () {
	var timeouts = this.timeouts;
	for (var i = 0; i < timeouts.length; ++i) {
		timeouts[i].pause();
	}
};

Canvas.prototype.resumeAll = function () {
	var timeouts = this.timeouts;
	for (var i = 0; i < timeouts.length; ++i) {
		timeouts[i].resume();
	}
};

Canvas.prototype.clean = function () {
	this.field.innerHTML = '';
	this.snake = null;
	this.food = null;
};

Canvas.prototype.setCorner = function(newDirection) {
	var oldDirection = this.snake.direction,
		cornerClass = Canvas.SNAKE_CORNER_CLASSES[oldDirection][newDirection],
		position,
		cell;

	if (cornerClass) {
		position = this.snake.getPosition();
		cell = document.getElementById('cell' + position.x + '_' + position.y);
		cell.classList.add(cornerClass);
		this.timeouts.push(new Timer(function() {
			this.classList.remove(cornerClass);
		}.bind(cell), this.speed * this.snake.length));
	}

};

Canvas.prototype.changeDirection = function() {
	var newDirection = this.snake.direction,
		snakeClass = Canvas.SNAKE_CLASSES['snake'][newDirection],
		headClass = Canvas.SNAKE_CLASSES['head'][newDirection];

	if (snakeClass && headClass) {
		this.snakeClass = snakeClass; 
		this.headClass = headClass;
	}
};
