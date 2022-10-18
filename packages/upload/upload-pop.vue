<template>
  <el-popover width="300" trigger="hover">
    <el-form label-width="80px" size="mini">
      <el-form-item label="文件名">
        <div :title="file.accessoryName" class="tip-filename">
          {{ file.accessoryName }}
        </div>
      </el-form-item>
      <el-form-item label="文件大小">
        {{ $format.bytesToSize(file.accessorySize) }}
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
    <div v-if="file.ext" slot="reference" class="xn-upload--slot__ext">{{ file.ext }}</div>
  </el-popover>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      default: () => {},
    },
  },
  methods:{
      handleDownload(file){
          this.$emit('on-download',file)
      }
  }
};
</script>

<style>
</style>