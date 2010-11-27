function SyncMessage(id, from, to, text) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.message = text;
    this.subMessages = new Array();
}