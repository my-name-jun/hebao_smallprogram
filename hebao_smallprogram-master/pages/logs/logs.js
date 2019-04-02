//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    play:'none',
    logs: [],
    year: "2018",
    month: "05",
    day: "02",
    number:"10998"
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
  load_data: function (data) {
    console.log(data.data);
    let date = new Date(data.data.date);
    let month1 = date.getMonth() + 1;
    let day1 = date.getDay();
    let year1 = date.getFullYear();
    this.setData({
      month: month1,
      day: day1,
      year:year1,
      number:data.data.number
    })
  },
  onLoad: function (e) {
    let that = this;
    wx.request({
      url: 'http://office.5ftech.com:30001/insurance/hbj/info', // 仅为示例，并非真实的接口地址
      data: {

      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.load_data(res.data);
      }
    })
  },
})
