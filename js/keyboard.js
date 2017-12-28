Keys = {
    "backspace":8,"tab":9, "return":13, "pause":19,
    "capslock":20, "esc":27, "space":32, "pageup":33, "pagedown":34, "end":35, "home":36,
    "left":37, "up":38, "right":39, "down":40, "insert":45, "del":46,
    "num0":96, "num1":97, "num2":98, "num3":99, "num4":100, "num5":101, "num6":102, "num7":103,
    "num8":104, "num9":105, "num*":106, "num+":107, "num-":109, "num.":110, "num/":111,
    "f1":112, "f2":113, "f3":114, "f4":115, "f5":116, "f6":117,"f7":118,"f8":119,
    "f9":120, "f10":121, "f11":122,"f12":123, "numlock":144, "scroll":145, ";":186, "/":191,
    "\\":220, "'":222
};

for (var i = 65; i < 91; i++) {
    Keys[String.fromCharCode(i).toLowerCase()] = i;
}

function Keyboard() {
    var keyBindings = {};

    this.register = function (
        key,
        callback
    ) {
        keyBindings[key] = callback
    };

    $(document).keydown(function (event) {
        var pressed = event.keyCode ? event.keyCode : event.which;
        console.log("pressed: " + pressed);
        for (var registered in keyBindings) {
            if (pressed == registered) {
                keyBindings[registered](event)
            }
        }
    });
}