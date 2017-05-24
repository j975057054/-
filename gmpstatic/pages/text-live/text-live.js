var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var page = 1;
var pageSize = 4;
Page({
  data: {
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    comHeight: 0,
    viewpoint: '',
    interact: '',
    noData: false,
    refesh: false,
    loadMore: false,
    interactList: null,
    opinion: null,
    insertData: '',
    shareNum: '',
    //判断用户老师
    user: 0,
    //视频开关
    poitWidth: 0,
    switchState: false,
    btnShow: null,
    menuState: false,
    // 品种选择 
    array: ['奥氏黄檀', '中国', '巴西', '日本'],
    deal: ['买入建仓', '卖出补仓'],
    objectArray: [
      { id: 0, name: '奥氏黄檀' },
      { id: 1, name: '中国' },
      { id: 2, name: '巴西' },
      { id: 3, name: '日本' }
    ],
    objectDeal: [
      { id: 0, name: '买入建仓' },
      { id: 1, name: '卖出补仓' }
    ],
    index: 0,
    indexa: 0,
    // tab切换 
    currentTab: 0,
    curTab: 0,
    playId: null,
    replyId: null,
    focused: false,
    userId: 1
  },
  onLoad: function (options) {
    var that = this;
    console.log('分享后传的参数' + options.userId);
    // 获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          btnShow: true,
        });
        var insertData = '<img class="add" src="http://images.ytzg88.cn/20170323_58d3abc608ba0.png" />';
        WxParse.wxParse('insertData', 'html', insertData, that);
      }
    });
    this.fetchData();
    // this.getHttpData('key','json',function(data){
    //     console.log(data);
    //     // if(data.data==null){
    //     //     that.setData({
    //     //         noData:true
    //     //     })
    //     // }else{
    //     //     that.setData({
    //     //         noData:false
    //     //     })
    //     // }
    // })
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('videoA');
  },
  // 分享
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题' + this.data.userId,
      path: '/pages/video-live/video-live?userId=' + this.data.userId,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          image: '../images/no_data_01.png',
          duration: 800
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '分享失败',
          icon: 'success',
          duration: 800
        })
      }
    }
  },
  //input观点内容
  intPoint: function (e) {
    var viewpoint = e.detail.value;
    this.setData({
      viewpoint: e.detail.value
    })
  },
  //input互动内容
  interactive: function (e) {
    var interact = e.detail.value;
    this.setData({
      interact: e.detail.value
    })
  },
  //发送观点
  sendPoint: function () {
    console.log(this.data.viewpoint);
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo);
    if (this.data.viewpoint == '') {
      return wx.showToast({
        title: '内容不能为空',
        icon: 'loading',
        duration: 800
      })
    }
  },
  //发送互动
  sendInteract: function () {
    console.log(this.data.interact);
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo);
    if (this.data.interact == '') {
      return wx.showToast({
        title: '内容不能为空',
        icon: 'loading',
        duration: 800
      })
    };
  },
  //视频开关
  switchOff: function (e) {
    let switchState = false;
    console.log('视频关闭');
    var that = this;
    that.setData({
      switchState: false,
      poitWidth: 0
    });
    this.videoContext.pause();
  },
  switchOn: function (e) {
    let switchState = true;
    console.log('视频打开');
    var that = this;
    that.setData({
      switchState: true
    });
    // this.videoContext.play();
    // 获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          poitWidth: res.windowWidth
        });
      }
    });
  },
  //  选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var that = this;
    that.setData({
      index: e.detail.value
    })
  },
  bindPickerChangeA: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var that = this;
    that.setData({
      indexa: e.detail.value
    })
  },
  // focusTap: function () {
  //     let focused = true;
  //     this.setData({ focused: true });
  // },
  // blurTap: function () {
  //     let focused = false;
  //     this.setData({ focused: false });
  // },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    if (e.detail.current == 2) {
      that.teams();
    }
  },
  // 点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      });
    }
  },
  // 获取老师团队
  teams: function () {
    wx.request({
      url: 'http://192.168.6.61:8091/api/live/teams',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res);
      },
      fail: function () {
        // fail
      }
    })
  },
  // 历史tab切换
  handOver: function (e) {
    var that = this;
    if (this.data.curTab === e.currentTarget.dataset.cur) {
      return false;
    } else {
      that.setData({
        curTab: e.currentTarget.dataset.cur
      });
    }
  },
  //历史视频切换
  playTab: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.playId);
    console.log(e.currentTarget.dataset.src);
    if (this.data.playId === e.currentTarget.dataset.playId) {
      that.setData({
        playId: null
      });
      // return false;
    } else {
      that.setData({
        playId: e.currentTarget.dataset.playId,
        videoSrc: e.currentTarget.dataset.src
      });
    }
  },
  //  评论操作
  replyMenu: function (e) {
    var that = this;
    console.log(this.data.replyId);
    if (this.data.replyId === e.currentTarget.dataset.replyId) {
      that.setData({
        replyId: null
      });
    } else {
      that.setData({
        replyId: e.currentTarget.dataset.replyId,
      });
    }

  },
  // 删除
  replyDel: function (e) {
    console.log(this.data.replyId);
    var Index = e.currentTarget.dataset.replyId;
    console.log(Index);
  },
  //scroll-view下拉刷新上拉加载
  refesh1: function () {
    var that = this;
    wx.showToast({
      title: '刷新'
    });
    this.setData({
      refesh: true
    });
    setTimeout(function () {
      that.setData({
        refesh: false
      });
    }, 800)
  },
  loadMore1: function () {
    var that = this;
    // wx.showToast({
    //   title: '加载'
    // });
    this.setData({
      loadMore: true
    });
    setTimeout(function () {
      that.setData({
        loadMore: false
      });
    }, 1000)
  },
  //网络获取数据
  // getHttpData:function(key,_type,callback){
  //     wx.request({
  //         url: 'http://192.168.6.61:8091/api/live/detail',
  //         data: {
  //             "key": key,
  //             "type": _type
  //         },
  //         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  //         header: { 'content-type': 'application/json'},
  //         success: function(res){
  //             console.log('请求成功');
  //             console.log(res);
  //             callback(res.data);
  //         },

  //         fail: function() {
  //             console.log('fail')
  //         }
  //     })
  // },
  fetchData: function () {
    var that = this;
    wx.request({
      url: 'http://192.168.6.61:8091/api/live/detail',
      data: { live_id: 10005 },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log('请求成功');
        console.log(res);
      },
      fail: function () {
        // fail
      }
    })
  },
  // 页面显示
  onShow: function () {

    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo);
    if (userInfo.level == 10) {
      that.setData({
        user: 10
      })
    } else {
      that.setData({
        user: 0
      })
    }
  }
}) 