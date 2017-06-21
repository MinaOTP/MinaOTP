// topt
let CryptoJS = require("cryptojs/cryptojs.js").Crypto
const DEFAULT_INTERVAL = 30

function generate(timenow, token) {
  console.log(timenow)
  console.log(token)
}

function timecode(time) {
  let time_str = Date.parse(time).toString()
  let format_time = time_str.substring(0, time_str.length-3)
  let interval = DEFAULT_INTERVAL
  return (parseInt(format_time) / interval)
}

function now(token) {
  console.log(token)
  let timenow = timecode(new Date())
  let digit = generate(timenow, token)
  return digit
}

module.exports = {
  now: now
}