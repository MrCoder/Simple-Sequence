function LineDrawer(context) {
    this.draw = function(left, top, height) {
        context.beginPath();
        context.moveTo(left, top);

        vertical_cairo_curve_to(context, left, top, top+height);
        /* draw it! */
        context.lineWidth = 2;
        context.strokeStyle = $('#line').css("color");
        context.stroke();
    };


}