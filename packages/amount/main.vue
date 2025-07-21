<template>
  <span class="xn-amount" :class="{ numerical: !isCapital }">
    <template v-if="!isCapital">
      <i
        class="xn-amount-prefix"
        :style="prefixStyle"
        v-if="showPrefix && ($slots.prefix || prefix)"
      >
        <slot name="prefix">
          {{ prefix }}
        </slot>
      </i>
      <slot>{{
        formatValue
          | doPrecision(legalPrecision, isRoundUp)
          | doFormat(hasSeparator, separator)
      }}</slot
      ><i
        class="xn-amount-suffix"
        :style="suffixStyle"
        v-if="$slots.suffix || suffix"
      >
        <slot name="suffix">
          {{ suffix }}
        </slot>
      </i>
    </template>
    <template v-else>
      {{ formatValue | doPrecision(4, isRoundUp) | doCapital }}
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
  },
  filters: {
    // 处理精度
    doPrecision(value, precision, isRoundUp) {
      const exponentialForm = Number(`${value}e${precision}`);
      const rounded = isRoundUp
        ? Math.round(exponentialForm)
        : Math.floor(exponentialForm);
      return Number(`${rounded}e-${precision}`).toFixed(precision);
    },
    // 处理格式
    doFormat(value, hasSeparator, separator) {
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
  },
  data() {
    return {
      formatValue: 0,
      isMounted: false,
    };
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    // 动画显示数值变化
    $_doAnimateDisplay(fromValue = 0, toValue = 0) {
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
  },
};
</script>

