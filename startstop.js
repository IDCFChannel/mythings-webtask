'use strict';

var crypto = require('crypto'),
    request = require('request'),
    querystring = require('querystring');

function buildSignature(query, secretKey) {
    var message = querystring.stringify(query)
        .split('&')
        .map(function(q){ return q.toLowerCase() })
        .sort()
        .join('&');
    return crypto.createHmac('sha1', secretKey)
        .update(message)
        .digest('base64');
};

module.exports = function(ctx, cb) {
    var query = {
        apiKey: ctx.data.apikey,
        response: 'json',
        command: ctx.data.command+'VirtualMachine',
        id: ctx.data.id
    }

    query['signature'] = buildSignature(query, ctx.data.secretkey);

    request.get({
        url: ctx.data.endpoint,
        qs: query,
        json: true
    }, function (error, response, body) {
        cb(null, body);
    });
};
