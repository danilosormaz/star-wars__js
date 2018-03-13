"use strict";


var data = {
    people: [],
    planets: [],
    starships: []
};

function getTableData(dataName, page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var dataResults = JSON.parse(this.responseText);
            if (dataName == "people") {
                data.people = data.people.concat(dataResults.results);
                fillTable("characters", dataResults.results, page);
                document.getElementsByClassName("number-of")[0].innerText = "Ukupno: ".concat(dataResults.count);
            }
            else if (dataName == "planets") {
                data.planets = data.planets.concat(dataResults.results);
                fillTable("planets", dataResults.results, page);
                document.getElementsByClassName("number-of")[1].innerText = "Ukupno: ".concat(dataResults.count);
            }
            else {
                data.starships = data.starships.concat(dataResults.results);
                fillTable("starships", dataResults.results, page);
                document.getElementsByClassName("number-of")[2].innerText = "Ukupno: ".concat(dataResults.count);
            }
        }
    };
    xhttp.open("GET", "https://swapi.co/api/" + dataName + "?page=" + page, true);
    xhttp.send();
}

var i;
var k = Math.ceil(NUMBER_OF_CARDS / 10);
for (i = 1; i <= k; i++) {
    getTableData("people", i);
    getTableData("planets", i);
    getTableData("starships", i);
}


function openCard(cardToOpen, sectionId) {
    var trArray = cardToOpen.childNodes[1].childNodes[0].childNodes;
    var cardNameProperty = trArray[0].lastChild.innerText;
    for (var i = 0; i < trArray.length; i++) {
        if (trArray[i].lastChild.innerText == "loading...") {
            if (sectionId == "characters") {
                replaceUrl(data.people, cardNameProperty, trArray[i].firstChild.innerText, trArray[i]);
            }
            else if (sectionId == "planets") {
                replaceUrl(data.planets, cardNameProperty, trArray[i].firstChild.innerText, trArray[i]);
            }
            else {
                replaceUrl(data.starships, cardNameProperty, trArray[i].firstChild.innerText, trArray[i]);
            }
        }
    }
}

function replaceUrl(sectionId, cardNameProperty, trElement, trArrayElement) {
    var trToReplace = trElement.toLowerCase();
    var i;
    for (i = 0; i < sectionId.length; i++) {
        if (sectionId[i].name == String(cardNameProperty)) {
            if (typeof sectionId[i][trToReplace] == "string") {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var dataResults = JSON.parse(this.responseText);
                        if (dataResults.name) {
                            trArrayElement.lastChild.innerText = "";
                            var para = document.createElement("p");
                            var textNode = document.createTextNode(dataResults.name);
                            para.appendChild(textNode);
                            para.style.margin = "2px 0px"
                            trArrayElement.lastChild.appendChild(para);
                        }
                        else {
                            trArrayElement.lastChild.innerText = "";
                            var para = document.createElement("p");
                            var textNode = document.createTextNode(dataResults.title);
                            para.appendChild(textNode);
                            para.style.margin = "2px 0px"
                            trArrayElement.lastChild.appendChild(para);
                        }
                    }
                };

                xhttp.open("GET", sectionId[i][trToReplace], true);
                xhttp.send();
            }
            else {
                var k;
                var arrayOfUrls = sectionId[i][trToReplace];
                trArrayElement.lastChild.innerText = "";
                for (k = 0; k < arrayOfUrls.length; k++) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            var dataResults = JSON.parse(this.responseText);
                            if (dataResults.name) {
                                /* trArrayElement.lastChild.innerText = trArrayElement.lastChild.innerText.concat(dataResults.name, "/"); */
                                var para = document.createElement("p");
                                var textNode = document.createTextNode(dataResults.name);
                                para.appendChild(textNode);
                                trArrayElement.lastChild.appendChild(para);
                                para.style.margin = "2px 0px"
                            }
                            else {
                                var para = document.createElement("p");
                                var textNode = document.createTextNode(dataResults.title);
                                para.appendChild(textNode);
                                trArrayElement.lastChild.appendChild(para);
                                para.style.margin = "2px 0px";
                            }
                        }
                    };

                    xhttp.open("GET", arrayOfUrls[k], true);
                    xhttp.send();
                }
            }
        }
    }
}

