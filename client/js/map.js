function Map(image) {
    var PIXEL = 12;

    this.image = image;

    this.width = function () {
        return image.width() * PIXEL;
    };

    this.height = function () {
        return image.height() * PIXEL;
    };
}
