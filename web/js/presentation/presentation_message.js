function PresentationMessage(id, start, end) {
    this.id = id;
    this.start = start;
    this.end = end;

    this.clear = function() {
        var canvas = $('#message_canvas_' + this.id)[0];
        canvas.width = canvas.width;
    }
}

