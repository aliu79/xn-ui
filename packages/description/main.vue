<template>
  <div class="xn-desc" :class="{ 'xn-desc-border': border }">
    <div
      v-if="title || $slots.more"
      class="xn-desc-header flex justify-content-between align-items-center"
    >
      <h1 v-if="title" class="xn-desc-title" v-html="title" />
      <div class="xn-desc__more" v-if="$slots.more">
        <slot name="more"></slot>
      </div>
    </div>
    <slot name="title" />
    <el-row class="xn-desc__row" :style="bodyStyle">
      <slot />
    </el-row>
  </div>
</template>

<script>
export default {
  name: "XnDescription",
  provide() {
    return {
      labelWidth: this.labelWidth,
      column: this.column,
      span: this.span,
      size: this.size,
      middle: this.middle,
      colon:this.colon
    };
  },
  props: {
    // // 数据源，监听数据重绘
    // 标题
    title: {
      type: String,
      default: "",
    },
    colon:{
      type:Boolean,
      default:true
    },
    border: Boolean,
    // 边距
    // margin: {
    //   type: String,
    //   default: "0",
    // },
    // label宽度
    labelWidth: {
      type: String,
      default: "80px",
    },
    column: {
      // 每行显示的项目个数
      type: [Number, String],
      default: 3,
    },
    span: {
      // 每行显示的项目个数
      type: [Number, String],
      default: 3,
    },
    size: {
      // 大小
      type: String,
      default: "",
    },
    bodyStyle: {
      type: Object,
      default: () => {
        return {
          padding: "20px",
        };
      },
    },
    middle: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
   
  },
};
</script>

<style scoped lang="scss">


</style>
