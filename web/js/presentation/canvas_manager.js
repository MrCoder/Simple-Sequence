function CanvasManager(container) {
    this.lifeLineDrawer = new LifeLineDrawer();
    this.messageDrawer = new MessageDrawer();
    this.internlInvokeDrawer = new InternalInvokeDrawer();
    this.barDrawer = new BarDrawer();
    this.entitySpace = 60.1;
    this.lifeLenght = 700;
    this.rightBound = 0;
    this.messages = new Array();
    this.entities = new Array();
    this.bars = new Array();
    this.lastMessageTop = 60;
    this.messageSpace = 30;
    this.defaultBarHeight = 30;
    this.canvases = new Array();
    this.rootMessage = null;
    this.rootMessages = new Array();

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
        //        $('#perf').text(t1 - t0);
        this.messages.length = 0;
        this.rootMessages.length = 0;
        this.lastMessageTop = 60;
    };



    this.drawBars = function() {
        var barCanvasId = 'bar_canvas_x';
        var canvas = createCanvas(barCanvasId, 3000);
        canvas.width = canvas.width;
        var barContext = canvas.getContext('2d');
        for(var i in this.rootMessages){
            var rootMessage = this.rootMessages[i];
            this.drawBarForMessage(barContext, rootMessage);
        }

    };

    this.drawBarForMessage = function(barContext, presentationMessage){

        this.barDrawer.draw(barContext, presentationMessage.end, presentationMessage.top, presentationMessage.getHeight() - 5);
        for (var i in presentationMessage.childrenMessages){
            var subMessage = presentationMessage.childrenMessages[i];
            this.drawBarForMessage(barContext, subMessage);
        }

    };

    this.addMessage = function(message) {
        var presentationMessage = this.drawMessage(message);
        presentationMessage.height = this.defaultBarHeight;
                                          

        if (message.subMessages.length > 0) {
            for (var i in message.subMessages) {
                var subMessage = message.subMessages[i];
                this.addSubMessage(message, subMessage, presentationMessage);
            }
        }
        this.rootMessages.push(presentationMessage);
        

    };


    this.getBarByMessageId = function(messageId) {
        for (var i in this.bars) {
            var bar = this.bars[i];
            if (bar.messageId == messageId) return bar;
        }
    };

    this.addSubMessage = function(parentMessage, message, parentPresentationMessage) {
        var presentationMessage = this.drawMessage(message);
        parentPresentationMessage.addSubMessage(presentationMessage);

        if (message.subMessages.length > 0) {
            for (var i in message.subMessages) {
                var subMessage = message.subMessages[i];
                this.addSubMessage(message, subMessage, presentationMessage);
            }
        }
    };

    this.drawMessage = function (message) {
        var entityFrom = this.getEntity(message.from);
        var entityTo = this.getEntity(message.to);
        var messageCanvasId = 'message_canvas_';
        var messageContext = createCanvas(messageCanvasId, 5000).getContext('2d');

        if (message.from == message.to) {
            this.lastMessageTop = this.lastMessageTop + this.messageSpace;
            var left = entityFrom.left + entityFrom.width / 2;
            new InternalInvokeDrawer()
                    .draw(messageContext, message.message, left, this.lastMessageTop);
            var id = this.messages.length;
            this.lastMessageTop += this.messageSpace;
            var presentationMessage = new PresentationMessage(id, left, left, this.lastMessageTop);
            presentationMessage.height = this.defaultBarHeight + this.messageSpace;
            this.lastMessageTop += this.messageSpace;
            
            this.messages.push(presentationMessage);
            return presentationMessage;
        }

        var start = entityFrom.left + entityFrom.width / 2;
        var end = entityTo.left + entityTo.width / 2;
        var length = end - start;
        this.lastMessageTop = this.lastMessageTop + this.messageSpace;
        this.messageDrawer.draw(messageContext, message.message, start, this.lastMessageTop, length);

        var richMessage = new PresentationMessage(this.messages.length, start, end, this.lastMessageTop);
        richMessage.height = this.defaultBarHeight;

        this.messages.push(richMessage);
        return richMessage;
    };
}

