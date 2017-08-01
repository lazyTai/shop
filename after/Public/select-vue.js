Vue.component('select-vue', {
    template: `
    <div>
        <div >{{value}}</div>
        <select v-model="value" @change="change1">
            <option :value="item[paramsField]" v-for=" item in lists">{{item[''+paramsField]}}</option>
        </select>
    </div>
    
    `,
    props: ['params-url', 'params-query', 'params-field', 'value'],
    data: function () {
        return {
            lists: []
        }

    },
    mounted: function () {
        var me = this;
        $.get(me.paramsUrl, me.paramsQuery).done(function (res) {
            me.lists = JSON.parse(res)
        })
    },
    methods: {
        change1: function (e) {
            this.$emit('input', e.target.value);
        }
    }
})