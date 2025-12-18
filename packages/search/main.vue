<template>
  <div class="xn-search">
    <el-form
      ref="form"
      inline
      :model="form"
      :label-width="labelWidth"
      @submit.native.prevent
      @keyup.enter.native="handleSearch"
    >
      <div class="xn-search-flex">
        <el-row :gutter="0" class="xn-search--row">
          <template v-for="(item, idx) in visibleFormItems">
            <el-col v-bind="getColumnConfig()" :key="getItemKey(item, idx)">
              <el-form-item
                :label="item.label"
                :prop="item.prop"
                class="xn-search--row_col"
              >
                <!-- 城市选择器 -->
                <xn-city
                  v-if="item.type === 'city'"
                  v-model="item.modelVal"
                  :data-level="getCityDataLevel(item)"
                  v-bind="getItemOptions(item)"
                  @on-city="handleCityChange"
                />

                <!-- 级联选择器 -->
                <el-cascader
                  v-else-if="item.type === 'cascader'"
                  v-model="item.modelVal"
                  style="width: 100%"
                  :options="item.data"
                  v-bind="getItemOptions(item)"
                  @change="handleCascaderChange($event, item)"
                />

                <!-- 输入框 -->
                <el-input
                  v-else-if="item.type === 'input'"
                  v-model="item.modelVal"
                  style="width: 100%"
                  :clearable="getClearable(item)"
                  :placeholder="getPlaceholder(item)"
                  v-bind="getItemOptions(item)"
                />

                <!-- 下拉选择器 -->
                <el-select
                  v-else-if="item.type === 'select'"
                  v-model="item.modelVal"
                  style="width: 100%"
                  :clearable="getClearable(item)"
                  :filterable="true"
                  :placeholder="getPlaceholder(item)"
                  :remote="isRemoteSearch(item)"
                  :reserve-keyword="isRemoteSearch(item)"
                  :default-first-option="isRemoteSearch(item)"
                  :remote-method="item.remote"
                  v-bind="getItemOptions(item)"
                  @change="handleSelectChange(item)"
                >
                  <el-option
                    v-for="(option, optionIdx) in item.data"
                    :key="optionIdx"
                    :label="getOptionLabel(option, item)"
                    :value="getOptionValue(option, item)"
                  />
                </el-select>

                <!-- 日期选择器 -->
                <xn-date
                  v-else-if="isDateType(item.type)"
                  v-model="item.modelVal"
                  :mode="item.mode || 'range'"
                  :type="item.type || 'daterange'"
                  :is-shortcut="showShortcut(item)"
                  :placeholder="item.placeholder"
                  :start-placeholder="(item.options && item.options.startPlaceholder) || undefined"
                  :end-placeholder="(item.options && item.options.endPlaceholder) || undefined"
                  :clearable="getClearable(item)"
                  :default-time="getDefaultTime(item)"
                  @on-change="handleDateChange"
                  @on-format="handleDateFormatChange"
                />
              </el-form-item>
            </el-col>
          </template>

          <!-- 展开/收起按钮 -->
          <el-col
            v-if="showToggleButton"
            v-bind="toggleColumnConfig"
            class="coll-box"
          >
            <el-link type="primary" :underline="false" @click="toggleCollapse">
              <span>{{ isCollapsed ? "展开全部" : "收起" }}</span>
              <i class="ml-5" :class="toggleIcon" />
            </el-link>
          </el-col>
        </el-row>

        <!-- 操作按钮 -->
        <div class="xn-search-searchbtn" :class="{ 'is-horizontal': isHorizontalButtons }">
          <slot name="prepend" />
          <el-button type="primary" icon="el-icon-search" @click="handleSearch"
            >查询</el-button
          >
          <el-button @click="handleReset">重置</el-button>
          <slot name="append" />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { Form } from "@liuzengwei/element-ui";

// 日期类型集合
const DATE_TYPES = new Set([
  "date",
  "week",
  "month",
  "year",
  "dates",
  "datetime",
  "datetimerange",
  "daterange",
  "monthrange",
]);

// 范围类型集合
const RANGE_TYPES = new Set(["datetimerange", "daterange", "monthrange"]);

