//user.js
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  onLoad: function () {
    var self = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      self.setData({
        userInfo:userInfo
      })
    })
  }
})
