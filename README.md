# MinaOTP

MinaOTP is a two-factor authentication tool that runs at Wechat as a mini program. It's based on [RFC6238](https://tools.ietf.org/html/rfc6238), and the algorithm was implement by `javascript`

The program will generate secure dynamic 2FA tokens for you, and the `add`, `edit`, `remove` are pretty convenient.

### Mini Program Qrcode

![qrcode](http://wx2.sinaimg.cn/large/89243dfbly1fh3j2bbfhjj20by0bydhd.jpg)

### Screenshot

![screenshot](http://orhcxc3kd.bkt.clouddn.com/WechatIMG8.png?imageView2/2/w/400)

### Feature

* Generate the 2FA token
* Scan a qrcode to add a new token
* Add a new token mannually
* Edit the issuer and remark info
* Remove a existed token

### Todo

1. backup the datas to user-defined database
2. update the progress bar and make it more easy and smooth

### [中文文档](README_zh.md)