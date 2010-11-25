function getEntities(scriptContent) {
    scriptContent = scriptContent.split("{").join("\n{\n");
    scriptContent = scriptContent.split("}").join("\n}\n");

    var sentences = scriptContent.split("\n");
    var entitiesArray = new Array();
    entitiesArray[0] = "CLIENT";
    for (var sentence in sentences) {
        var tempEntitiesArray = getEntitiesFromSentence(sentences[sentence]);
        if (tempEntitiesArray != null) {
            var tempEntityFrom = tempEntitiesArray[0];
            if (!hasThisItemDO(entitiesArray, tempEntityFrom)) {
                entitiesArray.push(tempEntityFrom);
            }
            var tempEntityTo = tempEntitiesArray[1];
            if (!hasThisItemDO(entitiesArray, tempEntityTo)) {
                entitiesArray.push(tempEntityTo);
            }
        }
    }
    return entitiesArray;
}

function getEntitiesFromSentence(sentence) {
    if (sentence.trim() == "") return null;

    sentence = sentence.split(" ").join("");
    /((\w+):)*((\w+)=)*((\w+)\.)*(\w+)/.test(sentence);

    var entityFrom = RegExp.$2
    var entityTo = RegExp.$6
    if (entityFrom == "") entityFrom = "CLIENT";
    if (entityTo == "") entityTo = entityFrom;

    return [entityFrom, entityTo];
}

function hasThisItemDO(array, itemThat) {
    for (var itemThis in array) {
        if (array[itemThis] == itemThat) return true;
    }
    return false;
}