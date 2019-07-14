console.log("cedille started");

chrome.browserAction.onClicked.addListener(function (tab) {
        chrome.tabs.executeScript(tab.id, {
            "file": "scripts/evaluate.js"
        }, function () { //Can potentially remove this.
            console.log("Evaluate function was successful.");
    });
});
