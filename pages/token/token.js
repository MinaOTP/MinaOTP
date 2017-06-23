// pages/token/token.js
let TOTP = require('../../utils/totp')
let util = require('../../utils/util')
let digits = []
let tokens = []

Page({

  /**
   * 页面的初始数据
   */

  data: {
    tokens: digits
  },

  /**
   * 页面显示时载入
   */
  onShow: function (options) {
    let self = this
    // let test = TOTP.now("J22U6B3WIWRRBTAV")
    // console.log("J22U6B3WIWRRBTAV")
    // console.log(test)
    // 获取缓存数据
    wx.getStorage({
      key: 'token',
      success: function(res) {
        tokens = res.data
        digits = []
        for (let i = 0; i < tokens.length; i++) {
          let secret = TOTP.now(tokens[i].secret)
          let digit_obj = {
            issuer: tokens[i].issuer,
            remark: tokens[i].remark,
            secret: secret
          }
          digits.push(digit_obj)
          console.log(digits)
          self.setData({
            tokens: digits
          })
        }
      },
      fail: function(res) {
        console.log(res)
      },
    })
  },

  /**
   * 显示操作菜单
   */
  showActionSheet: function () {
    wx.showActionSheet({
      itemList: ["扫码", "手动输入"],
      itemColor: '#000000',
      success: function(res) {
        if (0 == res.tapIndex) {
          wx.scanCode({
            onlyFromCamera: true,
            success: function(res) {
              console.log(res.result)
              let url_obj = util.parseURL(res.result)
              let url_params = url_obj.params
              if (null == url_params) {
                console.log("invalid secret")
              } else {
                util.addToken(url_params, "scan")
                console.log(url_params)
              }
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        } else if (1 == res.tapIndex) {
          wx.navigateTo({
            url: '../form/form',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      },
      fail: function(res) {
        console.log("显示操作菜单错误")
      },
      complete: function(res) {},
    })
  }
})