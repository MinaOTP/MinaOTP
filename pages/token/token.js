// pages/token/token.js
let TOTP = require('../../utils/totp')
let util = require('../../utils/util')
let digits = []
let tokens = []
let percentage = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokens: digits,
    animationData: {}
  },

  /**
   * 转发
   */
  onShareAppMessage: function (res) {
    return {
      title: '便携的二步验证小程序',
      path: '/pages/token/token',
      imageUrl: '/utils/icon/demo.png',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /**
   * 页面显示时载入
   */
  onShow: function (options) {
    let self = this
    // let test = TOTP.now("J22U6B3WIWRRBTAV")
    // console.log("J22U6B3WIWRRBTAV")
    // console.log(test)

    let sc_width = 0
    // 获取屏幕宽度
    wx.getSystemInfo({
      success: function(res) {
        sc_width = res.windowWidth
      },
    })

    // 定义动画
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "linear",
      delay: 0,
    })
    // 每秒更新百分比
    setInterval(function () {
      // 更新动画
      let i = util.getSeconds() % 30 + 1
      animation.width((sc_width/30 * i)).step()

      self.setData({
        animationData: animation.export()
      })
      if (1 == i) {
        self.updateDigits(self)
      }
    }, 1000)

    self.updateDigits(self)
  },

  /**
   * 编辑或删除token
   */
  tokenOperation: function (e) {
    console.log(e.currentTarget.id)
    wx.showActionSheet({
      itemList: ["编辑", "删除"],
      itemColor: '#000000',
      success: function(res) {
        if (0 == res.tapIndex) {
          console.log("编辑" + e.currentTarget.id)
          wx.navigateTo({
            url: '../edit/edit?token_id='+e.currentTarget.id
          })
        } else if (1 == res.tapIndex) {
          console.log("删除" + e.currentTarget.id)
          util.removeToken(e.currentTarget.id)
        }
      }
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
                wx.showModal({
                  content: '无效二维码',
                  showCancel: false,
                  confirmText: '返回',
                  confirmColor: '#ff9c10',
                })
              } else {
                // 检查二维码是否符合规范
                let values = {
                  issuer: "issuer" in url_params ? url_params.issuer : "",
                  remark: "remark" in url_params ? url_params.remark : "",
                  secret: "secret" in url_params ? url_params.secret : ""
                }
                util.addToken(values, "scan")
                console.log(values)
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
  },

  /**
   * 显示导出菜单
   */
  showExportSheet: function () {
    // wx.showActionSheet({
    //   itemList: ["导出", "导入"],
    //   itemColor: "#000000",
    // })
    // 获取缓存数据
    wx.getStorage({
      key: 'token',
      success: function (res) {
        tokens = res.data
        // 复制数据至剪切板
        wx.setClipboardData({
          data: JSON.stringify(tokens),
          success: function (res) {
            // showModal提示成功
            wx.showModal({
              title: '提示',
              content: 'token数据复制成功',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        })
      },
      fail: function (res) {
        console.log(res)
      },
    })
  },

  /**
   * 更新digits
   */
  updateDigits: function (self) {
    // 获取缓存数据
    wx.getStorage({
      key: 'token',
      success: function (res) {
        tokens = res.data
        console.log(111, tokens)
        digits = []
        for (let i = 0; i < tokens.length; i++) {
          let secret = TOTP.now(tokens[i].secret)
          let digit_obj = {
            issuer: tokens[i].issuer,
            remark: tokens[i].remark,
            secret: secret
          }
          digits.push(digit_obj)
        }
        console.log(222, digits)
        self.setData({
          tokens: digits
        })
      },
      fail: function (res) {
        console.log(res)
      },
    })
  }
})