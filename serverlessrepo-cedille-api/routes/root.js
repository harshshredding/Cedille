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

// Detect Dominant Language
  var params0 = {
    TextList: [input_text]
  };
	
  var request0 = new AWS.Comprehend().batchDetectDominantLanguage(params0);
    
  // create the promise object
  var promise0 = request0.promise();
    
  // handle promise's fulfilled/rejected states
  var data0 =  await promise0;
    console.log(data0);
    var input_language = data0.ResultList[0].Languages[0].LanguageCode;	
	
  var params1 = {
    SourceLanguageCode: input_language, /* required */
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
    TargetLanguageCode: input_language, /* required */
    Text: en_text
  };
	
  var request2 = new AWS.Translate().translateText(params2);
    
    // create the promise object
  var promise2 = request2.promise();
    
    // handle promise's fulfilled/rejected states
  
  data =  await promise2;
    console.log(data);
    var multi_text = data.TranslatedText;
    
  return {
            headers: {"Access-Control-Allow-Origin": "*"},
            statusCode: 200,
            body: JSON.stringify({ text: multi_text })
        };
};
