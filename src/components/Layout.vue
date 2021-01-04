<template>
      <div class="nav-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
        <div class="content" :class="classPrefix && `${classPrefix}-content`   ">
             <slot></slot>
        </div>
        <Nav />
    </div>
</template>

<script>
import Nav from './Nav.vue'
    export default {
          props: ['classPrefix'],
        components:{
            Nav
        }
    }
</script>

<style lang="scss" scoped>
.nav-wrapper{
  
    display: flex;
    flex-direction: column;
    height: 100vh;
    .content{
        overflow: auto;
        flex-grow: 1;
    }
}
</style>