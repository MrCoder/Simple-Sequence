function PresentationBar(id, left, top, height, messageId) {
    this.id = id;
    this.left = left;
    this.height = height;
    this.top = top;
    this.messageId = messageId;

    this.extend = function(bottom) {
        var canvas = $('#bar_canvas_' + this.id)[0];
        canvas.width = canvas.width;
        var barContext = canvas.getContext('2d');
        var newHeight = bottom - this.top;
        if (newHeight > this.height)
            this.height = newHeight;
        new BarDrawer().draw(barContext, this.left, this.top, this.height);
        if (this.parentBar) this.parentBar.extend(this.top + this.height+ 10);
    };

    this.extendByToBar = function(toBar){
        var canvas = $('#bar_canvas_' + this.id)[0];
        canvas.width = canvas.width;
        var barContext = canvas.getContext('2d');
        var newHeight = toBar.top + toBar.height - this.top + 3;
        if (newHeight > this.height)
            this.height = newHeight;
        new BarDrawer().draw(barContext, this.left, this.top, this.height);
        if (this.parentBar) this.parentBar.extendByToBar(this);
    };

    this.clear = function() {
        var canvas = $('#bar_canvas_' + this.id)[0];
        canvas.width = canvas.width;
    };
}
