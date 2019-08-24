// pages/user-jinyan/user-jinyan.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    jinyanList: []

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.getBannedList()
  },
  getBannedList() {
    wx.request({
      url: `${app.globalData.requestUrl}/User/user_forbidden`,
      data: {
        uid: this.data.userInfo.id
      },
      method: "POST",
      success: data => {
        data = app.null2str(data)
        if (data.data.code == '1') {
          this.setData({
            listData: data.data.data
          })
        } else {
          // 无数据时
          wx.showToast({
            title: data.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  // 取消禁言
  jyQuxiaos: function (options) {
    var that = this;
    wx.request({
      url: `http://192.168.1.168/User/cancel_forbidden`,
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      success: res => {
        that.setData({
          jyQuxiao: res.data,
        })
        console.log(res.data);
        this.userForbidden()
      }

    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
})