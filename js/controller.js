function Controller(
    keyboard,
    mouse
) {
    var SCROLL_MARGIN = 50;

    this.keyboard = keyboard;
    this.mouse = mouse;

    var mouseDownOnMinimap = false;

    var moveCameraByMinimap = function (
        camera,
        mousePos,
        minimapPos
    ) {
        camera.move(
            (mousePos.x - minimapPos.x) / minimapPos.scale.width,
            (mousePos.y - minimapPos.y) / minimapPos.scale.height
        );
    };

    this.init = function (
        display,
        camera,
        overlay
    ) {
        keyboard.register(Keys["q"], display.fullScreen);
        keyboard.register(Keys["d"], overlay.toggleDebug);
        mouse.listenMotion(function (pos) {
            var x = pos.x - display.offset().left;
            var y = pos.y - display.offset().top;
            camera.scroll(
                x < SCROLL_MARGIN,
                x > display.width() - SCROLL_MARGIN,
                y < SCROLL_MARGIN,
                y > display.height() - SCROLL_MARGIN
            );
            if (mouseDownOnMinimap) {
                moveCameraByMinimap(
                    camera,
                    mouse.pos,
                    overlay.minimap.position(display)
                );
            }
        });
        mouse.listenClick(function (click) {
            if (click.up) {
                mouseDownOnMinimap = false;
            } else {
                var minimapPos = overlay.minimap.position(display);
                if (
                    click.x > minimapPos.x &&
                    click.x < minimapPos.x + minimapPos.width &&
                    click.y > minimapPos.y &&
                    click.y < minimapPos.y + minimapPos.height
                ) {
                    mouseDownOnMinimap = true;
                    moveCameraByMinimap(
                        camera,
                        click,
                        minimapPos
                    );
                }
            }
        });
        $(document).contextmenu(function() {
            return false;
        });
    }
}