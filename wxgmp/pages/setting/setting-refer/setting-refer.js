var app = getApp();
Page({
  data:{
      winWidth: 0, 
      winHeight: 0, 
      checked:false,
      changed:false,
      inputValue:'',
      ereaValue:'',
      level:1
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var userInfo=wx.getStorageSync('userInfo');
    console.log(userInfo); 
    var that = this; 
    // 获取系统信息 
    wx.getSystemInfo( { 
      success: function(res) { 
          that.setData( { 
              winWidth: res.windowWidth, 
              winHeight: res.windowHeight 
          }); 
      }
    });
  },
  // 是否收费
  checkChange: function () {
    var that=this;
    var checked = !this.data.checked;
    this.setData({ checked: checked }); 
    if(checked==true){
      that.setData({ level:2 })
    }else{
      that.setData({ level:1 })
    }  
  },
  bindInputValue: function(e){
    var inputValue = e.detail.value;
    this.setData({ inputValue : e.detail.value});
    if(inputValue !=''){
      var changed = true;
      this.setData({ changed: true });
      console.log(changed);
    }else{
      var changed = false;
      this.setData({ changed: false });
    }
  },
  textValue:function(e){
    var ereaValue = e.detail.value;
    this.setData({
      ereaValue: e.detail.value
    })
  },
  // 提交内参
  creatRefer:function(){
    var inputValue = this.data.inputValue;
    var ereaValue = this.data.ereaValue;
    var level = this.data.level;
    var userId=wx.getStorageSync('userInfo').user_id;
    var authKey=wx.getStorageSync('userInfo').auth_key;
    console.log(inputValue.length);
    if(inputValue==''){
      return wx.showToast({
          title:'请添加标题',
          icon:'loading',
          duration:800
        })
    }else if(inputValue.length>50){
      return wx.showToast({
          title:'标题不超过50字',
          icon:'loading',
          duration:800
        })
    }
    if(ereaValue==''){
      return wx.showToast({
          title:'请输入内容',
          icon:'loading',
          duration:800
        })
    };

    wx.request({
      url: 'http://192.168.6.61:8091/api/reference/save',
      data: {
        "title":inputValue,
        "content":ereaValue,
        "level":level,
        "img":"",
        "token":authKey
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'application/x-www-form-urlencoded'},
      success: function(res){
        console.log('提交成功');
        console.log(res);
        wx.showToast({
          title:'提交成功',
          icon:'success',
          duration:800
        });
        
        setTimeout(function(){wx.navigateBack({delta: 1})},1000);
      },
      fail: function() {
        console.log('提交失败');
        wx.showToast({
          title:'提交失败',
          icon:'loading',
          duration:800
        })
      },
      complete: function() {
        // complete
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