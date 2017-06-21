// topt
let CryptoJS = require("cryptojs/cryptojs.js").Crypto
const DEFAULT_INTERVAL = 30

function generate(timenow, token) {
  console.log(timenow)
  console.log(token)
  int_to_bytestring(timenow)
}

// 根据计步器格式化时间戳
function timecode(time) {
  let time_str = Date.parse(time).toString()
  let format_time = time_str.substring(0, time_str.length-3)
  let interval = DEFAULT_INTERVAL
  return (parseInt(format_time) / interval)
}

// 获取定长补零
function rjust(num, n) {
  return Array(n > num ? (n - ('' + num).length + 1) : 0).join(0) + num;
}

// int类型转换成byte二进制数据
function int_to_bytestring(i, padding = 8) {
  console.log(padding)
  let result = []
  console.log(i)
  while (i != 0) {
    result.push(i & 0xFF)
    i >>= 8
    console.log(result)
  }
  result = rjust(result.reverse().join(""), padding)
  console.log(result)
  return result
}

// 获取当前口令
function now(token) {
  console.log(token)
  let timenow = timecode(new Date())
  let digit = generate(timenow, token)
  return digit
}

module.exports = {
  now: now
}