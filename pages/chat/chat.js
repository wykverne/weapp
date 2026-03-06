const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    roomId: '',
    messages: [],
    inputValue: '',
    timers: {}
  },
  onLoad(options) {
    this.setData({ roomId: options.roomId || '' })
  },
  onUnload() {
    const t = this.data.timers
    Object.keys(t).forEach(k => clearTimeout(t[k]))
    this.setData({ timers: {} })
  },
  onInput(e) {
    this.setData({ inputValue: e.detail.value })
  },
  send() {
    const text = (this.data.inputValue || '').trim()
    if (!text) return
    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`
    const now = util.formatTime(new Date())
    const msg = { id, text, createdAt: now, self: true, senderNick: (app.globalData && app.globalData.userInfo && app.globalData.userInfo.nickName) || '' }
    const list = this.data.messages.concat(msg)
    this.setData({ messages: list, inputValue: '' })
    const timer = setTimeout(() => {
      const idx = this.data.messages.findIndex(m => m.id === id)
      if (idx !== -1) {
        const next = this.data.messages.slice()
        next.splice(idx, 1)
        this.setData({ messages: next })
      }
      const t = this.data.timers
      delete t[id]
      this.setData({ timers: t })
    }, 5000)
    const t = this.data.timers
    t[id] = timer
    this.setData({ timers: t })
  }
})