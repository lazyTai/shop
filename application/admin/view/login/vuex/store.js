
import Vuex from 'vuex';
import _ from 'underscore'
let actionTypes = {}
actionTypes.set_user_name = "set_user_name";
actionTypes.set_user_password = "set_user_password";

const mutations = {
    [actionTypes.set_user_name](state, { name }) {
        state.user.name = name
    },
    [actionTypes.set_user_password](state, { password }) {
        state.user.password = password
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
        user: {
            password: "",
            name: ''
        }
    },
    mutations,
    actions
})