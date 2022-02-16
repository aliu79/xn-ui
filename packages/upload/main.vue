<template>
  <div class="xn-upload-box">
    <el-upload
      ref="upload"
      :class="{
        'hide-upload': hiddenUpload || isHidden || preview,
        'el-upload-idcard': listType === 'idcard',
        'xn-upload-disabled': disabled,
      }"
      action="###"
      :auto-upload="autoUpload"
      :on-progress="onProcess"
      :show-file-list="showFileList"
      :list-type="listType === 'idcard' ? 'picture-card' : listType"
      :multiple="multiple"
      :limit="limit"
      :disabled="disabled"
      :file-list.sync="fileList"
      :http-request="onHttpUpload"
      :on-error="onError"
      :before-upload="onBeforeUpload"
      :style="styles"
      :headers="uploadHeaders"
      :on-exceed="onExceed"
      :on-change="onChange"
    >
      <template v-if="listType === 'picture-card'">
        <div slot="trigger" class="upload-limit">
          <i class="el-icon el-icon-plus" />
          <span
            ><em>{{ fileList.length }}</em
            >/<em>{{ limit }}</em>
          </span>
        </div>
      </template>
      <template v-else>
        <slot>
          <el-button icon="el-icon-upload">编辑</el-button>
        </slot>
      </template>
      <div
        slot="file"
        slot-scope="{ file }"
        class="upload-slot"
        :class="{ 'upload-slot-idcard': listType === 'idcard' }"
      >
        <el-popover width="300" trigger="hover">
          <el-form label-width="80px" size="mini">
            <el-form-item label="文件名">
              <div :title="file.accessoryName" class="tip-filename">
                {{ file.accessoryName }}
              </div>
            </el-form-item>
            <el-form-item label="文件大小">
              {{ this.$utils.bytesToSize(file.accessorySize) }}
            </el-form-item>
            <el-form-item label="文件格式">
              {{ file.ext }}
            </el-form-item>
            <el-form-item label="文件类型">
              {{ file.imgFlag ? "图片" : "文件" }}
            </el-form-item>
            <el-form-item label="操作">
              <el-link
                type="primary"
                :underline="false"
                @click="handleDownload(file)"
                icon="el-icon-download"
                >下载</el-link
              >
            </el-form-item>
          </el-form>
          <div v-if="file.ext" slot="reference" class="ext">{{ file.ext }}</div>
        </el-popover>
        <template v-if="isImage(file)">
          <el-image
            class="el-upload-list__item-thumbnail"
            :src="file.url"
            fit="cover"
            :lazy="true"
          />
        </template>
        <template v-else>
          <div class="xn-upload-list__item--file">
            <div class="annex">
              <i class="el-icon el-icon-folder" />
              <span class="label">附件</span>
            </div>
            <div class="file-name">{{ file.accessoryName }}</div>
          </div>
        </template>
        <div v-if="file.status === 'uploading'" class="process">
          <el-progress
            :status="file.percentage === 100 ? 'success' : null"
            type="circle"
            :percentage="process(file.percentage)"
            :stroke-width="6"
          />
        </div>
        <span class="el-upload-list__item-actions">
          <span
            v-if="isImage(file)"
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="fz-16 el-icon-zoom-in" />
          </span>
          <span
            class="el-upload-list__item-delete icon"
            @click="handleDownload(file, fileList)"
          >
            <i class="fz-16 el-icon-download" />
          </span>
          <span
            v-if="!disabled && !preview"
            class="el-upload-list__item-delete icon"
            @click="handleRemove(file, fileList)"
          >
            <i class="fz-16 el-icon-delete" />
          </span>
        </span>
      </div>
      <div v-if="tip !== ''" slot="tip" class="el-upload__tip">{{ tip }}</div>
    </el-upload>
    <el-image-viewer
      v-if="isShowImageView"
      :on-close="closeViewer"
      :z-index="999999"
      :url-list="[imageView]"
    />
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import * as imageConversion from "image-conversion";
import axios from "axios";
export default {
  name: "XnUploadnew",
  components: {
    ElImageViewer,
  },
  props: {
    listType: {
      type: String,
      default: "picture-card",
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    hiddenUpload: {
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
    disabled: Boolean,
    autoUpload: {
      type: Boolean,
      default: true,
    },
    limit: {
      type: Number,
      default: 1,
    },
    tip: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    accept: {
      type: Array,
      default: () => ["jpg", "jpeg", "png", "pdf"],
    },
    maxSize: {
      type: Number,
      default: 1024 * 5 * 1024, // 最大限制 5M
    },
    compress: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "front",
      validator: (val) => {
        return ["front", "back"].includes(val);
      },
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
      actionParams: {
        action: `/upload/uploadFile`,
      },
      uploadHeaders: {
        xnToken: this.$store.getters.token,
      },
      viewList: [],
      files: [],
      successFiles: [],
    };
  },
  computed: {
    process() {
      return (num) => {
        return Math.floor(num);
      };
    },
    isImage() {
      return (file) => {
        return file.imgFlag;
      };
    },
  },
  watch: {
    fileList: {
      handler(n) {
        this.successFiles = n;
        if (this.limit === n.length) {
          this.isHidden = true;
        } else {
          this.isHidden = false;
        }
      },
      immediate: true,
    },
  },
  created() {},
  beforeDestroy() {
    this.$emit("update:fileList", []);
  },
  methods: {
    onBeforeUpload(file) {
      let fileExt = file.name.substring(file.name.lastIndexOf(".") + 1);

      // 判断上传格式
      fileExt = `${fileExt}`.toLowerCase();

      if (!this.accept.includes(fileExt)) {
        this.$message.warning(`请上传指定格式【${this.accept}】`);
        return false;
      }
    },
    handleCompress(file) {
      const { compress } = this;
      const _maxSize = parseFloat(this.maxSize);
      let size = 0;
      if (compress) {
        size = compress;
      } else {
        if (file.size > _maxSize) {
          size = _maxSize / 1024;
        }
      }
      return new Promise((resolve) => {
        imageConversion["compressAccurately"](file, size).then((result) => {
          resolve(result);
        });
      });
    },
    onExceedSize(size, maxSize) {
      if (size > maxSize) {
        this.$message.warning(`最大不能超过${this.$utils.bytesToSize(maxSize)}`);
        return false;
      }
      return true;
    },
    onChange(file, fileList) {
      this.files = fileList;
    },
    async onHttpUpload(file) {
      const formData = new FormData();
      let result = null;
      if (this.$utils.isImg(file.file.name)) {
        result = await this.handleCompress(file.file);
        var newFile = new window.File([result], file.file.name, {
          type: file.file.type,
        });
      }
      const _file = result ? newFile : file.file;
      formData.append("file", _file);
      axios({
        method: "post",
        url: this.actionParams.action,
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        onUploadProgress(progress) {
          const _progress = Math.round(
            (progress.loaded / progress.total) * 100
          );
          file.onProgress({ percent: _progress });
        },
      })
        .then((res) => {
          var obj = {};
          obj.accessoryName = res.data.data.accessoryName;
          obj.accessorySize = res.data.data.accessorySize;
          obj.ext = res.data.data.ext;
          obj.imgFlag = res.data.data.imgFlag;
          obj.url = res.data.data.url;
          this.successFiles.push(obj);
          file.onSuccess();
          this.$emit("update:fileList", this.successFiles);
          this.$emit("on-success", this.successFiles);
        })
        .catch(() => {
          this.$emit("update:fileList", this.successFiles);
          file.onError();
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
      this.$message.warning(`上传总数限制为【${this.limit}】个，请删除后上传`);
    },
    handlePictureCardPreview(file) {
      this.isShowImageView = true;
      this.$nextTick(() => {
        this.imageView = file.url;
      });
    },
    async handleDownload({ url }) {
      const elt = document.createElement("a");
      elt.setAttribute("href", url);
      elt.setAttribute("download", "下载文件");
      elt.style.display = "none";
      elt.target = "_blank";
      document.body.appendChild(elt);
      elt.click();
      document.body.removeChild(elt);
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
      //   this.$emit('on-change', fileList.map(item => item.url).join(','))
    },
    closeViewer() {
      this.isShowImageView = false;
    },
  },
};
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
.xn-upload-box {
  .xn-upload-disabled {
    ::v-deep .el-upload.el-upload--picture-card {
      cursor: not-allowed;
      background-color: #f4f4f5;
      &:hover {
        border-color: #c0ccda;
        color: #c0ccda;
      }
      .upload-limit {
        i,
        span {
          color: #bcbec2;
        }
      }
    }
  }
}
.process {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba($color: #000000, $alpha: 0.4);
  width: 100%;
  height: 100%;
  .el-progress {
    width: 40%;
    height: auto;
    ::v-deep .el-progress-circle {
      width: 99% !important;
      height: 99% !important;
    }
    ::v-deep .el-progress__text {
      color: #fff;
      font-size: 12px !important;
    }
  }
}
.el-upload-idcard {
  .el-progress {
    width: 52%;
  }
}

.upload-limit {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  span {
    line-height: 20px;
    position: absolute;
    bottom: 8px;
    color: #ccc;
    em {
      font-style: normal;
      font-size: 12px;
    }
  }
}
.upload-slot {
  height: 100%;
  .ext {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background: rgba($color: #000000, $alpha: 0.4);
    height: 20px;
    line-height: 20px;
    color: #fff;
    font-size: 12px;
    padding: 0 5px;
    border-radius: 0 0 0 0;
  }
  &-idcard {
    width: 100%;
    height: 100%;
  }
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  .icon {
    margin-left: 5px;
  }
}
.tip-filename {
  line-height: 20px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.xn-upload-list__item--file {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px 0;
  .annex {
    color: #ccc;
    display: flex;
    align-items: center;
    height: 20px;
    line-height: 20px;
    .el-icon {
      font-size: 18px;
    }
    .label {
      padding-left: 5px;
    }
  }
  .file-name {
    line-height: 20px;
    font-size: 12px;
    color: #ccc;
    padding: 0 6px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; //行数
    -webkit-box-orient: vertical;
  }
}
</style>
