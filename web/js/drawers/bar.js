function BarDrawer() {
    this.draw = function(context, left, top, height) {
        var barWidth = 10;
        context.beginPath();
        crazy_rect(context, left - barWidth/2, top, barWidth, height, 2);
        context.lineWidth = 2;
//        context.strokeStyle = 'red';
        context.strokeStyle = $('#bar').css("border-color");
        context.stroke();
//        context.strokeRect(left - barWidth/2, top, barWidth, height);


        context.fillStyle = $('#bar').css("background-color");
        context.closePath();
        context.fill();
//        context.fillRect(left - barWidth/2, top, barWidth, height);
        context.fillStyle = null;

    }
}