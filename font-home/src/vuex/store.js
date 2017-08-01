import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import state from './state'


Vue.use(Vuex);
const vuex_store = new Vuex.Store({
    state,
    mutations
})
export default vuex_store;