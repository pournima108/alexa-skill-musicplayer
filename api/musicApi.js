var request = require("request");
 
module.exports = {
    'musicApi' : function(city, callback){
 
        //console.log("The Final Message Utterance to send POST as Query to Service Now");
        var options = { 
            method: 'GET',
            url: 'http://api.onemusicapi.com/20151208/release?title=Doolittle&artist=Pixies&inc=images&maxResultCount=1',
            headers : {
                'user_key=': 'c6e440cd282dd7ae47e8fdb4e8f91b4a',     
            },
            json:true,
        };
 
        request(options, function (error, response, body) {
          //if (error) throw new Error(error);
          callback(null, response);
        });
    }
}