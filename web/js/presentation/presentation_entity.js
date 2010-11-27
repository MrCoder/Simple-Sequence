function RichEntity(name, left, width) {
    this.name = name;
    this.left = left;
    this.width = width;

    this.clear = function() {
        var canvas = $('#entity_canvas_' + name)[0];
        canvas.width = canvas.width;
    };
}

