# MinaOTP

MinaOTP 是一款用来生成二步验证token的小程序，基于 [RFC6238](https://tools.ietf.org/html/rfc6238) 实现，TOTP算法由`javascript`实现。

The program will generate secure dynamic 2FA tokens for you, and the `add`, `edit`, `remove` are pretty convenient.

小程序会安全地实时计算动态二步验证token，token的`增加`，`编辑`，`删除`也很方便。

### 小程序码

![qrcode](http://wx2.sinaimg.cn/large/89243dfbly1fh3j2bbfhjj20by0bydhd.jpg)

### 截图

![screenshot](http://orhcxc3kd.bkt.clouddn.com/WechatIMG8.png?imageView2/2/w/400)

### 功能

* 计算二步验证token
* 扫码添加新的token
* 手动输入token添加
* 编辑服务和帐号备注信息
* 删除已存在的token

### 计划

1. 备份数据至用户自定义数据库
2. 优化进度条

### [README](README.md)