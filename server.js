var express = require('express');
var app = express();
var request = require('request');

const CLIENT_ID = '003ff010-d183-11e6-be83-6d86293ee31f';
const CLIENT_SECRET = 'cdab3851-a9be-4a54-bd39-3a0bdd75d5c7';
const OAUTH_URL = 'https://account.teambition.com/oauth2';
const AUTHORIZE_URL = OAUTH_URL + '/authorize';
const ACCESS_TOKEN_URL = OAUTH_URL + '/access_token';
const CHECK_URL = 'https://api.teambition.com/api/applications/' + CLIENT_ID + '/tokens/check';
const AUTHORIZATION_HEADER_NAME = 'Authorization';
const REDIRECT_URL = 'http://localhost:8080/authorize';

if (process.env.NODE_ENV === 'dev') {
    require('./webpack.server.config')(app)
} else {
    app.use(express.static(path.join(__dirname, 'build')))
}

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/authorize', function (req, res) {
    var code = req.query.code;
    var redirectUrl = req.query.state;
    var options = {
        url: ACCESS_TOKEN_URL,
        method: 'POST',
        form: {
            'code': code,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET
        }
    };
    request(options, function (error, response, body) {
        res.cookie('token', JSON.parse(body)['access_token']);
        if (redirectUrl) {
            res.redirect(redirectUrl);
        } else {
            res.redirect('/');
        }
    });
});

app.listen(8080);
