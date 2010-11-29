// This is to draw a horizontal line like: -----
function HorizontalLineDrawer(context) {
    this.draw = function(left, top, length) {
        context.beginPath();
        context.moveTo(left, top);
//        context.lineTo(left + length, top);
        horizontal_hand_drawing_line_to(context, left, top, left + length);
        context.lineWidth = 2;
        context.strokeStyle = $('#message').css("color");
        context.stroke();
    };



}