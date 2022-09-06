<template>
  <div class="xn-table-box">
    <div
      class="xn-table-box-tools"
      v-if="isTools"
      :class="{ 'is-border': !border }"
    >
      <slot name="tools">
        <el-button-group>
          <el-tooltip v-for="(item,idx) in tools" :key="idx" :content="item.label" placement="bottom" effect="dark">
            <el-button  size="mini" :icon="item.icon" @click="handleToolsItem(item,idx)">
            </el-button>
          </el-tooltip>
          <el-tooltip content="刷新列表" placement="bottom" effect="dark">
          <el-button
            size="mini"
            @click="$emit('on-refresh')"
            icon="el-icon-refresh"
          ></el-button>
          </el-tooltip>
        </el-button-group>
        
      </slot>
    </div>
    <el-table
      :data="data"
      v-on="$listeners"
      v-bind="$attrs"
      :border="border"
      :stripe="stripe"
      @row-click="singleElection"
    >
      <el-table-column
        v-if="selection && data.length"
        v-bind="$attrs"
        type="selection"
        width="50px"
        align="center"
      ></el-table-column>
      <el-table-column
        v-bind="$attrs"
        v-if="radio"
        width="50px"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-radio v-model="radioSelected" :label="row.id">&nbsp;</el-radio>
        </template>
      </el-table-column>
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
    <xn-page
      :hidden="!showPage"
      :total="pageConfig.total"
      :page.sync="pageConfig.pageNum"
      :limit.sync="pageConfig.pageSize"
      @pagination="getList"
      :layout="pageLayout"
    ></xn-page>
  </div>
</template>

<script>
import column from "./column.vue";
export default {
  name: "XnTable",
  components: { column },
  props: {
    tools:{
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
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
    radio: Boolean,
    showPage: Boolean,
    pageLayout:{
      type:String,
      default:'total, prev, pager, next, jumper'
    },
    pageConfig: {
      type: Object,
      default: () => {
        return {
          pageSize: 15,
          pageNum: 1,
        };
      },
    },
    index: Boolean,
    expand: Boolean,
    isTools: Boolean,
  },
  data() {
    return {
      radioSelected: "",
    };
  },
  computed: {
    isObj() {
      return typeof this.pageConfig === "object";
    },
  },
  methods: {
    getList(val) {
      this.$emit("on-page", val);
    },
    singleElection(val) {
      if(!this.radio) return
      this.radioSelected = val.id;
      const res = this.data.filter((item) => item.id === val.id);
      this.$emit("on-single", res);
    },
    handleToolsItem(row,idx){
      console.log(row,idx);
    }
  },
};
</script>

<style>
</style>