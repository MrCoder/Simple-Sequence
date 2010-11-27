function LabelDrawer(context, message, left, length, top){
    this.draw = function(){
         var maxWidth = 1000;
        var textMetrics = context.measureText(message);
        context.font = "italic 12px Helvetica";
        context.fillStyle="black";
        var newLeft = left + length / 2 - textMetrics.width / 2 + 5;
        context.fillText(message, newLeft, top - 3, 300);
    }
}