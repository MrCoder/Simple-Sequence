// This is to draw a horizontal line like: -----
function HorizontalLineDrawer(context) {
    this.draw = function(left, top, length) {
        context.beginPath();
        context.moveTo(left, top);
        context.lineTo(left + length, top);
        context.strokeStyle = $('#message').css("color");
        context.stroke();
    }

}