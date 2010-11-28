function PresentationMessage(id, start, end, top, fromEntity, toEntity, messageText) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.top = top;
    this.height = 30;
    this.fromEntity = fromEntity;
    this.toEntity = toEntity;
    this.defaultBarHeight = 30;
    this.messageText = messageText;

    this.childrenMessages = new Array();

    this.addSubMessage = function (subPresentationMessage){
        this.childrenMessages.push(subPresentationMessage);
    };

    this.getChildrenHeight = function () {
        var childrenHeight = 0;
        for (var i in this.childrenMessages) {
            var childMessage = this.childrenMessages[i];
            childrenHeight += childMessage.getHeight();
        }
        return childrenHeight;
    };

    this.getHeight = function(){
        if (this.fromEntity == this.toEntity) this.height = 60;
        return this.height + this.getChildrenHeight();
    };

    this.getBarHeight = function() {
        var childrenHeight = this.getChildrenHeight();
        return this.defaultBarHeight + childrenHeight - 5;
    }

}

