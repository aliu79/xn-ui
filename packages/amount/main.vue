<template>
  <span class="xn-amount" :class="{ numerical: !isCapital }">
    <template v-if="!isCapital">
      <i
        class="xn-amount-prefix"
        :style="prefixStyle"
        v-if="showPrefix && ($slots.prefix || prefix)"
      >
        <slot name="prefix">{{ prefix }}</slot>
      </i><!--
      --><template v-if="$slots.default">
        <template v-if="slotTextContent !== null && !isNaN(Number(slotTextContent))">
          {{ formatUserValue(Number(slotTextContent)) }}
        </template>
        <slot v-else></slot>
      </template>
      <template v-else>
        {{ formattedValue }}
      </template><!--
      --><i
        class="xn-amount-suffix"
        :style="suffixStyle"
        v-if="$slots.suffix || suffix"
      >
        <slot name="suffix">{{ suffix }}</slot>
      </i>
    </template>
    <template v-else>
      {{ formatValue | doPrecision(4, isRoundUp, emptyValue) | doCapital }}
    </template>
  </span>
</template>

<script>
import { formatValueByGapStep } from "./formate-value.js";
import numberCapital from "./number-capital.js";
import { noop } from "./noop.js";
import Animate from "./animate.js";

export default {
  name: "XnAmount",
  inheritAttrs: false,
  props: {
    value: {
      type: Number,
      default: 0,
    },
    precision: {
      type: Number,
      default: 2,
    },
    isRoundUp: {
      type: Boolean,
      default: true,
    },
    hasSeparator: {
      type: Boolean,
      default: true,
    },
    separator: {
      type: String,
      default: ",",
    },
    isAnimated: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: Boolean,
      default: false,
    },
    isCapital: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 1000,
    },
    prefix: {
      type: String,
      default: "￥",
    },
    showPrefix: {
      type: Boolean,
      default: true,
    },
    prefixStyle: {
      type: Object,
      default: () => ({}),
    },
    suffix: {
      type: String,
      default: "",
    },
    suffixStyle: {
      type: Object,
      default: () => ({}),
    },
    emptyValue: {
      type: String,
      default: "--",
    },
  },
  filters: {
    // 处理精度
    doPrecision(value, precision, isRoundUp, emptyValue = '--') {
      // 处理空值情况
      if (value == null || isNaN(value)) {
        return emptyValue;
      }
      
      const exponentialForm = Number(`${value}e${precision}`);
      const rounded = isRoundUp
        ? Math.round(exponentialForm)
        : Math.floor(exponentialForm);
      return Number(`${rounded}e-${precision}`).toFixed(precision);
    },
    // 处理格式
    doFormat(value, hasSeparator, separator) {
      // 如果值为空或者是非数字字符串（如空值显示），直接返回
      if (!value || isNaN(parseFloat(value))) {
        return value;
      }
      
      if (!hasSeparator) {
        return value;
      }

      const numberParts = value.split(".");
      let integerValue = numberParts[0];
      const decimalValue = numberParts[1] || "";

      let sign = "";
      if (integerValue.startsWith("-")) {
        integerValue = integerValue.substring(1);
        sign = "-";
      }

      const formateValue = formatValueByGapStep(
        3,
        integerValue,
        separator,
        "right",
        0,
        1
      );
      return decimalValue
        ? `${sign}${formateValue.value}.${decimalValue}`
        : `${sign}${formateValue.value}`;
    },
    // 转换为大写
    doCapital(value) {
      return numberCapital(value);
    },
  },
  watch: {
    value: {
      handler(val, oldVal) {
        /* istanbul ignore if  */
        if (!this.isMounted) {
          this.formatValue = val;
          return;
        }
        if (this.isAnimated || this.transition) {
          this.$_doAnimateDisplay(oldVal, val);
        } else {
          this.formatValue = val;
        }
      },
      immediate: true,
    },
  },
  computed: {
    // 计算合法精度
    legalPrecision() {
      return this.precision > 0 ? this.precision : 0;
    },
    // 计算格式化后的值
    formattedValue() {
      // 如果有默认插槽内容，则不对插槽内容进行格式化
      if (this.$slots.default) {
        return;
      }
      
      // 应用精度和分隔符格式化
      const value = this.formatValue;
      const precisionValue = this.$options.filters.doPrecision(
        value, 
        this.legalPrecision, 
        this.isRoundUp, 
        this.emptyValue
      );
      return this.$options.filters.doFormat(
        precisionValue, 
        this.hasSeparator, 
        this.separator
      );
    },
    // 获取默认插槽的文本内容
    slotTextContent() {
      if (!this.$slots.default || !this.$slots.default.length) {
        return null;
      }
      
      // 获取插槽内容
      const slot = this.$slots.default[0];
      
      // 如果是文本节点
      if (slot.text) {
        return slot.text.trim();
      }
      
      // 如果是简单的VNode且包含文本
      if (slot.children && slot.children.length > 0 && slot.children[0].text) {
        return slot.children[0].text.trim();
      }
      
      return null;
    },
  },
  data() {
    return {
      formatValue: null,
      isMounted: false,
    };
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    // 动画显示数值变化
    $_doAnimateDisplay(fromValue = 0, toValue = 0) {
      // 如果目标值为null，直接设置为null
      if (toValue == null) {
        this.formatValue = null;
        return;
      }
      
      // 如果起始值为null，设置为0
      if (fromValue == null) {
        fromValue = 0;
      }
      
      /* istanbul ignore next  */
      const step = (percent) => {
        if (percent === 1) {
          this.formatValue = toValue;
          return;
        }
        this.formatValue = fromValue + (toValue - fromValue) * percent;
      };

      /* istanbul ignore next  */
      const verify = (id) => id;
      Animate.start(step, verify, noop, this.duration);
    },
    // 格式化用户提供的值
    formatUserValue(value) {
      if (value == null || isNaN(value)) {
        return this.emptyValue;
      }
      
      // 应用精度和分隔符格式化
      const precisionValue = this.$options.filters.doPrecision(
        value, 
        this.legalPrecision, 
        this.isRoundUp, 
        this.emptyValue
      );
      return this.$options.filters.doFormat(
        precisionValue, 
        this.hasSeparator, 
        this.separator
      );
    },
  },
};
</script>

