import axios from 'axios';

export default {
    install(Vue, options) {
        let request = axios.create({
            baseURL: options.apiUrl,
            headers: {
                Authorization: 'OAuth2 ' + options.token
            }
        });
        Vue.prototype.request = request;
        Vue.prototype.axios = axios;
    }
};
