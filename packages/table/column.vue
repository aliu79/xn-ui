<template>
  <el-table-column
    v-bind="$attrs"
    v-on="$listeners"
    :showOverflowTooltip="$attrs.showOverflowTooltip !== false"
    v-if="isShowColumn($attrs)"
  >
    <template v-if="$attrs.labelMsg">
      <template slot="header">
        <el-tooltip
          class="item"
          effect="dark"
          :content="$attrs.labelMsg"
          placement="right"
        >
          <span>{{ $attrs.label }} <i class="el-icon-question"></i></span>
        </el-tooltip>
      </template>
    </template>
    <template slot-scope="{ row, $index }">
      <expandDom
        v-if="$attrs.render"
        :column="row"
        :row="row"
        :render="$attrs.render"
        :index="$index"
      ></expandDom>
      <template v-else>
        {{ row[$attrs.prop] }}
      </template>
      <!-- 更多操作 -->
      <template v-if="$attrs.more && $attrs.more.options.length">
        <template v-for="(itemBtn, idxBtn) in $attrs.more.options">
          <expand-dom
            v-if="itemBtn.render && itemBtn.show && itemBtn.show(row)"
            :key="idxBtn"
            :column="itemBtn"
            :row="row"
            :render="itemBtn.render"
            :index="idxBtn"
          />
          <template v-else>
            <el-popconfirm
              v-if="itemBtn.isPopConfirm"
              :title="itemBtn.options.title || `确定${label(itemBtn, row)}吗？`"
              :key="idxBtn"
              :confirm-button-text="itemBtn.options.confirmButtonText"
              class="ml-10"
              @confirm="handleClick(itemBtn.method, row, $index)"
            >
              <el-button
                :type="itemBtn.type || 'text'"
                :size="itemBtn.size || 'mini'"
                :icon="itemBtn.icon"
                :plain="itemBtn.plain"
                slot="reference"
                >{{ label(itemBtn, row) }}</el-button
              >
            </el-popconfirm>
            <template v-else>
              <el-button
                v-if="itemBtn.show ? itemBtn.show(row) : true"
                :key="idxBtn"
                :disabled="itemBtn.disabled ? itemBtn.disabled(row) : false"
                :type="itemBtn.type || 'text'"
                :size="itemBtn.size || 'mini'"
                :icon="itemBtn.icon"
                :plain="itemBtn.plain"
                @click.native.stop="handleClick(itemBtn.method, row, $index)"
                >{{ label(itemBtn, row) }}</el-button
              >
            </template>
          </template>
        </template>
      </template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null,
        },
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index,
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
      },
    },
  },
  computed: {
    label() {
      return (itemBtn, row) => {
        return typeof itemBtn.label === "function"
          ? itemBtn.label(row)
          : itemBtn.label;
      };
    },
    isShowColumn() {
      return (row) => {
        if (row.show != undefined) {
          return typeof row.show === "function" ? row.show() : row.show;
        }
        return true;
      };
    },
  },

  watch: {},
  methods: {
    handleClick(method, row, index) {
      if (this.$parent) {
        this.$parent.$emit("handle-buttons", {
          method,
          row,
          index,
        });
      }
    },
  },
};
</script>

<style>
</style>