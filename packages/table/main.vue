<template>
  <div class="xn-table-box">
    <div class="xn-table-box-tools" :class="{ 'is-border': !border }">
      <slot name="tools">
        <el-button-group>
          <el-tooltip
            v-for="(item, idx) in tools"
            :key="idx"
            :content="item.label"
            placement="bottom"
            effect="dark"
          >
            <el-button
              size="mini"
              :icon="item.icon"
              @click="handleToolsItem(item, idx)"
            >
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
    <el-button
      circle
      size="mini"
      @click="$emit('on-export')"
      icon="el-icon-files"
    ></el-button>
    <el-button
      circle
      size="mini"
      @click="$emit('on-refresh')"
      icon="el-icon-refresh"
    ></el-button>

    <el-popover
      placement="bottom-end"
      popper-class="xn-table-box-tools__pop"
      class="ml-10"
      trigger="hover"
    >
      <div class="xn-table-box-tools__coll">
        <div v-for="(item, idx) in columns" :key="idx" class="mb-5">
          <el-checkbox
            :value="item.checked"
            :checked="item.checked"
            @change="handleChangeToolshow(item)"
            >{{ item.label }}</el-checkbox
          >
        </div>
      </div>
      <el-button
        circle
        size="mini"
        icon="el-icon-setting"
        slot="reference"
      ></el-button>
    </el-popover>
    <el-table
      ref="table"
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
      <el-table-column v-bind="$attrs" v-if="radio" width="50px" align="center">
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
        <template v-for="(item, idx) in columns">
          <column
            :key="idx"
            v-if="item.checked === true"
            v-bind="item"
          ></column>
        </template>
      </slot>
    </el-table>

    <template v-if="!$utils.isEmpty(pageConfig)">
      <xn-page
        :total="pageConfig.total"
        :page.sync="pageConfig.pageNum"
        :limit.sync="pageConfig.pageSize"
        @pagination="getList"
        layout="total, prev, pager, next, jumper"
      ></xn-page>
    </template>
  </div>
</template>

<script>
import column from "./column.vue";
export default {
  name: "XnTable",
  components: { column },
  props: {
    tools: {
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
    pageLayout: {
      type: String,
      default: "total, prev, pager, next, jumper",
    },
    pageConfig: {
      type: Object,
      default: () => {},
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
  computed: {},
  created() {
    this.columns.length &&
      this.columns.forEach((item) => {
        this.$set(item, "checked", true);
      });
  },
  methods: {
    getList(val) {
      this.$emit("on-page", val);
    },

    singleElection(val) {
      if (!this.radio) return;
      this.radioSelected = val.id;
      const res = this.data.filter((item) => item.id === val.id);
      this.$emit("on-single", res);
    },
    handleToolsItem(row, idx) {
      console.log(row, idx);
    },
    handleChangeToolshow(item) {
      item.checked = item.checked === true ? false : true;
      this.$refs.table.doLayout();
      console.log(this.$root);
    },
  },
};
</script>

<style>
</style>