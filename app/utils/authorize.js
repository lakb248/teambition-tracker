/* @flow */
import cookie from 'js-cookie';
import http from 'axios';
import config from './config.js';
const TOKEN_NAME = 'teambition-tracker-token';

/**
 * [getToken description]
 * @return {[type]} [description]
 */
export function getToken(): string {
    /* global window */
    if (window.localStorage &&
        window.localStorage.getItem(TOKEN_NAME) != null) {
        return window.localStorage.getItem(TOKEN_NAME);
    }
    var token = cookie.get('token');
    if (token) {
        window.localStorage.setItem(TOKEN_NAME, cookie.get('token'));
        cookie.remove('token');
        return token;
    }
    return '';
}

/**
 * [checkToken description]
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
export function checkToken(token: string): Object {
    return http.get(config.checkUrl, {
        headers: {
            Authorization: 'OAuth2 ' + token
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
