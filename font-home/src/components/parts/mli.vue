<template>
    <li class="item-content">
        <div class="item-media">
            <i class='icon icon-7'></i></div>
        <div class="item-inner">
            <div class="item-title">
                {{title}}
            </div>
            <div class="item-after">
                {{content}}
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'mli',
        props: [
            'title', 'content'
        ],
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>
