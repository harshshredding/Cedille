const cors = require("../cors-util");
const config = require("../cors-config.json");
var AWS = require("aws-sdk");

/**
 * Demonstrates a simple endpoint that accepts GET requests.
 * 
 * In most cases, browsers do not perform CORS preflight requests when using
 * the GET method, so we do not have to handle OPTIONS requests.
 * Any desired additional CORS headers should be included in the GET response.
 */
exports.handler = async function (event, context) {
  const origin = cors.getOriginFromEvent(event);
  var input_text = event.queryStringParameters.text;     

  var params1 = {
    SourceLanguageCode: 'fr', /* required */
    TargetLanguageCode: 'en', /* required */
    Text: input_text
  };
	
  var request1 = new AWS.Translate().translateText(params1);
    
  // create the promise object
  var promise1 = request1.promise();
    
  // handle promise's fulfilled/rejected states
  var data =  await promise1;
    console.log(data);
    var en_text = data.TranslatedText;

  var params2 = {
    SourceLanguageCode: 'en', /* required */
    TargetLanguageCode: 'fr', /* required */
    Text: en_text
  };
	
  var request2 = new AWS.Translate().translateText(params2);
    
    // create the promise object
  var promise2 = request2.promise();
    
    // handle promise's fulfilled/rejected states
  
  data =  await promise2;
    console.log(data);
    var fr_text = data.TranslatedText;
    
  return {
            headers: cors.createOriginHeader(origin, config.allowedOrigins),
            statusCode: 200,
            body: JSON.stringify({ text: fr_text })
        };
};