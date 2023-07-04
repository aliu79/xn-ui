<template>
  <div class="xn-card">
    <div class="xn-card-header flex justify-content-between">
      <slot name="title" v-if="title || $slots.title">
        <slot name="title">
          <h3><span>{{title}}</span></h3>
        </slot>
      </slot>
      <div class="xn-card-header__more">
        <slot name="more"></slot>
      </div>
    </div>
    <div class="xn-card-body" :style="styles">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "XnCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    bodyStyle: {
      type: Object,
      default: () => {
        return {
          padding: "18px",
        };
      },
    },
  },
  computed: {
    styles() {
      return {
        ...this.bodyStyle,
      };
    },
  },
};
</script>

<style>
</style>