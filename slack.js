'use strict';

var request = require('request');

module.exports = function(ctx, cb) {
    request.post({
        url: 'http://' + ctx.data.host + '/data/' + ctx.data.uuid,
        headers: {
            'meshblu_auth_uuid': ctx.data.uuid,
            'meshblu_auth_token': ctx.data.token
        },
        form: {
            'time': new Date().toISOString()
        }
    }, function(err, response, body){
        cb(null, response);
    });
};
