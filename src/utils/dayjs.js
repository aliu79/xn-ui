import dayjs from 'dayjs'
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
import isoWeek from 'dayjs/plugin/isoWeek';
import relativeTime from 'dayjs/plugin/relativeTime';
import advancedFormat from 'dayjs/plugin/advancedFormat' // 高级格式化
import customParseFormat from 'dayjs/plugin/customParseFormat' // 自定义解析格式
import isBetween from 'dayjs/plugin/isBetween' // 是否在两个日期之间
import isLeapYear from 'dayjs/plugin/isLeapYear' // 是否是闰年
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter' // 是否相同或在之后
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore' // 是否相同或在之前
import isToday from 'dayjs/plugin/isToday' // 是否是今天
import isTomorrow from 'dayjs/plugin/isTomorrow' // 是否是明天
import isYesterday from 'dayjs/plugin/isYesterday' // 是否是昨天
import localeData from 'dayjs/plugin/localeData' // 本地化数据
import minMax from 'dayjs/plugin/minMax' // 最大最小
import quarterOfYear from 'dayjs/plugin/quarterOfYear' // 季度
import utc from 'dayjs/plugin/utc' // UTC
import weekOfYear from 'dayjs/plugin/weekOfYear' // 一年中的周数
import weekYear from 'dayjs/plugin/weekYear' // 周年
import weekday from 'dayjs/plugin/weekday' // 周几

dayjs.extend(isoWeek)
dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(isBetween)
dayjs.extend(isLeapYear)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(isYesterday)
dayjs.extend(localeData)
dayjs.extend(minMax)
dayjs.extend(quarterOfYear)
dayjs.extend(utc)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(weekday)
export default dayjs
