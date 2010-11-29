function LineDrawer() {
    this.draw = function(context,left, top, height) {
        context.beginPath();
        context.moveTo(left, top);

        vertical_hand_drawing_line_to(context, left, top, top+height);
        /* draw it! */
        context.lineWidth = 2;
        context.strokeStyle = $('#line').css("color");
        context.stroke();
    };


}