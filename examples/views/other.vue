<template>
  <div>
    <el-scrollbar
      class="doc-container page-component__scroll"
      ref="componentScrollBar"
    >
      <div class="document">
        <router-view></router-view>
      </div>
      <el-backtop
        target=".page-component__scroll .el-scrollbar__wrap"
        :right="100"
        :bottom="150"
      ></el-backtop>
    </el-scrollbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>