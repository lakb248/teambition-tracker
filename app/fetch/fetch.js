import axios from 'axios';

let request = null;

export default {
    init(token, url) {
        request = axios.create({
            baseURL: url,
            headers: {
                Authorization: 'OAuth2 ' + token
            }
        });
    },
    request: request
};
