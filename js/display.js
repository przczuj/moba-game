function Display(
    canvas
) {
    var fps = 0;
    var frameCount = 0;

    var canvasElem = canvas[0];

    this.fps = function () {
        return fps;
    };

    this.width = function () {
        return canvas.attr("width");
    };

    this.height = function () {
        return canvas.attr("height");
    };

    this.center = function () {
        return {
            x: canvas.attr("width") / 2,
            y: canvas.attr("height") / 2
        }
    };

    this.offset = function() {
        return canvas.offset();
    };

    this.getContext = function () {
        frameCount++;
        if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) {
            canvas.attr("width", window.screen.availWidth);
            canvas.attr("height", window.screen.availHeight);
        } else {
            canvas.attr("width", window.innerWidth);
            canvas.attr("height", window.innerHeight);
        }
        return canvasElem.getContext("2d");
    };

    this.fullScreen = function () {
        if(canvasElem.webkitRequestFullScreen) {
            canvasElem.webkitRequestFullScreen();
        } else {
            canvasElem.mozRequestFullScreen();
        }
    };

    setInterval(function () {
        fps = frameCount;
        frameCount = 0;
    }, 1000);
}