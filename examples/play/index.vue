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
          prop: "cascaderValue",
          type: "cascader",
          options: {
            change:(n,o)=>{
                console.log('123',n,o)
            }
          },
          data: [
            {
              value: 1,
              label: "东南",
              children: [
                {
                  value: 2,
                  label: "上海",
                  children: [
                    { value: 3, label: "普陀" },
                    { value: 4, label: "黄埔" },
                    { value: 5, label: "徐汇" },
                  ],
                },
                {
                  value: 7,
                  label: "江苏",
                  children: [
                    { value: 8, label: "南京" },
                    { value: 9, label: "苏州" },
                    { value: 10, label: "无锡" },
                  ],
                },
                {
                  value: 12,
                  label: "浙江",
                  children: [
                    { value: 13, label: "杭州" },
                    { value: 14, label: "宁波" },
                    { value: 15, label: "嘉兴" },
                  ],
                },
              ],
            },
            {
              value: 17,
              label: "西北",
              children: [
                {
                  value: 18,
                  label: "陕西",
                  children: [
                    { value: 19, label: "西安" },
                    { value: 20, label: "延安" },
                  ],
                },
                {
                  value: 21,
                  label: "新疆维吾尔族自治区",
                  children: [
                    { value: 22, label: "乌鲁木齐" },
                    { value: 23, label: "克拉玛依" },
                  ],
                },
              ],
            },
          ],
          placeholder: "任务编号",
        },
        {
          prop: "handlerId",
          type: "select",
          options: { labelKey: "name", valueKey: "id" },
          placeholder: "请选择处理人",
        },
      ],
    };
  },
  created() {},
  mounted() {
    this.$refs.formSearch.setData("handlerId", [
      { id: "0330811d56e1eb150aac8d09330dd7ca", name: "平安录单1", type: 1 },
    ]);
  },
  methods: {
    onSearch(val) {
      console.log('val: ', val);
      
    },
  },
};
</script>

<style>
</style>