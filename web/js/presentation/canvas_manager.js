function CanvasManager(container) {
    this.lifeLineDrawer = new LifeLineDrawer();
    this.messageDrawer = new MessageDrawer();
    this.internlInvokeDrawer = new InternalInvokeDrawer();
    this.barDrawer = new BarDrawer();
    this.entitySpace = 60.1;
    this.lifeLenght = 2000;
    this.rightBound = 0;
    this.messages = new Array();
    this.entities = new Array();

    this.drawGrid = function () {
        var canvas = createCanvas("grid", 0);
        var context = canvas.getContext('2d');
        var gridDrawer = new GridDrawer(context);
        gridDrawer.draw(canvas.width, canvas.height);
    };

    function createCanvas(canvasId, zIndex) {
        var canvas = $('#' + canvasId);
        if (canvas.length > 0) return canvas[0];

        var canvasEle = $("<canvas id='" + canvasId + "' class='canvas'></canvas>");

        container.append(canvasEle);
        canvasEle[0].width = canvasEle[0].clientWidth;
        canvasEle[0].height = canvasEle[0].clientHeight;
        canvasEle.zIndex(zIndex);

        return canvasEle[0];
    }

    this.addEntity = function(entityName) {
        //        var canvasId = 'entity_canvas_' + entityName;
        var canvasId = 'entity_canvas_';
        var context = createCanvas(canvasId, 1000).getContext('2d');
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
        var t0 = new Date().getTime();

        var canvas = $('#message_canvas_')[0];
        if (canvas) {
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height)
        }
        var barCanvasId = 'bar_canvas_x';
        var canvas = createCanvas(barCanvasId, 3000);
        canvas.width = canvas.width;
        var t1 = new Date().getTime();

    };

    this.drawPresentationMessage = function(presentationMessage) {
        var messageCanvasId = 'message_canvas_';
        var messageContext = createCanvas(messageCanvasId, 5000).getContext('2d');
        var entityFrom = this.getEntity(presentationMessage.fromEntity);
        var entityTo = this.getEntity(presentationMessage.toEntity);
        var barCanvasId = 'bar_canvas_x';
        var canvas = createCanvas(barCanvasId, 3000);
        //        canvas.width = canvas.width;
        var barContext = canvas.getContext('2d');
        if (entityFrom == entityTo) {
            var left = entityFrom.left + entityFrom.width / 2;
            new InternalInvokeDrawer()
                    .draw(messageContext, presentationMessage.messageText, left, presentationMessage.top);
            this.barDrawer.draw(barContext, left, presentationMessage.top+30, presentationMessage.getBarHeight())

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

