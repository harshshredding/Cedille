console.log("cedille started");
var count = 0;
chrome.browserAction.onClicked.addListener(function (tab) {
    count++;
    // Below is the way I found to persis `count` across different plugin
    // calls.
    chrome.tabs.executeScript(tab.id, {code: 'var count = ' + count + ";"},
        function() {
            chrome.tabs.executeScript(tab.id, {
                "file": "scripts/evaluate.js"
            }, function () { //Can potentially remove this.
                console.log("Evaluate function was successful.");
            });
    });
});
