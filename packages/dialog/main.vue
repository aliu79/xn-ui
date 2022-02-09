<template>
  <el-dialog
    :title="title"
    :visible="show"
    :width="width ? width : styleWidth"
    :before-close="beforeClose"
    :show-close="false"
    :append-to-body="appendToBody"
    :top="top"
    @open="$emit('on-open')"
    @opened="$emit('on-opened')"
  >
    <template #title>
      <div class="flex align-items-center justify-content-between">
        <div>
          <span class="el-dialog__title">{{ title }}</span>
        </div>
        <div>
          <slot name="tools" />
          <div class="el-dialog__headerbtn" @click="onClose">
            <span class="el-dialog__close el-icon el-icon-close close" />
          </div>
        </div>
      </div>
    </template>
    <slot />

    <span slot="footer">
      <slot name="footer">
        <el-button @click="onClose">取消</el-button>
        <el-button v-if="showConfirm" type="primary" @click="onConfirm">{{
          confirmText
        }}</el-button>
      </slot>
    </span>
  </el-dialog>
</template>

<script>
// 320 560 720 960
export default {
  name: 'XnDialog',
  props: {
    beforeClose: {
      type: Function,
      default: null
    },
    top: {
      type: String,
      default: '15vh'
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    drag: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  computed: {
    styleWidth() {
      const arr = [
        { label: 'mini', value: '320px' },
        { label: 'small', value: '560px' },
        { label: 'medium', value: '720px' },
        { label: 'large', value: '960px' }
      ]

      var width = ''
      arr.forEach(item => {
        if (item.label === this.size) {
          width = item.value
        }
      })
      return width
    }
  },

  methods: {
    onClose() {
      console.log(this.beforeClose);
      if(this.beforeClose && typeof this.beforeClose === 'function'){
        this.beforeClose()
        return
      }
      this.$emit('update:show',false)
    },

    onConfirm() {
      this.$emit('on-confirm')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
