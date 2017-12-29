function Controller(
    keyboard,
    mouse
) {
    this.keyboard = keyboard;
    this.mouse = mouse;

    this.init = function (
        display,
        camera,
        overlay
    ) {
        var scrollControl = new ScrollControl(
            display,
            camera,
            overlay
        );

        keyboard.register(Keys["q"], display.fullScreen);
        keyboard.register(Keys["d"], overlay.toggleDebug);
        mouse.listenMotion(function (pos) {
            scrollControl.motion(pos);
        });
        mouse.listenClick(function (click) {
            if (click.up) {
                scrollControl.mouseUp();
            } else {
                if (!scrollControl.clickedMinimap(click)) {
                    // clicked not on minimap
                }
            }
        });
        $(document).contextmenu(function() {
            return false;
        });
    }
}

function ScrollControl(
    display,
    camera,
    overlay
) {
    var SCROLL_MARGIN = 50;

    var mouseDownOnMinimap = false;

    var moveCameraByMinimap = function (
        mousePos
    ) {
        var minimapPos = overlay.minimap.position(display)
        camera.move(
            (mousePos.x - minimapPos.x) / minimapPos.scale.width,
            (mousePos.y - minimapPos.y) / minimapPos.scale.height
        );
    };

    this.mouseUp = function () {
        mouseDownOnMinimap = false;
    }

    this.clickedMinimap = function (
        click
    ) {
        var minimapPos = overlay.minimap.position(display)
        if (click.x > minimapPos.x &&
            click.x < minimapPos.x + minimapPos.width &&
            click.y > minimapPos.y &&
            click.y < minimapPos.y + minimapPos.height
        ) {
            mouseDownOnMinimap = true;
            moveCameraByMinimap(click);
            return true;
        } else {
            return false;
        }
    }

    this.motion = function (
        mousePos
    ) {
        camera.scroll(
            mousePos.x < SCROLL_MARGIN,
            mousePos.x > display.width() - SCROLL_MARGIN,
            mousePos.y < SCROLL_MARGIN,
            mousePos.y > display.height() - SCROLL_MARGIN
        );
        if (mouseDownOnMinimap) {
            moveCameraByMinimap(mousePos);
        }
    }
}