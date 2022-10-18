<template>
    <xn-dialog
      title="批量导入"
      v-bind="$attrs"
      v-on="$listeners"
      :show-confirm="true"
      :show.sync="show"
      @on-confirm="handleConfirm"
      size="small"
    >
      <div class="xn-import">
        <el-link
          class="mb-20"
          type="success"
          icon="el-icon-download"
          :underline="false"
          @click="handleDownload"
          >下载模板</el-link
        >
        <el-upload
          ref="import"
          action="###"
          class="xn-import-upload"
          v-bind="$attrs"
          drag
          :file-list="fileList"
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
        <div slot="desc" class="xn-import-desc mt-10 fz-12">
          <el-alert title="注：" type="warning">
            <div>
              <p>
                1、非系统模板的文件会导入失败，请务必使用系统模板，点击上方按钮进行下载
              </p>
              <p>2、导入期间请勿进行其他操作</p>
              <p>3、导入为替换操作，请谨慎操作</p>
            </div>
          </el-alert>
        </div>
      </div>
    </xn-dialog>
</template>
<script>
export default {
  name: "XnImport",
  inheritAttrs: false,
  props: {
    show: {
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
    templateConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  created() {
    console.log(this);
  },
  methods: {
    onClose() {
      this.$emit("update:show", false);
    },
    handleUploadBefore() {},
    onChange(file, files) {
      this.fileList = files;
      this.$emit("on-change", files);
    },
    async onSubmitUpload(file) {
      try {
        const _file = file.file;
        this.$emit("on-import", _file);
      } catch (error) {
        file.onError();
      }
    },
    onExceed() {
      this.$message.warning("单次最多上传一个文件");
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
      if (!this.fileList.length) {
        return this.$message.warning("请选择要上传的文件");
      }
      this.submit();
    },
  },
};
</script>
