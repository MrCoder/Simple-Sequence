function ArrowIconLeftDrawer(context){
    const arrowImageHeight = 18;
    
    this.draw = function(left, top){
        context.drawImage($('#arrow_left')[0], left + length - 6, top - arrowImageHeight/2);
    }
}