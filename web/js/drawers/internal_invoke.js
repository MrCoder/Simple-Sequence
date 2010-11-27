function InternalInvokeDrawer() {
    const length = 50;
    const height = 30;
    this.draw = function(context, message, left, top ) {
        context.beginPath();
        left = left + 5;
        context.moveTo(left, top);
        horizontal_cairo_curve_to(context, left, top, left + length);
        context.quadraticCurveTo(left + length + 5, top + 5, left + length, top + height);
        horizontal_cairo_curve_to(context, left + length, top + height, left);
        context.strokeStyle = "#000";
        context.lineWidth = 2;
        context.stroke();

        new ArrowIconLeftDrawer(context).draw( left, top+height);

        new LabelDrawer(context).draw(message, left, length, top);
    }
}