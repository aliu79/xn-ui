<template>
  <el-dialog
    :visible.sync="dialogVisible"
    v-bind="$attrs"
    v-on="$listeners"
    :before-close="onBeforeClose"
    :width="$attrs.width ? $attrs.width : _width"
  >
    <slot />
    <span slot="footer" class="text-right">
      <slot name="footer">
        <el-button @click="onClose">取消</el-button>
        <el-button
          v-if="$attrs['show-confirm']"
          type="primary"
          @click="onConfirm"
          >{{ $attrs["confirm-text"] || "提交" }}</el-button
        >
      </slot>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "XnDialog",
  inheritAttrs: false,
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    beforeClose: {
      type: Function,
      default: () => {},
    },
  },
  created() {
    console.log(this);
  },
  computed: {
    _width() {
      const arr = [
        { label: "mini", value: "320px" },
        { label: "small", value: "560px" },
        { label: "medium", value: "720px" },
        { label: "large", value: "960px" },
      ];

      var width = "";
      arr.forEach((item) => {
        if (item.label === this.$attrs.size || this.size) {
          width = item.value;
        }
      });
      return width;
    },
    dialogVisible: {
      get() {
        return this.show;
      },
      set(val) {
        console.log('val: ', val);
        this.$emit("on-visible", val);
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    onClose() {
      this.$emit("update:show", false);
    },
    onBeforeClose(){
      if(this.beforeClose && typeof beforeClose === 'function'){
        return this.beforeClose()
      }else{
        return this.onClose()
      }
    },
    onConfirm() {
      this.$emit("on-confirm");
    },
  },
};
</script>

<style>
</style>