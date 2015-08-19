function Snake() {
	this.length = 7;
	this.position = { x: this.length - 1, y: 0};
	this.direction = Snake.RIGHT;
};

Snake.RIGHT = 'right', 
Snake.LEFT = 'left',
Snake.TOP = 'top', 
Snake.BOTTOM = 'bottom';

Snake.prototype.getPosition = function () {
	return this.position;
};

Snake.prototype.move = function () {
	switch (this.direction) {
		case Snake.RIGHT: this.position.x++; break;
		case Snake.LEFT: this.position.x--; break;
		case Snake.TOP: this.position.y--; break;
		case Snake.BOTTOM: this.position.y++; break;
	}
};

Snake.prototype.setCorrectPosition = function (cols, rows) {
	if (this.position.y >= rows) this.position.y -= rows;
	if (this.position.y < 0) 	 this.position.y += rows;
	if (this.position.x >= cols) this.position.x -= cols;
	if (this.position.x < 0) 	 this.position.x += cols;
};

Snake.prototype.eat = function () {
	this.length++;
};

Snake.prototype.changeDirection = function (newDirection) {
	switch (newDirection) {
		case Snake.RIGHT: if (this.direction !== Snake.LEFT) this.direction = Snake.RIGHT; break;
		case Snake.LEFT: if (this.direction !== Snake.RIGHT) this.direction = Snake.LEFT; break;
		case Snake.TOP: if (this.direction !== Snake.BOTTOM) this.direction = Snake.TOP; break;
		case Snake.BOTTOM: if (this.direction !== Snake.TOP) this.direction = Snake.BOTTOM; break;
	}
};
