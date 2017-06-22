// pages/token/token.js
var TOTP = require('../../utils/totp')
var tokens = [
  {
    issue: 'Google',
    remark: 'gin.lance.inside@hotmail.com',
    digit: '434342'.split("")
  },
  {
    issue: 'Github',
    remark: 'LanceGin',
    digit: '111232'.split("")
  },
  {
    issue: 'Server',
    remark: 'gin@test',
    digit: '534154'.split("")
  },
  {
    issue: 'Server',
    remark: 'gin@mrfan',
    digit: '423111'.split("")
  }
]

Page({

  /**
   * 页面的初始数据
   */

  data: {
    tokens: tokens
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let digit = TOTP.now("J22U6B3WIWRRBTAV")
    console.log("J22U6B3WIWRRBTAV")
    console.log(digit)
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
            success: function(res) {},
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