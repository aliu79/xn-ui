<template>
  <div class="xn-upload">
    <el-upload
      :action="action"
      :data="data"
      v-bind="$attrs"
      v-on="$listeners"
      :file-list.sync="fileList"
      :before-upload="handleBeforeUpload"
      :on-progress="handlePreview"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :on-remove="handleRemove"
    >
      <!--  -->
    </el-upload>
  </div>
</template>

<script>
import * as imageConversion from "image-conversion";
export default {
  name: "XnUpload",
  props: {
    action: {
      type: String,
      required: true,
    },
    buttonType: {
      type: String,
      default: "primary",
    },
    data: null,
    fileSize: null, // 文件大小限制，单位为K
    name: null,
    files: Array,
    onSuccess: Function,
    onProgress: Function,
    beforeUpload: Function,
  },
  data() {
    return {
      loading: false,
      fileList: [],
    };
  },
  mounted() {
    if (this.files.length) {
      this.fileList = this.files.map((item) => {
        return {
          url: item.url,
          name: item.name || item.url,
        };
      });
    }
  },
  methods: {
    async handleBeforeUpload(file) {
      console.log(file.name);
      if (this.$utils.isImg(file.name)) {
        if (this.compress > 0) {
          return await this.handleCompress(file);
        }
      }
      // const fileName = file.name;
      // const ext = fileName
      //   .substring(fileName.lastIndexOf(".") + 1)
      //   .toLowerCase();
      // if (this.fileType) {
      //   // 限制文件格式
      //   if (this.fileType.indexOf(ext) < 0) {
      //     this.$message.error("文件类型不合法，请上传" + this.fileType);
      //     return false;
      //   }
      // }
      // if (this.fileSize) {
      //   // 限制文件大小，单位为k
      //   if (file.size / 1024 > this.fileSize) {
      //     this.$message.error("文件大小限制为" + this.fileSize + "k");
      //     return false;
      //   }
      // }
      // this.loading = true; // 开启上传中状态
      if (this.beforeUpload) {
        const arg = [].slice.call(arguments);

        console.log("arg", arg);
        this.beforeUpload.apply(this, arg);
      }
    },
    handleCompress(file) {
      return new Promise((resolve) => {
        imageConversion["compressAccurately"](file, this.compress).then(
          (result) => {
            resolve(result);
          }
        );
      });
    },
    handlePreview() {
      this.$emit("on-progress");
    },
    handleUploadSuccess(val) {
      // this.loading = false; // 关闭上传中状态
      if (this.onSuccess) {
        const arg = [].slice.call(arguments);
        return this.onSuccess.apply(this, arg);
      }
      this.fileList.push(val.data);

      const urls = this.files.map((item) => item.url);
      this.fileList.forEach((item) => {
        if (!urls.includes(item.url)) {
          this.files.push(item);
        }
      });
      console.log("this.files", this.files);
    },
    handleUploadError(err) {
      // this.loading = false; // 关闭上传中状态
      console.log("err", err);
    },
    handleRemove(file) {
      this.fileList.forEach((item, idx, arr) => {
        if (file.url === item.url) {
          arr.splice(idx, 1);
          
      console.log(this.files);
        }
      });
      this.$emit("update:files", this.fileList);
      console.log(this.fileList);
    },
  },
};
</script>
<style>
</style>