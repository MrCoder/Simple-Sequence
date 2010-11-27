function LineDrawer(context) {
    this.draw = function(left, top, height) {
        context.beginPath();

        vertical_cairo_curve_to(context, left, top, top+height);
        /* draw it! */
        context.lineWidth = 2;
        context.strokeStyle = $('#line').css("color");
        context.stroke();
    };

    // draw vertical line
    function vertical_cairo_curve_to(context, fromX, fromY, toY) {
        var controlX,controlY;
        var offsetX = 20;
        var offsetY = 10;
        controlX = fromX + offsetX * (Math.random() -0.5);
        var tmpToY = fromY + 200;
                if(tmpToY > toY) tmpToY = toY;

        controlY = fromY/2 + tmpToY/2 + offsetY * (Math.random() -0.5);
        context.moveTo(fromX, fromY);
        context.quadraticCurveTo(controlX, controlY, fromX, tmpToY);
        if (toY > tmpToY)
            vertical_cairo_curve_to(context, fromX, tmpToY, toY);
    }
}