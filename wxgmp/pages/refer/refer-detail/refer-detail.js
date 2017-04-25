var app = getApp(); 
var WxParse = require('../../../wxParse/wxParse.js');
Page({
  data:{
    currentPostId:'',
    postData:{},
    noNet:false,
    refresh:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(postId);
    var postId = options.postId; 
    var that=this;
    this.setData({
      postId:options.postId
    });
    this.fetchData();
    console.log('postData是'+that.data.postData);
    console.log('跳转所带来的参数:'+postId);
  },
  fetchData:function(){
      var that = this;
      var postId=this.data.postId;
      console.log('获取：'+postId);
      wx.request({
        url: 'http://192.168.6.61:8091/api/reference/detail',
        data: {reference_id:postId},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: { 'content-type': 'application/json'},
        success: function(res){
          console.log(res.data);
          if(res.data.status==0){
            wx.showToast({
              title:'参考消息不存在',
              icon:'loading',
              duration:800
            })
          };
          res.data.data.timesto =that.toDate(res.data.data.created_at);
          // res.data.data.content = that.convertHtmlToText(res.data.data.content);
          var insertData = res.data.data.content;
          WxParse.wxParse('insertData', 'html', insertData, that);
          that.setData({
            noNet:false,
            postData:res.data.data
          })
        },
        fail: function() {
          that.setData({
            noNet:true
          })
          wx.showToast({
              title:'网络加载失败',
              icon:'loading',
              duration:800
          })
        }
      })
  },
  // 时间戳转换
  toDate: function(number){  
    var n=number * 1000;  
    var date = new Date(n);  
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';  
    var D = date.getDate()<10 ? '0'+date.getDate() : date.getDate(); 
    var h = date.getHours()<10 ? '0'+date.getHours() : date.getHours() + ':'; 
    var m = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
    return (M+D+' '+h+m)  
  }, 
  // 点击重新加载
  reload:function(){
    console.log(this.data.postId);
    var postId = this.data.postId;
    this.fetchData();
  }
})