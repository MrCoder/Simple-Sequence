//This is the root data model for the sequence diagram
function ActivitySequence(scriptContent) {
    this.entities = new Array();
    this.messages = new Array();


    this.handleEntities = function(newList, oldList, canvasManager){
        for(var i in oldList){
            var entity = oldList[i];
            if ($.inArray(entity, newList) == -1){
                canvasManager.removeEntity(entity);
            }
        }
        for (var i in newList){
            var entity = newList[i];
            if ($.inArray(entity, oldList) == -1){
                canvasManager.addEntity(entity);
            }
        }

    };

    this.draw = function(canvasManager, scriptContent){

        var newEntities = getEntities(scriptContent);

        this.handleEntities(newEntities, this.entities, canvasManager);
        canvasManager.removeAllMessages();

        this.entities = newEntities;

        var messageParser = new MessageParser();
        this.messages = messageParser.parse(scriptContent);
        for (var i in this.messages){
            var message = this.messages[i];
            canvasManager.addMessage(message);
        }

    }
}
