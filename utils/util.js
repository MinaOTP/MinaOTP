function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 解析url
function parseURL(url) {
  let url_a = url.split("?")
  if (1 == url_a.length) {
    return {
      params: null
    }
  } else {
    let search = url_a[1]
    return {
      params: (function () {
        var ret = {},
          seg = search.replace(/^\?/, '').split('&'),
          len = seg.length, i = 0, s;
        for (; i < len; i++) {
          if (!seg[i]) { continue; }
          s = seg[i].split('=');
          ret[s[0]] = s[1];
        }
        return ret;
      })()
    }
  }
}   

module.exports = {
  formatTime: formatTime,
  parseURL: parseURL
}
