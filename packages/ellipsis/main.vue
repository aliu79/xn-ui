<template>
  <div class="xn-ellipsis" ref="root" @mouseover="onMouseUp" @mouseleave="onMouseLeave">
    {{ expanded ? content : text }}
    <span class="xn-ellipsis__action" v-if="hasAction"  @click="onClickAction">{{
      expanded ? collapseText : expandText
    }}</span>
  </div>
</template>

<script>
export default {
  name: "XnEllipsis",
  props: {
    rows: {
      type: Number,
      default: 1,
    },
    content: {
      type: String,
      default:"",
    },
    expandText: {
      type: String,
      default: "展开",
    },
    collapseText: {
      type: String,
      default: "收起",
    },
    trigger:{
      type:String,
      default:"click"
    }
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
        console.log("🚀 ~ file: main.vue:71 ~ cloneContainer ~ root:", root)
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
        console.log(container);
        return container;
      };
      const calcEllipsisText = (container, maxHeight) => {
        const { content, expandText } = this;

        const dot = "...";
        let left = 0;
        let right = content.length;
        let res = -1;

        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          container.innerText = content.slice(0, mid) + dot + expandText;
          if (container.offsetHeight <= maxHeight) {
            left = mid + 1;
            res = mid;
          } else {
            right = mid - 1;
          }
        }
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
        this.text = content;
      }
      document.body.removeChild(container);
    },
    onClickAction(event) {
      if(this.trigger !== 'click') return
      this.expanded = !this.expanded;
      this.$emit("clickAction", event);
    },
    onMouseUp(event){
      if(this.trigger!=='hover') return
      this.expanded =!this.expanded;
      this.$emit("hover", event);
    },
    onMouseLeave(event){
      if(this.trigger!=='hover') return
      this.expanded = false;
      this.$emit("hover", event);
    }
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