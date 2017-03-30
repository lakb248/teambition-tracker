import Vue from 'vue';
import Router from 'vue-router';
import {getToken, checkToken, refreshToken} from './utils/authorize';
import UserService from './services/user-service';
import EventEmitter from './utils/event';
import Fetch from './fetch/fetch';
import Logger from './utils/logger';
import 'rxjs/add/operator/first';

import Index from './views/index.vue';

require('./styles/index.scss');

Vue.use(Router);
let logger = new Logger('[index]');

EventEmitter.on('loading-show', () => {
    /* global document */
    let loading = document.querySelector('.loading');
    if (loading != null) {
        loading.style.display = 'block';
    }
});
EventEmitter.on('loading-hide', () => {
    /* global document */
    let loading = document.querySelector('.loading');
    if (loading != null) {
        loading.style.display = 'none';
    }
});

const Activity = resolve => {
    require.ensure(['./views/activity.vue'], () => {
        resolve(require('./views/activity.vue'));
    });
};

const Statistic = resolve => {
    require.ensure(['./views/statistic.vue'], () => {
        resolve(require('./views/statistic.vue'));
    });
};

let router = new Router({
    routes: [{
        path: '/',
        component: Index
    }, {
        path: '/activity',
        component: Activity
    }, {
        path: '/statistic',
        component: Statistic
    }]
});

let App = new Vue({
    router: router,
    data() {
        return {
            me: {}
        };
    }
});
// check token, then init vue application
let token = getToken();
if (token === '') {
    refreshToken();
} else {
    checkToken(token)
        .then(success => {
            if (success) {
                Fetch.setToken(token);
                UserService.me()
                    .map(res => {
                        App.me = res;
                        App._userId = res._id;
                        return null;
                    }).first().subscribe(() => {
                        logger.log('app mounted');
                        App.$mount('.wrap');
                        EventEmitter.emit('loading-hide');
                    });
            } else {
                refreshToken();
            }
        });
}
