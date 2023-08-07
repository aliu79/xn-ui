<template>
  <div>
    <el-button type="primary" size="default" @click="isShowImport = true"
      >导入</el-button
    >
    <xn-import
      ref="import"
      :show.sync="isShowImport"
      :auto-upload="false"
      :template-config="templateConfig"
      :limit="1"
      :tip="'仅支持上传xls,xlsx文件'"
      @on-import="handleImportFile"
      :before-confirm="handleBeforeConfirm"
    >
      <template #form>
        <div>
          <el-form
            :model="form"
            ref="form"
            :rules="rules"
            label-width="80px"
            :inline="false"
            size="normal"
          >
            <el-form-item label="你好" prop="value">
              <el-radio-group v-model="form.value">
                <el-radio
                  v-for="item in items"
                  :key="item.key"
                  :label="item.label"
                >
                  {{ item.title }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </template>
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
    handleImportFile() {},
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