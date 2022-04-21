<template>
  <div class="xn-date">
    <template v-if="mode === 'range'">
      <el-date-picker
        :value="value"
        :type="type"
        align="right"
        v-bind="$attrs"
        v-on="$listeners"
        :placeholder="placeholder"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        :picker-options="pickerOpts"
        :format="format ? format : _format.format"
        :value-format="valueFormat ? valueFormat : _format.valueFormat"
        :style="styles"
        :default-time="defaultTime"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable"
        @input="onChange"
      />
    </template>
    <template v-if="mode === 'group'">
      <div class="xn-date-group">
        <el-date-picker
          v-model="startTime"
          class="xn-date-group--item"
          :type="type"
          v-bind="$attrs"
          v-on="$listeners"
          placeholder="开始日期"
          :disabled="disabled"
          :readonly="readonly"
          :clearable="clearable"
          :format="format ? format : _format.format"
          :value-format="valueFormat ? valueFormat : _format.valueFormat"
          :picker-options="groupPickerOptions"
          @change="onChangeStart"
        />
        <span class="xn-date-group--separator">-</span>
        <el-date-picker
          v-model="endTime"
          class="xn-date-group--item"
          :type="type"
          v-bind="$attrs"
          v-on="$listeners"
          placeholder="结束日期"
          :disabled="disabled"
          :readonly="readonly"
          :clearable="clearable"
          :picker-options="groupEndPickerOptions"
          :format="format ? format : _format.format"
          :value-format="valueFormat ? valueFormat : _format.valueFormat"
          @change="onChangeEnd"
        />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "XnDate",
  model: {
    prop: "value",
    event: "on-change",
  },
  props: {
    /**
     * 显示类型
     * https://element.eleme.cn/#/zh-CN/component/datetime-picker
     * year/month/date/week/ datetime/datetimerange/daterange
     */
    type: {
      type: String,
      default: "daterange",
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    value: {
      type: [String, Array],
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    // 显示的格式
    format: {
      type: String,
      default: "",
    },
    // 值的格式
    valueFormat: {
      type: String,
      default: "",
    },
    // 开启快捷选项
    isShortcut: {
      type: Boolean,
      default: false,
    },
    firstDayOfWeek: {
      type: Number,
      default: 1,
    },
    startPlaceholder: {
      type: String,
      default: "开始日期",
    },
    endPlaceholder: {
      type: String,
      default: "结束日期",
    },
    defaultTime: {
      type: [String, Array],
      default: null,
    },
    isDisabledBefore: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: "range",
      validator: (val) => {
        return ["range", "group"].indexOf(val) !== -1;
      },
    },
  },
  data() {
    return {
      startTime: "",
      endTime: "",
      groupPickerOptions: {
        disabledDate: (time) => {
          if (this.endTime !== "" && this.endTime != null) {
            // return time.getTime() > new Date(this.endTime);
          } else {
            return time.getTime() < new Date(this.endTime);
          }
        },
      },
      groupEndPickerOptions: {
        disabledDate: (time) => {
          if (this.startTime !== "") {
            return (
              time.getTime() <=
              new Date(this.startTime).getTime() - 3600 * 1000 * 24
            );
          }
        },
      },
      pickerOptionsDate: {
        disabledDate: (time) => {
          return this.isDisabledBefore
            ? time.getTime() < Date.now() - 1 * 24 * 3600 * 1000
            : false;
        },
      },
      pickerOptionsPlug: {
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, start]);
            },
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近十二个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  watch: {
    value: {
      handler(n) {
        if (this.mode === "group") {
          if (Array.isArray(n) && n.length) {
            this.startTime = n[0];
            this.endTime = n[1];
          }
        }
      },
      immediate: true,
    },
  },
  computed: {
    pickerOpts() {
      var obj = {};
      if (this.isShortcut) {
        obj = Object.assign(obj, this.pickerOptionsPlug);
      }
      if (this.isDisabledBefore) {
        obj = Object.assign(obj, this.pickerOptionsDate);
      }
      return obj;
    },
    styles() {
      const _isRange = this.isRange(this.type);
      return {
        width: _isRange ? "100%" : "auto",
      };
    },
    _format() {
      const obj = {};
      switch (this.type) {
        case "date":
          obj.format = "yyyy-MM-dd";
          obj.valueFormat = "yyyy-MM-dd HH:mm:ss";
          break;
        case "week":
          obj.format = "yyyy 第 WW 周";
          obj.valueFormat = "yyyy-MM-dd";
          break;
        case "month":
          obj.format = "yyyy-MM";
          obj.valueFormat = "yyyy-MM";
          break;
        case "year":
          obj.format = "yyyy";
          obj.valueFormat = "yyyy";
          break;
        case "dates":
          obj.format = "yyyy-MM-dd";
          obj.valueFormat = "yyyy-MM-dd";
          break;
        case "datetime":
          obj.format = "yyyy-MM-dd HH:mm:ss";
          obj.valueFormat = "yyyy-MM-dd HH:mm:ss";
          break;
        case "datetimerange":
          obj.format = "yyyy-MM-dd HH:mm:ss";
          obj.valueFormat = "yyyy-MM-dd HH:mm:ss";
          break;
        case "daterange":
          obj.format = "yyyy-MM-dd";
          obj.valueFormat = "yyyy-MM-dd HH:mm:ss";
          break;
        case "monthrange":
          obj.format = "yyyy-MM";
          obj.valueFormat = "yyyy-MM";
          break;
      }
      return obj;
    },
    isRange() {
      return (type) => {
        return ["datetimerange", "daterange", "monthrange"].includes(type);
      };
    },
  },
  methods: {
    handleTime() {
      const sUnix = this.$dayjs(this.startTime).unix();
      const eUnix = this.$dayjs(this.endTime).unix();
      if (sUnix > eUnix) {
        this.endTime = "";
      }
    },
    onChangeStart() {
      if (this.mode === "group") {
        if (this.startTime && this.endTime) {
          this.handleTime();
          this.$emit("on-change", [this.startTime, this.endTime]);
        }
      }
    },
    onChangeEnd() {
      if (this.mode === "group") {
        if (this.startTime && this.endTime) {
          this.$emit("on-change", [this.startTime, this.endTime]);
        }
      }
    },
    onChange(value) {
      if (
        this.type === "datetimerange" ||
        this.type === "daterange" ||
        this.type === "monthrange"
      ) {
        const start = value && value.length ? value[0] : "";
        const end = value && value.length ? value[1] : "";
        this.$emit("on-format", { value, start: start || "", end: end || "" });
      } else {
        this.$emit("on-format", { value });
      }
      this.$emit("on-change", value || "");
    },
  },
};
</script>
