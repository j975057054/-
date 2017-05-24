var app = getApp();
var page=1;
var pageSize=8;
Page({
  data:{
      referData:[],
      noNet:false,
      refresh:false,
      initial:false,
      bottomPage:1,
      pull:null,
      totalCount:0
      
  },
  onLoad:function(options){
    var that=this;
    console.log('初始');
  },
  // onReady:function(){
  //   var srt = this.data.totalCount;
  //   console.log('渲染'+srt);
  //   this.setData({
  //     srt:this.data.totalCount
  //   })
  // },
  // 下拉刷新
  onPullDownRefresh: function () {
    var that=this; 
    console.log('刷新srt:'+that.data.srt);
    console.log('刷新totalCount:'+that.data.totalCount);
    console.log('刷新数组'+this.data.referData[0]);
    // if(this.data.referData[0]==undefined){
    //   console.log('未定义');
    //   that.setData({
    //     refresh:false,
    //     pull:true
    //   })
    // }else{
    //   console.log('有内容');
    //   that.setData({
    //       refresh:true,
    //       pull:true
    //   });
    // }
    page =1;
    // that.setData({
    //     referData: []
    // }); 
    console.log('执行');
    console.log('下拉刷新');
    setTimeout(function(){
      wx.stopPullDownRefresh();
    },1000);
    // this.fetchData();
    wx.showToast({
        title:'刷新成功',
        icon:'success',
        duration:800
    })
  },
  // 上拉加载
  onReachBottom: function() {
      var that=this; 
     console.log('上拉加载');
     console.log((page-1)*pageSize);
     if(this.data.referData[0]==undefined){
        console.log('未定义');
        that.setData({
          refresh:false
        })
      }else{
        console.log('有内容');
        that.setData({
            refresh:true
        });
      }
      console.log(page);
      that.setData({
        bottomPage:page,
        pull:false
      });
      console.log(that.data.bottomPage);
     if((page-1)*pageSize>=this.data.totalCount){
        return wx.showToast({
          title:'没有更多'
        })
     };
    //  this.fetchData();
     
  },
  //获取列表信息
  fetchData: function(){
    var that = this;
    var myDate = new Date();
    console.log(myDate);
    wx.showToast({
      title:'加载中',
      icon:'loading',
      duration:800
    });
    wx.request({
      url: 'http://192.168.6.61:8091/api/reference/list',
      data: {
        'page':page,
        'page_size':pageSize
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'application/json'},
      success: function(res){
        console.log('请求成功');
        console.log(res);
        // console.log(res.data.data.total_count);
        // console.log(pageSize);
        if(res.data.data.total_count==0||res.data.data.references==null){
          console.log('空');
        }
        for(var i=0;i<res.data.data.references.length;i++){  
            res.data.data.references[i].timesto =that.toDate(res.data.data.references[i].created_at)  
        };
        if(that.data.pull==false){
          // 下拉加载
          that.setData({
            referData: that.data.referData.concat(res.data.data.references),
            totalCount:res.data.data.total_count,
            noNet:false
          });
        }else if(that.data.pull==true){
          // 下拉刷新
          if(res.data.data.total_count > that.data.totalCount){
            that.setData({
                referData: []
            }); 
            that.setData({
              totalCount:res.data.data.total_count,
              referData: that.data.referData.concat(res.data.data.references),
              noNet:false
            });
          }else{
            console.log('下拉刷新'+that.data.referData);
            that.setData({
              totalCount:res.data.data.total_count,
              referData: that.data.referData,
              noNet:false
            });
          }
          
          
          // if(res.data.data.total_count > that.data.srt&&that.data.srt!=0){
          //     that.setData({
          //       referData: that.data.referData.concat(res.data.data.references)
          //     });
          // }
        }else{
          // 初次加载
          that.setData({
            referData: that.data.referData.concat(res.data.data.references),
            totalCount:res.data.data.total_count,
            noNet:false
          });
          console.log('初次加载');
          console.log(res.data.data.total_count)
        }
        console.log(that.data.pull);
        console.log('请求total:'+that.data.totalCount);
        page=page+1; 
        setTimeout(function(){
          wx.hideToast();
        },800) 
      },
      fail: function(res) {
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
    var Y = date.getFullYear() + '-';  
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';  
    var D = date.getDate()<10 ? '0'+date.getDate() : date.getDate(); 
    var h = date.getHours()<10 ? '0'+date.getHours() : date.getHours() + ':'; 
    var m = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
    return (Y+M+D+' '+h+m)  
  }, 
  //内参点击跳转详情页
  onPostTap:function(e){
    var postId = e.currentTarget.dataset.postId;
    var title = e.currentTarget.dataset.title;
    var level = e.currentTarget.dataset.level;
    var userInfo=wx.getStorageSync('userInfo');
    // 权限判断
    if(level>=2){
      if(userInfo.level==10){
        wx.navigateTo({
          url: '../refer/refer-detail/refer-detail?postId=' + postId,
        })
      }else{
        return wx.showToast({
          title:'没有权限',
          icon:'loading',
          duration:800
        })
      }
    }else{
      wx.navigateTo({
        url: '../refer/refer-detail/refer-detail?postId=' + postId,
      })
    }
    
  },
  // 点击重新加载
  reload:function(){
    this.onLoad();
    console.log('重新加载')
  }
})