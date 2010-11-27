function InternalInvokeDrawer(context, message, left, top) {
    const length = 30;
    this.draw = function() {
        context.beginPath();
        context.moveTo(left, top);
        context.lineTo(left + length, top);
        context.lineTo(left + length, top + 20);
        context.lineTo(left, top + 20);
//        context.closePath(); // close path will link back to the start point.
        /* draw it! */
        context.strokeStyle = "#000";
        context.stroke();

        new ArrowIconLeftDrawer(context, left, top+20).draw();

        new LabelDrawer(context, message, left, length, top).draw();
    }
}