// pages/login/login.js
Page({
  data:{
    user:'',
    pwd:'',
    userInfo:'',
    checked:true,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var checked=wx.getStorageSync('checked');
    // console.log('登录初始');
    // console.log(checked);
    if(checked==true){
      var user=wx.getStorageSync('user');
      var pwd=wx.getStorageSync('pwd');
      console.log('111');
      this.setData({
        user:user,
        pwd:pwd,
        checked:checked
      });
    }
  
  },
  // 立即注册跳转
  tapRegister: function(){
    wx.navigateTo({
      url: '../register/register'
    })
  },
  // input账号输入
  inputUser:function(e){
    var user=e.detail.value;
    this.setData({
      user:e.detail.value
    });
  },
  // 密码输入
  inputPwd:function(e){
    var pwd=e.detail.value;
    this.setData({
      pwd:e.detail.value
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
  // 登录
  loginVerify: function(){
    var thatUser = this.data.user;
    var thatPwd = this.data.pwd;
    var thatChecked = this.data.checked;
    console.log(thatUser);
    console.log(thatPwd);
    console.log(thatChecked);
    // var userInfo = JSON.stringify(this.data);
    // console.log(userInfo);
    if(this.data.user==''){
        return wx.showToast({
          title:'请填写账号',
          icon:'loading',
          duration:800
        })
    };
    if(this.data.pwd=='') {
      return wx.showToast({
          title:'请填写密码',
          icon:'loading',
          duration:800
      })
    };
    // 验证账号密码
    wx.request({
      url: 'http://192.168.6.61:8091/api/user/login',
      data: {
        user_id: thatUser,
        pwd: thatPwd
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, 
      success: function(res){
        console.log('请求成功');
        console.log(res.data);
        console.log(res.data.status);
        var userInfo = res.data.data;
        console.log(userInfo);
        if(res.data.status==1){
            console.log('登录');
            wx.showToast({
              title:'登录成功',
              icon:'success',
              duration:800
            });
            wx.setStorageSync('user', thatUser);
            wx.setStorageSync('pwd', thatPwd);
            wx.setStorageSync('checked', thatChecked);
            wx.setStorageSync('userInfo', userInfo);
            
            if(thatChecked==true){
              // 记住账号密码
              // wx.setStorageSync(userInfo);
              console.log('记住账号密码');
            }else{
              //不记住账号密码
              // wx.removeStorageSync(userInfo);
              console.log('不记住账号密码');
            }
            var pages = getCurrentPages();
            setTimeout(function(){
                wx.navigateBack({delta: 1});
                //获取页面栈
                if(pages.length > 1){
                    //上一个页面
                    var prePage = pages[pages.length - 2];
                    //刷新上一页
                    prePage.onLoad();
                }
              },500);
            
          }else{
            console.log('账号或密码错误');
            wx.showToast({
              title:'账号或密码错误',
              icon:'loading',
              duration:800
            })
          };
      },
      fail: function() {
        // fail
        console.log('请求失败');
        wx.showToast({
            title:'登录请求失败',
            icon:'loading',
            duration:800
          })
      }
    })
  
  },
  // 微信登录
  wxLogin:function(){
    var that=this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    // wx.login({
    //   success: function(res){
    //     var appid = 'wx5823d46cc9c39827'; //填写微信小程序appid  
    //     var secret = '7077e225840a243b747683c8caa0a0df'; //填写微信小程序secret  
    //     if(res.code){  
    //       wx.request({
    //         url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+res.code+'&grant_type=authorization_code',
    //         data: {},
    //         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //         // header: {}, // 设置请求的 header
    //         success: function(res2){
    //           // console.log(res2.data.openid);
    //           var openid=res2.data.openid;
    //           that.setData({
    //             openid:res2.data.openid
    //           })
    //         },
    //         fail: function() {
    //           // fail
    //         }
    //       }) ;  
    //       wx.getUserInfo({
    //         success: function(res3){
    //             // console.log('openid:'+that.data.openid);
    //             console.log(res3);
    //             // wx.setStorageSync('userInfo', res3.userInfo);
    //             // var pages = getCurrentPages();
    //             // wx.showToast({
    //             //   title:'微信登录成功',
    //             //   icon:'success',
    //             //   duration:800
    //             // });
    //             // setTimeout(function(){
    //             //   wx.navigateBack({delta: 1});
    //             //   //获取页面栈
    //             //   if(pages.length > 1){
    //             //       //上一个页面
    //             //       var prePage = pages[pages.length - 2];
    //             //       //刷新上一页
    //             //       prePage.onLoad();
    //             //   }
    //             // },800);
    //         },
    //         fail: function() {
    //           // fail
    //         }
    //       })
    //     }else{
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
        
    //   },
    //   fail: function() {
    //     // fail
    //   }
    // })
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