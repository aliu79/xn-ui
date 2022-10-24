<template>
  <div class="xn-search">
    <el-form ref="form" inline :model="form" :label-width="labelWidth">
      <el-row :gutter="0" class="xn-search--row">
        <template v-for="(item, idx) in formData">
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="6"
            :offset="0"
            :key="idx"
            v-show="item.isShow || isColl"
          >
            <el-form-item
              v-if="item.type === 'city'"
              :key="idx"
              :label="item.label"
              :prop="item.prop"
              class="xn-search--row_col"
            >
              <xn-city
                :data-level="(item.options && item.options.dataLevel) || 2"
                v-model="form.value[idx].modelVal"
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
                style="width: 100%"
                v-model="form.value[idx].modelVal"
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
                style="width:100%"
                v-model="form.value[idx].modelVal"
                :placeholder="item.placeholder || '请选择' + item.label"
                :clearable="item.clearable || true"
                filterable
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
                v-model="form.value[idx].modelVal"
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
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" :offset="0">
          <el-form-item :style="{ 'padding-left': `${labelWidth}` }">
            <el-button type="primary" icon="el-icon-search" @click="onSearch"
              >查询</el-button
            >
            <el-button @click="onReset">重置</el-button>
            <el-button
              v-if="formData.length && formData.length > 4"
              type="text"
              @click="isColl = !isColl"
              ><span>{{ isColl ? "收起" : "高级查询" }}</span
              ><i class="ml-5" :class="toggle"></i
            ></el-button>
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
  },
  computed: {
    isRemote(){
      return (val)=>{
        return val && typeof val === 'function'
      }
    },
    _formData() {
      return this.formData;
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
    for (let i = 0, formData = this.formData; i < formData.length; i++) {
      const item = formData[i];
      item.isShow = i > 3 ? false : true;
      this.form.value.push({
        key: item.prop,
        modelVal: "",
      });
    }
  },
  methods: {
    onSearch() {
      const formValue = {};
      if (this.formData) {
        for (let i = 0, formData = this.formData; i < formData.length; i++) {
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
      this.form.value = [];
      for (let i = 0, formData = this.formData; i < formData.length; i++) {
        const item = formData[i];
        this.form.value.push({
          key: item.prop,
          modelVal: "",
        });
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
        this.formData && this.formData.find((item) => item.label === key);
      this.$set(row, "data", data);
    }
  },
};
</script>

