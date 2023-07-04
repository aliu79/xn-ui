<template>
 <div>
   <xn-upload
   ref="upload"
    :fileList.sync="fileList"
    :limit="limit"
    @on-success="onSuccess"
    @on-uploaded="handleUoloaded"
  ></xn-upload>

  <el-button type="primary" size="default" @click="stopUpload">stop upload</el-button>
  
  <el-button type="primary" size="default" @click="onDownload({url:'https://xianniu-file.oss-cn-beijing.aliyuncs.com/accessory/2023/05/11/20b365d38e5646f2896e1f2e6c010f93.png',name:'123123'})">download</el-button>
  
 </div>
</template>

<script>
export default {
  data() {
    return {
      limit: 22,
      config: {
        accept: "image", //接受上传的文件类型：zip、pdf、excel、image，也可以是文件类型所组成的数组类型如：['image', 'pdf']，则只可以上传图片或pdf类型的文件，也可以为空，则任何类型的文件都可以上传
        max: 100, //文件大小
      },
      fileList: [
        {
          url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/accessory/2023/05/27/d7adc4c79b2a4aa297403485739d65f1.pdf",
        },
      ],
    };
  },
  methods: {
    onSuccess(val) {
      console.log(val);
    },
    beforeUpload() {
      // console.log("val", val);
    },
    handleUoloaded(){
      // console.log('val: ', val);

    },
    onProgress() {},
    onPreview() {},
    onRemove() {},
    stopUpload(){
      this.$refs.upload.abortUpload()
    },
    onDownload({url,name}){
      this.$utils.download({url,name})
    }
  },
};
</script>

<style>
</style>