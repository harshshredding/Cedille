<<<<<<< HEAD
/*var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       console.log(xhttp.responseText);
    }
};
xhttp.withCredentials = true;
xhttp.open("GET", "https://h0h46kcpo6.execute-api.us-east-2.amazonaws.com/Prod?text=Je%20suis%20un%20francais%20a%20Seattle");
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.send();

console.log("Returned: "+xhttp);

// Get element that is currently focused.
foundElement = document.activeElement;
//console.log("Found "+foundElement.value);

*/
/*
fetch('https://h0h46kcpo6.execute-api.us-east-2.amazonaws.com/Prod?text=Je%20suis%20un%20francais%20a%20Seattle')
  .then(function(response) {
    console.log(response);
    return response;
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
 */
 var xhr = new XMLHttpRequest();
 xhr.open("GET", "https://h0h46kcpo6.execute-api.us-east-2.amazonaws.com/Prod?text=Je%20suis%20un%20francais%20a%20Seattle", true);
 xhr.onreadystatechange = function() {
   if (xhr.readyState == 4) {
     // innerText does not let the attacker inject HTML elements.
     console.log("RETURNED:"+xhr.responseText);
   }
 }
 xhr.send();

// Call API to add special characters.
/*
async function async_fetch() {
  let response = await fetch("https://h0h46kcpo6.execute-api.us-east-2.amazonaws.com/Prod?text=cat")
  if (response.ok) return await response.json()
  throw new Error(response.status)
}

async_fetch();
*/

// Set text back and edit the content.
//foundElement.value = "cat";
=======
console.log("Evaluate called."); //Anything in this file gets called when the button is clicked.
>>>>>>> 85fd31cb6fcdf8ba9d007132bd36cebbfe248af2
