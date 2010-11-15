function RectangleDrawer(context, left, top, width) {
    this.draw = function() {
        var entityHeight = 30;

        context.drawImage(getEntityBackground_in(), left, top, width, entityHeight);
        context.drawImage(getEntityBackground_tl(), left, top, 5, 5);
        context.drawImage(getEntityBackground_tr(), left+width-5, top, 5, 5);
        context.drawImage(getEntityBackground_bl(), left, top+entityHeight - 5, 5, 5);
        context.drawImage(getEntityBackground_br(), left+width-5, top+entityHeight-5, 5, 5);

        //        context.strokeStyle=css("entityBox", "color");
        //        context.strokeRect(left, top, width, entityHeight);
        //
        //        var my_gradient = context.createLinearGradient(left, top, left + width, top);
        //        my_gradient.addColorStop(0, "black");
        //        my_gradient.addColorStop(1, "white");
        //        context.fillStyle = my_gradient;
        //        context.fillRect(left, top, width, entityHeight);
        //        context.fillStyle = null;

    }
}