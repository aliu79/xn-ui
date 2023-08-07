<template>
  <el-col :span="computedSpan" class="xn-desc-item">
    <div class="xn-desc-item__content" :class="size">
      <label
        class="xn-desc-item__label"
        :class="{ 'has-colon': colon }"
        :style="{ width: labelWidth, ...middleStyl }"
        v-html="label"
      />
      <div class="xn-desc-item__value" :style="middleStyl">
        <slot></slot>
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  name: "XnDescriptionItem",
  inject: ["labelWidth", "column", "size", "middle",'colon'],
  props: {
    span: {
      type: [Number, String],
      required: false,
      default: 0,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      // 子组件自己的span
      selfSpan: 0,
    };
  },
  computed: {
    middleStyl() {
      return this.middle
        ? {
            "align-items": "center",
          }
        : {};
    },
    isTrue() {
      return JSON.stringify(this.$slots) === "{}";
    },
    computedSpan() {
      // 子组件自己的span，用于父组件计算修改span
      if (this.selfSpan) {
        return (24 / this.column) * this.selfSpan;
      } else if (this.span) {
        // props传递的span
        return (24 / this.column) * this.span;
      } else {
        // 未传递span时，取column
        return 24 / this.column;
      }
    },
  },
};
</script>

