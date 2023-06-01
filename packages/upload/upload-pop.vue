<template>
  <el-popover width="300" trigger="hover">
    <el-form label-width="80px" size="mini">
      <el-form-item label="文件名" class="mb-5">
        <div :title="file.name" class="tip-filename">
          {{ file.name }}
        </div>
      </el-form-item>
      <el-form-item label="文件大小" class="mb-0">
        {{ $format.bytesToSize(file.size) }}
      </el-form-item>
      <el-form-item label="文件格式" class="mb-0">
        {{ file.ext }}
      </el-form-item>
      <el-form-item label="文件类型" class="mb-0">
        {{ file.imgFlag ? "图片" : "文件" }}
      </el-form-item>
      <el-form-item label="操作" class="mb-0">
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