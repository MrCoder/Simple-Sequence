//This is the root data model for the sequence diagram
function ActivitySequence(scriptContent) {
    this.entities = new Array();
    this.messages = new Array();



    this.draw = function(canvasManager, scriptContent) {

        //
        //        this.handleEntities(newEntities, this.entities, canvasManager);
        canvasManager.removeAllEntities();
        var newEntities = getEntities(scriptContent);
        for (var i in newEntities) {
            var entity = newEntities[i];
            canvasManager.addEntity(entity);
        }
        canvasManager.removeAllMessages();
        canvasManager.removeAllBars();
        this.entities = newEntities;

        var messageParser = new MessageParser();

        this.messages = messageParser.parse(scriptContent);
        var t0 = new Date().getTime();
        for (var i in this.messages) {
            var message = this.messages[i];
            canvasManager.addMessage(message);
        }
        var t1 = new Date().getTime();
//        $('#perf').text(t1 - t0);

    }
}
