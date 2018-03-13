"use strict";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkIsNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function checkUrl(itemToCheck) {
    if (typeof itemToCheck == "string") {
        return itemToCheck.search("http");
    }
    else if (typeof itemToCheck == "object" && typeof itemToCheck[0] == "string")
        return (itemToCheck[0].search("http"));
}

function fillRows(singleItem, tableBody) {
    var x;
    for (x in singleItem) {
        if (x != "url" && x != "created" && x != "edited") {
            var tRow = document.createElement("tr");
            var text1 = document.createTextNode(capitalizeFirstLetter(x.replace(/_/g, " ")));
            if (checkUrl(singleItem[x]) > -1) {
                var text2 = document.createTextNode("loading...");
            }
            else {
                if (checkIsNumeric(singleItem[x])) {
                    var text2 = document.createTextNode(numeral(singleItem[x]).format('0,0.0'))
                }
                else {
                    var text2 = document.createTextNode(singleItem[x]);
                }
            }
            if (singleItem[x] == "") {
                var text2 = document.createTextNode("-");
            }

            var tData1 = document.createElement("td");
            var tData2 = document.createElement("td");
            tData1.appendChild(text1);
            tData2.appendChild(text2);
            tRow.appendChild(tData1);
            tRow.appendChild(tData2);
            tableBody.appendChild(tRow);
        }
    }
}

function getDataUrlNumber(singleData) {
    var singleDataUrl = singleData.url;
    var r = /\d+/g;
    var k = singleDataUrl.match(r);
    return k[0];
}

function fillTable(sectionId, receivedData, page) {
    var flexContainer = document.getElementById(sectionId).childNodes[3];
    var i;
    var receivedDataLength = receivedData.length;
    var n = page * receivedDataLength;
    if (page * receivedDataLength < NUMBER_OF_CARDS) {
        for (i = (page - 1) * receivedDataLength; i < n; i++) {
            var tableCard = document.createElement("table");
            tableCard.className = "t01";
            var tableBody = document.createElement("tbody");
            tableCard.appendChild(tableBody);
            flexContainer.childNodes[i].appendChild(tableCard);

            if (sectionId == "characters") {
                fillRows(receivedData[i - n + receivedDataLength], tableBody)
            }
            else if (sectionId == "planets") {
                fillRows(receivedData[i - n + receivedDataLength], tableBody)
            }
            else {
                fillRows(receivedData[i - n + receivedDataLength], tableBody)
            }


            flexContainer.childNodes[i].addEventListener("mouseenter", function (event) {
                openCard(event.target, sectionId);

            })
        }
    }
    else {
        for (i = n - receivedDataLength; i < n - receivedDataLength + NUMBER_OF_CARDS % receivedDataLength; i++) {
            var tableCard = document.createElement("table");
            tableCard.className = "t01";
            var tableBody = document.createElement("tbody");
            tableCard.appendChild(tableBody);
            flexContainer.childNodes[i].appendChild(tableCard);


            if (sectionId == "characters") {
                fillRows(receivedData[i - n + receivedDataLength], tableBody);
            }
            else if (sectionId == "planets") {
                fillRows(receivedData[i - n + receivedDataLength], tableBody);
            }
            else {
                fillRows(receivedData[i - n + receivedDataLength], tableBody);
            }
            flexContainer.childNodes[i].addEventListener("mouseenter", function (event) {
                openCard(event.target, sectionId);

            })
        }
    }

}


