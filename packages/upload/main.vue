<template>
  <div>
    <upload
      class="xn-upload"
      :limit="limit"
      :config="config"
      v-on="$listeners"
      list-type="picture-card"
      :fileList="fileList"
    >
    </upload>
    <ElImageViewer
      v-if="isShow"
      :on-close="closeViewer"
      :z-index="999999"
      :url-list="[imageView]"
    ></ElImageViewer>
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";

import upload from "./upload";
export default {
  name: "XnUpload",
  components: { upload, ElImageViewer },
  props:['limit','config','fileList'],
  data() {
    return {
      isShow: false,
      imageView: "",
      
    };
  },
  methods: {
    onPreview(file) {
      console.log(file);
      this.imageView = file.url;
      this.isShow = true;
    },
    onRemove() {},
    closeViewer() {
      this.isShow = false;
    },
  },
};
</script>

<style>
</style>