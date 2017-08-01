<template>
    <div class="index1">
        <div>
            <el-button @click="show = !show">Click Me</el-button>

            <div style="display: flex; margin-top: 20px; height: 100px;">
                <transition name="el-fade-in-linear">
                    <div v-show="show" class="transition-box">.el-fade-in-linear</div>
                </transition>
                <transition name="el-fade-in">
                    <div v-show="show" class="transition-box">.el-fade-in</div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                show: true
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
