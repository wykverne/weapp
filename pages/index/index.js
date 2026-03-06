// pages/index/index.js
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
    joinRoomId: '',
    joinRoomPassword: ''
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onShareAppMessage() {
    return {
      title: '微信小程序',
      path: '/pages/index/index'
    }
  }
  ,
  onJoinRoomIdInput(e) {
    this.setData({ joinRoomId: e.detail.value.replace(/\D/g, '') })
  },
  onJoinRoomPasswordInput(e) {
    this.setData({ joinRoomPassword: e.detail.value.replace(/\D/g, '') })
  },
  createRoom() {
    if (!this.data.hasUserInfo) {
      wx.showToast({ title: '请先授权头像昵称', icon: 'none' })
      return
    }
    wx.showModal({
      title: '设置房间密码',
      editable: true,
      placeholderText: '请输入数字密码',
      success: (res) => {
        if (res.confirm) {
          const pwd = String(res.content || '').replace(/\D/g, '')
          if (!pwd) {
            wx.showToast({ title: '密码需为数字', icon: 'none' })
            return
          }
          const roomId = String(Math.floor(100000 + Math.random() * 900000))
          wx.setStorageSync(`room:${roomId}`, { password: pwd })
          wx.navigateTo({ url: `/pages/chat/chat?roomId=${roomId}` })
        }
      }
    })
  },
  joinRoom() {
    if (!this.data.hasUserInfo) {
      wx.showToast({ title: '请先授权头像昵称', icon: 'none' })
      return
    }
    const id = this.data.joinRoomId
    const pwd = this.data.joinRoomPassword
    if (!id || !pwd) {
      wx.showToast({ title: '请输入房间号和密码', icon: 'none' })
      return
    }
    const info = wx.getStorageSync(`room:${id}`)
    if (!info || info.password !== pwd) {
      wx.showToast({ title: '房间不存在或密码错误', icon: 'none' })
      return
    }
    wx.navigateTo({ url: `/pages/chat/chat?roomId=${id}` })
  }
})