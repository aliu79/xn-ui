<template>
  <div style="width: 100%">
    <div
      class="xn-ellipsis"
      ref="root"
      @mouseover="onMouseUp"
      @mouseleave="onMouseLeave"
    >
      <slot>
        <template v-if="showAction"
          ><span>{{ expanded ? content : text }}</span
          ><span
            class="xn-ellipsis__action"
            v-if="hasAction"
            @click="onClickAction"
            >{{ expanded ? collapseText : expandText }}
          </span>
        </template>
        <template v-else>
          <template v-if="hasAction">
            <el-tooltip
              effect="dark"
              :content="content"
              popper-class="xn-ellipsis__tooltip"
              :disabled="showAction && hasAction"
              placement="bottom-start"
              v-bind="$attrs"
              ><span class="xn-ellipsis__text">{{ text }}</span></el-tooltip
            >
          </template>
          <template v-else>
            <span>{{
              content == undefined || content === "" ? emptyText : content
            }}</span>
          </template>
        </template>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "XnText",
  props: {
    rows: {
      type: Number,
      default: 1,
    },
    showAction: {
      type: Boolean,
      default: false,
    },
    content: {
      type: [String, Number],
      default: "",
    },
    expandText: {
      type: String,
      default: "展开",
    },
    collapseText: {
      type: String,
      default: "收起",
    },
    trigger: {
      type: String,
      default: "click",
    },
    emptyText: {
      type: String,
      default: "-",
    },
  },
  data() {
    return {
      text: "",
      expanded: false,
      hasAction: false,
    };
  },
  computed: {
    root() {
      return this.$refs.root;
    },
  },
  watch: {
    content: {
      handler() {
        this.calcEllipsised();
      },
      immediate: true,
    },
    rows: {
      handler() {
        this.calcEllipsised();
      },
      immediate: true,
    },
  },
  methods: {
    pxToNum(value) {
      if (!value) return 0;
      const match = value.match(/^\d*(\.\d*)?/);
      return match ? Number(match[0]) : 0;
    },
    calcEllipsised() {
      const { root } = this.$refs;
      const cloneContainer = () => {
        if (!root) return;
        const originStyle = window.getComputedStyle(root);
        const container = document.createElement("div");
        const styleNames = Array.prototype.slice.apply(originStyle);
        styleNames.forEach((name) => {
          container.style.setProperty(name, originStyle.getPropertyValue(name));
        });

        container.style.position = "fixed";
        container.style.zIndex = "-9999";
        container.style.top = "-9999px";
        container.style.height = "auto";
        container.style.minHeight = "auto";
        container.style.maxHeight = "auto";

        container.innerText = this.content;
        document.body.appendChild(container);
        return container;
      };
      const calcEllipsisText = (container, maxHeight) => {
        const { content, expandText, showAction } = this;

        const dot = "...";
        let left = 0;
        let right = content.length;
        let res = -1;

        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          container.innerText = showAction
            ? content.slice(0, mid) + dot + expandText
            : content.slice(0, mid) + dot;
          if (container.offsetHeight <= maxHeight) {
            left = mid + 1;
            res = mid;
          } else {
            right = mid - 1;
          }
        }
        res = showAction ? res : res;
        return content.slice(0, res) + dot;
      };

      const container = cloneContainer();
      if (!container) return;
      const { paddingBottom, paddingTop, lineHeight } = container.style;

      const { rows, content } = this;

      const maxHeight =
        (Number(rows) + 0.5) * this.pxToNum(lineHeight) +
        this.pxToNum(paddingTop) +
        this.pxToNum(paddingBottom);
      if (maxHeight < container.offsetHeight) {
        this.hasAction = true;
        this.text = calcEllipsisText(container, maxHeight);
      } else {
        this.hasAction = false;
        this.text = content == null || content === "" ? this.emptyText : content;
      }
      document.body.removeChild(container);
    },
    onClickAction(event) {
      if (this.trigger !== "click") return;
      this.expanded = !this.expanded;
      this.$emit("click-action", this.expanded, event);
    },
    onMouseUp(event) {
      if (this.trigger !== "hover") return;
      this.expanded = !this.expanded;
      this.$emit("hover-action", this.expanded, event);
    },
    onMouseLeave(event) {
      if (this.trigger !== "hover") return;
      this.expanded = false;
      this.$emit("hover-action", this.expanded, event);
    },
  },
  mounted() {
    this.calcEllipsised();
    window.addEventListener("resize", () => {
      this.calcEllipsised();
    });
  },
};
</script>

<style lang="scss" scoped>
</style>