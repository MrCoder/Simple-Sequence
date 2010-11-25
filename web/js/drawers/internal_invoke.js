function InternalInvokeDrawer() {
    const length = 30;
    this.draw = function(context, message, left, top ) {
        context.beginPath();
        left = left + 5;
        context.moveTo(left, top);
        context.lineTo(left + length, top);
        context.lineTo(left + length, top + 20);
        context.lineTo(left, top + 20);
//        context.closePath(); // close path will link back to the start point.
        /* draw it! */
        context.strokeStyle = "#000";
        context.stroke();

        new ArrowIconLeftDrawer(context).draw( left, top+20);

        new LabelDrawer(context).draw(message, left, length, top);
    }
}