function PresentationMessage(id, start, end, top) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.top = top;

    this.clear = function() {
        var canvas = $('#message_canvas_' + this.id)[0];
        canvas.width = canvas.width;
    }
}

