import Vue from 'vue';
import App from './app.vue';
import router from './router';
import { store } from './store/store';
import './static/styles/base-style.css';

new Vue({
	el: '#main',
	router,
	store,
	template: '<App/>',
	components: {
		App,
	},
});
