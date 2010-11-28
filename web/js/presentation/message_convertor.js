function MessageConverter() {
    this.idGenerator = 0;
    this.topMargin = 60;
    this.nextTop = this.topMargin;
    this.currentPresentationMessage = null;
    this.convert = function(syncMessage) {
        return new PresentationMessage(this.idGenerator++, 0, 0, this.nextTop, syncMessage.from, syncMessage.to);
    };

    this.visit = function(syncMessage) {

        var nextTop = this.topMargin;
        if (this.currentPresentationMessage)
            nextTop = this.currentPresentationMessage.top + this.currentPresentationMessage.getHeight();
        var presentationMessage = new PresentationMessage(this.idGenerator++, 0, 0, nextTop, syncMessage.from, syncMessage.to);
        for (var i in syncMessage.subMessages) {
            var oldCurrent = this.currentPresentationMessage;
            this.currentPresentationMessage = presentationMessage;
            var subSyncMessage = syncMessage.subMessages[i];
            var subPresentationMessage = subSyncMessage.accept(this);
            this.currentPresentationMessage.addSubMessage(subPresentationMessage);
            this.currentPresentationMessage = oldCurrent;
        }
        return presentationMessage;
    }

}
