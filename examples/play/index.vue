<template>
<div>
    <el-button type="primary" size="default" @click="show = true">open</el-button>
    
  <xn-import :show.sync="show"></xn-import>
</div>
</template>

<script>
export default {
data() {
    return {
        show:false
    }
},
}
</script>

<style>

</style>