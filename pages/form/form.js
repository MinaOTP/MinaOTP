// pages/form/form.js
let token = []
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
    if ("" == values.key) {
      wx.showModal({
        content: '忘记KEY了？',
        showCancel: false,
        confirmText: '返回',
        confirmColor: '#ff9c10',
      })
    } else {
      let token_obj = {
        issue: values.service,
        remark: values.account,
        token: values.key
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
            success: function(res) {
              console.log(res)
            },
            fail: function(res) {
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
            success: function(res) {
              console.log(res)
            },
            fail: function(res) {
              console.log(res)
            },
          })
        },
        complete: function () {
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }
  }
})