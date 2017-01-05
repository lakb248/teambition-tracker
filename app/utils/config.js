/* @flow */
const CLIENT_ID = '003ff010-d183-11e6-be83-6d86293ee31f';
const API_URL = 'https://api.teambition.com/api';
const OAUTH_URL = 'https://account.teambition.com/oauth2';
const AUTHORIZE_URL = OAUTH_URL + '/authorize';
const CHECK_URL = API_URL + '/applications/' + CLIENT_ID + '/tokens/check';
const AUTHORIZATION_HEADER_NAME = 'Authorization';
const REDIRECT_URL = 'http://localhost:8088/authorize';

export default {
    clientId: CLIENT_ID,
    apiUrl: API_URL,
    oauthUrl: OAUTH_URL,
    authorizeUrl: AUTHORIZE_URL + '?client_id=' + CLIENT_ID +
    '&redirect_uri=' + REDIRECT_URL,
    checkUrl: CHECK_URL,
    authorizationHeaderName: AUTHORIZATION_HEADER_NAME,
    redirectUrl: REDIRECT_URL
};
