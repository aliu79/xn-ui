<template>
  <div class="xn-idcard" :style="objStyle">
    <img v-if="type === 'front' && url === ''" src="data:image/jpeg;base64,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" >

    <img v-if="type === 'back' && url === ''" src="data:image/jpeg;base64,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" >
    <div v-if="url" class="xn-idcard-img">
      <img :src="url" alt="" />
    </div>
    <div v-if="url === ''" class="tip">
      <i class="el-icon-upload" />
      <span>点击上传{{ type === "front" ? "人像" : "国徽" }}面</span>
    </div>
    <el-dialog
      title="查看"
      append-to-body
      :visible.sync="isShowView"
      width="650px"
    >
      <div class="rotate" :style="rotateSty">
        <el-image style="width: 100%" :src="previewUrl" fit="cover" />
      </div>
      <div class="text-center" style="position: relative">
        <el-button
          type="primary"
          icon="el-icon-refresh-left"
          @click="onRotate(1)"
        />
        <el-button
          type="primary"
          icon="el-icon-refresh-right"
          @click="onRotate(2)"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "XnIdcard",
  props: {
    type: {
      type: String,
      default: "front",
      validator: (val) => {
        return ["front", "back"].includes(val);
      },
    },
    url: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      isShowView: false,
      previewUrl: "",
      rotate: 0,
    };
  },
  computed: {
    objStyle() {
      const { width } = this;
      return {
        width: `${width}px`,
        height: `${width / 1.59}px`,
      };
    },
    rotateSty() {
      return {
        transform: `rotate(${this.rotate}deg)`,
      };
    },
  },
  methods: {
    handlePreview(url) {
      this.previewUrl = url;
      this.isShowView = true;
    },
    onRotate(type) {
      if (type === 1) {
        this.rotate -= 90;
      } else {
        this.rotate += 90;
      }
    },
    getIdcardSize(){
        return this.objStyle
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  overflow: hidden;
}
.rotate {
  width: 100%;
  height: 100%;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
}
.xn-idcard {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  img {
    display: block;
    width: calc(100% - 2px);
    height: 100%;
    object-fit: cover;
  }
  .tip {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: #999;
    text-align: center;
    i {
      font-size: 36px;
    }
    span{
      line-height: 1.5;

    }
  }
}
</style>
