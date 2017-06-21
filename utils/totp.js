// topt
let CryptoJS = require("cryptojs/cryptojs.js").Crypto
let base32 = require("base32")
const DEFAULT_INTERVAL = 30
const DEFAULT_DIGITS = 6

// 基于时间生成token
function generate(timenow, token) {
  let hmac = CryptoJS.HMAC(CryptoJS.SHA1, int_to_bytestring(timenow), byte_secret(token))
  let hmac_a = hmac.split("")
  let offset = hmac_a[hmac_a.length-1] & 0xf
  let code = (
    (hmac_a[offset] & 0x7f) << 24 |
    (hmac_a[offset + 1] & 0xff) << 16 |
    (hmac_a[offset + 2] & 0xff) << 8 |
    (hmac_a[offset + 3] & 0xff)
  )
  let digits = DEFAULT_DIGITS
  let str_code = (code % 10 ** digits).toString()
  str_code = rjust(str_code, digits)
  console.log(str_code)
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
  let result = []
  while (i != 0) {
    result.push(i & 0xFF)
    i >>= 8
  }
  result = rjust(result.reverse().join(""), padding)
  return result
}

// token基于base32加密
function byte_secret(token) {
  console.log(token)
  console.log(base32.decode(token))
  return base32.decode(token)
}

// 获取当前口令
function now(token) {
  let timenow = timecode(new Date())
  let digit = generate(timenow, token)
  return digit
}

module.exports = {
  now: now
}