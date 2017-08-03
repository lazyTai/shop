import Vue from 'vue';

var addtocart = "Home/cart/add"
var selectcart = "Home/cart/selectcart"
export default {
    push_to_cart(state, payload) {
        // post1('addtocart',payload)
        Vue.set(payload, "amount", 1);
        if (state.cart.length <= 0) {
            state.cart = json_parse(getCookie('cart'));
            if (!getCookie('cart')) {
                state.cart = [];
            }
        }
        // payload.num=1;
        var isIn = false;
        _.each(state.cart, function (item) {
            if (item.id == payload.id) {
                isIn = true;
                item.num++;
            }
        })
        if (!isIn) {
            state.cart.push(payload)
        }
        setCookie('cart', json_string(state.cart))
    },
    addnum: function (state, payload) {
        payload.amount++;
        setCookie('cart', json_string(state.cart))
    },
    downnum: function (state, payload) {
        if (payload.amount > 1) {
            payload.amount--;
        }
        setCookie('cart', json_string(state.cart))
    },
    removecart: function (state, payload) {
        state.cart = _.filter(state.cart, function (item) {
            return item.id != payload.id
        })
        setCookie('cart', json_string(state.cart))
        if (state.cart.length <= 0) {
            clearCookie('cart')
        }
    },
    setUserinfor: function (state, playloads) {
        state.userinfor = playloads;
        setCookie('userinfor', json_string(state.userinfor))
    }
}