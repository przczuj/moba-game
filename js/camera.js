function Camera(
    map
) {
    var pos = {
        x: 1400,
        y: 2000
    };
    var cameraScroll = new CameraScroll(map);

    this.move = function (x, y) {
        pos.x = x;
        pos.y = y;
    };

    this.scroll = cameraScroll.scroll;

    this.capture = function (display, overlay) {
        cameraScroll.move(pos);
        var ctx = display.getContext();
        ctx.imageSmoothingEnabled = false;
        ctx.fillStyle = "#000";
        ctx.fillRect(
            0,
            0,
            display.width(),
            display.height()
        );
        ctx.drawImage(
            map.image[0],
            display.center().x - pos.x,
            display.center().y - pos.y,
            map.width(),
            map.height()
        );
        overlay.display(ctx, display, pos);
    };
}

function CameraScroll(map) {
    var lastTickTime = Date.now();
    var SCROLL_PER_SEC = 2000;

    var direction = {
        x: 0,
        y: 0
    };

    this.scroll = function (
        left,
        right,
        up,
        down
    ) {
        direction.x = 0;
        direction.y = 0;

        if (left) {
            direction.x = -SCROLL_PER_SEC;
        } else if (right) {
            direction.x = SCROLL_PER_SEC;
        }

        if (up) {
            direction.y = -SCROLL_PER_SEC;
        } else if (down) {
            direction.y = SCROLL_PER_SEC;
        }
    };

    var limit = function (pos) {
        var maxX = map.width();
        var maxY = map.height();

        if (pos.x < 0) {
            pos.x = 0;
        }
        if (pos.x > maxX) {
            pos.x = maxX;
        }
        if (pos.y < 0) {
            pos.y = 0;
        }
        if (pos.y > maxY) {
            pos.y = maxY;
        }
    };

    this.move = function (pos) {
        var now = Date.now();
        var distance = (now - lastTickTime) / 1000;
        pos.x += distance * direction.x;
        pos.y += distance * direction.y;
        limit(pos);
        lastTickTime = now;
    }
}