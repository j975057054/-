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
    this.getHttpData("key", "json", function (data) {
      that.setData({ 
        swiperData: data.ads,
        videoData: data.video_live,
        textData: data.text_live,
        referData: data.references
      });
    });
  },
  // 网络获取数据
  getHttpData: function(key,_type,callback) {
    var that=this;
    wx.request({
      url: 'http://192.168.6.110:8090/api/home/index',
      data: {
        "key": key,
        "type": _type
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'application/json'},
      success: function(res){   
          console.log('请求成功');
          console.log(res.data.data);
          for(var i=0;i<res.data.data.references.length;i++){  
              res.data.data.references[i].timesto =that.toDate(res.data.data.references[i].created_at)  
          };
          that.setData({
            noNet:false
          })
          callback(res.data.data);
          console.log("请求成功时noNet:"+that.data.noNet);
      },
      fail: function(res) {
        console.log('请求错误');
        that.setData({
          noNet:true
        });
        wx.showToast({
          title: '网络加载失败',
          icon: 'loading',
          duration:800
        });
        
      }
    })
  },
  // 时间戳转换
  toDate: function(number){  
    var n=number * 1000;  
    var date = new Date(n);  
    var Y = date.getFullYear() + '-';  
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';  
    var D = date.getDate()<10 ? '0'+date.getDate() : date.getDate(); 
    var h = date.getHours()<10 ? '0'+date.getHours() : date.getHours() + ':'; 
    var m = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
    return (Y+M+D+' '+h+m)  
  }, 
  // 下拉刷新
  onPullDownRefresh: function () {
    var that=this;
    this.onLoad();
    setTimeout(function(){
      wx.stopPullDownRefresh();
    },1000) 
    console.log('刷新');  
    console.log(this.data.swiperData[0]);
    if(this.data.swiperData[0]==undefined){
      console.log('未定义');
      that.setData({
        refresh:false
      })
    }else{
      console.log('有内容');
      that.setData({
        refresh:true
      })
    }
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
    var title = e.currentTarget.dataset.title;
    var level = e.currentTarget.dataset.level;
    var userInfo=wx.getStorageSync('userInfo');
    // console.log(postId);
    // console.log(title);
    console.log(userInfo.level);
    console.log(userInfo);
    // 权限判断
    if(level>=2){
      if(userInfo.level==10){
        wx.navigateTo({
          url: '../refer/refer-detail/refer-detail?postId=' + postId,
        })
      }else{
        return wx.showToast({
          title:'没有权限',
          icon:'loading',
          duration:800
        })
      }
    }else{
      wx.navigateTo({
        url: '../refer/refer-detail/refer-detail?postId=' + postId,
      })
    } 
  },
  // 点击重新加载
  reload:function(){
    this.onLoad();
  },
  
})
