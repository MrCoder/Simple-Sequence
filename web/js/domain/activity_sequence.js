//This is the root data model for the sequence diagram
function ActivitySequence(scriptContent) {



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
//        canvasManager.removeAllBars();

        var messageParser = new MessageParser();

        var messages = messageParser.parse(scriptContent);



        var t0 = new Date().getTime();
        for (var i in messages) {
            var message = messages[i];
//            var pMessage = message.accept(new MessageConverter());
            canvasManager.addMessage(message);
        }
        canvasManager.drawBars();
        var t1 = new Date().getTime();
//        $('#perf').text(t1 - t0);

    }
}
