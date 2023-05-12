<template>
  <xn-upload
    :fileList.sync="fileList"
    :limit="limit"
    :accept="['zip','jpg']"
    @on-success="onSuccess"
  ></xn-upload>
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
          url: "https://i.xianniu.cn/accessory/2022/08/04/b194177e9642454480726feb2ce842fa.jpg",
        },
      ],
    };
  },
  methods: {
    onSuccess(val) {
      console.log(val);
    },
    beforeUpload(val) {
      console.log("val", val);
    },
    onProgress() {},
    onPreview() {},
    onRemove() {},
  },
};
</script>

<style>
</style>