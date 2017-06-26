let TOTP = require('totp')

// 获取当前时间秒
function getSeconds() {
  let now = new Date()
  return now.getSeconds()
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

// 添加token
function addToken(values, path) {
  let token = []
  if ("" == values.secret) {
    wx.showModal({
      content: '忘记KEY了？',
      showCancel: false,
      confirmText: '返回',
      confirmColor: '#ff9c10',
    })
  } else if (null == TOTP.now(values.secret)) {
    console.log(values.secret)
    console.log(TOTP.now(values.secret))
    wx.showModal({
      content: 'KEY不合法',
      showCancel: false,
      confirmText: '返回',
      confirmColor: '#ff9c10',
    })
  } else {
    let token_obj = {
      issuer: values.issuer,
      remark: values.remark,
      secret: values.secret
    }
    console.log(token_obj)
    // 获取缓存的token数组
    wx.getStorage({
      key: 'token',
      success: function (res) {
        token = res.data
        // 更新缓存的token信息
        token.push(token_obj)
        // 更新缓存
        wx.setStorage({
          key: 'token',
          data: token,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
          },
        })
      },
      fail: function (res) {
        // 缓存中不存在token时获取初始数组
        token.push(token_obj)
        wx.setStorage({
          key: 'token',
          data: token,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
          },
        })
      },
      complete: function () {
        if ("man" == path) {
          wx.navigateBack({
            delta: 1,
          })
        } else if ("scan" == path) {
          wx.reLaunch({
            url: 'token',
          })
        }
      }
    })
  }
}

// 删除token
function removeToken(token_id) {
  let token = []
  wx.showModal({
    content: '确定删除吗',
    showCancel: true,
    cancelText: '手误',
    cancelColor: '#929292',
    confirmText: '确定',
    confirmColor: '#ff9c10',
    success: function(res) {
      if (res.confirm) {
        // 确定删除
        wx.getStorage({
          key: 'token',
          success: function(res) {
            token = res.data
            // 删除指定一位
            token.splice(token_id, 1)
            // 重新存储
            wx.setStorage({
              key: 'token',
              data: token,
              success: function(res) {
                console.log(res)
              },
              fail: function(res) {
                console.log(res)
              }
            })
          },
          complete: function(res) {
            wx.reLaunch({
              url: 'token',
            })
          }
        })
      } else if (res.cancel) {
        console.log("cancelled")
      }
    }
  })
}

module.exports = {
  getSeconds: getSeconds,
  addToken: addToken,
  removeToken: removeToken,
  parseURL: parseURL
}
