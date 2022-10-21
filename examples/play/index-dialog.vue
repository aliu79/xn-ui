<template>
  <div>
    <el-button type="primary" size="default" @click="show = true">open</el-button>
    
    <xn-dialog title="asd" :before-close="before" :show.sync="show"></xn-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            show:false,
            loading:true
        }
    },
    methods:{
      before(){
        this.show = false
      }
    }
}
</script>

<style>

</style>