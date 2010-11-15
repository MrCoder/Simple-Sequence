function getEntities(scriptContent) {
    var sentences = scriptContent.split("\n");
    var entitiesArray = new Array();
    var i = 0;
    for (var sentence in sentences) {
        var tempEntitiesArray = getEntitiesFromSentence(sentences[sentence]);
        if (tempEntitiesArray != null) {


            var tempEntityFrom = tempEntitiesArray[0];
            if (!hasThisItemDO(entitiesArray, tempEntityFrom)) {
                entitiesArray[i++] = tempEntityFrom;
            }
            var tempEntityTo = tempEntitiesArray[1];
            if (!hasThisItemDO(entitiesArray, tempEntityTo)) {
                entitiesArray[i++] = tempEntityTo;
            }
        }
    }
    return entitiesArray;

}

function getEntitiesFromSentence(sentence) {
    // firstPart is "A->B" out of "A->B:message"
//    if (sentence.trim() == "") return null;
//    if (sentence.indexOf(":") < 0) return null;
//    if (sentence.indexOf("->") < 1) return null;
//    var firstPart = sentence.split(":")[0];
//    return firstPart.split("->");
    // support better grammar: a = b.message()

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

    return [entityFrom, entityTo];
//
//    // has a ".", has a message
//    var posOfPoint = sentence.indexOf(".");
//    if (posOfPoint < 0) return null;
//
//    // get entity_from
//    var entityFrom;
//    var posOfColon = sentence.indexOf(":");
//    if (posOfColon < 0) {
//        entityFrom = "client";
//    }else{
//        entityFrom = sentence.split(":")[0];
//    }
//
//    var entityTo;
//    var posOfEqual = sentence.indexOf("=");
//    if (posOfEqual < 0){
//        if (posOfColon < 0)        entityTo = sentence.substr(0, posOfPoint);
//        else entityTo = sentence.substr(posOfColon+1, posOfPoint - posOfColon - 1);
//    }else {
//        entityTo = sentence.substr(posOfEqual+1, posOfPoint - posOfEqual-1);
//    }
//
//
//    return [entityFrom.trim(), entityTo.trim()];

}

function hasThisItemDO(array, itemThat) {
    for (var itemThis in array) {
        if (array[itemThis] == itemThat) return true;
    }
    return false;
}