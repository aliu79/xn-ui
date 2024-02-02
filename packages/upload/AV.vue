<template>
  <el-dialog
    title="预览"
    :visible.sync="show"
    width="640px"
    :before-close="onClose"
    append-to-body
  >
    <div>
      <video style="width: 100%;" ref="video" controls>
        <source :src="url" type="video/mp4" />
      </video>
    </div>
    <div slot="footer">
      <el-button @click="onClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show(n) {
      if (!n) {
        this.$refs.video && this.$refs.video.pause();
      }
    },
  },
  methods: {
    onClose() {
      this.$emit("update:show", false);
    },
  },
};
</script>

<style scoped>

</style>