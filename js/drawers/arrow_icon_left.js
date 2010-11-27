function ArrowIconLeftDrawer(context, left, top){
    const arrowImageHeight = 18;
    
    this.draw = function(){
        var smallArrow = new Image();
        smallArrow.src = "./resource/arrow_left.gif";
        smallArrow.onload = function() {
            context.drawImage(smallArrow, left + length - 6, top - arrowImageHeight/2);
        };
    }
}