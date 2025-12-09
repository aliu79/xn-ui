<template>
  <el-upload
    ref="upload"
    :class="{
      'is-disabled':
        ($attrs.disabled != undefined && $attrs.disabled == true) ||
        $attrs.disabled === '',
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
        <span class="text">{{ uploadText }}</span>
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
      :class="{
        'xn-upload--slot': ['picture-card', 'idcard'].includes(listType),
      }"
    >
      <template v-if="['list'].includes(listType)">
        <a
          class="el-upload-list__item-name"
          :class="{ 'is-error': file.status === 'fail' }"
          @click="handlePictureCardPreview(file)"
          v-if="$utils.isImg(file) && file.status !== 'fail'"
          ><i class="el-icon-document"></i>{{ file.name }}
        </a>
        <a
          class="el-upload-list__item-name"
          :class="{ 'is-error': file.status === 'fail' }"
          @click="handleAVPreview(file)"
          v-else-if="$utils.isAV(file) && file.status !== 'fail'"
          ><i class="el-icon-document"></i>{{ file.name }}
        </a>
        <a
          class="el-upload-list__item-name"
          :class="{ 'is-error': file.status === 'fail' }"
          @click="handleDownload(file)"
          v-else-if="file.status !== 'uploading' && file.status !== 'fail'"
          ><i class="el-icon-document"></i>{{ file.name }}
        </a>
        <a class="el-upload-list__item-name" v-if="file.status === 'uploading'"
          ><i class="el-icon-document"></i>{{ file.name }}
        </a>
        <a 
          class="el-upload-list__item-name is-error" 
          v-if="file.status === 'fail'"
          @click="retryUpload(file)"
        >
          <i class="el-icon-document"></i>{{ file.name }}
          <span class="error-tip">({{ file.errorMessage }})</span>
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
              'el-icon-circle-check': true,
            }"
          ></i>
        </label>
        <i
          v-if="file.status === 'fail'"
          class="el-icon-refresh-right"
          title="重新上传"
          @click="retryUpload(file)"
          style="cursor: pointer; color: #f56c6c; margin-right: 5px;"
        ></i>
        <i
          class="el-icon-close"
          @click="handleRemove(file, fileList)"
          v-if="
            allowDelete || ($attrs.disabled == null && !preview) || hideUpload
          "
        ></i>
      </template>
      <template v-if="['picture-card', 'idcard'].includes(listType)">
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
        <div v-if="file.status === 'fail'" class="upload-error">
          <div class="error-mask">
            <p class="error-text">上传失败</p>
            <div class="error-actions">
              <el-link type="danger" :underline="false" icon="el-icon-refresh" @click.stop="retryUpload(file)"></el-link>
              <el-link 
                v-if="!$attrs.disabled && !preview"
                type="info" 
                :underline="false" 
                icon="el-icon-delete" 
                @click.stop="handleRemove(file, fileList)"
                style="margin-left: 10px;"
              ></el-link>
            </div>
          </div>
        </div>
        <span class="el-upload-list__item-actions" v-if="file.status !== 'fail'">
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
      </template>
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
import ElImageViewer from "@liuzengwei/element-ui/packages/image/src/image-viewer";
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
      successFiles: [],
      isUploading: false,
      file: {},
      oss: null,
      client: null,
      idCardSizeData: {},
      isShowAV: false,
      avUrl: "",
      realFileList: [],
      failedFiles: {}, // 记录失败的文件 { uid: { file, error } }
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
    // 获取成功上传的文件列表（过滤掉失败的文件）
    successFileList() {
      return this.fileList.filter(file => file.status !== 'fail');
    },
    // 上传按钮文字
    uploadText(){
      return this.$attrs.drag != undefined || this.drag === true ? '点击或拖拽上传' : '上传文件';
    }
  },
  watch: {
    fileList: {
      handler(n) {
        // this.successFiles = n;
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
      // 保持realFileList的引用稳定性
      this.realFileList = [...fileList];
    },
    async onHttpUpload(file) {
      this.handleUpload(file);
    },
    async handleUpload(file, isRetry = false) {
      this.isUploading = true;
      this.$emit("on-uploaded", false);
      
      // file 可能是 Element UI 的包装对象或原始文件对象
      const fileUid = file.uid || file.file?.uid;
      
      // 如果是重试，从失败列表中移除并重置状态
      if (isRetry) {
        if (this.failedFiles[fileUid]) {
          delete this.failedFiles[fileUid];
        }
        const index = this.realFileList.findIndex(item => item.uid === fileUid);
        if (index !== -1) {
          this.$set(this.realFileList[index], 'status', 'uploading');
          this.$set(this.realFileList[index], 'percentage', 0);
          delete this.realFileList[index].errorMessage;
        }
      }
      
      // 确保已获取 STS Token
      if (!this.oss) {
        try {
          await this.getStsToken();
        } catch (err) {
          this.$notify.error({
            title: '获取上传凭证失败',
            message: err.message || '请稍后重试'
          });
          return;
        }
      }
      
      this.oss
        .upload(file)
        .then((res) => {
          this.successFiles.push(res);

          // 更新文件列表，用上传成功的信息替换原文件
          const index = this.realFileList.findIndex(item => item.uid === res.file.uid);
          if (index !== -1) {
            const obj = { ...res };
            delete obj.file;
            this.$set(this.realFileList, index, obj);
          }
          
          // 从失败列表中移除（如果存在）
          if (this.failedFiles[fileUid]) {
            delete this.failedFiles[fileUid];
          }
          
          this.$emit("update:fileList", this.realFileList);
          this.$emit("on-file", res);
          this.$emit("on-success", this.successFiles);
          this.$emit("on-uploaded", true);
          this.isUploading = false;
        })
        .catch((error) => {
          // 上传失败，标记文件状态但保留在列表中
          // 处理不同的错误格式
          const fileName = error?.fileName || file.file?.name || file.name || '未知文件';
          const message = error?.message || error?.err?.message || '网络错误，请检查网络连接后重试';
          // const failedFile = error?.file || file;
          
          const index = this.realFileList.findIndex(item => item.uid === fileUid);
          if (index !== -1) {
            // 标记为失败状态
            this.$set(this.realFileList[index], 'status', 'fail');
            this.$set(this.realFileList[index], 'errorMessage', message);
            
            // 记录失败文件信息（包含原始file对象），用于重试
            this.$set(this.failedFiles, fileUid, {
              file: this.realFileList[index],
              rawFile: file,  // 保存原始file对象用于重试
              error: message
            });
            
            // 触发更新事件
            this.$emit("update:fileList", [...this.realFileList]);
          }
          
          this.$notify.error({
            title: "上传失败",
            dangerouslyUseHTMLString: true,
            message: `<div><p>文件名：${fileName}</p><p>错误：${message}</p><p>点击重试按钮可重新上传</p></div>`,
            duration: 5000
          });
          this.$emit("on-uploaded", true);
          this.isUploading = false;
        });
    },
    // onError() {
    //   this.$message.error("上传失败，请重试");
    // },
    retryUpload(file) {
      // 重新上传失败的文件
      if (this.failedFiles[file.uid]) {
        const failedFileInfo = this.failedFiles[file.uid];
        // 使用保存的原始 file 对象进行重试
        const uploadFile = failedFileInfo.rawFile || failedFileInfo.file;
        this.handleUpload(uploadFile, true);
      }
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
      // 使用filter避免遍历中删除的索引问题
      const newFileList = fileList.filter(item => item.uid !== file.uid);
      
      if (this.viewList.length) {
        this.viewList = this.viewList.filter(item => item.url !== file.url);
      }
      
      // 更新realFileList
      this.realFileList = newFileList;
      this.$emit("update:fileList", newFileList);
    },
    closeViewer() {
      this.isShowImageView = false;
    },
    abortUpload() {
      return this.oss.oss.cancel();
    },
    // 获取成功上传的文件列表（不包含失败的文件）
    getSuccessFiles() {
      return this.fileList.filter(file => file.status !== 'fail');
    },
    // 获取失败的文件列表
    getFailedFiles() {
      return this.fileList.filter(file => file.status === 'fail');
    },
    // 检查是否有失败的文件
    hasFailedFiles() {
      return this.fileList.some(file => file.status === 'fail');
    },
    onPreviewFile(file) {
      // 如果是失败的文件，点击重试
      if (file.status === 'fail' && this.failedFiles[file.uid]) {
        this.$confirm('上传失败，是否重新上传？', '提示', {
          confirmButtonText: '重新上传',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.retryUpload(file);
        }).catch(() => {});
        return;
      }
      
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

