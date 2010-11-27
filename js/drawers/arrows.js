function ArrowsDrawer(ctx){
    this.draw = function(){
        try {/* x-axis */
            ctx.beginPath();
            ctx.moveTo(0, 40);
            ctx.lineTo(240, 40);
            ctx.moveTo(260, 40);
            ctx.lineTo(500, 40);
            ctx.moveTo(495, 35);
            ctx.lineTo(500, 40);
            ctx.lineTo(495, 45);
            /* y-axis */
            ctx.moveTo(60, 0);
            ctx.lineTo(60, 153);
            ctx.moveTo(60, 173);
            ctx.lineTo(60, 375);
            ctx.moveTo(65, 370);
            ctx.lineTo(60, 375);
            ctx.lineTo(55, 370);
            /* draw it! */
            ctx.strokeStyle = "#000";
            ctx.stroke();
        } catch(err) {
        }
    }
}