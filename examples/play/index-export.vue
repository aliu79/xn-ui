<template>
  <div>
    <el-button type="primary" size="default" @click="show = true">导出</el-button>
    
    <xn-export :show.sync="show">
        <el-form-item label="label">
            <el-input v-model="value"></el-input>
        </el-form-item>
    </xn-export>
  </div>
</template>

<script>
export default {
    data() {
        return {
            show:false,
            value:''
        }
    },
}
</script>

<style>

</style>