function Overlay(minimap) {
    var debug = new Debug();

    this.minimap = minimap;
    this.toggleDebug = debug.toggle;

    this.display = function (
        ctx,
        display,
        cameraPos
    ) {
        minimap.display(ctx, display, cameraPos);
        debug.display(ctx, display.fps(), cameraPos.x, cameraPos.y);
    };
}

function Debug() {
    var show = true;

    this.display = function (ctx, fps, x, y) {
        if (!show) {
            return
        }

        var lines = [
            "fps: " + fps,
            "x: " + x.toFixed(),
            "y: " + y.toFixed()
        ];

        ctx.font = "bold 10pt Courier";
        ctx.fillStyle = "#AAA";
        ctx.fillRect(0, 0, 60, lines.length * 14);
        ctx.fillStyle = "#000";

        for (var i in lines) {
            ctx.fillText(
                lines[i],
                0,
                10 + (i * 14)
            );
        }
    };

    this.toggle = function () {
        show = !show;
    };
}