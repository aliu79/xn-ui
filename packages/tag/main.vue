<script>
import { Tag } from "element-ui";
export default {
  name: "XnTag",
  extends: Tag,
  props: {
    ...Tag.props,
    icon: { type: String },
    className: { type: String },
    defaultColor: {
      type: String,
      validator: (val) => {
        return (
          ["grey", "blue", "green", "red", "yellow", "orange"].indexOf(val) !==
          -1
        );
      },
    },
  },
  computed: {
    getColor() {
      return function (hex, opacity) {
        if (!hex) hex = "#ededed";

        if (hex.length === 4) {
          var sColorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            sColorNew += hex.slice(i, i + 1).concat(hex.slice(i, i + 1));
          }
          hex = sColorNew;
        }
        let rgba =
          "rgba(" +
          parseInt("0x" + hex.slice(1, 3)) +
          "," +
          parseInt("0x" + hex.slice(3, 5)) +
          "," +
          parseInt("0x" + hex.slice(5, 7)) +
          "," +
          (opacity || "1") +
          ")";
        return rgba;
      };
    },
  },
  render() {
    const { tagSize, hit, effect, icon, className, color, type, defaultColor } =
      this;
    const classes = [
      "el-tag",
      "xn-tag",
      defaultColor ? `xn-tag--color__${defaultColor}` : "",
      type && !color ? `el-tag--${type}` : "",
      tagSize ? `el-tag--${tagSize}` : "",
      effect ? `el-tag--${effect}` : "",
      hit && "is-hit",
      className,
    ];

    const _color = (color, effect) => {
      let c = {};
      if (!color) return null;
      switch (effect) {
        case "dark":
          c = {
            border: `1px solid ${color}`,
            backgroundColor: `${color}`,
          };
          break;
        case "light":
          c = {
            border: `1px solid ${color}`,
            color,
            backgroundColor: `${this.getColor(color, 0.2)}`,
          };
          break;
        case "plain":
          c = {
            border: `1px solid ${color}`,
            color,
            backgroundColor: `none`,
          };
          break;
      }
      return c;
    };

    const isIcon = this.$slots.icon || (icon && <i class={icon}></i>);
    const tagEl = (
      <span style={{ ..._color(color, effect) }} class={classes}>
        {isIcon} {this.$slots.default}
      </span>
    );

    return tagEl;
  },
};
</script>

<style lang="scss" scoped>

</style>