/* @flow */
import Vue from 'vue';
import Router from 'vue-router';
import VueAxios from './utils/vue-axios';
import {getToken, checkToken, refreshToken} from './utils/authorize';
import config from './utils/config';
import User from './services/user';

import Index from './views/index.vue';

require('./styles/index.scss');

Vue.use(Router);

let router = new Router({
    routes: [{
        path: '/',
        component: Index
    }]
});

let App = new Vue({
    router: router,
    data(): Object {
        return {
            me: {}
        };
    },
    mounted() {
        /* global document */
        let loading = document.querySelector('.loading');
        if (loading != null) {
            loading.style.display = 'none';
        }
    }
});
// check token, then init vue application
let token = getToken();
if (token === '') {
    refreshToken();
} else {
    checkToken(token)
        .then((success: boolean) => {
            if (success) {
                // init axios object, then attach to vue instance
                Vue.use(VueAxios, {
                    apiUrl: config.apiUrl,
                    token: token
                });
                App.$mount('.wrap');
                let user = new User(App.request);
                user.me()
                    .then((res: Object) => {
                        App.me = res;
                    });
            } else {
                refreshToken();
            }
        });
}
