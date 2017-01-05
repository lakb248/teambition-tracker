/* @flow */
import cookie from 'js-cookie';
import http from 'axios';
import config from './config.js';
const TOKEN_NAME = 'teambition-tracker-token';

/**
 * get token
 * @return {string} the token
 */
export function getToken(): string {
    /* global window */
    var token = cookie.get('token');
    if (token) {
        window.localStorage.setItem(TOKEN_NAME, cookie.get('token'));
        cookie.remove('token');
        return token;
    }
    if (window.localStorage &&
        window.localStorage.getItem(TOKEN_NAME) != null) {
        return window.localStorage.getItem(TOKEN_NAME);
    }
    return '';
}

/**
 * check whether token is valid
 * @param  {string} token the token
 * @return {boolean} whether the token is valid
 */
export function checkToken(token: string): Object {
    return http.get(config.checkUrl, {
        headers: {
            Authorization: token
        }
    }).then((res: Object): boolean => {
        if (res.status === 200) {
            return true;
        }
        return false;
    }).catch((error: Object): boolean => {
        return false;
    });
}

/**
 * [refreshToken description]
 */
export function refreshToken() {
    window.location.href = config.authorizeUrl +
        '&state=' + window.location.href;
}
