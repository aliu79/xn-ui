<template>
  <div class="xn-tip" :class="[`xn-tip--${type}`]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'XnTip',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (val) => {
        return ['primary', 'warning', 'success', 'danger', 'info'].includes(
          val
        )
      }
    }
  }
}
</script>