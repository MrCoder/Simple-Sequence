function MessageParser() {
    this.expressions = null;
    this.rootMessages = new Array();
    this.currentMessage = null;
    this.messageStack = new Array();


    this.parse = function (scriptContent) {
        scriptContent = scriptContent.split("{").join("\n{\n");
        scriptContent = scriptContent.split("}").join("\n}\n");

        this.expressions = scriptContent.split("\n");
        for (var i in this.expressions) {
            var expression = this.expressions[i];
            if (expression.trim() == "") continue;
            if (expression.trim() == "{") {
                this.messageStack.push(this.currentMessage);
            } else if (expression.trim() == "}") {
                this.messageStack.pop();
            } else {
                var message = getMessageFromSentence(expression);
                if (this.messageStack.length <= 0){
                    message.from = "CLIENT";
                    this.rootMessages.push(message);
                } else {
                    message.from = this.messageStack[this.messageStack.length - 1].to;
                    if (message.to == "") message.to = message.from;
                    this.messageStack[this.messageStack.length - 1].subMessages.push(message);
                }
                this.currentMessage = message;
            }
        }
        return this.rootMessages;
    };



        function getMessageFromSentence(sentence) {
            if (sentence.trim() == "") return null;

            sentence = sentence.split(" ").join("");
            /((\w+):)*((\w+)=)*((\w+)\.)*(.+)/.test(sentence);

            var entityFrom = RegExp.$2
            var returnResult = RegExp.$4
            var entityTo = RegExp.$6
            var message = RegExp.$7

            if (entityTo == "") entityTo = entityFrom;

            var text = "";
            if (returnResult != "")
                text = "[" + returnResult + "]" + message;
            else
                text = message;
            return new SyncMessage(entityFrom, entityTo, text);
        }
    }
