function SyncMessage(from, to, text) {
    this.from = from;
    this.to = to;
    this.message = text;
    this.subMessages = new Array();
}