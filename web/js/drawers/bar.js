function BarDrawer() {
    this.draw = function(context, left, top, height) {
        context.strokeStyle = $('#bar').css("border-color");
        var barWidth = 10;
        context.strokeRect(left - barWidth/2, top, barWidth, height);


        context.fillStyle = $('#bar').css("background-color");
        context.fillRect(left - barWidth/2, top, barWidth, height);
        context.fillStyle = null;

    }
}