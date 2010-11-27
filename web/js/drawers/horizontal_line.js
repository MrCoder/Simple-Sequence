// This is to draw a horizontal line like: -----
function HorizontalLineDrawer(context) {
    this.draw = function(left, top, length) {
        context.beginPath();
//        context.moveTo(left, top);
//        context.lineTo(left + length, top);
        horizontal_cairo_curve_to(context, left, top, left + length);
        context.lineWidth = 2;
        context.strokeStyle = $('#message').css("color");
        context.stroke();
    };

    // draw vertical line
    function horizontal_cairo_curve_to(context,  fromX, fromY, toX) {
        var controlX,controlY;
        var offsetX = 5;
        var offsetY = 8;
        controlY = fromY + offsetY * (Math.random() -0.5);
        var tmpToX = fromX + 30;
        if(tmpToX > toX) tmpToX = toX;

        controlX = fromX/2 + tmpToX/2 + offsetX * (Math.random() -0.5);
        context.moveTo(fromX, fromY);
        context.quadraticCurveTo(controlX, controlY, tmpToX, fromY);
        if (toX > tmpToX)
            horizontal_cairo_curve_to(context, tmpToX, fromY, toX);
    }

}