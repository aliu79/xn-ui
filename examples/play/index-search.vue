<template>
  <div>
      <xn-search :form-data="formSearch" @on-search="onSearch"></xn-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formSearch: [
        {
          label: "报价单状态",
          type: "input",
          prop: "salesCode",
        },
        {
          label: "报价单状态",
          type: "input",
          prop: "salesCode",
        },
        {
          label: "报价单状态",
          type: "input",
          prop: "salesCode",
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
    };
  },
  methods:{
    onSearch(val){
      console.log(val);
    }
  }
};
</script>

<style>
</style>