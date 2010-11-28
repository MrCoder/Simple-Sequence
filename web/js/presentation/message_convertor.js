function MessageConverter() {
    this.idGenerator = 0;
    this.topMargin = 90;
    this.nextTop = this.topMargin;
    this.currentPresentationMessage = null;

    this.visit = function(syncMessage) {

        var nextTop = this.topMargin;
        if (this.currentPresentationMessage)
            nextTop = this.currentPresentationMessage.top + this.currentPresentationMessage.getHeight();
        var presentationMessage = new PresentationMessage(this.idGenerator++, 0, 0, nextTop, syncMessage.from, syncMessage.to, syncMessage.message);
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
