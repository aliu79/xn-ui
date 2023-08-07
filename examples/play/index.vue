<template>
  <div>
    <el-button type="primary" size="default" @click="isShowImport = true">导入</el-button>
    <xn-import
      ref="import"
      :show.sync="isShowImport"
      :auto-upload="false"
      :template-config="templateConfig"
      :limit="1"
      :tip="'仅支持上传xls,xlsx文件'"
      @on-import="handleImportFile"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowImport: false,
      templateConfig: {
        url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/accessory/2023/02/16/ed4d8a5eb805430f94f311490d7dfe21.xls",
        name: "批量导入",
      },
    };
  },
  methods:{
    handleImportFile(){}
  }
};
</script>

<style>
</style>