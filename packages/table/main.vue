<template>
  <div class="xn-table-box">
    <div class="xn-table-box-tools" :class="{ 'is-border': !border }">
      <div class="flex justify-content-between align-items-center">
        <div
          :class="{ 'pb-10': $slots.tools || tools.length || showRefresh || showColumn }"
        >
          <slot name="tools">
            <div v-if="tools.length">
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
          </slot>
        </div>
        <div
          :class="{ 'pb-10': $slots.tools || tools.length || showRefresh || showColumn }"
          class="flex align-items-center"
        >
          <el-tooltip
            v-if="showRefresh"
            class="ml-10"
            content="刷新"
            placement="bottom"
            effect="dark"
          >
            <el-button
              size="mini"
              type="primary"
              @click="$emit('on-refresh')"
              icon="el-icon-refresh"
              plain
            ></el-button>
          </el-tooltip>
          <el-popover
            v-if="showColumn"
            placement="bottom"
            width="150"
            trigger="click"
          >
            <div class="xn-table-box-tools__coll">
              <el-checkbox
                v-for="(item, idx) in columns"
                :key="idx"
                v-model="item.checked"
                style="display: block; margin-right: 0"
                >{{ item.label }}</el-checkbox
              >
            </div>
            <el-tooltip
              class="ml-10"
              content="列设置"
              placement="bottom"
              effect="dark"
              slot="reference"
            >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-setting"
                plain
              ></el-button>
            </el-tooltip>
          </el-popover>
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
      @row-click="singleSelection"
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
        :index="indexMethod"
      ></el-table-column>
      <slot>
        <column
          v-for="(item, idx) in visibleColumns"
          :key="idx"
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
      required: false,
      default: () => {
        return [];
      },
    },
    disabledKey: {
      type: String,
      required: false,
      default: "",
    },
    /* 筛选条件,正则 */
    filterQuery: {
      type: Object,
      required: false,
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
    currentTable() {
      return this.$refs.table;
    },
    visibleColumns() {
      return this.columns.filter(item => item.checked !== false);
    },
  },
  watch: {
    columns: {
      handler(val, oldVal) {
        if (val && val.length) {
          let needLayout = false;
          val.forEach((item) => {
            if (item.checked === undefined) {
              this.$set(item, "checked", true);
            }
          });
          
          // 检测是否有列的 checked 状态发生变化
          if (oldVal && oldVal.length) {
            needLayout = val.some((item, index) => {
              return oldVal[index] && item.checked !== oldVal[index].checked;
            });
          }
          
          // 如果列状态变化，下一帧重新计算布局
          if (needLayout) {
            this.$nextTick(() => {
              this.doLayout();
            });
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() {},
  methods: {
    indexMethod(index) {
      if (this.page && this.page.pageNum && this.page.pageSize) {
        return (this.page.pageNum - 1) * this.page.pageSize + index + 1;
      }
      return index + 1;
    },
    getList(val) {
      this.$emit("on-page", val);
    },
    singleSelection(val, column) {
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
    toggleRowExpansion(row, expanded) {
      this.$refs.table.toggleRowExpansion(row, expanded);
    },
  },
};
</script>

<style>
</style>