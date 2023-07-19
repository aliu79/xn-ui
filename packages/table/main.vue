<template>
  <div class="xn-table-box">
    <div class="xn-table-box-tools" :class="{ 'is-border': !border }">
      <div class="flex justify-content-between align-items-center">
        <div class="fz-12" :class="{ 'pb-10': isSelection }">
          <template v-if="isSelection">
            <span>已选择 {{ selectedData.length }} 项</span>
            <el-button
              type="text"
              v-show="selectedData.length"
              class="ml-5 pt-0 pb-0"
              size="mini"
              @click="clearSelection"
              >取消</el-button
            >
          </template>
        </div>
        <div
          :class="{ 'pb-10': $slots.tools || tools.length }"
          class="flex justify-content-between align-items-center"
        >
          <slot name="tools">
            <!-- <el-button-group> -->
            <div>
              <el-tooltip
                v-for="(item, idx) in tools"
                :key="idx"
                :content="item.label"
                placement="bottom"
                effect="dark"
              >
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  :icon="item.icon"
                  @click="handleToolsItem(item, idx)"
                >
                  {{ item.label }}
                </el-button>
              </el-tooltip>
            </div>
            <!-- </el-button-group> -->
          </slot>
          <el-tooltip
            class="ml-10"
            content="刷新"
            placement="bottom"
            effect="dark"
          >
            <el-button
              v-if="showRefresh"
              size="mini"
              type="primary"
              @click="$emit('on-refresh')"
              icon="el-icon-refresh"
              plain
            ></el-button>
          </el-tooltip>
        </div>
      </div>
    </div>
    <el-table
      ref="table"
      :data="data"
      v-on="$listeners"
      v-bind="$attrs"
      :border="border"
      :stripe="stripe"
      :header-row-class-name="headerRowClassName"
      @row-click="singleElection"
      @selection-change="selectionChange"
      :row-class-name="tableRowClassName"
      :class="{ 'disabled-all-selection': isRadio }"
    >
      <el-table-column
        v-if="isSelection && data.length"
        v-bind="$attrs"
        type="selection"
        width="50px"
        align="center"
        :selectable="handleSelectable"
      ></el-table-column>
      <el-table-column
        v-bind="$attrs"
        v-if="isRadio"
        width="40px"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-radio v-model="radioSelected" :label="row[idKey]"
            >&nbsp;</el-radio
          >
        </template>
      </el-table-column>
      <el-table-column
        width="50px"
        label="序号"
        v-if="index && data.length"
        type="index"
      ></el-table-column>
      <slot>
        <column
          v-for="(item, idx) in columns"
          :key="idx"
          v-show="item.checked === true"
          v-bind="item"
        ></column>
      </slot>
      <template #append v-if="$slots.append">
        <slot name="append"></slot>
      </template>
    </el-table>

    <template v-if="!$utils.isEmpty(page)">
      <xn-page
        :total="page.total"
        :pageNum.sync="page.pageNum"
        :pageSize.sync="page.pageSize"
        @pagination="getList"
        v-bind="$attrs"
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
      default: () => [],
    },
    type: {
      type: String,
      default: "",
    },
    stripe: Boolean,
    selection: Boolean,
    radio: Boolean,
    showPage: Boolean,
    showRefresh: Boolean,
    pageLayout: {
      type: String,
      default: "total, prev, pager, next, jumper",
    },
    page: {
      type: Object,
      default: () => {},
    },
    index: { type: Boolean, default: true },
    showColumn: Boolean,
    expand: Boolean,
    isTools: Boolean,
    idKey: {
      type: String,
      default: "id",
    },
    disabledList: {
      type: Array,
      require: false,
      default: () => {
        return [];
      },
    },
    disabledKey: {
      type: String,
      require: false,
      default: "",
    },
    /* 筛选条件,正则 */
    filterQuery: {
      type: Object,
      require: false,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      radioSelected: "",
      selectedData: [],
    };
  },
  computed: {
    isSelection() {
      return this.type === "selection" || this.selection;
    },
    isRadio() {
      return this.type === "radio" || this.radio;
    },
  },
  created() {},
  updated() {
    !this.$slots.default &&
      this.columns.length &&
      this.columns.forEach((item) => {
        if (item.checked !== true) this.$set(item, "checked", true);
      });
  },
  methods: {
    getList(val) {
      this.$emit("on-page", val);
    },
    singleElection(val, column) {
      if (!this.isRadio) return;
      const { idKey } = this;
      this.radioSelected = val[idKey];
      const res = this.data.find(
        (item, idx) => item[idKey] === val[idKey] && idx === val.rowIndex
      );
      this.$emit("on-single", res, column);
      this.$emit("on-radio", res, column);
    },
    handleToolsItem(row, index) {
      this.$emit("on-tools", { row, index });
    },

    selectionChange(val) {
      this.selectedData = val;
      this.$emit("selection-change", val);
      this.$emit("on-selection", val);
      // this.$refs.table.get
    },
    toggleRowSelection(row, status) {
      this.$refs.table.toggleRowSelection(row, status);
    },
    clearSelection() {
      if (this.isRadio) {
        this.radioSelected = "";
        return;
      }
      this.$refs.table.clearSelection();
    },
    doLayout() {
      this.$refs.table.doLayout();
    },
    tableRowClassName({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    headerRowClassName() {
      return "cus-table-header";
    },
    handleSelectable(row, idx) {
      if (
        this.isSelection &&
        this.$attrs.selectable &&
        typeof this.$attrs.selectable === "function"
      ) {
        return this.$attrs.selectable(row, idx);
      }
      const list = this.disabledList;
      const filter = this.filterQuery;
      if (
        list &&
        list.length &&
        this.disabledKey &&
        list.includes(row[this.disabledKey])
      ) {
        return 0;
      } else if (Object.keys(filter).length) {
        let step = 0;
        Object.keys(filter).forEach((key) => {
          if (filter[key].test(row[key])) {
            step = step + 1;
          }
        });

        if (step >= Object.keys(filter).length) {
          /* if (isChange) {
              this.key = Date.parse(new Date());
            } */
          return 1;
        } else {
          return 0;
        }
      } else {
        return 1;
      }
    },
  },
};
</script>

<style>
</style>