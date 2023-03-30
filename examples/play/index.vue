<template>
  <div>
    <!-- <el-tabs v-model="activeName">
      <el-tab-pane label="用户管理" name="1">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="2">
        <template v-if="activeName === '2'">
          <demo-table></demo-table>
        </template>
      </el-tab-pane>
    </el-tabs> -->

    <xn-table :columns="listHeader" :data="list"></xn-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      activeName: "1",
      type: 2,
      listHeader2: [
        {
          prop: "id",
          label: "ID",
          show: (row) => {
            console.log(row);
            return false;
          },
        },
      ],
      listHeader: [
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        { prop: "id", label: "ID" },
        {
          label: "姓名",
          sortable: true,
          render: (h, { row }) => h("span", row.name),
        },
        { prop: "age", label: "年龄", labelMsg: "表头字段说明" },
        { prop: "date", label: "日期", sortable: true },
        {
          label: "操作",
          fixed: "right",
          more: {
            options: [
              { label: "你好" },
              { label: "你好" },
              { label: "你好" },
              { label: "你好" },
              { label: "你好" },
              { label: "你好" },
            ],
          },
        },
      ],
      list: [
        { id: 122, uid: 1, date: "2011-01-01", name: "阿松大", age: 18 },
        {
          id: 123,
          uid: 1,
          date: "2011-01-01",
          name: "地方",
          age: 18,
        },
        // { id: 2, date: "2011-01-03", name: "lzw", age: 22 },
      ],
      pageConfig: {
        total: 100,
        pageSize: 15,
        pageNum: 1,
      },
      tools: [{ label: "导出", prop: "export", icon: "el-icon-files" }],
      // pageConfig: {},
    };
  },
  computed: {},
  created() {},
  watch: {},
  methods: {
    handleSort(e) {
      console.log(e);
    },
    handleRefresh() {
      console.log("re");
    },
    handleButtons(args) {
      console.log(args);
      this.$refs.table.clearSelection();
    },
    fnGetList(v) {
      console.log(v);
    },
    onradio(row, a) {
      console.log("val: ", row, a);
    },
    onSelection(val) {
      console.log(val);
    },
  },
};
</script>

<style>
</style>