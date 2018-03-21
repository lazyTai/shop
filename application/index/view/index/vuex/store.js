import Vue from 'vue'
import Vuex from 'vuex';
import _ from 'underscore'
let actionTypes = {}
actionTypes.set_good = "set_good";
actionTypes.set_search_option = "set_search_option";
actionTypes.set_index_lists = "set_index_lists";

const mutations = {
    [actionTypes.set_good](state, { good }) {
        state.good = good
    },
    [actionTypes.set_search_option](state, { search_option }) {
        _.each(search_option, (item, key) => {
            state.search_option[key] = item
        })
    },
    [actionTypes.set_index_lists](state, { index_lists }) {
        state.index_lists = index_lists
    },
}
var actions = {}
_.each(actionTypes, (value, key) => {
    actions[key] = ({ commit }, payload) => {
        commit(key, payload)
    }
})

export { actionTypes };
export const store = new Vuex.Store({
    state: {
        index_lists: [],
        good: {
            title: "",
            desc: '',
            a_sheng: '',
            a_shi: '',
            a_xain: '',
            a_address: "",
            price: "",
            image_url: "",
        },
        search_option: {
            max_price: 0,
            min_price: 0,
            title: "",
            address_sheng: "",
            address_shi: "",
            address_xian: "",
            time: "",
            s_s_x: "",
        }
    },
    mutations,
    actions
})
Vue.prototype.$dispatch = store.dispatch
Vue.prototype.$state = store.state
Vue.prototype.$actionTypes = actionTypes