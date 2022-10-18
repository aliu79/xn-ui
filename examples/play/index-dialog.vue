<template>
  <div>
    <el-button type="primary" size="default" @click="show = true">open</el-button>
    
    <xn-dialog :show.sync="show"></xn-dialog>
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
}
</script>

<style>

</style>