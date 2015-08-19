function Food() {
	this._position = this._getRandomPosition();
};

Food.prototype.getPosition = function () {
	return this._position;
};

Food.prototype.renewPosition = function (cols, rows) {
	this._position = this._getRandomPosition(cols, rows);
	return this._position;
};

Food.prototype._getRandomPosition = function (cols, rows) {
	return { 
		x: Math.floor(Math.random() * cols), 
		y: Math.floor(Math.random() * rows) 
	};
};
