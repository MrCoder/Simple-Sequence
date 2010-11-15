//This is the root data model for the sequence diagram
function ActivitySequence(scriptContent) {
    this.entities = getEntities(scriptContent);
    this.messages = getMessages(scriptContent);

    this.print = function(sequencePrinter) {
        for (var entity in this.entities) {
            sequencePrinter.printEntity(this.entities[entity]);
        }
        for (var message in this.messages) {
            var theMessage = this.messages[message];
            if (theMessage.from == theMessage.to) {
                sequencePrinter.printInternalInvokeMessage(theMessage)
            } else {
                sequencePrinter.printMessage(theMessage);
            }
        }
    }
}