// pages/setting/letter-detail/letter-detail.js
Page({
  data:{
    winWidth:0,
    winHeight:0
  },
  onLoad:function(){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this; 
    // 获取系统信息 
    wx.getSystemInfo( { 
        success: function( res ) { 
            that.setData( { 
                winWidth: res.windowWidth, 
                winHeight: res.windowHeight 
            });
        } 
    });
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