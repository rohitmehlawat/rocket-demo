const interceptor = require('express-interceptor');

module.exports = interceptor(function(req, res){
    return {
      isInterceptable: function(){
        return true;
      },
      
      intercept: function(body, send) {
        res.set('Content-Type', 'application/json');
        res.json(JSON.stringify({json: body}));
      }
    };
  });