<template>
  <!-- 城市联动 -->
  <div class="xn-city">
    <el-cascader
      ref="xnCity"
      v-model="cityValue"
      placeholder="请选择城市"
      filterable
      v-bind="propsConf()"
      v-on="$listeners"
      style="width: 100%"
      :options="cityList"
      clearable
      @change="handleChange"
    />
  </div>
</template>

<script>
const ZXCITY = ["北京市", "天津市", "上海市", "重庆市"];
import citys from "xn-ui/src/area/index.js";
export default {
  name: "XnCity",
  model: {
    prop: "value",
    event: "on-change",
  },
  props: {
    /**
     * 传入对应的城市code
     * 区级 ->  省|市|区
     * 市级 ->  省|市
     * 省级 ->  省
     */
    value: {
      type: [String, Number, Object],
      default: "",
    },
    valueKey: {
      type: String,
      default: "",
    },
    /**
     * 组件类型
     * 静态显示 -> text
     * 表单类型 -> form
     */
    dataLevel: {
      type: Number,
      default: 3,
    },
    keyOptions: {
      type: Object,
      default: () => {
        return {
          codeKey: "code",
          labelKey: "label",
        };
      },
    },
    propConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * 是否全国
     */
    isAll:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      // "430000", "430200", "430203"
      val: [],
      cityList: [],
      flattenResult: [],
      propKey: {
        props: {
          label: "cityName",
          value: "cityCode",
          children: "subCitys",
        },
      },
    };
  },
  computed: {
    cityValue: {
      set: function (n) {
        this.val = n;
      },
      get: function () {
        const { value, valueKey } = this;
        const _value = valueKey ? value[valueKey] : value;
        const res = this.findParent(_value, this.flattenResult).map(
          (item) => item.cityCode
        );
        return res;
      },
    },
  },
  created() {
    this.fnGetCitys();
  },
  methods: {
    propsConf() {
      let obj = this.propKey;
      if (this.$attrs.props) {
        obj.props = Object.assign(this.$attrs.props, this.propKey.props);
      }
      return Object.assign(this.$attrs, obj);
    },
    // 为所有数据添加父级pid
    addParentKey(tree) {
      const data = JSON.parse(JSON.stringify(tree)); // deepClone
      function addParentKey(data, parentKey) {
        data.forEach((item) => {
          const { subCitys, cityCode } = item;
          item.parent = parentKey;
          if (subCitys) {
            addParentKey(subCitys, cityCode);
          }
        });
      }
      addParentKey(data, null); // 一开始的时候是null
      return data;
    },
    /**
     * @param {array} data 城市联动数据（带pid）
     */
    flattenTreeData(data) {
      const treeData = JSON.parse(JSON.stringify(data));
      const flattenData = [];
      function flattenTree(data, parentKey) {
        data.forEach((item) => {
          const { cityName, cityCode, subCitys } = item;
          flattenData.push({ cityName, cityCode, parentKey });
          if (subCitys) {
            flattenTree(subCitys, cityCode);
          }
        });
      }
      flattenTree(treeData, null);
      return flattenData;
    },
    /**
     * @param {string,number} cityCode 区县对应的code
     * @param {array} flattenTree 扁平化后的城市数据
     */
    findParent(cityCode, flattenTree, typeKey = "cityCode") {
      const parentArr = [];
      function find(cityCode, flattenTree, typeKey) {
        flattenTree.forEach((item) => {
          // eslint-disable-next-line eqeqeq
          if (item[typeKey] == cityCode) {
            parentArr.unshift(item);
            find(item.parentKey, flattenTree, typeKey);
          }
        });
      }
      find(cityCode, flattenTree, typeKey);

      return parentArr;
    },
    // 接口获取城市联动数据
    fnGetCitys() {
      const cityArr = citys;
      if(this.isAll){
        cityArr.unshift({
          cityName: '全国',
          cityCode: '000000'
        })
      }
      const _citys = this.$utils.deepClone(cityArr);
      this.cityList = this.toTreeDataLevel(_citys);
      this.flattenResult = this.flattenTreeData(
        this.addParentKey(this.cityList)
      );
    },
    // 给数据加上level并且去除最后一层空数据
    toTreeDataLevel(data) {
      if (!Array.isArray(data)) return [];
      const recursive = (data, level = 0) => {
        level++;
        return data.map((item) => {
          item.level = level;
          const child = item.subCitys;
          if (level >= 2 && this.dataLevel === 2) {
            delete item.subCitys;
          }
          if (child && child.length) {
            recursive(child, level);
          } else {
            delete item.subCitys;
          }
          return item;
        });
      };
      return recursive(data);
    },
    // 获取选中
    handleChange(code) {
      // 返回数组形式 code和label
      const { city, cityCode, cityName, cityCodeLast, cityNameLast } = this.getRes(code);
      let value = "";
      if (this.valueKey) {
        value = city[city.length - 1];
      } else {
        value = cityCodeLast;
      }
      this.$emit("on-change", value);
      this.$emit("on-city", {
        city,
        cityCode,
        cityName,
        cityCodeLast,
        cityNameLast,
      });
    },
    // 获取结果
    getRes(cityCode) {
      const cityName = this.handleTreeLabel(cityCode, this.cityList);
      const city = this.handleTreeLabel(cityCode, this.cityList, 2);
      const cityCodeLast = cityCode[cityCode.length - 1];
      const cityNameLast = cityName[cityName.length - 1];
      return {
        city,
        cityCode,
        cityName,
        cityCodeLast,
        cityNameLast,
      };
    },
    /**
     * 根据城市code 获取对应的城市
     * @param {Array} val 选中的城市code
     * @param {Array} data 城市联动数据
     */
    handleTreeLabel(val, data = [], type = 1) {
      return val.map((item) => {
        for (var itm of data) {
          // eslint-disable-next-line eqeqeq
          if (itm.cityCode == item) {
            data = itm.subCitys;
            return type === 1
              ? itm.cityName
              : {
                  [this.keyOptions.codeKey]: itm.cityCode,
                  [this.keyOptions.labelKey]: itm.cityName,
                };
          }
        }
        return null;
      });
    },

    // 方法二
    // getCity(arr, data, city = []) {
    //     if (typeof data === "object") {
    //         for (let i = 0; arr[i] !== undefined; i++) {
    //             for (let j = 0; data[j] !== undefined; j++) {
    //                 if (arr[i] === data[j].cityName) {
    //                     city.push(data[j]);
    //                 }
    //             }
    //         }
    //         for (let i = 0; data[i] !== undefined; i++) {
    //             this.getCity(arr, data[i].subCitys, city);
    //         }
    //     }
    //     return city;
    // },
    getCity(data, nameList) {
      if (nameList.length === 0) return [];
      const [cityName, ...rest] = nameList;
      const item =
        data &&
        data.find(
          (i) => i.cityName === cityName || cityName.indexOf(i.cityName) > -1
        );
      if (item) {
        return [item.cityCode, ...this.getCity(item.subCitys, rest)];
      } else {
        return [...this.getCity([], rest)];
      }
    },
    str2Code(val) {
      if (!val) return;
      val = val.replace(/[^\u4e00-\u9fa5]/g, "");
      const cityArr = val.match(this.$reg.getCity) || [];
      console.log("🚀 ~ str2Code ~ this.$reg.getCity:", this.$reg.getCity)
      console.log("🚀 ~ str2Code ~ cityArr:", cityArr)
      const newarr =
        cityArr.length &&
        cityArr.map((item, idx, arr) => {
          return ZXCITY.includes(item) && idx === 0 && arr.length == 2 ? [item, ...arr] : arr;
        })[0];
        console.log(newarr)
      const arr = this.getCity(this.cityList, newarr);
      const res = this.getRes(arr);
      return { ...res };
    },
  },
};
</script>