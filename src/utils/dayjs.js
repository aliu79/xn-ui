import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek';
require('dayjs/locale/zh-cn')
dayjs.extend(isoWeek)
export default dayjs