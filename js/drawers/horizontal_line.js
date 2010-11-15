// This is to draw a horizontal line like: -----
function HorizontalLineDrawer(context, left, top, length) {
    this.draw = function() {
        context.beginPath();
        context.moveTo(left, top);
        context.lineTo(left + length, top);
        context.strokeStyle = css("message", "color");
        context.stroke();
    }

}