// pages/setting/setting-letter/setting-letter.js
Page({
  data:{
    letter:[]
  },
  onLoad:function(options){
    var that = this;
    this.fetch();
    var a=['aa','bb','cc'];
    var date=new Date();
    var day=date.getDay();
    console.log(day);
    // console.log(a.toString());
    // console.log(a.shift());
    console.log(a.splice(0,1,"ff"));
    console.log(a);
  },
  tapDetail: function(){
    wx.navigateTo({
      url: '../letter-detail/letter-detail'
    })
  },
  fetch: function(){
    var that = this;
    var userInfo=wx.getStorageSync('userInfo'); 
    console.log(userInfo); 
    wx.request({
      url: 'http://192.168.6.110:8090/api/user-msg/recent',
      data: {user_id:userInfo.user_id},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'application/json'},
      success: function(res){
        console.log(res);
        that.setData({
          letter:res.data.data
        })
      },
      fail: function() {
        // fail
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})