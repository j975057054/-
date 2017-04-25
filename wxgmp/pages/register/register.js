// pages/register/register.js
Page({
  data:{
    iphone:'',
    code:'',
    cont:60,
    sended:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  // 手机号输入
  inputIphone:function(e){
    var iphone=e.detail.value;
    this.setData({
      iphone:e.detail.value
    });
  },
  // 验证码输入
  inputCode:function(e){
    var code=e.detail.value;
    this.setData({
      code:e.detail.value
    });
  },
  // 发送验证码
  sendCode: function(){
    var thatPhone = this.data.iphone;
    var that=this;
    var cont=this.data.cont;
    console.log(thatPhone);
    if(thatPhone==''){
      return wx.showToast({
        title:'请输入手机号',
        icon:'loading',
        duration:800
      })
    };
    if(!(/^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$/.test(thatPhone))){
      return wx.showToast({
        title:'手机号错误',
        icon:'loading',
        duration:800
      })
    };
    wx.request({
      url: 'http://192.168.1.111:8090/api/user/send-code',
      data: {"phone":thatPhone},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log('请求成功');
        var time = setInterval(function(){  
          if(cont==0){
            clearInterval(time);
            console.log('停止');
            that.setData({
              sended:false,
              cont:60
            }) 
          }else{
            that.setData({
              cont:cont-1,
              sended:true
            })
            cont=cont-1;
            console.log(cont); 
          } 
        },1000);
      },
      fail: function() {
        // fail
        console.log('请求失败')
      }
    }) 
  },
  // 下一步验证
  tapNext: function(){
    var thatPhone = this.data.iphone;
    var thatCode = this.data.code;
    var that = this;
    console.log(thatPhone);
    if(thatPhone==''){
      return wx.showToast({
        title:'请输入手机号',
        icon:'loading',
        duration:800
      })
    };
    if(thatCode==''){
      return wx.showToast({
        title:'请输入验证码',
        icon:'loading',
        duration:800
      })
    };
    wx.request({
      url: 'http://192.168.1.111:8090/api/user/compare-code',
      data: {
        "phone":thatPhone,
        "code":thatCode
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success
        if(res.data.status==0){
          console.log('验证码错误')
          wx.showToast({
            title:'验证码错误',
            icon:'loading',
            duration:800
          })
        }else{
          wx.navigateTo({
            url: 'register-next/register-next?thatPhone='+thatPhone
          })
        }
      },
      fail: function() {
        console.log('请求失败')
      },
    })
  },
  // 立即登录
  tapLogin: function(){
    wx.navigateBack({
      delta: 1
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