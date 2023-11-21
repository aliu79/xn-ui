<template>
  <div>
    <xn-search
      ref="formSearch"
      class="mt-18"
      :span="4"
      :show-coll="false"
      :form-data="formSearch"
      @on-search="onSearch"
    ></xn-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formSearch: [
        
        { prop: "type", type: "input", placeholder: "商机编号" },
        { prop: "taskNo", type: "input", placeholder: "任务编号" },
        {
          prop: "handlerId",
          type: "select",
          options: { labelKey: "name", valueKey: "id" },
          placeholder: "请选择处理人",
        },
      ],
    };
  },
  created(){

  },
  mounted(){
    this.$refs.formSearch.setData('handlerId',[
       {id: "0330811d56e1eb150aac8d09330dd7ca", name: "平安录单1", type: 1   }
    ])
  },
  methods:{
    onSearch(){
        // console.log('val: ', val);
        this.$utils.download({
          url:'https://xianniu-file.oss-cn-beijing.aliyuncs.com/accessory/2023/11/15/生成结果20231115164426130.pdf',
        })
    }
  }
};
</script>

<style>
</style>