<template>
  <div>
    <xn-dialog :before-close="() => (show = false)" :show.sync="show">
      <xn-table
        ref="table"
        :data="list"
        :index="false"
        :columns="header"
        border
        selection
        :auto-scroll="false"
        id-key="rowIndex"
        @on-single="onradio"
        :page="pageConfig"
        @selection-change="onSelection"
        @handle-buttons="handleButtons"
      >
      </xn-table>
    </xn-dialog>
    <el-button type="primary" size="default" @click="open(1)">open</el-button>
    <el-button type="primary" size="default" @click="open(2)">open</el-button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      type:1,
      listHeader2:[
        { prop: "id", label: "ID" },
      ],
      listHeader: [
        { prop: "id", label: "ID" },
        { prop: "name", label: "姓名" },
        { prop: "age", label: "年龄", labelMsg: "表头字段说明" },
        { prop: "date", label: "日期", sortable: true },
        // {
        //   label: "图片",
        //   render: (h) => {
        //     return h("el-radio", {
        //       props: {
        //         label: "空军航空",
        //       },
        //     });
        //   },
        // },
        // {
        //   label: "操作",
        //   fixed: "right",
        //   more: {
        //     options: [
        //       {
        //         label: "按钮",
        //         icon: "el-icon-info",
        //         method: "info",
        //       },
        //       {
        //         label: "删除",
        //         method: "remove",
        //         options: {},
        //       },
        //     ],
        //   },
        // },
      ],
      list: [
        { id: 122, uid: 1, date: "2011-01-01", name: "lzw", age: 18 },
        {
          id: 122,
          uid: 1,
          date: "2011-01-01",
          name: "lzwlzwlzwlzwlzwlzwlzwlzwlzwlzwlzwlzwlzwlzwlzwlzwlzw",
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
  computed:{
    header(){
      return this.type === 1 ? this.listHeader2 : this.listHeader
    }
  },
  created() {
    const res = this.$utils.arrMerge(this.list,'id')
    console.log('res: ', res);
  },
  watch: {
    show(n) {
      !n && this.$refs.table.clearSelection();
    },
  },
  methods: {
    open(val){
      this.type = val
      this.show = true
    },
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