export default {
  name: "XnSearch",
  extends: Form,

  props: {
    formData: {
      type: Array,
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: "110px",
    },
    span: {
      type: Number,
      default: null,
    },
    showColl: {
      type: Boolean,
      default: true,
    },
    defaultColl: {
      type: Number,
      default: 8,
      validator: (value) => value > 0,
    },
    lastLabelWidth: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      city: {},
      form: {
        value: [],
      },
      isCollapsed: true, // 默认收起状态
    };
  },

  computed: {
    // 可见的表单项
    visibleFormItems() {
      if (!this.form.value.length) return [];

      return this.form.value.filter((item, index) => {
        // 如果已展开，显示所有项
        if (!this.isCollapsed) return true;

        // 如果收起，只显示前 defaultColl 项
        return index < this.defaultColl;
      });
    },

    // 是否显示展开/收起按钮
    showToggleButton() {
      return this.showColl && this.formData.length > this.defaultColl;
    },

    // 切换图标
    toggleIcon() {
      return this.isCollapsed ? "el-icon-arrow-down" : "el-icon-arrow-up";
    },

    // 是否横向排列按钮（查询项<=4个时横向排列）
    isHorizontalButtons() {
      return this.formData.length <= 4;
    },

    // 列配置
    columnConfig() {
      const { span } = this;
      return {
        span,
        xs: span || 24,
        sm: span || 12,
        md: span || 8,
        lg: span || 6,
        xl: span || 6,
        offset: 0,
      };
    },

    // 切换按钮列配置
    toggleColumnConfig() {
      const visibleCount = this.visibleFormItems.length;
      const { span } = this;

      // 获取每行的列数
      const xlColumns = 24 / (span || 6);
      const lgColumns = 24 / (span || 6);
      const mdColumns = 24 / (span || 8);
      const smColumns = 24 / (span || 12);
      const xsColumns = 24 / (span || 24);

      // 计算最后一行已占用的列数
      const xlLastRowUsed = visibleCount % xlColumns || xlColumns;
      const lgLastRowUsed = visibleCount % lgColumns || lgColumns;
      const mdLastRowUsed = visibleCount % mdColumns || mdColumns;
      const smLastRowUsed = visibleCount % smColumns || smColumns;
      const xsLastRowUsed = visibleCount % xsColumns || xsColumns;

      // 计算各断点下需要补齐的列数
      const xlRemaining = xlColumns - xlLastRowUsed;
      const lgRemaining = lgColumns - lgLastRowUsed;
      const mdRemaining = mdColumns - mdLastRowUsed;
      const smRemaining = smColumns - smLastRowUsed;
      const xsRemaining = xsColumns - xsLastRowUsed;

      // 如果最后一行已满，则按钮独占一行（24栅格），否则只占用剩余的栅格数
      const xlSpan = xlRemaining === 0 ? 24 : (24 / xlColumns) * xlRemaining;
      const lgSpan = lgRemaining === 0 ? 24 : (24 / lgColumns) * lgRemaining;
      const mdSpan = mdRemaining === 0 ? 24 : (24 / mdColumns) * mdRemaining;
      const smSpan = smRemaining === 0 ? 24 : (24 / smColumns) * smRemaining;
      const xsSpan = xsRemaining === 0 ? 24 : (24 / xsColumns) * xsRemaining;

      return {
        span: xlSpan,
        xs: xsSpan,
        sm: smSpan,
        md: mdSpan,
        lg: lgSpan,
        xl: xlSpan,
        offset: 0,
      };
    },
  },

  watch: {
    formData: {
      handler(newFormData) {
        if (newFormData?.length) {
          this.initFormItems();
        }
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    // 初始化表单项
    initFormItems() {
      this.form.value = this.formData.map((item, index) => ({
        ...item,
        // 确保每个项目都有唯一的内部标识
        _internalId: item.prop || `field_${index}`,
        modelVal: item.defaultValue || "",
        isShow: index < this.defaultColl || !this.showColl,
      }));
    },

    // 获取项目唯一标识
    getItemKey(item, index) {
      // 使用内部 ID 确保唯一性，即使没有 prop 也不会重复
      return `${item._internalId}_${item.type}_${index}`;
    },

    // 获取列配置
    getColumnConfig() {
      return this.columnConfig;
    },

    // 获取项目选项
    getItemOptions(item) {
      return item.options || {};
    },

    // 获取城市数据级别
    getCityDataLevel(item) {
      return item.options?.dataLevel || 2;
    },

    // 获取清除性
    getClearable(item) {
      return item.clearable !== false;
    },

    // 获取占位符
    getPlaceholder(item) {
      if (item.placeholder) return item.placeholder;

      const action = item.type === "select" ? "请选择" : "请填写";
      return `${action}${item.label}`;
    },

    // 获取选项标签
    getOptionLabel(option, item) {
      const labelKey = item.options?.labelKey || "label";
      return option[labelKey];
    },

    // 获取选项值
    getOptionValue(option, item) {
      const valueKey = item.options?.valueKey || "value";
      return option[valueKey];
    },

    // 是否为远程搜索
    isRemoteSearch(item) {
      return item.remote && typeof item.remote === "function";
    },

    // 是否为日期类型
    isDateType(type) {
      return DATE_TYPES.has(type);
    },

    // 是否为范围类型
    isRangeType(type) {
      return RANGE_TYPES.has(type);
    },

    // 获取默认时间
    getDefaultTime(item) {
      if (item.defaultTime !== undefined) return item.defaultTime;
      return this.isRangeType(item.type) ? ["00:00:00", "23:59:59"] : undefined;
    },

    // 显示快捷选项
    showShortcut(item) {
      return this.isRangeType(item.type) && item.options?.isShortcut;
    },

    // 切换展开/收起状态
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },

    // 处理搜索
    handleSearch() {
      const formData = this.buildFormData();
      this.$emit("on-search", formData);
    },

    // 处理重置
    handleReset() {
      this.resetFormFields();
      this.$emit("on-reset");
      this.$emit("on-search", {});
    },

    // 构建表单数据
    buildFormData() {
      const formData = {};

      this.form.value.forEach((item) => {
        const { prop, type, modelVal, mode } = item;

        if (this.isRangeType(type) || mode === "group") {
          const { start, end } = item.options || {};
          if (start && end) {
            formData[start] = modelVal?.[0] || "";
            formData[end] = modelVal?.[1] || "";
          }
        } else {
          formData[prop] = modelVal;
        }
      });

      return formData;
    },

    // 重置表单字段
    resetFormFields() {
      this.form.value.forEach((item) => {
        item.modelVal = item.defaultValue || "";
      });
    },

    // 处理城市变化
    handleCityChange({ cityCodeLast: cityCode, cityNameLast: cityName }) {
      this.city = { cityCode, cityName };
    },

    // 处理级联变化
    handleCascaderChange(value, item) {
      const flatValue = [...new Set(value.flat(Infinity))];
      item.modelVal = flatValue;

      const changeHandler = item.options?.change;
      if (typeof changeHandler === "function") {
        changeHandler(flatValue, value);
      }
    },

    // 处理选择变化
    handleSelectChange(item) {
      const changeHandler = item.change;
      if (typeof changeHandler === "function") {
        changeHandler(item.modelVal, item.data);
      }
    },

    // 处理日期变化
    handleDateChange() {
      // 可根据需要扩展
    },

    // 处理日期格式变化
    handleDateFormatChange() {
      // 可根据需要扩展
    },

    // 设置数据
    setData(key, data) {
      const item = this.findFormItem(key);
      if (item) {
        this.$set(item, "data", data);
      }
    },

    // 设置值
    setValue(key, value) {
      // 批量设置
      if (typeof key === "object" && key !== null) {
        Object.entries(key).forEach(([prop, val]) => {
          const item = this.findFormItem(prop);
          if (item) {
            item.modelVal = val;
          }
        });
        return;
      }

      // 单个设置
      const item = this.findFormItem(key);
      if (item) {
        this.$set(item, "modelVal", value);
      }
    },

    // 查找表单项
    findFormItem(key) {
      return this.form.value?.find(
        (item) =>
          item.prop === key || item.label === key || item._internalId === key
      );
    },
  },
};
</script>
