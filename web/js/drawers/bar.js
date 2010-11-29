function BarDrawer() {
    this.draw = function(context, left, top, height) {
        var barWidth = 10;
        context.beginPath();
        hand_drawing_rect(context, left - barWidth/2, top, barWidth, height, 2);
        context.lineWidth = 2;
        context.strokeStyle = $('#bar').css("border-color");
        context.stroke();
        context.fillStyle = $('#bar').css("background-color");
        context.closePath();
        context.fill();
        context.fillStyle = null;

    }
}