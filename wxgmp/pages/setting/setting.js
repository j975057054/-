var app = getApp();
Page({
  data:{
    user:"",
    pwd:"",
    userInfo:"",
    userLogin:false,
    userLevel:false,
    headImg:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var userInfo=wx.getStorageSync('userInfo');
    console.log('页面初始化');      
    console.log(userInfo);      
    console.log(userInfo.head_img);      
    this.setData({
      nickname: userInfo.nickname||userInfo.nickName,
      headImg: userInfo.avatarUrl||'https://img.csjimg.com/'+userInfo.head_img
    });
    // console.log(userData.data.level); 
    if(userInfo==''){
      this.setData({
        userLogin:false,
        userLevel:false,
      });
    }else{
      if(userInfo.level=10){
        this.setData({
          userLogin:true,
          userLevel:true,
        });
      }else{
        this.setData({
          userLogin:true,
          userLevel:false,
        });
      }
    }
  },
  // 更换头像
  changeImg:function(){
    var that = this;
　　　　wx.showActionSheet({
  　　　　itemList: ['从相册中选择', '拍照'],
  　　　　itemColor: "#d33d3e",
  　　　　success: function(res) {
    　　　　if (!res.cancel) {
      　　　　if(res.tapIndex == 0){
                that.chooseWxImage('album')
      　　　　}else if(res.tapIndex == 1){
                that.chooseWxImage('camera')
      　　　　}
    　　　　}
  　　　　}
　　　　})
  },
  chooseWxImage: function(type){
    var userInfo=wx.getStorageSync('userInfo');
    var that=this;
    var userId=userInfo.user_id;
    var authKey=userInfo.auth_key;
    console.log(userInfo.user_id);
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths[0]);
        // 上传图片
        wx.uploadFile({
          url: 'http://192.168.6.61:8091/api/upload/text-img',
          filePath:tempFilePaths[0],
          name:'file',
          header:{'content-type':'nultipart/form-data'}, 
          success: function(res){
            console.log(res);
            if (res.statusCode != 200) { 
                return wx.showToast({
                  title: '上传失败',
                  icon: 'loading',
                  duration: 800
                })
            };
            var data = res.data;
            // that.setData({headImg:tempFilePaths[0]})
          },
          fail: function(res) {
            console.log('失败')
          }
        })
        // wx.request({
        //   url: 'http://192.168.1.111:8090/api/user/update-headimg',
        //   data: {
        //     'headimg': source,
        //     'user_id': userInfo.user_id
        //   },
        //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        //   header: {
        //     'content-type': 'application/json'
        //   }, // 设置请求的 header
        //   success: function(e){
        //     console.log(e.data);
        //     console.log('请求成功');
        //     
        //   },
        //   fail: function() {
        //     console.log('请求失败')
        //   }
        // })
      },
      fail:function(){
        // console.log('获取失败')
      }
    })
  },
  // 拨打电话
  actionSheetTap: function () {
    var itemList= ['工作时间：周一至周五9:00-18:00', '拨打 400-188-112']
    wx.showActionSheet({
      itemList:itemList,
      success: function (res) {
        if (res.tapIndex==1) {
            wx.makePhoneCall({
                phoneNumber: '400188112' 
            })
        }
      }
    })
  },
  //退出
  btnExit: function(){
    this.setData({
      userLogin:false,
      userLevel:false,
    });
    wx.removeStorageSync('userInfo');
    console.log('退出');
    // console.log(userInfo);
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