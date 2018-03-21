import Vue from 'vue'
import Vuex from 'vuex';
import _ from 'underscore'
let actionTypes = {}
actionTypes.set_good = "set_good";
actionTypes.set_search_option = "set_search_option";

const mutations = {
    [actionTypes.set_good](state, { good }) {
        state.good = good
    },
    [actionTypes.set_search_option](state, { search_option }) {
        state.search_option = search_option
        _.each(search_option,(item,key)=>{
            state.search_option[key]=item
        })
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
        }
    },
    mutations,
    actions
})
Vue.prototype.$dispatch = store.dispatch