// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功', res.code)
      }
    })
  },
  
  onShow() {
    // 小程序启动，或从后台进入前台显示时
    console.log('小程序显示')
  },
  
  onHide() {
    // 小程序从前台进入后台时
    console.log('小程序隐藏')
  },
  
  onError(msg) {
    // 小程序发生脚本错误或 API 调用报错时触发
    console.log('小程序错误', msg)
  },
  
  globalData: {
    userInfo: null
  }
})