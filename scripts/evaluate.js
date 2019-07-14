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

// Find the actual element needed to modify.
var contenttosend;
if(window.location.host == "mail.google.com"){
    console.log("We're on google!");
    foundElement = document.getElementsByClassName("Am Al editable LW-avf");
    contenttosend = foundElement[0].innerHTML;
}
else if(window.location.host == "www.facebook.com"){ //WIP
    foundElement = document.getElementsByClassName("notranslate _5rpu");
    contenttosend = foundElement[0].innerHTML;
    contenttosend = contenttosend.replace();
}
else{
    foundElement = document.activeElement;
    contenttosend = foundElement.value;
}

// Parse content divs out of text.
try{
    contenttosend = contenttosend.replace(/<\/?[^>]+(>|$)/g, "");
}
catch(err){
    //Do nothing, as contenttosend is null.
}

// Make the actual CORS request.
console.log("sending "+contenttosend);
function makeCorsRequest() {
  var url = 'https://h0h46kcpo6.execute-api.us-east-2.amazonaws.com/Prod?text='+contenttosend;
  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    console.log("CORS not supported");
    return;
  }

  // Response handlers.
  xhr.onload = function() {
      if(content != null || content != ""){
          var content = JSON.parse(xhr.responseText).text;
          console.log("Received: "+content);

// Content edits before insertion back into website.
// Potential code goes here.
//**************************

// Set text back and edit the content.
          if(window.location.host == "mail.google.com"){
              foundElement[0].innerHTML = content;
          }
          else if(window.location.host == "www.facebook.com"){
              foundElement[0].innerHTML = content;
          }
          else{
              foundElement.value = content;
          }
      }
  };

  xhr.onerror = function() {
    console.log("Request error");
  };
  xhr.send();
}
makeCorsRequest();
