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
    this.defaultBarHeight = 20;
    this.canvases = new Array();

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
        var canvasId = 'entity_canvas_' + entityName;
        var context = createCanvas(canvasId, 1000).getContext('2d');
        var newLeft = 0;
        newLeft = this.rightBound + this.entitySpace;
        var entityWidth = this.lifeLineDrawer.draw(context, entityName, newLeft, this.lifeLenght, false);
        this.rightBound = newLeft + entityWidth;
        var entity = new RichEntity(entityName, newLeft, entityWidth);
        this.entities.push(entity);
    };

    this.removeEntity = function(entityName) {
        var entity = this.getEntity(entityName);
        entity.clear();
        this.entities = jQuery.grep(this.entities, function(value) {
            return value.name != entityName;
        });

        this.rightBound = 0;
        for (var i in this.entities) {
            var entity = this.entities[i];
            var right = entity.left + entity.width;
            if (right > this.rightBound) this.rightBound = right;
        }

    };

    this.getEntity = function(entityName) {
        for (var i in this.entities) {
            var entity = this.entities[i];
            if (entity.name == entityName) return entity;
        }
    };

    this.createABar = function (start, barEntityName, top, messageId) {
        var barId = this.bars.length;
        var barCanvasId = 'bar_canvas_' + barId;
        var barContext = createCanvas(barCanvasId, 3000).getContext('2d');
        this.barDrawer.draw(barContext, start, top, this.defaultBarHeight);
        var richBar = new PresentationBar(barId, start, top, this.defaultBarHeight, messageId);
        this.bars.push(richBar);
        return richBar;
    };

    this.removeAllMessages = function() {
        for (var i in this.messages) {
            var message = this.messages[i];
            message.clear();
        }

        for (var i in this.bars) {
            var bar = this.bars[i];
            bar.clear();
        }
        this.messages.length = 0;
        this.bars.length = 0;
        this.lastMessageTop = 60;
    };

    this.addMessage = function(message) {
        var richMessage = this.drawMessage(message);

        var top = this.lastMessageTop;
        var fromBar = this.createABar(richMessage.start, message.from, richMessage.top, -1);

        var toBar = this.createABar(richMessage.end, message.to, this.lastMessageTop, message.id);
        toBar.parentBar = fromBar;
        fromBar.extendByToBar(toBar);

        if (message.subMessages.length > 0) {
            for (var i in message.subMessages) {
                var subMessage = message.subMessages[i];
                this.addSubMessage(message, subMessage);
            }
        }

    };


    this.getBarByMessageId = function(messageId) {
        for (var i in this.bars) {
            var bar = this.bars[i];
            if (bar.messageId == messageId) return bar;
        }
    };

    this.addSubMessage = function(parentMessage, message) {
        var richMessage = this.drawMessage(message);
        var end = richMessage.end;
        var fromBar = this.getBarByMessageId(parentMessage.id);

        var toBar = this.createABar(end, message.to, this.lastMessageTop, message.id);
        toBar.parentBar = fromBar;
//        fromBar.extend(toBar.top + toBar.height+1);
        fromBar.extendByToBar(toBar);
        if (message.subMessages.length > 0) {
            for (var i in message.subMessages) {
                var subMessage = message.subMessages[i];
                this.addSubMessage(message, subMessage);
            }
        }
    };

    this.drawMessage = function (message) {
        var entityFrom = this.getEntity(message.from);
        var entityTo = this.getEntity(message.to);
        var messageCanvasId = 'message_canvas_' + this.messages.length;
        var messageContext = createCanvas(messageCanvasId, 5000).getContext('2d');

        if (message.from == message.to) {
            this.lastMessageTop = this.lastMessageTop + this.messageSpace;
            var left = entityFrom.left + entityFrom.width / 2;
            new InternalInvokeDrawer()
                    .draw(messageContext, message.message, left, this.lastMessageTop);
            var id = this.messages.length;
            var richMessage = new PresentationMessage(id, left, left, this.lastMessageTop);
            this.lastMessageTop += this.messageSpace - 5;
            this.messages.push(richMessage);
            return richMessage;
        }

        var start = entityFrom.left + entityFrom.width / 2;
        var end = entityTo.left + entityTo.width / 2;
        var length = end - start;
        this.lastMessageTop = this.lastMessageTop + this.messageSpace;
        this.messageDrawer.draw(messageContext, message.message, start, this.lastMessageTop, length);

        var richMessage = new PresentationMessage(this.messages.length, start, end, this.lastMessageTop);
        this.messages.push(richMessage);
        return richMessage;
    };
}

