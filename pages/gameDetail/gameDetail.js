const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    imgUrl: '',
    commentList:[],
    options: {},
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({
      options: options,
      userInfo: app.globalData.userInfo,
      imgUrl: app.globalData.imgUrl
    })
    this.getGameDetali(this.data.options.id)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(options)
    this.getGameDetali(this.data.options.id)
  },
  // 获取游戏详情
  getGameDetali(id) {
    wx.request({
      url: `${app.globalData.requestUrl}/Official/comment_list`,
      method: "POST",
      data: {
        game_id: id
      },
      success: data => {
        data = app.null2str(data)
        if (data.data.code == '1') {
          data = data.data.data
          console.log(data)
          // console.log(data.data)
          let i = 0
          for (i in data) {
            data[i]['createTime'] = app.transformTime(data[i].createTime*1000)
          }
          this.setData({
            commentList: data,
            // count: data.data.count
          })
        } else {
          // wx.showModal({
          //   title: '',
          //   content: data.data.msg,
          //   showCancel: false
          // })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})