<template>
  <div>
    <el-card shadow="always" class="ml-20" :body-style="{ padding: '10px' }">
      <xn-search :form-data="formSearch" @on-search="onSearch"></xn-search>
    </el-card>
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
          placeholder: "请输入订单号",
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