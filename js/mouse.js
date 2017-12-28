function Mouse() {
    var motionListeners = [];
    var clickListeners = [];
    var pos = {
        x: 0,
        y: 0
    };
    var click = {
        up: true,
        x: 0,
        y: 0
    };

    this.pos = pos;

    this.listenMotion = function (listener) {
        motionListeners.push(listener);
    };

    this.listenClick = function (listener) {
        clickListeners.push(listener);
    };

    var clickHandler = function (isUp) {
        return function (e) {
            click.up = isUp;
            click.x = pos.x = e.pageX;
            click.y = pos.y = e.pageY;
            for (var i in clickListeners) {
                clickListeners[i](click);
            }
        }
    };

    $(document).mousedown(clickHandler(false));
    $(document).mouseup(clickHandler(true));
    $(document).mousemove(function (e){
        pos.x = e.pageX;
        pos.y = e.pageY;
        for (var i in motionListeners) {
            motionListeners[i](pos);
        }
    });
}