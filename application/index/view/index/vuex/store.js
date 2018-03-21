
import Vuex from 'vuex';
import _ from 'underscore'
let actionTypes = {}
actionTypes.set_good = "set_good";

const mutations = {
    [actionTypes.set_good](state, { good }) {
        state.good = good
    },
}
var actions = {}
_.each(actionTypes, (value, key) => {
    actions[key] = ({ commit }, payload) => {
        commit(key, payload)
    }
})

export {  actionTypes};
export const store = new Vuex.Store({
    state: {
        good: {
            title: "",
            desc: '',
            a_sheng:'',
            a_shi:'',
            a_xain:'',
            a_address:"",
            price:"",
            image_url:"",
        }
    },
    mutations,
    actions
})