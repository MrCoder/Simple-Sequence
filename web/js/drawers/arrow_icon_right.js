function ArrowIconRightDrawer(context){
    var arrowImageHeight = 18;
    
    this.draw = function(left, top){
        context.drawImage($('#arrow_right')[0], left + length - 12, top - arrowImageHeight/2);
    }
}