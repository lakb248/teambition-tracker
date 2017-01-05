/* @flow */
import Vue from 'vue';
import Router from 'vue-router';
import http from 'axios';
import {getToken, checkToken} from './utils/authorize.js';
import config from './utils/config.js';
import Project from './models/project.js';

require('./styles/index.scss');

Vue.use(Router);

let router = new Router({});

let App = new Vue({
    router: router,
    data(): Object {
        return {};
    },
    mounted() {
        var token = getToken();
        console.log(token);
        if (token === '') {
            // TODO: refresh token
        } else {
            checkToken(token)
                .then((success: boolean) => {
                    if (success) {
                        let request = http.create({
                            baseURL: config.apiUrl,
                            headers: {
                                Authorization: 'OAuth2 ' + token
                            }
                        });
                        let project = new Project(request);
                        project.getProjects()
                            .then((res: Object) => {
                                console.log(res);
                            });
                    } else {
                        // TODO: refresh token
                    }
                });
        }
    }
});

App.$mount('.content');
