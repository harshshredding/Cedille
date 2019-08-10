const cors = require("../cors-util");
const config = require("../cors-config.json");
var AWS = require("aws-sdk");

exports.handler = async function (event, context) {
  const origin = cors.getOriginFromEvent(event);
  var input_text = event.queryStringParameters.text;     

  // Detect Dominant Language
  var detectLanguageParams = {TextList: [input_text]};
  var detectLanguageRequest = new AWS.Comprehend().batchDetectDominantLanguage(detectLanguageParams);
  var detectLanguageResponse =  await detectLanguageRequest.promise();
  var input_language = detectLanguageResponse.ResultList[0].Languages[0].LanguageCode;	
	
	// Translate to English
  var en_text = await translate(input_text,input_language,'en').TranslatedText;

  // Translate back to original language
  var accented_text = await translate(en_text,'en',input_language).TranslatedText;
    
  return {
            headers: {"Access-Control-Allow-Origin": "*"},
            statusCode: 200,
            body: JSON.stringify({ text: accented_text })
        };
};

function translate(text,source,target) {
  var params = {
    SourceLanguageCode: source, /* required */
    TargetLanguageCode: target, /* required */
    Text: text
  };
	
  var request = new AWS.Translate().translateText(params);
  return request.promise();
}