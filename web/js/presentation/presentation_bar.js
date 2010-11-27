function PresentationBar(id, left, top, height, messageId) {
    this.id = id;
    this.left = left;
    this.height = height;
    this.top = top;
    this.messageId = messageId;

    this.extendByToBar = function(toBar) {
        var canvas = $('#bar_canvas_' + this.id)[0];

        this.clear();
        var barContext = canvas.getContext('2d');
        var newHeight = toBar.top + toBar.height - this.top + 3;
        if (newHeight > this.height) {
            this.height = newHeight;
        }
        var t0 = new Date().getTime();
        new BarDrawer().draw(barContext, this.left, this.top, this.height);//0~1ms
        var t1 = new Date().getTime();
//        $('#perf').text(t1 - t0);

        if (this.parentBar) this.parentBar.extendByToBar(this);
    };

    this.clear = function() {
        var canvas = $('#bar_canvas_' + this.id)[0];
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        //        canvas.width = canvas.width;
    };
}
