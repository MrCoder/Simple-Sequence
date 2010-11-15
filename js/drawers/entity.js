function EntityDrawer(ctx, entityName, left, top, selected){
    this.draw = function(){
        ctx.font = "bold 14px Times New Roman";

        var textMetrics = ctx.measureText(entityName);
        var rectangleWidth = textMetrics.width + 20;

        var rectangleDrawer = new RectangleDrawer(ctx, left, top, rectangleWidth);
        rectangleDrawer.draw();

        var maxWidth = 1000;
        if (selected)
            ctx.fillStyle="blue";
        else
            ctx.fillStyle="black";
        ctx.fillText(entityName, left + 10, top + 20, maxWidth);
        return rectangleWidth;
    }
}