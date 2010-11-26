function RectangleDrawer(context) {
    this.draw = function(left, top, width) {
        var height = 30;
        var radius = 5;

        context.beginPath();
        context.bez
        context.moveTo(left+radius, top);
        context.lineTo(left+width-radius, top);
        context.quadraticCurveTo(left+width, top, left+width, top+radius);
        context.lineTo(left+width, top+height-radius);
        context.quadraticCurveTo(left+width, top+height, left+width-radius, top+height);
        context.lineTo(left+radius, top+height);
        context.quadraticCurveTo(left, top+height, left, top+height-radius);
        context.lineTo(left, top+radius);
        context.quadraticCurveTo(left, top, left+radius, top);
        context.closePath();
        context.fillStyle=$('#entity_box').css('color');
        context.fill();

    }
}