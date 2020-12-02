// pages/more-movies/more-movies.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _type: '',
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    this.setData({
      _type: options.type
    });
    wx.request({
      url: `${app.baseURL}${this.data._type}`,
      data: {
        start: 0,
        count: 9
      },
      success: (res) => {
        this.setData({
          movies: res.data.subjects
        });
        wx.hideNavigationBarLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let title = '';
    switch (this.data._type) {
      case 'in_theaters':
        title = '正在热映';
        break;
      case 'coming_soon':
        title = '即将上映';
        break;
      case 'top250':
        title = '豆瓣Top250';
        break;
    }
    wx.setNavigationBarTitle({
      title: title,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    wx.showNavigationBarLoading();
    wx.request({
      url: `${app.baseURL}${this.data._type}`,
      data: {
        start: 0,
        count: 9
      },
      success: (res) => {
        this.setData({
          movies: res.data.subjects
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading();
    wx.request({
      url: `${app.baseURL}${this.data._type}`,
      data: {
        start: this.data.movies.length,
        count: 9
      },
      success: (res) => {
        this.setData({
          movies: [...this.data.movies, ...res.data.subjects]
        });
        wx.hideNavigationBarLoading();
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})