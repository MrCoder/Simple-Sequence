function getMessages(scriptContent) {
    var sentences = scriptContent.split("\n");
    var syncMessageArray = new Array();
    var i = 0;
    for (var sentence in sentences) {
        var messageFromSentence = getMessageFromSentence(sentences[sentence]);
        if (messageFromSentence != null)
            syncMessageArray[i++] = messageFromSentence;
    }

    return syncMessageArray;
}

function getMessageFromSentence(sentence) {
    //    if (sentence.trim() == "") return null;
    //    if (sentence.indexOf(":") < 0) return null;
    //    if (sentence.indexOf("->") < 1) return null;
    //    var twoEntities = sentence.split(":")[0];
    //    var message = sentence.split(":")[1];
    //    var entitiesArray = twoEntities.split("->");
    //    var syncMessage = new Object();
    //    syncMessage.from = entitiesArray[0];
    //    syncMessage.to = entitiesArray[1];
    //    syncMessage.message = message;
    //    return syncMessage;


    if (sentence.trim() == "") return null;

    sentence = sentence.split(" ").join("");
    /((\w+):)*((\w+)=)*((\w+)\.)*(\w+)/.test(sentence);

//    alert(RegExp.$1 + "2-" + RegExp.$2+"-" + RegExp.$3 +"4-" + RegExp.$4 + "-" + RegExp.$5+"6-" + RegExp.$6 + "7-" + RegExp.$7);
    var entityFrom = RegExp.$2
    var returnResult = RegExp.$4
    var entityTo = RegExp.$6
    var message = RegExp.$7

    if(entityFrom == "") entityFrom = "client";
    if(entityTo == "") entityTo = entityFrom;

    var syncMessage = new Object();
    syncMessage.from = entityFrom;
    syncMessage.to = entityTo;
    if (returnResult != "")
        syncMessage.message = "[" + returnResult + "]" + message;
    else
        syncMessage.message = message;
    return syncMessage;
//
//    var posOfColon = sentence.indexOf(":");
//
//    var from = sentence.substr()
//    // get entity_from
//    var entityFrom;
//    if (posOfColon < 1) {
//        entityFrom = "client";
//    } else {
//        entityFrom = sentence.substr(0, posOfColon);
//
//
//    }
//
//    var posOfPoint = sentence.indexOf(".");
//    if (posOfPoint < 0) return null;
//
//    // get entity_from
//    var entityFrom;
//    if (posOfColon < 0) {
//        entityFrom = "client";
//    } else {
//        entityFrom = sentence.split(":")[0];
//    }
//
//    var entityTo;
//    var posOfEqual = sentence.indexOf("=");
//    if (posOfEqual < 0) {
//        if (posOfColon < 0)        entityTo = sentence.substr(0, posOfPoint);
//        else entityTo = sentence.substr(posOfColon + 1, posOfPoint - posOfColon - 1);
//    } else {
//        entityTo = sentence.substr(posOfEqual + 1, posOfPoint - posOfEqual - 1);
//    }
//    var syncMessage = new Object();
//    syncMessage.from = entityFrom.trim();
//    syncMessage.to = entityTo.trim();
//    syncMessage.message = sentence.substr(posOfPoint + 1);
//    return syncMessage;


}