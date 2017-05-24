var app = getApp();
Page({
  data: {
    _default:false,
    noNet:false,
    refresh:false,
    winWidth:'',
    winHeight:'',
    swiperData:[],
    videoData:{},
    textData:{},
    referData:[]
  },
  onLoad: function (options) {
    var userInfo=wx.getStorageSync('userInfo');
    console.log('页面出来');
    console.log(userInfo);
    var that = this;
    // 获取系统信息 
    wx.getSystemInfo({
        success: function (res) {
            that.setData({
                winWidth: res.windowWidth,
                winHeight: res.windowHeight,
            });
        }
    });
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    var that=this;
    this.onLoad();
    setTimeout(function(){
      wx.stopPullDownRefresh();
    },1000) 
    console.log('刷新');  
  },
  // 更多跳转
  liveMore: function (){
    wx.switchTab({
      url: '../video-live/video-live'
    })
  },
  textMore: function (){
    wx.switchTab({
      url: '../text-live/text-live'
    })
  },
  referMore: function (){
    wx.switchTab({
      url: '../refer/refer'
    })
  },
  //内参点击跳转详情页
  onPostTap:function(e){
    var postId = e.currentTarget.dataset.postId;
      wx.navigateTo({
        url: '../refer/refer-detail/refer-detail?postId=' + postId,
      })
  },
  // 点击重新加载
  reload:function(){
    this.onLoad();
  },
  
})
