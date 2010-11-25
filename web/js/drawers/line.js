function LineDrawer(ctx) {
    this.draw = function(left, top, height) {
        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(left, top + height);
        /* draw it! */
        ctx.strokeStyle = $('#line').css("color");
        ctx.stroke();
    }
}