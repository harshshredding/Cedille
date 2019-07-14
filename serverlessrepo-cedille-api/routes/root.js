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
exports.handler = (event, context) => {

    const origin = cors.getOriginFromEvent(event);
    
    var request = new AWS.Comprehend().detectDominantLanguage({Text: 'Je suis allemand.'});
    
    // create the promise object
    var promise = request.promise();
    
    // handle promise's fulfilled/rejected states
    promise.then(
      function(data) {
        console.log(data);
        return {
            headers: cors.createOriginHeader(origin, config.allowedOrigins),
            statusCode: 200,
            body: JSON.stringify({ text: event.queryStringParameters.text })
        };
      },
      function(error) {
        /* handle the error */
        console.log(error)
      }
    );
};
