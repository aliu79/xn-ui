<template>
  <div class="xn-search">
    <el-form
      ref="form"
      inline
      :model="form"
      :label-width="labelWidth"
      @submit.native.prevent
      @keyup.enter.native="onSearch"
    >
      <el-row :gutter="0" class="xn-search--row">
        <template v-for="(item, idx) in form.value">
          <el-col v-bind="{ ...col }" :key="idx" v-show="item.isShow || isColl">
            <el-form-item
              v-if="item.type === 'city'"
              :key="idx"
              :label="item.label"
              :prop="item.prop"
              class="xn-search--row_col"
            >
              <xn-city
                :key="item.prop"
                :data-level="(item.options && item.options.dataLevel) || 2"
                v-model="item.modelVal"
                @on-city="handleChangeCity"
                
              />
            </el-form-item>
            <el-form-item
              v-if="item.type === 'input'"
              :key="idx"
              :label="item.label"
              :prop="item.prop"
              class="xn-search--row_col"
            >
              <el-input
                :key="item.prop"
                style="width: 100%"
                v-bind="item.options ? { ...item.options } : {}"
                v-model="item.modelVal"
                :clearable="item.clearable || true"
                :placeholder="item.placeholder || '请填写' + item.label"
              />
            </el-form-item>
            <el-form-item
              v-if="item.type === 'select'"
              :key="idx"
              :label="item.label"
              :prop="item.prop"
              class="xn-search--row_col"
            >
              <el-select
                :key="item.prop"
                style="width: 100%"
                v-model="item.modelVal"
                :placeholder="item.placeholder || '请选择' + item.label"
                :clearable="item.clearable || true"
                filterable
                v-bind="item.options ? { ...item.options } : {}"
                :remote="isRemote(item.remote)"
                :reserve-keyword="isRemote(item.remote)"
                :default-first-option="isRemote(item.remote)"
                :remote-method="item.remote"
                
              >
                <el-option
                  v-for="(itemData, idxData) in item.data"
                  :key="idxData"
                  :label="
                    itemData[(item.options && item.options.labelKey) || 'label']
                  "
                  :value="
                    itemData[(item.options && item.options.valueKey) || 'value']
                  "
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="isDate(item.type)"
              :key="idx"
              :label="item.label"
              :prop="item.prop"
              class="xn-search--row_col"
            >
              <xn-date
                :key="item.prop"
                v-model="item.modelVal"
                :mode="item.mode || 'range'"
                :type="item.type || 'daterange'"
                :is-shortcut="showShortcut(item)"
                :placeholder="item.placeholder"
                :startPlaceholder="
                  item.options && item.options.startPlaceholder
                "
                :endPlaceholder="item.options && item.options.endPlaceholder"
                :clearable="item.clearable || true"
                :default-time="
                  isRange(item.type) && item.defaultTime == undefined
                    ? ['00:00:00', '23:59:59']
                    : item.defaultTime
                "
                @on-change="onChangeDate"
                @on-format="onChangeDateFormat"
              />
            </el-form-item>
          </el-col>
        </template>
        <el-col v-bind="{ ...col }">
          <el-form-item
            class="xn-search-searchbtn"
            :style="{ 'padding-left': `${lastLabelWidth || labelWidth}` }"
          >
            <slot name="prepend"></slot>
            <el-button type="primary" icon="el-icon-search" @click="onSearch"
              >查询</el-button
            >
            <el-button @click="onReset">重置</el-button>
            <slot name="append"></slot>
            <el-button
              v-if="formData.length && formData.length > defaultColl"
              type="text"
              @click="isColl = !isColl"
            >
              <template v-if="_showColl">
                <span>{{ isColl ? "收起" : "展开" }}</span
                ><i class="ml-5" :class="toggle"></i>
              </template>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "XnSearch",
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
      default: 3,
    },
    lastLabelWidth: {
      type: String,
      default: null,
    },
  },
  computed: {
    _showColl() {
      const {
        form: { value },
        defaultColl,
        showColl,
      } = this;
      if (value.length <= defaultColl) {
        return false;
      }
      return showColl;
    },
    col() {
      const { span } = this;
      return {
        span,
        xs: span ? span : 24,
        sm: span ? span : 12,
        md: span ? span : 8,
        lg: span ? span : 6,
        xl: span ? span : 6,
        offset: 0,
      };
    },
    isRemote() {
      return (val) => {
        return val && typeof val === "function";
      };
    },
    toggle() {
      return this.isColl ? "el-icon-arrow-up" : "el-icon-arrow-down";
    },
    isDate() {
      return (type) => {
        return [
          "date",
          "week",
          "month",
          "year",
          "dates",
          "datetime",
          "datetimerange",
          "daterange",
          "monthrange",
        ].includes(type);
      };
    },
    isRange() {
      return (type) => {
        return ["datetimerange", "daterange", "monthrange"].includes(type);
      };
    },
    showShortcut() {
      return (item) => {
        let flag = "";
        if (this.isRange(item.type)) {
          flag = item.options.isShortcut;
        } else {
          flag = false;
        }

        return flag;
      };
    },
  },
  data() {
    return {
      city: {},
      form: {
        value: [],
      },
      isColl: false,
    };
  },
  created() {
    // this.init();
  },
  watch: {
    formData: {
      handler(n) {
        n && n.length && this.init();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    init() {
      this.form.value = [];
      for (let i = 0, formData = this.formData; i < formData.length; i++) {
        const item = formData[i];
        item.isShow = i >= this.defaultColl && this.showColl ? false : true;
        this.form.value.push({
          ...item,
          key: item.prop,
          modelVal: "",
        });
      }
    },
    onSearch() {
      const formValue = {};
      if (this.form.value) {
        for (let i = 0, formData = this.form.value; i < formData.length; i++) {
          const item = formData[i];
          const index = i;
          const key = item.prop;
          const value = this.form.value[index].modelVal;
          if (this.isRange(item.type) || item.mode === "group") {
            if (
              item.options &&
              item.options.start &&
              item.options &&
              item.options.end
            ) {
              formValue[item.options.start] = value[0] || "";
              formValue[item.options.end] = value[1] || "";
            }
          } else {
            formValue[key] = value;
          }
        }
      }
      this.$emit("on-search", formValue);
    },
    onReset() {
      for (let i = 0, formData = this.form.value; i < formData.length; i++) {
        const item = formData[i];
        item.modelVal = "";
      }
      this.$emit("on-reset");
      this.$emit("on-search", {});
    },
    onChangeDate() {
      // console.log(val);
    },
    onChangeDateFormat() {
      // console.log(val);
    },
    handleChangeCity({ cityCodeLast: cityCode, cityNameLast: cityName }) {
      this.city = { cityCode, cityName };
    },
    setData(key, data) {
      const row =
        this.form.value && this.form.value.find((item) => item.label === key);
      this.$set(row, "data", data);
    },
    setValue(key, value) {
      if (Object.prototype.toString.call(key) === "[object Object]") {
        const list = this.form.value;
        const keys = Object.keys(key);
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          if (keys.includes(item.prop)) {
            item.modelVal = key[item.prop];
          }
        }
        return;
      }

      const row =
        this.form.value && this.form.value.find((item) => item.label === key);
      if (row) {
        this.$set(row, "modelVal", value);
      }
    },
  },
};
</script>

