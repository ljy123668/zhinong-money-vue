<template>
      <div class="nav-wrapper">
        <div class="content">
             <slot></slot>
        </div>
        <Nav />
    </div>
</template>

<script>
import Nav from './Nav.vue'
    export default {
        components:{
            Nav
        }
    }
</script>

<style lang="scss" scoped>
.nav-wrapper{
    border: 1px solid green ;
    display: flex;
    flex-direction: column;
    height: 100vh;
    .content{
        overflow: auto;
        flex-grow: 1;
    }
}
</style>