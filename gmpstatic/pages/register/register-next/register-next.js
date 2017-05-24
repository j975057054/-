// pages/register/register-next/register-next.js
Page({
  data:{
    checked:true,
    thatPhone:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.thatPhone);
    this.setData({
      thatPhone:options.thatPhone
    })
  },
  // 设置用户名value
  inputName:function(e){
    var nickname=e.detail.value;
    this.setData({
      nickname:e.detail.value
    });
  },
  // 设置密码value
  inputPwd:function(e){
    var pwd=e.detail.value;
    this.setData({
      pwd:e.detail.value
    });
  },
  // 确认密码value
  pwdSure:function(e){
    var pwdSure=e.detail.value;
    this.setData({
      pwdSure:e.detail.value
    });
  },
  // checkboxd的判断
  checkboxRem:function(e){
    var checked=e.target.dataset.checks;
    if(checked==false){
      checked=true;
      this.setData({
        checked:true
      });
    }else if(checked==true){
      checked=false;
      this.setData({
        checked:false
      });
    }
    console.log(checked)
  },
  // 立即注册
  signUp: function(){
    var thatPhone=this.data.thatPhone;
    var thatName=this.data.nickname;
    var thatPwd=this.data.pwd;
    var thatSure=this.data.pwdSure;
    console.log(thatPhone);
    if (thatName == '') {
			return wx.showToast({
        title:'请设置用户名',
        icon:'loading',
        duration:800
      })
		};
    if (thatPwd == '') {
			return wx.showToast({
        title:'请设置密码',
        icon:'loading',
        duration:800
      })
		};
    if (thatPwd != thatSure) {
			return wx.showToast({
        title:'密码不一致',
        icon:'loading',
        duration:800
      })
		}
    if (this.data.checked == false) {
			return wx.showToast({
        title:'请选择同意协议',
        icon:'loading',
        duration:800
      })
		}
    wx.request({
      url: 'http://192.168.1.111:8090/api/user/register',
      data: {
        "nickname":thatName,
        "password":thatPwd,
        "phone":thatPhone
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type':'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        console.log('请求成功');
        wx.showToast({
          title:'注册成功',
          icon:'success',
          duration:800
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 2,
          })
        },800)
        
      },
      fail: function() {
        console.log('请求失败');
        wx.showToast({
          title:'网络出错',
          icon:'loading',
          duration:800
        })
      },
    })
    
  },
  //立即登录
  tapLogin: function(){
    wx.navigateBack({
      delta: 2
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