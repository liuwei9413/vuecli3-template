// import Cookies from 'js-cookie'

// const TokenKey = 'Access-Token'

export const setStorage = function(key, obj) {
  let json = JSON.stringify(obj)
  window.localStorage.setItem(key, json)
}

export const getStorage = function(key) {
  const str = window.localStorage.getItem(key)
  if (!str) {
    return null
  }
  return JSON.parse(str)
}

export const clear = function() {
  window.localStorage.clear()
}

export const removeStorage = function(key) {
  window.localStorage.removeItem(key)
}

export const dateFormat = function (timestamp, format, isUtcTime) {
  var newDate = new Date()
  timestamp = isUtcTime ? (timestamp - 8 * 3600) : timestamp
  newDate.setTime(timestamp * 1000)
  var date = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds(),
    'q+': Math.floor((newDate.getMonth() + 3) / 3),
    'S+': newDate.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
    }
  }
  return format
}

export const createNewArrByOneKey = function(arr, key) {
  let result = []
  arr.forEach((item) => {
    result.push(item[key])
  })
  return result
}
