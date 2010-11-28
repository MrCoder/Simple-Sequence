function LabelDrawer(context) {
    this.draw = function(message, left, length, top) {
        var maxWidth = 1000;
        var textMetrics = context.measureText(message);
        context.font = "14px Comic Sans MS";

        context.fillStyle = "black";
        if (length > 0) {
            var newLeft = left + length / 2 - textMetrics.width / 2;
            if (newLeft < left) newLeft = left;
            context.fillText(message, newLeft, top - 3, 300);
        } else {
            var newLeft = left + length / 2 - textMetrics.width / 2;
            context.fillText(message, newLeft, top - 3, 300);
        }

    }
}