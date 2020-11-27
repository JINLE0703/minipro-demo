// pages/post-detail/post-detail.js
import { postList } from '../../public/data';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    _pid: null,
    collected: false,
    isPlayingAudio: false,
    mgr: null
  },

  async handleCollect() {
    wx.showLoading({
      title: '请求中'
    });
    this.setData({
      collected: !this.data.collected
    })
    await wx.setStorage({
      key: 'posts_collected',
      data: {
        ...wx.getStorageSync('posts_collected'),
        [this.data._pid]: this.data.collected
      }
    });
    wx.hideLoading();
    wx.showToast({
      title: this.data.collected ? '收藏成功' : '取消收藏',
      icon: 'success',
      duration: 2000
    });
  },

  handleShare() {
    wx.showActionSheet({
      itemList: ['分享到微信', '分享到朋友圈', '更多...']
    })
  },

  handleAudio() {
    this.setData({
      isPlayingAudio: !this.data.isPlayingAudio
    });

    // 第一次点击初始化背景音乐
    if (!this.data.mgr) {
      const mgr = wx.getBackgroundAudioManager();
      mgr.src = this.data.postData.music.url;
      mgr.title = this.data.postData.music.title;
      mgr.coverImgUrl = this.data.postData.music.coverImg;
      this.setData({
        mgr
      });
    } else {
      this.data.isPlayingAudio ? this.data.mgr.play() : this.data.mgr.pause();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取文章数据
    this.data._pid = options.pid;
    this.setData({
      postData: postList.filter(item => item.postId === parseInt(options.pid))[0],
      // 判断文章收藏状态
      collected: wx.getStorageSync('posts_collected')[options.pid]
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