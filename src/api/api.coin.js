var axios = require('axios');

var config = {
    method: 'get',
    url: 'http://localhost:3000/get',
    headers: {
        'Content-Type': 'application/json'
    }
};

module.exports = {
    get: async function(text) {
        return await new Promise((resolve, _) => {
            axios(config)
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                    _(false);
                });
        })
    }
};