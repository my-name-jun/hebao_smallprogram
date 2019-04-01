//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    play:'none',
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  modal1:function(){
    this.setData({
      play:'block'
    })
  },
  modal_hidden:function(){
    this.setData({
      play:"none"
    })
  },
})
