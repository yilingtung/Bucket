import Vue from 'vue';
import Router from 'vue-router';
import Home from '../screens/Home.vue';
import About from '../screens/About.vue';
import Work from '../screens/Work.vue';
import Contact from '../screens/Contact.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
		},
		{
			path: '/about',
			name: 'About',
			component: About,
		},
		{
			path: '/work',
			name: 'Work',
			component: Work,
		},
		{
			path: '/contact',
			name: 'Contact',
			component: Contact,
		},
	],
	mode: 'history',
	linkActiveClass: 'active',
});
