// pages/movie-detail/movie-detail.js
const app = getApp();
import { convertToCastString, convertToCastInfos } from '../../utils/utils';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  processMovieData(movie) {
    const newMovie = JSON.parse(JSON.stringify(movie));
    newMovie.directors = convertToCastString(movie.directors);
    newMovie.casts = convertToCastString(movie.casts);
    newMovie.subTitle = movie.countries[0] + '·' + movie.year;
    newMovie.rating = movie.rating.stars / 10;
    newMovie.average = movie.rating.average;
    newMovie.genres = movie.genres.join('、');
    newMovie.castsInfo = convertToCastInfos(movie.casts);
    this.setData({
      movie: newMovie
    })
  },

  handleTapImg() {
    wx.previewImage({
      urls: [this.data.movie.images.large]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: `${app.baseURL}subject/${options.id}`,
      success: (res) => {
        this.processMovieData(res.data);
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