
import { areaList as rawData } from './data.js'

/**
 * 将原始数据转换为当前格式的函数
 * @param {Object} rawData - 原始数据，包含 province_list, city_list, county_list
 * @returns {Array} - 转换后的地区列表
 */
function transformAreaData(rawData) {
  const { province_list, city_list, county_list } = rawData
  const result = []

  // 预处理：按省份代码前两位分组城市
  const citiesByProvince = {}
  for (const cityCode in city_list) {
    const provincePrefix = cityCode.substring(0, 2)
    if (!citiesByProvince[provincePrefix]) {
      citiesByProvince[provincePrefix] = []
    }
    citiesByProvince[provincePrefix].push({
      cityCode,
      cityName: city_list[cityCode]
    })
  }

  // 预处理：按城市代码前四位分组区县
  const countiesByCity = {}
  for (const countyCode in county_list) {
    const cityPrefix = countyCode.substring(0, 4)
    if (!countiesByCity[cityPrefix]) {
      countiesByCity[cityPrefix] = []
    }
    countiesByCity[cityPrefix].push({
      cityCode: countyCode,
      cityName: county_list[countyCode]
    })
  }

  // 构建省市区层级结构
  for (const provinceCode in province_list) {
    const provinceName = province_list[provinceCode]
    const provincePrefix = provinceCode.substring(0, 2)
    
    const provinceData = {
      cityName: provinceName,
      cityCode: provinceCode,
      subCitys: []
    }

    // 获取该省份下的所有城市
    const cities = citiesByProvince[provincePrefix] || []
    for (const city of cities) {
      const cityData = {
        cityName: city.cityName,
        cityCode: city.cityCode,
        subCitys: countiesByCity[city.cityCode.substring(0, 4)] || []
      }
      provinceData.subCitys.push(cityData)
    }

    result.push(provinceData)
  }

  return result
}

// 处理原始数据并导出
const areaList = transformAreaData(rawData)

export default areaList

