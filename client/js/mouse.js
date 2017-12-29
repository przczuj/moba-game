Button = {
    LMB: "LMB",
    RMB: "RMB"
};

function Mouse(display) {
    var motionListeners = [];
    var clickListeners = [];
    var pos = {
        x: 0,
        y: 0
    };
    var click = {
        up: true,
        button: Button.LMB,
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
            var offset = display.offset();
            click.x = pos.x = e.pageX - offset.left;
            click.y = pos.y = e.pageY - offset.top;
            for (var i in clickListeners) {
                clickListeners[i](click);
            }
        }
    };

    $(document).mousedown(clickHandler(false));
    $(document).mouseup(clickHandler(true));
    $(document).mousemove(function (e){
        var offset = display.offset();
        pos.x = e.pageX - offset.left;
        pos.y = e.pageY - offset.top;
        for (var i in motionListeners) {
            motionListeners[i](pos);
        }
    });
}