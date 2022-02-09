<template>
  <div id="app">
    <main-header></main-header>
   <div class="main-container">
      <router-view/>
   </div>
    <!-- <main-footer></main-footer> -->
  </div>
</template>
<script>
import mainHeader from './components/main-header.vue'
// import mainFooter from './components/main-footer.vue'
export default {
  components:{
    mainHeader,
    // mainFooter
  }
}
</script>
<style lang="scss">
.main-container{
  padding-top: 64px;
  height:calc(100% - 64px);
}
</style>
