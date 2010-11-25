function GridDrawer(context) {
    this.draw = function(width, height) {
        try {/* vertical lines */
            for (var x = 0.5; x < width; x += 10) {
                context.moveTo(x, 0);
                context.lineTo(x, height);
            }
            /* horizontal lines */
            for (var y = 0.5; y < height; y += 10) {
                context.moveTo(0, y);
                context.lineTo(width, y);
            }
            /* draw it! */
            context.strokeStyle = "#eee";
            context.stroke();
        } catch(err) {
        }
    }
}