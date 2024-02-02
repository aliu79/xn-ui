<template>
  <xn-dialog
    :title="title"
    v-bind="$attrs"
    v-on="$listeners"
    :show.sync="show"
    :before-close="onClose"
    @on-confirm="handleConfirm"
    size="small"
  >
    <div class="xn-import">
      <slot name="form"></slot>
      <el-link
        class="mb-20"
        type="success"
        icon="el-icon-download"
        :underline="false"
        v-if="templateConfig.url"
        @click="handleDownload"
        >下载模板</el-link
      >
      <el-upload
        ref="import"
        action="###"
        class="xn-import-upload"
        v-bind="$attrs"
        drag
        :limit="limit"
        :file-list="fileList"
        :auto-upload="autoUpload"
        :http-request="onSubmitUpload"
        :before-upload="handleUploadBefore"
        :on-exceed="onExceed"
        :on-change="onChange"
        :on-remove="onRemove"
        :accept="accept"
        v-on="$listeners"
      >
        <template slot="trigger">
          <div class="xn-import-trigger">
            <i class="xn-import-trigger__icon el-icon-upload" />
            <span class="xn-import-trigger__text">
              <span>将文件拖到此处，或</span>
              <em>点击上传</em>
            </span>
          </div>
        </template>
        <div v-if="tip" slot="tip" class="el-upload__tip">{{ tip }}</div>
      </el-upload>
      <slot name="desc" v-if="showDesc" class="xn-import-desc fz-12">
        <el-alert title="注：" class="mt-10" type="warning">
          <div>
            <p>
              1、非系统模板的文件会导入失败，请务必使用系统模板，点击上方按钮进行下载
            </p>
            <p>2、导入期间请勿进行其他操作</p>
            <p>3、导入为替换操作，请谨慎操作</p>
          </div>
        </el-alert>
      </slot>
    </div>
  </xn-dialog>
</template>
<script>
import Client from "@/oss";
export default {
  name: "XnImport",
  inheritAttrs: false,
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    isDragUpload: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "批量导入",
    },
    limit: {
      type: Number,
      default: 1,
    },
    autoUpload: {
      type: Boolean,
      default: false,
    },
    tip: {
      type: String,
      default: "仅支持上传excel文件",
    },
    accept: {
      type: String,
      default: ".xls,.xlsx",
    },
    showDesc: {
      type: Boolean,
      default: true,
    },
    templateConfig: {
      type: Object,
      default: () => ({ url: "", name: "" }),
    },
    beforeConfirm: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      fileList: [],
      oss: null,
      client: null,
      successFiles: [],
      count: 0,
    };
  },
  created() {
    if (this.isDragUpload) {
      this.client = new Client({
        stsUrl: this.$XN.stsUrl || "",
        setFileIdUrl: this.$XN.setFileIdUrl || "",
      });
    }
  },
  methods: {
    onClose() {
      if (this.isDragUpload) {
        this.abort();
        this.fileList = [];
        this.successFiles = [];
        this.count = 0;
      }
      this.$emit("update:show", false);
    },
    handleUploadBefore(file) {
      if (this.isDragUpload) {
        return Promise.all([this.getStsToken(file)])
          .then(() => {
            return Promise.resolve();
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      } else {
        return Promise.resolve();
      }
    },
    onChange(file, files) {
      this.fileList = files;
      this.$emit("on-change", files);
    },
    async getStsToken() {
      return new Promise((resolve, reject) => {
        this.client
          .getStsToken()
          .then((res) => {
            this.oss = res;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async onSubmitUpload(file) {
      try {
        const _file = file.file;
        this.$emit("on-import", _file, this.fileList);
        if (this.isDragUpload) {
          this.oss
            .upload(file)
            .then((res) => {
              this.successFiles.push(res);
              this.$emit("on-success", res);
            })
            .catch(() => {});
        }
      } catch (error) {
        file.onError();
      }
    },
    onExceed() {
      this.$message.warning(`超出单次最大上传数量限`);
    },

    submit() {
      this.$refs.import.submit();
    },
    abort() {
      this.$refs.import.abort();
    },
    clearFiles() {
      this.$refs.import.clearFiles();
    },
    onRemove(file, files) {
      this.fileList = files;
    },

    handleDownload() {
      this.$utils.download(this.templateConfig);
    },
    handleConfirm() {
      if (
        this.beforeConfirm &&
        typeof this.beforeConfirm === "function" &&
        this.isPromise(this.beforeConfirm())
      ) {
        this.beforeConfirm().then(() => {
          if (!this.fileList.length) {
            return this.$message.warning("请选择要上传的文件");
          }
          if (this.autoUpload) {
            this.submit();
          }
        });
      } else {
        if (!this.fileList.length) {
          return this.$message.warning("请选择要上传的文件");
        }
        if (this.autoUpload) {
          this.submit();
        }
        this.$emit("on-confirm", this.successFiles);
      }
    },
    isPromise(obj) {
      return obj && Object.prototype.toString.call(obj) === "[object Promise]";
    },
  },
};
</script>
