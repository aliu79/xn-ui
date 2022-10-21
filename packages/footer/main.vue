<template>
  <el-footer class="xn-footer">
    <div class="xn-footer-main">
      <slot />
    </div>
  </el-footer>
</template>

<script>
export default {
  name: 'XnFooter'
}
</script>

<style lang="scss" scoped>
@import 'packages/style/src/theme/variables.scss';
.xn-footer{
  &-main{
    position: fixed;
    bottom: 0;
    right: 0;
    height: 60px;
    width: calc(100% - #{$sideBarWidth});
    background-color: #fff;
    line-height: 60px;
    padding: 0 15px;
  }
}
</style>
