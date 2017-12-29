function Game(
    display,
    control,
    map,
    player
) {
    var camera = new Camera(map);
    var overlay = new Overlay(
        new Minimap(map)
    );

    this.start = function () {
        control.init(
            display,
            camera,
            overlay
        );

        var frame = function () {
            camera.capture(display, overlay);
        };
        setInterval(frame, 20); // 50 fps
    };
}

$(document).ready(function () {
    var canvas = $("<canvas/>");
    $("body").append(canvas);
    var mapImage = $("#game-map");

    var display = new Display(canvas);
    new Game(
        display,
        new Controller(
            new Keyboard(),
            new Mouse(display)
        ),
        new Map(mapImage),
        new Player()
    ).start();
});
