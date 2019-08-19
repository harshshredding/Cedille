
// Map from plain characters to characters with accents.
var plainToAccents = {
    "C": ["Ç", "C"],
    "a": ["a", "â", "à"],
    "c": ["c", "ç"],
    "e": ["e", "é", "ë", "è", "ê"],
    "i": ["i", "î", "ì", "ï"],
    "o": ["o", "ô", "ò"],
    "u": ["u", "û", "ù", "ü"],
}

// in : a character
// out : a character with a different accent
function getCharacterWithDifferentAccent(input) {
    for (var base in plainToAccents) {
        if (plainToAccents[base].includes(input)) {
            count++;
            console.log(count);
            return plainToAccents[base][count % plainToAccents[base].length]
        }
    }
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

var selection = document.getSelection()
var startOfSel = selection.anchorOffset < selection.extentOffset ? selection.anchorOffset : selection.extentOffset;
var endOfSel = selection.anchorOffset > selection.extentOffset ? selection.anchorOffset : selection.extentOffset;
console.log(selection)

// We have selected only one character, replace with options
if ((endOfSel - startOfSel) == 1) {
    console.log("single characted selected")
    var data = selection.focusNode.data
    var selectedData = data.substring(startOfSel, endOfSel)
    var transformedData = getCharacterWithDifferentAccent(selectedData)
    selection.focusNode.data = data.substring(0, startOfSel)
        + transformedData
        + data.substring(endOfSel)

    // reselect text so user can switch between other accents quickly.
    var range = document.createRange();
    range.setStart(selection.focusNode, startOfSel);
    range.setEnd(selection.focusNode, endOfSel);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
} else {
    // Find the actual element needed to modify.
    var contenttosend, foundElement;
    var somethingIsSelected = (endOfSel - startOfSel) != 0;

    if (somethingIsSelected) {
        var data = selection.focusNode.data
        contenttosend = data.substring(startOfSel, endOfSel)
    } else {
        if (window.location.host == "mail.google.com") {
            console.log("We're on google!");
            foundElement = document.getElementsByClassName("Am Al editable LW-avf");
            contenttosend = foundElement[0].innerHTML;
        }
        else if (window.location.host == "www.facebook.com") { //WIP
            foundElement = document.getElementsByClassName("notranslate _5rpu");
            contenttosend = foundElement[0].innerHTML;
            contenttosend = contenttosend.replace();
        }
        else {
            foundElement = document.activeElement;
            contenttosend = foundElement.value;
        }
    }

    // Parse content divs out of text.
    try {
        contenttosend = contenttosend.replace(/<\/?[^>]+(>|$)/g, "");
    }
    catch (err) {
        //Do nothing, as contenttosend is null.
    }

    // Make the actual CORS request.
    console.log("sending " + contenttosend);
    function makeCorsRequest() {
        var url = 'https://h0h46kcpo6.execute-api.us-east-2.amazonaws.com/Prod?text=' + contenttosend;
        console.log("sent content" + contenttosend)
        var xhr = createCORSRequest('GET', url);
        if (!xhr) {
            console.log("CORS not supported");
            return;
        }

        // Response handlers.
        xhr.onload = function () {
            if (content != null || content != "") {
                var content = JSON.parse(xhr.responseText).text;
                console.log("Received: " + content);

                // Content edits before insertion back into website.
                // Potential code goes here.
                //**************************

                // Set text back and edit the content.
                if (somethingIsSelected) {
                    var selection = document.getSelection()
                    console.log("something was selected")
                    console.log("selection again")
                    console.log(selection)
                    var oldData = selection.focusNode.data;
                    // below assignment doesn't work on facebook. Will fix shortly.
                    selection.focusNode.data = oldData.substring(0, startOfSel)
                        + content
                        + oldData.substring(endOfSel)
                } else {
                    if (window.location.host == "mail.google.com") {
                        foundElement[0].innerHTML = content;
                    }
                    else if (window.location.host == "www.facebook.com") {
                        foundElement[0].innerHTML = content;
                    }
                    else {
                        foundElement.value = content;
                    }
                }
            }
        };

        xhr.onerror = function () {
            console.log("Request error");
        };
        xhr.send();
    }
    makeCorsRequest();
}