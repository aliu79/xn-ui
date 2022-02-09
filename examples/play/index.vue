<template>
  <xn-table
    @sort-change="handleSort"
    index
    selection
    :columns="listHeader"
    :data="list"
    :show-page="false"
    :pageConfig="pageConfig"
    @on-refresh="handleRefresh"
    @on-buttons="handleButtons"
    @on-page="fnGetList"
  ></xn-table>
</template>

<script>
export default {
  data() {
    return {
      listHeader: [
        { prop: "id", label: "ID" },
        { prop: "name", label: "姓名" },
        { prop: "age", label: "年龄", labelMsg: "表头字段说明" },
        { prop: "date", label: "日期", sortable: true },
        {
          label: "操作",
          fixed: "right",
          more: {
            options: [
              {
                label: "按钮",
                icon: "el-icon-info",
                method: "info",
              },
              { label: "删除", method: "info" },
            ],
          },
        },
      ],
      list: [
        { id: 1, date: "2011-01-01", name: "lzw", age: 18 },
        { id: 2, date: "2011-01-03", name: "lzw", age: 22 },
      ],
      pageConfig: {
        total: 100,
        pageSize: 15,
        pageNum: 1,
      },
    };
  },
  created() {},
  methods: {
    handleSort(e) {
      console.log(e);
    },
    handleRefresh() {
      console.log("re");
    },
    handleButtons(args) {
      console.log(args);
    },
    fnGetList(v) {
      console.log(v);
    },
  },
};
</script>

<style>
</style>