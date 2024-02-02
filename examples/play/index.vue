<template>
  <div>
    <el-button type="primary" size="default" @click="isShowImport = true"
      >导入</el-button
    >
    <xn-import
      ref="import"
      title="备件信息"
      :show.sync="isShowImport"
      :auto-upload="false"
      :limit="10"
      accept=""
      is-drag-upload
      confirm-text="上传"
      multiple
      :show-desc="false"
      :tip="'请上传：电子测报、备件实物照片和包装视频等信息'"
      @on-import="handleImportFile"
      @on-success="onSuccess"
    >
      
    </xn-import>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "是", label: 0 },
        { title: "否", label: 1 },
      ],
      form: {
        value: "",
      },
      isShowImport: false,
      templateConfig: {
        url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/accessory/2023/02/16/ed4d8a5eb805430f94f311490d7dfe21.xls",
        name: "批量导入",
      },
      rules: {
        value: [{ required: true }],
      },
    };
  },
  
  methods: {
    handleImportFile() {

      
      //  this.$refs.import.clearFiles()
    },
onSuccess(val){
console.log("🚀 ~ onSuccess ~ val:", val)

},
    handleBeforeConfirm() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            resolve();
          } else {
            reject();
            return false;
          }
        });
      });
    },
  },
};
</script>

<style>
</style>