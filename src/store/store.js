import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';
import getters from './getters.js';
import actions from './actions.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
	},
	mutations,
	getters,
	actions,
});
