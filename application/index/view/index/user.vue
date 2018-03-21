<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="用户信息修改">
            <router-link to="/app" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <InforShow />
    </yd-layout>
</template>
<script>
import InforShow from "./user/infor_show";
export default {
  components: { InforShow }
};
</script>