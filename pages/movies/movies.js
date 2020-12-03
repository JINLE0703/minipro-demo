// pages/movies/movies.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    comingSoon: [],
    top250: [],
    hadSearched: false,
    searchData: []
  },

  handleTapMore(e) {
    wx.navigateTo({
      url: `/pages/more-movies/more-movies?type=${e.detail.type}`,
    })
  },

  handleSearchConfirm(e) {
    this.setData({
      hadSearched: true
    })
    wx.request({
      url: `${app.baseURL}search`,
      data: {
        q: e.detail.value
      },
      success: (res) => {
        this.setData({
          searchData: res.data.subjects
        })
      }
    })
  },

  handleSearchCancel() {
    this.setData({
      hadSearched: false,
      searchData: []
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: `${app.baseURL}in_theaters`,
      data: {
        start: 0,
        count: 3
      },
      success: (res) => {
        this.setData({
          inTheaters: res.data.subjects
        })
        // console.log(res)
      }
    });
    wx.request({
      url: `${app.baseURL}coming_soon`,
      data: {
        start: 0,
        count: 3
      },
      success: (res) => {
        this.setData({
          comingSoon: res.data.subjects
        })
        // console.log(res)
      }
    });
    wx.request({
      url: `${app.baseURL}top250`,
      data: {
        start: 0,
        count: 3
      },
      success: (res) => {
        this.setData({
          top250: res.data.subjects
        })
        // console.log(res)
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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