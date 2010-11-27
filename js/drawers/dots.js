function DotsDrawer(ctx){
    this.draw = function(){
        function draw_grid(ctx) {
        try {/* vertical lines */
            for (var x = 0.5; x < 500; x += 10) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 375);
            }
            /* horizontal lines */
            for (var y = 0.5; y < 375; y += 10) {
                ctx.moveTo(0, y);
                ctx.lineTo(500, y);
            }
            /* draw it! */
            ctx.strokeStyle = "#eee";
            ctx.stroke();
        } catch(err) {
        }
    }
    }
}