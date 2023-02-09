<template>
  <div>
    <el-button type="primary" size="default" @click="change(1)">111</el-button>
    <el-button type="primary" size="default" @click="change(2)">222</el-button>
    <el-button type="primary" size="default" @click="asd">333</el-button>
    
    <xn-search ref="search" :form-data="formSearch" @on-search="onSearch"></xn-search>
  {{value}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      form:[],
      formSearch: [
        {
          label: "报价单状态",
          type: "select",
          prop: "salesCode",
          data:[{asd:'asdas',a:1},{asd:'sfsddfdsf',a:2}],
          options:{
            labelKey:'asd',
            valueKey:'a',
            multiple:true
          }
        },
        {
          label: "报价单状态111",
          type: "select",
          prop: "field1",
          options:{
            labelKey:'asd',
            valueKey:'a',
          }
        },
        {
          label: "报价单状态",
          type: "input",
          prop: "field2",
          
        },
        {
          label: "订单号",
          type: "city",
          prop: "city",
          placeholder: "请输入订单号",
        },
        {
          label: "下单日期",
          type: "daterange",
          options: { start: "orderTimeLeft", end: "orderTimeRight" },
        },
      ],
      formSearch1: [
        
        {
          label: "报价单状态",
          type: "select",
          prop: "field1333",
        },
 
      ],
      demoList:[{asd:'asdas',a:1},{asd:'sfsddfdsf',a:2}],
      type: 1
    };
  },
  computed:{
      value(){
        return this.$format.toText(30)
      }

  },
  methods: {
    change(val){
      this.type = val
      this.form = val === 1 ? this.formSearch : this.formSearch1
    },
    onSearch(val) {
      console.log(val);
    },
    asd() {
      console.log("rrrrrr");
      this.$refs.search.setData('报价单状态111',this.demoList)
    },
  },
};
</script>

<style>
</style>