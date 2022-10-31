<template>
  <el-link type="primary" icon="el-icon-download" @click="onDownload">{{
    name
  }}</el-link>
</template>

<script>
export default {
  name: "XnDownload",
  props: {
    url: {
      type: String,
      //   default: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/2022/10/28/a8b0cdfb63ce4a60981f4f5693f136a2.pdf",
      default:
        "https://xianniu-file.oss-cn-beijing.aliyuncs.com/2022/10/19/b2fc8900eac145a48d6f0b93ef1665fa.jpg",
    },
    name: {
      type: String,
      default: "下载文件1",
    },
  },
  created() {
  },
  methods: {
    onDownload() {
      return new Promise((res, rej) => {
        try {
          const config = {
            url: this.url,
            name: this.name,
          };
          this.$utils.download(config);
          res();
        } catch (error) {
          rej();
        }
      });
    },
  },
};
</script>

<style>
</style>