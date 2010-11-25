function HorizontalArrowDrawer(context){
    this.drawRightArrow = function(left, top, length) {
        new ArrowIconRightDrawer(context).draw(left + length, top);
    };

    this.drawLeftArrow = function(left, top, length) {
        new ArrowIconLeftDrawer(context).draw(left+length, top);
    };

    this.draw = function(left, top, length){
        // draw the line: ----
        // draw the arrow icon
        if(length > 0) {
            new HorizontalLineDrawer(context).draw(left+5, top, length-10);
            this.drawRightArrow(left+5, top, length-10);
        } else {
            new HorizontalLineDrawer(context).draw(left-5, top, length+10);
            this.drawLeftArrow(left-5, top, length+10);
        }
    }
}