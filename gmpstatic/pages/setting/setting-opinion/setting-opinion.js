// pages/setting/setting-opinion/setting-opinion.js
Page({
  data:{
    ereaValue:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  textValue:function(e){
    var ereaValue = e.detail.value;
    this.setData({
      ereaValue: e.detail.value
    })
  },
  createPoint:function(){
    var ereaValue =this.data.ereaValue;
    if(ereaValue==''){
      return wx.showToast({
          title:'内容不能为空',
          icon:'loading',
          duration:800
        })
    };
    wx.showToast({
        title:'提交成功',
        icon:'success',
        duration:800
    });
    setTimeout(function(){wx.navigateBack({delta: 1})},800);
  }
})