function CanvasManager(container) {
    this.lifeLineDrawer = new LifeLineDrawer();
    this.messageDrawer = new MessageDrawer();
    this.internlInvokeDrawer = new InternalInvokeDrawer();
    this.barDrawer = new BarDrawer();
    this.entitySpace = 60.1;
    this.lifeLenght = 2000;
    this.rightBound = 0;
    this.entities = new Array();

    this.drawGrid = function () {
        var canvas = document.getElementById("grid");
        var context = canvas.getContext('2d');
        var gridDrawer = new GridDrawer(context);
        gridDrawer.draw(canvas.width, canvas.height);
    };


    this.addEntity = function(entityName) {
        //        var canvasId = 'entity_canvas_' + entityName;
        var canvasId = 'entity_canvas_';
        var context = document.getElementById(canvasId).getContext('2d');
        var newLeft = 0;
        newLeft = this.rightBound + this.entitySpace;
        var entityWidth = this.lifeLineDrawer.draw(context, entityName, newLeft, this.lifeLenght, false);
        this.rightBound = newLeft + entityWidth;
        var entity = new RichEntity(entityName, newLeft, entityWidth);
        this.entities.push(entity);
    };


    this.getEntity = function(entityName) {
        for (var i in this.entities) {
            var entity = this.entities[i];
            if (entity.name == entityName) return entity;
        }
    };


    this.removeAllEntities = function() {

        var canvas = $('#entity_canvas_')[0];
        if (canvas) {
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height)
        }
        this.entities.length = 0;
        this.rightBound = 0;
    };

    this.removeAllMessages = function() {
        var canvas = $('#message_canvas_')[0];
        if (canvas) {
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height)
        }
    };

    this.drawPresentationMessage = function(presentationMessage) {
        var messageCanvasId = 'message_canvas_';
        var messageContext = document.getElementById(messageCanvasId).getContext('2d');
        var entityFrom = this.getEntity(presentationMessage.fromEntity);
        var entityTo = this.getEntity(presentationMessage.toEntity);
        var barCanvasId = 'entity_canvas_';
        var canvas = document.getElementById(barCanvasId);
        var barContext = canvas.getContext('2d');
        if (entityFrom == entityTo) {
            var left = entityFrom.left + entityFrom.width / 2;
            new InternalInvokeDrawer()
                    .draw(messageContext, presentationMessage.messageText, left, presentationMessage.top);
            this.barDrawer.draw(barContext, left, presentationMessage.top + 30, presentationMessage.getBarHeight())

        } else {
            var start = entityFrom.left + entityFrom.width / 2;
            var end = entityTo.left + entityTo.width / 2;
            var length = end - start;
            this.messageDrawer.draw(messageContext, presentationMessage.messageText, start, presentationMessage.top, length);


            this.barDrawer.draw(barContext, end, presentationMessage.top, presentationMessage.getBarHeight())

        }

        for (var i in presentationMessage.childrenMessages) {
            var subPMessage = presentationMessage.childrenMessages[i];
            this.drawPresentationMessage(subPMessage);
        }
    };

}

