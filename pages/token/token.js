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
    let digit = TOTP.now("hjfdshgkjdshgkl")
    // console.log(digit)
  }
})