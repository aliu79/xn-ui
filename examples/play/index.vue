<template>
  <div>
    <xn-table
      @sort-change="handleSort"
      index
      selection
      :columns="listHeader"
      :data="list"
      @on-refresh="handleRefresh"
      @on-buttons="handleButtons"
    ></xn-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listHeader: [
        { prop: "id", label: "ID" },
        { prop: "name", label: "姓名" },
        { prop: "age", label: "年龄", labelMsg: "表头" },
        { prop: "date", label: "日期", sortable: true },
        {
          label: "操作",
          fixed: "right",
          more: {
            options: [{ label: "你好", method: "info" }],
          },
        },
      ],
      list: [
        { id: 1, date: "2011-01-01", name: "lzw", age: 18 },
        { id: 2, date: "2011-01-03", name: "lzw", age: 22 },
      ],
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
  },
};
</script>

<style>
</style>