<template>
  <div class="xn-empty">
    <el-empty v-bind="$attrs" v-on="$listeners" :image-size="size" :description="desc" :image="image">
     <slot name="default"></slot>
     <slot name="image"></slot>
     <slot name="description"></slot>
    </el-empty>
  </div>
</template>

<script>
export default {
  name: "XnEmpty",
  props: {
    size: {
      type: Number,
      default: 80,
    },
    image: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "暂无数据",
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
