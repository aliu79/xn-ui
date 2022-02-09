<template>
  <div class="xn-table-box">
    <el-card shadow="always" :body-style="{ padding: '10px' }">
      <div
        class="xn-table-box-tools"
        v-if="isTools"
        :class="{ 'is-border': !border }"
      >
        <slot name="tools">
          <el-button
            circle
            size="mini"
            @click="$emit('on-refresh')"
            icon="el-icon-refresh"
          ></el-button>
        </slot>
      </div>
      <el-table
        :data="data"
        v-on="$listeners"
        v-bind="$attrs"
        :border="border"
        :stripe="stripe"
      >
        <el-table-column
          v-if="selection && data.length"
          v-bind="$attrs"
          type="selection"
          width="50px"
          align="center"
        ></el-table-column>
        <el-table-column
          width="50px"
          label="序号"
          v-if="index && data.length"
          type="index"
        ></el-table-column>
        <slot name="column">
          <column
            v-for="(item, idx) in columns"
            :key="idx"
            v-bind="item"
          ></column>
        </slot>
      </el-table>
      <xn-page></xn-page>
    </el-card>
  </div>
</template>

<script>
import column from "./column.vue";
export default {
  name: "XnTable",
  components: { column },
  props: {
    data: {
      type: Array,
      default: () => {},
    },
    border: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => {},
    },
    stripe: Boolean,
    selection: Boolean,
    index: Boolean, 
    expand: Boolean,
    isTools: Boolean,
  },
};
</script>

<style>
</style>