<template>
  <el-upload
    ref="upload"
    :class="{
      'is-disabled': $attrs.disabled != undefined,
      'is-hidden': preview,
    }"
    class="xn-upload xn-upload-main"
    action="###"
    :limit="limit"
    :list-type="listType"
    v-bind="$attrs"
    :file-list.sync="fileList"
    :http-request="onHttpUpload"
    :on-error="onError"
    :before-upload="onBeforeUpload"
    :style="styles"
    :on-exceed="onExceed"
    :on-change="onChange"
  >
    <template v-if="listType === 'picture-card'">
      <div slot="trigger" class="upload-limit">
        <i class="el-icon el-icon-plus" />
      </div>
    </template>
    <template v-else>
      <slot>
        <el-button icon="el-icon-upload" :disabled="$attrs.disabled"
          >上传</el-button
        >
      </slot>
    </template>
    <div
      slot="file"
      slot-scope="{ file }"
      class="xn-upload--slot"
      v-if="listType === 'picture-card'"
    >
      <uploadPop :file="file" @on-download="handleDownload(file)"></uploadPop>
      <template v-if="$utils.isImg(file)">
        <el-image
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          fit="cover"
          :lazy="true"
        />
      </template>
      <template v-else>
        <div class="xn-upload-list__item-file">
          <div class="annex">
            <i class="el-icon el-icon-folder" />
            <span class="label">附件</span>
          </div>
          <div class="file-name">{{ file.name }}</div>
        </div>
      </template>
      <div v-if="file.status === 'uploading'" class="process">
        <el-progress
          :status="file.percentage === 100 && !isUploading ? 'success' : null"
          type="circle"
          :percentage="process(file.percentage)"
          :stroke-width="6"
        />
      </div>
      <span class="el-upload-list__item-actions">
        <span
          v-if="$utils.isImg(file)"
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="fz-16 el-icon-zoom-in" />
        </span>
        <span
          class="el-upload-list__item-delete icon ml-5"
          @click="handleDownload(file, fileList)"
        >
          <i class="fz-16 el-icon-download" />
        </span>
        <span
          v-if="!$attrs.disabled && !preview"
          class="el-upload-list__item-delete icon ml-5"
          @click="handleRemove(file, fileList)"
        >
          <i class="fz-16 el-icon-delete" />
        </span>
      </span>
    </div>
    <div v-if="tip !== ''" slot="tip" class="el-upload__tip">{{ tip }}</div>
    <el-image-viewer
      v-if="isShowImageView"
      :on-close="closeViewer"
      :z-index="999999"
      :url-list="[imageView]"
    />
  </el-upload>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import Client from "@/oss";
import uploadPop from "./upload-pop.vue";
// const MAX_WARNING = 1024 * 10 * 1024;
export default {
  name: "XnUpload",
  inheritAttrs: false,
  components: {
    uploadPop,
    ElImageViewer,
  },
  props: {
    listType: {
      type: String,
      default: "picture-card",
    },
    preview: {
      type: Boolean,
      default: false,
    },
    fileList: {
      type: Array,
      default: () => [],
    },

    limit: {
      type: Number,
      default: 9,
    },
    tip: {
      type: String,
      default: "",
    },
    accept: {
      type: [Array, String],
      default: () => "*",
    },
    maxSize: {
      type: Number,
      default: 1024 * 200 * 1024, // 最大限制 200M
    },
    styles: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isShowImageView: false,
      imageView: "",
      isHidden: false,
      viewList: [],
      files: [],
      successFiles: [],
      isUploading: false,
      file: {},
      oss: null,
      client: null,
    };
  },
  computed: {
    process() {
      return (num) => {
        return Math.floor(num);
      };
    },
    fileSize() {
      return this.$format.bytesToSize(this.file.size);
    },
  },
  watch: {
    fileList: {
      handler(n) {
        this.successFiles = n;
        this.isHidden = this.limit === n.length;
      },
      immediate: true,
    },
  },
  created() {
    this.client = new Client({
      stsUrl: this.$XN.stsUrl || "",
      setFileIdUrl: this.$XN.setFileIdUrl || "",
    });
  },
  beforeDestroy() {
    this.$emit("update:fileList", []);
  },
  methods: {
    async onBeforeUpload(file) {
      this.file = file;
      return Promise.all([
        this.checkFileExt(file),
        this.onExceedSize(file.size),
        this.getStsToken(),
      ])
        .then(() => {
          return Promise.resolve();
        })
        .catch((err) => {
          return Promise.reject(err);
        });
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
    checkFileExt(file) {
      return new Promise((resolve, reject) => {
        let fileExt = file.name.substring(file.name.lastIndexOf(".") + 1);
        // 判断上传格式
        fileExt = `${fileExt}`.toLowerCase();
        if (!this.accept.includes(fileExt) && this.accept !== "*") {
          this.$message.warning(`请上传指定格式【${this.accept}】`);
          reject();
        }
        resolve();
      });
    },
    onExceedSize(size) {
      return new Promise((resolve, reject) => {
        if (size > this.maxSize) {
          this.$message.warning(
            `最大不能超过${this.$format.bytesToSize(this.maxSize)}`
          );
          reject();
        }
        resolve();
      });
    },
    onChange(file, fileList) {
      this.files = fileList;
    },
    async onHttpUpload(file) {
      this.isUploading = true;
      this.$emit("on-uploaded", false);
      this.oss
        .upload(file)
        .then((res) => {
          this.successFiles.push(res);
          this.$emit("update:fileList", this.successFiles);
          this.$emit("on-success", this.successFiles);
          this.$emit("on-uploaded", true);
          this.isUploading = false;
        })
        .catch((err) => {
          console.log(err);
          this.$emit("update:fileList", this.successFiles);
        });
    },

    onError(err) {
      console.log(err);
      this.$message.error("上传失败，请重试");
    },
    onSubmitUpload() {
      this.$refs.upload.submit();
    },
    onAbort() {
      this.$refs.upload.abort();
    },
    onExceed() {
      this.$message.warning(`上传总数不能超过【${this.limit}】个`);
    },
    handlePictureCardPreview(file) {
      this.isShowImageView = true;
      this.$nextTick(() => {
        this.imageView = file.url;
      });
    },
    async handleDownload(file) {
      const { url, name } = file;
      const x = new XMLHttpRequest();
      x.open("GET", url, true);
      x.responseType = "blob";
      x.onload = function () {
        const _url = window.URL.createObjectURL(x.response);
        const elt = document.createElement("a");
        elt.setAttribute("href", _url);
        elt.setAttribute("download", name);
        elt.style.display = "none";
        elt.target = "_blank";
        document.body.appendChild(elt);
        elt.click();
        document.body.removeChild(elt);
      };
      x.send();
    },
    handleRemove(file, fileList) {
      fileList.forEach((item, idx) => {
        if (file.uid === item.uid) {
          fileList.splice(idx, 1);
        }
      });
      if (this.viewList.length) {
        this.viewList.forEach((item, idx) => {
          if (item.url === file.url) {
            this.viewList.splice(idx, 1);
          }
        });
      }
      this.$emit("update:fileList", fileList);
    },
    closeViewer() {
      this.isShowImageView = false;
    },
    abortUpload() {
      return this.oss.oss.cancel();
    },
  },
};
</script>

