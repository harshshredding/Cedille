console.log("Test script loaded.");

window.addEventListener ("load", function () {
    var input = document.getElementsByTagName ("input");
    input[0].addEventListener ("keydown", function () {
        //alert ("Caret position: " + this.selectionStart);
        console.log("beep");
        // You can also set the caret: this.selectionStart = 2;
        });
    });
