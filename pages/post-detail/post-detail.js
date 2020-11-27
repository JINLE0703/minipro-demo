// pages/post-detail/post-detail.js
import { postList } from '../../public/data';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    _pid: null,
    collected: false,
    isPlayingAudio: false,
    _mgr: null
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

    if(this.data.isPlayingAudio) {
      // 播放
      this.data._mgr.src = this.data.postData.music.url;
      this.data._mgr.title = this.data.postData.music.title;
      this.data._mgr.coverImgUrl = this.data.postData.music.coverImg;
      app.gIsPlayingPostId = this.data._pid;
    } else {
      // 暂停
      this.data._mgr.pause();
      app.gIsPlayingPostId = -1;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取文章数据
    this.data._pid = options.pid;
    // 文章未收藏 初始化收藏状态
    wx.getStorageSync('posts_collected')[options.pid] === undefined ? wx.setStorageSync('posts_collected', {
      ...wx.getStorageSync('posts_collected'),
      [this.data._pid]: false
    }) : 1;
    // 初始化背景音乐
    const mgr = wx.getBackgroundAudioManager();
    mgr.onPlay(() => {
      this.setData({
        isPlayingAudio: true
      });
      app.gIsPlayingAudio = true;
    });
    mgr.onPause(() => {
      this.setData({
        isPlayingAudio: false
      });
      app.gIsPlayingAudio = false;
    });

    this.setData({
      postData: postList.filter(item => item.postId === parseInt(options.pid))[0],
      // 判断文章收藏状态
      collected: wx.getStorageSync('posts_collected')[options.pid],
      isPlayingAudio: app.gIsPlayingAudio && app.gIsPlayingPostId === options.pid,
      _mgr: mgr
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