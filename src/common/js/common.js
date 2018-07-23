// 时间格式化
export function timeFormat(time){
  time = new Date(time)
  if(time == 'Invalid Date'){
    return 'Time is wrong'
  }
  const year = time.getYear() + (time.getYear() < 1900 ? 1900 : '') + ''
  const month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
  const date = (time.getDate() < 10 ? '0' : '') + time.getDate()
  const hour = (time.getHours() < 10 ? '0' : '') + time.getHours()
  const minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
  time = `${year}-${month}-${date} ${hour}:${minute}`
  return time
}
