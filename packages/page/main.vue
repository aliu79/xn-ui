<template>
  <div class="xn-page" :class="{ 'is-hidden': hidden }">
    <el-pagination
      :small="isSmall"
      :current-page.sync="currentPage"
      :page-size.sync="_pageSize"
      :layout="smallLayout"
      :total="total"
      v-bind="$attrs"
      :page-sizes="pageSizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from "xn-ui/src/utils/scroll-to.js";
export default {
  name: "XnPage",
  props: {
    isSmall: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 15,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 20, 30, 50];
      },
    },
    layout: {
      type: String,
      default: "sizes, total, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: [Boolean, String],
      default: false,
    },
  },
  computed: {
    smallLayout() {
      return this.isSmall ? "total, prev, pager, next" : this.layout;
    },
    currentPage: {
      get() {
        return this.pageNum;
      },
      set(val) {
        this.$emit("update:pageNum", val);
      },
    },
    _pageSize: {
      get() {
        return this.pageSize;
      },
      set(val) {
        this.$emit("update:pageSize", val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pagination", { pageNum: this.currentPage, pageSize: val });
      if (this.autoScroll && !this.isSmall) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { pageNum: val, pageSize: this._pageSize });
      if (this.autoScroll && !this.isSmall) {
        scrollTo(0, 800);
      }
    },
  },
};
</script>

<style>
</style>