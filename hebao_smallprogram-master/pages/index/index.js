//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    year:"2018",
    month:"05",
    day:"02",
    money:"800,086.00",
    number:"10988"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.request({
      url: 'http://office.5ftech.com:30001/insurance/hbj/open', // 仅为示例，并非真实的接口地址
      data: {

      },
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
      }
    });
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  load_data:function(data)
  {
    console.log(data.data);
    let date = new Date(data.data.date);
    let month1 = date.getMonth()+1;
    let day1 = date.getDay();
    let money1 = data.data.money.toString();
    let len = money1.length;
    let t = len%3;
    let money2 = money1.substring(0, t) + ",";
    for(let i=0;i<(len-1)/3;i++)
    {
      money2 = money2 +  money1.substring(t, t+3) + ",";
      t = t+3;
    }
    money1 = money2.substring(0,money2.length-1) + ".00";
    console.log(money1);
    this.setData({
      month:month1,
      day:day1,
      number:data.data.number,
      money:money1
    })
  },
  onLoad:function(e)
  {
    let that = this;
    wx.request({
      url: 'http://office.5ftech.com:30001/insurance/hbj/info', // 仅为示例，并非真实的接口地址
      data: {
        
      },
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.load_data(res.data);
      }
  })
  }
})
