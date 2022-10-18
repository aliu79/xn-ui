<template>
  <xn-table
    @sort-change="handleSort"
    :columns="listHeader"
    :data="list"
    show-page
    :pageConfig="pageConfig"
    @on-refresh="handleRefresh"
    @handle-buttons="handleButtons"
    @on-page="fnGetList"
    @on-single="onradio"
    @selection-change="onSelection"
    :tools="tools"
  >
    <!-- <template #tools>
      <div>
        123
      </div>
    </template> -->
  </xn-table>

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
        { prop: "age", label: "年龄", labelMsg: "表头字段说明" },
        { prop: "date", label: "日期", sortable: true },
        { prop: "age", label: "年龄", labelMsg: "表头字段说明" },
        { prop: "date", label: "日期", sortable: true },
        { prop: "age", label: "年龄", labelMsg: "表头字段说明" },
        { prop: "date", label: "日期", sortable: true },
        { prop: "age", label: "年龄", labelMsg: "表头字段说明" },
        { prop: "date", label: "日期", sortable: true },
        { prop: "age", label: "年龄", labelMsg: "表头字段说明" },
        { prop: "date", label: "日期", sortable: true },
        { prop: "age", label: "年龄", labelMsg: "表头字段说明" },
        { prop: "date", label: "日期", sortable: true },
        {
          label: "图片",
          render: (h) => {
            return h("div", {}, [
              h("img", {
                attrs: {
                  src: "https://i.xianniu.cn/accessory/2022/08/04/b194177e9642454480726feb2ce842fa.jpg",
                },
                style: {
                  width: "100px",
                },
              }),
              h("span", "文字文字文字文字"),
            ]);
          },
        },
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
              {
                label: "删除",
                method: "remove",
                isPopConfirm:true,
                options: {
                },
              },

            ],
          },
        },
      ],
      list: [

        { id: 122, date: "2011-01-01", name: "lzw", age: 18 },
        { id: 2, date: "2011-01-03", name: "lzw", age: 22 },
      ],
      pageConfig: {
        total: 100,
        pageSize: 15,
        pageNum: 1,
      },
      tools:[
        {label:'导出',prop:'export',icon:'el-icon-files'},
      ],
      // pageConfig: {},
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
    onradio(val) {
      console.log("val: ", val);
    },
    onSelection(val) {
      console.log(val);
    }
  },
};
</script>

<style>
</style>