"use strict";

const NUMBER_OF_CARDS = 12;

function createCard(cssId, iconClass) {
    var i;
    for (i = 0; i < NUMBER_OF_CARDS; i++) {
        var flexItem = document.createElement("div");
        var parent = document.getElementById(cssId).childNodes[3];
        parent.appendChild(flexItem);
        flexItem.className = "flex-item";
        var div2 = document.createElement("div");
        flexItem.appendChild(div2);
        var gicon = document.createElement("i");
        div2.appendChild(gicon);
        gicon.className = "fa " + iconClass + " fa-4x";
    }
}

createCard("characters", "fa-rebel");
createCard("planets", "fa-globe");
createCard("starships", "fa-first-order");