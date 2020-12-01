App({
  onLaunch(options) {
    // Do something initial when launch.
  },
  onShow(options) {
    // Do something when show.
  },
  onHide() {
    // Do something when hide.
  },
  onError(msg) {
    console.log(msg)
  },
  // 标识背景音乐
  gIsPlayingAudio: false,
  gIsPlayingPostId: -1,
  baseURL: 'http://t.talelin.com/v2/movie/'
})