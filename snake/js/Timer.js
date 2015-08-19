function Timer(callback, delay) {
    var timerId, 
        startDate, 
        remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - startDate;
    };

    this.resume = function() {
        startDate = new Date();
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}