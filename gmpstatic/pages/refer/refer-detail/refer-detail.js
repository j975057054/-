var app = getApp(); 
Page({
  data:{
    currentPostId:'',
    postData:{},
    noNet:false,
    refresh:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.postId);
    var postId = options.postId; 
    var that=this;
    this.setData({
      postId:options.postId
    });
    console.log('跳转所带来的参数:'+postId);
  },
})