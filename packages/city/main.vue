<template>
  <!-- 城市联动 -->
  <div class="xn-city">
    <span v-if="showType === 'text'">{{ cityLabel }}</span>
    <el-cascader
      v-else-if="showType === 'form'"
      ref="xnCity"
      v-model="cityValue"
      placeholder="请选择城市"
      filterable
      style="width: 100%"
      :options="cityList"
      :props="cityProps"
      :disabled="disabled"
      clearable
      @change="handleChange"
    />
  </div>
</template>

<script>
import citys from 'xn-ui/src/area/index.js'
// import tools from '../../../utils/index'
export default {
  name: 'XnCity',
  model: {
    prop: 'value',
    event: 'on-change'
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 传入对应的城市code
     * 区级 ->  省|市|区
     * 市级 ->  省|市
     * 省级 ->  省
     */
    value: {
      type: [String, Number, Object],
      default: ''
    },
    valueKey: {
      type: String,
      default: ''
    },
    /**
     * 显示级别
     * 3  ->  省|市|区
     * 2  ->  省|市
     */
    showLevel: {
      type: Number,
      default: 3
    },
    /**
     * 组件类型
     * 静态显示 -> text
     * 表单类型 -> form
     */
    showType: {
      type: String,
      default: 'form'
    },
    dataLevel: {
      type: Number,
      default: 3
    },
    keyOptions: {
      type: Object,
      default: () => {
        return {
          codeKey: 'code',
          labelKey: 'label'
        }
      }
    }
  },
  data() {
    return {
      // "430000", "430200", "430203"
      val: [],
      cityList: [],
      cityProps: {
        label: 'cityName',
        value: 'cityCode',
        children: 'subCitys'
      },
      flattenResult: []
    }
  },
  computed: {
    // 根据code 获取对应的父级省市区label
    cityLabel() {
      const { value, showLevel, showType, valueKey } = this
      let res = '--'
      let _value = ''
      valueKey ? _value = value[valueKey] : _value
      if (showType === 'text' && value !== '') {
        // if (!value) throw new Error("静态模式下请传入cityCode！");
        const level = showLevel > 3 ? 3 : showLevel
        res = this.findParent(_value, this.flattenResult)
          .slice(0, level)
          .map((item) => item.cityName)
          .join(` | `)
      }
      return res
    },
    cityValue: {
      set: function(n) {
        this.val = n
      },
      get: function() {
        const { value, valueKey } = this
        const _value = valueKey ? value[valueKey] : value
        const res = this.findParent(
          _value,
          this.flattenResult
        )
          .map((item) => item.cityCode)

        return res
      }
    }
  },
  created() {
    this.fnGetCitys()
  },
  methods: {
    // 为所有数据添加父级pid
    addParentKey(tree) {
      const data = JSON.parse(JSON.stringify(tree)) // deepClone
      function addParentKey(data, parentKey) {
        data.forEach((item) => {
          const { subCitys, cityCode } = item
          item.parent = parentKey
          if (subCitys) {
            addParentKey(subCitys, cityCode)
          }
        })
      }
      addParentKey(data, null) // 一开始的时候是null
      return data
    },
    /**
     * @param {array} data 城市联动数据（带pid）
     */
    flattenTreeData(data) {
      const treeData = JSON.parse(JSON.stringify(data))
      const flattenData = []
      function flattenTree(data, parentKey) {
        data.forEach((item) => {
          const { cityName, cityCode, subCitys } = item
          flattenData.push({ cityName, cityCode, parentKey })
          if (subCitys) {
            flattenTree(subCitys, cityCode)
          }
        })
      }
      flattenTree(treeData, null)
      return flattenData
    },
    /**
     * @param {string,number} cityCode 区县对应的code
     * @param {array} flattenTree 扁平化后的城市数据
     */
    findParent(cityCode, flattenTree) {
      const parentArr = []
      function find(cityCode, flattenTree) {
        flattenTree.forEach((item) => {
          // eslint-disable-next-line eqeqeq
          if (item.cityCode == cityCode) {
            parentArr.unshift(item)
            find(item.parentKey, flattenTree)
          }
        })
      }
      find(cityCode, flattenTree)
      return parentArr
    },
    // 接口获取城市联动数据
    fnGetCitys() {
      const _citys = this.$utils.deepClone(citys)
      this.cityList = this.toTreeDataLevel(_citys)
      this.flattenResult = this.flattenTreeData(
        this.addParentKey(this.cityList)
      )
    },
    // 给数据加上level并且去除最后一层空数据
    toTreeDataLevel(data) {
      if (!Array.isArray(data)) return []
      const recursive = (data, level = 0) => {
        level++
        return data.map((item) => {
          item.level = level
          const child = item.subCitys
          if (level >= 2 && this.dataLevel === 2) {
            delete item.subCitys
          }
          if (child && child.length) {
            recursive(child, level)
          } else {
            delete item.subCitys
          }
          return item
        })
      }
      return recursive(data)
    },
    // 获取选中
    handleChange(cityCode) {
      // 返回数组形式 code和label
      const cityName = this.handleTreeLabel(cityCode, this.cityList)
      const city = this.handleTreeLabel(cityCode, this.cityList, 2)
      const cityCodeLast = cityCode[cityCode.length - 1]
      const cityNameLast = cityName[cityName.length - 1]
      let value = ''
      if (this.valueKey) {
        value = city[city.length - 1]
      } else {
        value = cityCodeLast
      }
      this.$emit('on-change', value)
      this.$emit('on-city', {
        city,
        cityCode,
        cityName,
        cityCodeLast,
        cityNameLast
      })
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
            data = itm.subCitys
            return type === 1
              ? itm.cityName
              : {
                [this.keyOptions.codeKey]: itm.cityCode,
                [this.keyOptions.labelKey]: itm.cityName
              }
          }
        }
        return null
      })
    }
  }
}
</script>