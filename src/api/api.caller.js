var axios = require('axios');

var config = {
    method: 'post',
    url: 'https://api.line.me/v2/bot/message/multicast',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 7ClNtvyGpGGucma0ab6eQ7xSsXunop/6l5TsuBFFpNdnxLIEZW2YrRK7RSWD+Q1AD0P32JQg9kdDCTO9IIvfdmog0i+fhbBpCS+FME5dbLZ8WxZ5oGlyB+DHapjgJgRLJxDFjCNjoqny5x5EoC+bAwdB04t89/1O/w1cDnyilFU='
    }
};

module.exports = {
    dispatch: async function(text) {
        return await new Promise((resolve, _) => {
            config.data = JSON.stringify({
                "to": [
                    "U9059e15d990f38162381a73b6286f056"
                ],
                "messages": [{
                    "type": "text",
                    "text": text
                }]
            });

            axios(config)
                .then(function(response) {
                    resolve(JSON.stringify(response.data));
                })
                .catch(function(error) {
                    console.log(error);
                    _(false);
                });
        })
    }
};