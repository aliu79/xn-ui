<template>
  <el-upload
    ref="upload"
    :class="{
      'is-disabled': $attrs.disabled != undefined,
      'is-hidden': preview || hideUpload || isHidden,
      'is-idcard': listType === 'idcard',
    }"
    class="xn-upload"
    action="###"
    :limit="limit"
    :list-type="listType === 'idcard' ? 'picture-card' : listType"
    v-bind="$attrs"
    :file-list.sync="fileList"
    :http-request="onHttpUpload"
    :on-error="onError"
    :before-upload="onBeforeUpload"
    :style="{ ...styles, ...idCardSizeData }"
    :on-exceed="onExceed"
    :on-change="onChange"
    :on-preview="onPreviewFile"
  >
    <template v-if="listType === 'idcard'">
      <template slot="trigger">
        <idCard ref="idcard" :type="type" />
      </template>
    </template>
    <template v-else-if="listType === 'picture-card'">
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

    <template
      slot="file"
      slot-scope="{ file }"
      v-if="['list'].includes(listType)"
    >
      <a
        class="el-upload-list__item-name"
        @click="handlePictureCardPreview(file)"
        v-if="$utils.isImg(file)"
        ><i class="el-icon-document"></i>{{ file.name }}
      </a>
      <a
        class="el-upload-list__item-name"
        @click="handleAVPreview(file)"
        v-else-if="$utils.isAV(file)"
        ><i class="el-icon-document"></i>{{ file.name }}
      </a>
      <a
        class="el-upload-list__item-name"
        @click="handleDownload(file)"
        v-else
        ><i class="el-icon-document"></i>{{ file.name }}
      </a>
      <a class="el-upload-list__item-name" v-if="file.status === 'uploading'"
        ><i class="el-icon-document"></i>{{ file.name }}
      </a>
      <el-progress
        v-if="file.status === 'uploading'"
        type="line"
        :stroke-width="2"
        :percentage="process(file.percentage || 0)"
      >
      </el-progress>
      <label
        v-if="file.status === 'success'"
        class="el-upload-list__item-status-label"
        >
        <i
          :class="{
            'el-icon-upload-success': true,
            'el-icon-circle-check': true
          }"
        ></i>
      </label>
      <i
        class="el-icon-close"
        @click="handleRemove(file, fileList)"
        v-if="allowDelete || ($attrs.disabled==null && !preview) || hideUpload"
      ></i>
    </template>
    <div
      slot="file"
      slot-scope="{ file }"
      class="xn-upload--slot"
      v-else-if="['picture-card', 'idcard'].includes(listType)"
    >
      <uploadPop :file="file" @on-download="handleDownload(file)"></uploadPop>
      <template v-if="$utils.isImg(file)">
        <el-image
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          fit="cover"
        />
      </template>
      <template v-else-if="$utils.isAV(file)">
        <el-image
          class="el-upload-list__item-thumbnail"
          :src="
            file.url +
            '?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast,ar_auto'
          "
          fit="cover"
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
          :percentage="process(file.percentage || 0)"
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
          v-if="$utils.isAV(file)"
          class="el-upload-list__item-preview ml-5"
          @click="handleAVPreview(file)"
        >
          <i class="fz-16 el-icon-video-play" />
        </span>
        <span
          class="el-upload-list__item-delete icon ml-5"
          @click="handleDownload(file, fileList)"
        >
          <i class="fz-16 el-icon-download" />
        </span>
        <span
          v-if="allowDelete || (!$attrs.disabled && !preview) || hideUpload"
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
    <AV :show.sync="isShowAV" :url="avUrl"></AV>
  </el-upload>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import Client from "@/oss";
import uploadPop from "./upload-pop.vue";
import idCard from "./idCard.vue";
import AV from "./AV";
// const MAX_WARNING = 1024 * 10 * 1024;
export default {
  name: "XnUpload",
  inheritAttrs: false,
  components: {
    uploadPop,
    ElImageViewer,
    idCard,
    AV,
  },
  props: {
    listType: {
      type: String,
      default: "picture-card",
    },
    allowDelete: {
      type: Boolean,
      default: false,
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
    hideUpload: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "front",
      validator: (val) => {
        return ["front", "back"].includes(val);
      },
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
      idCardSizeData: {},
      isShowAV: false,
      avUrl: "",
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
    this.idCardSize();
  },
  beforeDestroy() {
    // this.$emit("update:fileList", []);
  },
  methods: {
    async idCardSize() {
      if (this.listType !== "idcard") return {};
      this.$nextTick(() => {
        this.idCardSizeData =
          this.$refs.idcard && this.$refs.idcard.getIdcardSize();
      });
    },
    async onBeforeUpload(file) {
      this.file = file;
      return Promise.all([
        this.checkFileExt(file),
        this.onExceedSize(file.size),
        this.getStsToken(file),
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
          this.$emit("on-file", this.res);
          this.$emit("on-success", this.successFiles);
          this.$emit("on-uploaded", true);
          this.isUploading = false;
        })
        .catch(() => {
          this.$emit("update:fileList", this.successFiles);
        });
    },

    onError() {
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
    handleAVPreview(file) {
      this.isShowAV = true;
      this.$nextTick(() => {
        this.avUrl = file.url;
      });
    },
    async handleDownload(file) {
      const { url, name } = file;
      return this.$utils.download({ url, name });
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
    onPreviewFile(file) {
      if (file.isAV === 1) {
        this.handleAVPreview(file);
      } else if (file.imgFlag === 1) {
        this.handlePictureCardPreview(file);
      } else {
        this.handleDownload(file);
      }
    },
  },
};
</script>

