function RectangleDrawer(context) {
    this.draw = function(left, top, width) {
        var height = 30;
        var radius = 5;

        context.beginPath();
        context.moveTo(left+radius, top);
        horizontal_cairo_curve_to(context, left + radius, top, left + width - radius);
//        context.lineTo(left+width-radius, top);
        context.quadraticCurveTo(left+width, top, left+width, top+radius);
//        vertical_cairo_curve_to(context, left + width, top, top + height-radius);
        context.lineTo(left+width, top+height-radius);
        context.quadraticCurveTo(left+width, top+height, left+width-radius, top+height);
        horizontal_cairo_curve_to(context, left + width - radius, top+height, left + radius);

//        context.lineTo(left+radius, top+height);
        context.quadraticCurveTo(left, top+height, left, top+height-radius);
        context.lineTo(left, top+radius);
        context.quadraticCurveTo(left, top, left+radius, top);
        context.closePath();
        context.stroke();
//        context.fillStyle=$('#entity_box').css('color');
//        context.fill();

    }
}