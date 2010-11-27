function InternalInvokeDrawer() {
    const length = 50;
    const height = 20;
    this.draw = function(context, message, left, top ) {
        context.beginPath();
        left = left + 5;
        context.moveTo(left, top);
        horizontal_cairo_curve_to(context, left, top, left + length);
//        context.lineTo(left + length, top);
        context.quadraticCurveTo(left + length + 5, top + 5, left + length, top + height);
        horizontal_cairo_curve_to(context, left + length, top + height, left);

//        context.lineTo(left, top + 20);
//        context.closePath(); // close path will link back to the start point.
        /* draw it! */
        context.strokeStyle = "#000";
        context.lineWidth = 2;
        context.stroke();

        new ArrowIconLeftDrawer(context).draw( left, top+height);

        new LabelDrawer(context).draw(message, left, length, top);
    }
}