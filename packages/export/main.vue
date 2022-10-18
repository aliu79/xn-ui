<template>
  <xn-dialog :title="title" :confirm-text="isExporting ? '正在导出...' : '导出'" :show.sync="show" :before-close="onClose" width="460px" @on-confirm="onExport">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="导出文件名" prop="name">
        <el-input v-model="form.name" placeholder="请填写导出文件名" clearable />
      </el-form-item>
      <!-- <el-form-item label="导出文件类型" prop="type">
        <el-select v-model="form.type" placeholder="导出文件类型" filterable>
          <el-option
            v-for="item in $enums.EXPORT_TYPE.getList()"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="导出时间范围" prop="date">
        <xn-date v-model="form.date" clearable is-shortcut type="daterange" />
      </el-form-item> -->
    </el-form>
    <!-- <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" :loading="isExporting" @click="onExport">
        {{ isExporting ? "正在导出..." : "导出" }}
      </el-button>
    </template> -->
  </xn-dialog>
</template>
<script>
export default {
  name: 'XnExport',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isExporting: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '导出文件',
        type: 0,
        date: ''
      }
    }
  },
  computed: {
    title() {
      return `导出`
    },
    fileNameDate() {
      return this.form.date.join('_')
    //   return this.$tools.dayjs().format('YYYYMMDDHHmmss')
    }
  },
  watch: {
    show(n) {
      if (!n) {
        this.$refs.form.resetFields()
      }
    }
  },
  methods: {
    onClose() {
      this.$emit('update:show', false)
    },
    onExport() {
      this.$emit('on-export', this.form)
    },
    createBlob(data) {
      if (!data) {
        this.$message.warning('导出数据有误，请稍后重试！')
        return
      }
      const postfix = 'xls'
    //   const postfix = this.$enums.EXPORT_TYPE.getLabel(this.form.type)
      const isDate = this.form.date && this.form.date.length
      const { form: { name }} = this
      const blob = new Blob([data])
      const fileName = isDate ? `${name}(${this.fileNameDate})${postfix}` : `${name}.${postfix}`
      const linkNode = document.createElement('a')
      linkNode.download = fileName // a标签的download属性规定下载文件的名称
      linkNode.style.display = 'none'
      linkNode.href = URL.createObjectURL(blob) // 生成一个Blob URL
      document.body.appendChild(linkNode)
      linkNode.click() // 模拟在按钮上的一次鼠标单击

      URL.revokeObjectURL(linkNode.href) // 释放URL 对象
      document.body.removeChild(linkNode)
      this.$emit('update:isExporting', false)
      this.onClose()
    }
  }
}
</script>
