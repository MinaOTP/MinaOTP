// pages/form/form.js
let util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 提交数据
   */
  keySubmit: function (e) {
    let values = e.detail.value
    util.addToken(values, "man")
  }
})