function ArrowIconRightDrawer(context, left, top){
    const arrowImageHeight = 18;
    
    this.draw = function(){
        var smallArrow = new Image();
        smallArrow.src = "./resource/arrow_right.gif";
        smallArrow.onload = function() {
            context.drawImage(smallArrow, left + length - 12, top - arrowImageHeight/2);
        };
    }
}