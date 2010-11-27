function MessageParser() {
    this.messageIdGenerator = 0;
    this.expressions = null;
    this.rootMessages = new Array();
    this.currentMessage = null;
    this.messageStack = new Array();

    String.prototype.startsWith = function(pattern) {
        return (this.substr(0, pattern.length) == pattern);
    };

    String.prototype.endsWith = function(pattern) {
        return (this.substr(this.length - pattern.length, pattern.length) == pattern);
    };

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
            } else if (expression.trim().startsWith("//")) {
                // do nothing
            } else {
                var message = getMessageFromSentence(this.messageIdGenerator ++, expression);
                if (this.messageStack.length <= 0) {
                    message.from = "CLIENT";
                    if (message.to == "") message.to = message.from;
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


    function getMessageFromSentence(id, sentence) {
        if (sentence.trim() == "") return null;

        sentence = sentence.split(" ").join("");
        /((\w+):)*((\w+)=)*((\w+)\.)*(.+)/.test(sentence);

        var entityFrom = RegExp.$2
        var returnResult = RegExp.$4
        var entityTo = RegExp.$6
        var message = RegExp.$7

        if (message.endsWith(';')){
            message = message.substr(0, message.length - 1);
        }

        if (entityTo == "") entityTo = entityFrom;

        var text = "";
        if (returnResult != "")
            text = "[" + returnResult + "]" + message;
        else
            text = message;
        return new SyncMessage(id, entityFrom, entityTo, text);
    }
}
