<template>
  <div>
    <el-button type="primary" size="default" @click="show = true"
      >open</el-button
    >
    <xn-export :show.sync="show"></xn-export>
    <!-- <xn-import :show.sync="show" :before-close="()=>show = false"></xn-import> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style>
</style>