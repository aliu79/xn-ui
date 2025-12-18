<template>
  <div>
    <xn-city v-model="city" @on-city="onCity"></xn-city>
    <xn-card>
      <template #header>12312</template>
      <template #more>
        <el-button type="primary" size="default">计划</el-button>
        
      </template>
    </xn-card>
    <xn-upload
      ref="upload"
      :fileList.sync="fileList"
      :limit="limit"
      multiple
      @on-success="onSuccess"
      drag
      @on-uploaded="handleUoloaded"
    >
      <div style="height: 160px">
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </div>
    </xn-upload>
    <!-- <el-button type="primary" size="default" @click="stopUpload"
      >stop upload</el-button
    >

    <el-button
      type="primary"
      size="default"
      @click="
        onDownload({
          url: 'https://xianniu-file.oss-cn-beijing.aliyuncs.com/accessory/2023/05/11/20b365d38e5646f2896e1f2e6c010f93.png',
          name: '123123',
        })
      "
      >download</el-button
    > -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "",
      limit: 9,
      config: {
        accept: "image", //接受上传的文件类型：zip、pdf、excel、image，也可以是文件类型所组成的数组类型如：['image', 'pdf']，则只可以上传图片或pdf类型的文件，也可以为空，则任何类型的文件都可以上传
        max: 100, //文件大小
      },
      isDisabled: [1, 2, 3],
      fileList: [
        {
          url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/accessory/2023/05/11/20b365d38e5646f2896e1f2e6c010f93.png",
          name: "123",
        },
        {
          url: "https://xianniu-image.oss-cn-beijing.aliyuncs.com/indexImage/guanw/by.mp4",
          name: "视频",
        },
      ],
    };
  },
  watch: {
    fileList: {
      handler(val) {
        console.log("fileList: ", val);
      },
      deep: true,
    },
  },
  created(){
    console.log(this.$dayjs(1729064308000).format());
    
  },
  methods: {
    onCity(val) {
      console.log("city: ", val);
    },
    onSuccess(val) {
      console.log(val);
    },
    beforeUpload() {
      // console.log("val", val);
    },
    handleUoloaded() {
      // console.log('val: ', val);
    },
    onProgress() {},
    onPreview() {},
    onRemove() {},
    stopUpload() {
      this.$refs.upload.abortUpload();
    },
    onDownload({ url, name }) {
      this.$utils.download({ url, name });
    },
  },
};
</script>

<style>
</style>