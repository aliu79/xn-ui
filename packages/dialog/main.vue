<template>
  <div>
    <el-dialog v-loading="loading" :visible.sync="dialogVisible" v-bind="$attrs" v-on="$listeners" :before-close="handleClose">
      <span></span>
      <span slot="footer">
        <el-button>Cancel</el-button>
        <el-button type="primary">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "XnDialog",
  inheritAttrs: false,
  props:{
    show: {
      type: Boolean,
      default: false
    },
  },
  computed:{
    dialogVisible: {
      get () {
        return this.show
      },
      set (val) {
        // 当visible改变的时候，触发父组件的 updateVisible方法，在该方法中更改传入子组件的 centerDialogVisible的值
        this.$emit('updateVisible', val)
      }
    }
  },
  data() {
    return {
      loading:true
    }
  },
  methods:{
    handleClose(){
      this.$emit('update:show',false)
    }
  }
};
</script>

<style>
</style>