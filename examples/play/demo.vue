<template>
    <xn-table ref="table" :data="list" :columns="listHeader" border> </xn-table>
</template>

<script>
export default {
  data() {
    return {
      listHeader: [
        { prop: "", label: "1ID" },
        // {
        //   label: "姓名",
        //   sortable: true,
        //   render: (h, { row }) => h("span", row.name),
        // },
        // { prop: "age", label: "年龄", labelMsg: "表头字段说明" },
        // { prop: "date", label: "日期", sortable: true },
      ],
      list: [],
    };
  },
};
</script>

<style>
</style>