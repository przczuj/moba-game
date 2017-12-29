function Minimap(map) {
    var MINIMAP_MARGIN = {
        x: -16,
        y: 16
    };

    var WIDTH = 400;
    var position = function (display) {
        var width = WIDTH;
        var height = WIDTH * map.height() / map.width();
        return {
            x: display.width() - width - MINIMAP_MARGIN.x,
            y: display.height() - height - MINIMAP_MARGIN.y,
            width: width,
            height: height,
            scale: {
                width: width / map.width(),
                height: height / map.height()
            }
        };
    };

    this.position = position;

    this.render = function (
        ctx,
        display,
        cameraPos
    ) {
        var pos = position(display);

        ctx.drawImage(
            map.image[0],
            pos.x,
            pos.y,
            pos.width,
            pos.height
        );

        var cameraHighlight = {
            x: cameraPos.x * pos.scale.width,
            y: cameraPos.y * pos.scale.height,
            width: display.width() * pos.scale.width,
            height: display.height() * pos.scale.height
        };

        ctx.rect(
            pos.x + cameraHighlight.x - cameraHighlight.width / 2,
            pos.y + cameraHighlight.y - cameraHighlight.height / 2,
            cameraHighlight.width,
            cameraHighlight.height
        );
        ctx.stroke();
    };
}