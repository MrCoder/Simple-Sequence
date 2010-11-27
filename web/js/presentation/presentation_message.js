function PresentationMessage(id, start, end, top) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.top = top;
    this.height = 0;

    this.childrenMessages = new Array();

    this.addSubMessage = function (subPresentationMessage){
        this.childrenMessages.push(subPresentationMessage);
    };

    this.getHeight = function(){
        var totalHeight = this.height;
        for (var i in this.childrenMessages){
            var childMessage = this.childrenMessages[i];
            totalHeight += childMessage.getHeight();
        }
        return totalHeight;
    }

}

