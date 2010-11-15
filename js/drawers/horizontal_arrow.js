// This is to draw an arrow like ---> or <----
// length could be negative
function HorizontalArrowDrawer(context, left, top, length){
    this.drawRightArrow = function() {
        new ArrowIconRightDrawer(context, left + length, top).draw();
    };

    this.drawLeftArrow = function() {
        new ArrowIconLeftDrawer(context, left+length, top).draw();
    };

    this.draw = function(){
        // draw the line: ----
        new HorizontalLineDrawer(context, left, top, length).draw();
        // draw the arrow icon
        if(length > 0) {
            this.drawRightArrow();
        } else {
            this.drawLeftArrow();
        }
    }
}