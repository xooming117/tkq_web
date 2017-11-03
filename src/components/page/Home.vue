<template>
    <div>
        <v-head></v-head>
        <div class="content">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vItem from './ShowItem.vue';
    export default {
        components:{
            vHead,
            vItem
        }
    }
</script>

<style scoped>
.content{
    background: none repeat scroll 0 0 #fff;
    position: absolute;
    left: 0px;
    right: 0;
    top: 70px;
    bottom:0;
    width: auto;
    padding:0px;
    box-sizing: border-box;
    overflow-y: scroll;
}
</style>
