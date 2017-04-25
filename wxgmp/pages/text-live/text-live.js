var app = getApp();
Page({
    data: {
        // 页面配置  
        winWidth: 0,
        winHeight: 0,
        comHeight: 0,
        //判断用户老师
        user: 0,
        //视频开关
        poitWidth: 0,
        switchState: false,
        menuState: false,
        // 品种选择 
        array: ['奥氏黄檀', '中国', '巴西', '日本'],
        deal: ['买入建仓', '卖出补仓'],
        objectArray: [
            {
                id: 0,
                name: '奥氏黄檀'
            },
            {
                id: 1,
                name: '中国'
            },
            {
                id: 2,
                name: '巴西'
            },
            {
                id: 3,
                name: '日本'
            }
        ],
        objectDeal: [
            {
                id: 0,
                name: '买入建仓'
            },
            {
                id: 1,
                name: '卖出补仓'
            }
        ],
        index: 0,
        indexa: 0,
        // tab切换 
        currentTab: 0,
        curTab: 0,
        playId: null,
        focused: false,
    },
    onLoad: function () {
        var that = this;
        // 获取系统信息 
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });

    },
    //视频开关
    switchOff: function (e) {
        let switchState = false;
        console.log('视频关闭');
        var that = this;
        that.setData({
            switchState: false,
            poitWidth: 0
        });
    },
    switchOn: function (e) {
        let switchState = true;
        console.log('视频打开');
        var that = this;
        that.setData({
            switchState: true
        });
        // 获取系统信息 
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    poitWidth: res.windowWidth
                });
            }
        });
    },
    //  选择
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        var that = this;
        that.setData({
            index: e.detail.value
        })
    },
    bindPickerChangeA: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        var that = this;
        that.setData({
            indexa: e.detail.value
        })
    },
    focusTap: function () {
        let focused = true;
        this.setData({ focused: true });
    },
    blurTap: function () {
        let focused = false;
        this.setData({ focused: false });
    },
    // 滑动切换tab 
    bindChange: function (e) {
        var that = this;
        that.setData({ currentTab: e.detail.current });
    },
    // 点击tab切换 
    swichNav: function (e) {
        var that = this;
        if (this.data.currentTab === e.currentTarget.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.currentTarget.dataset.current
            });
        }
    },
    // 历史tab切换
    handOver: function (e) {
        var that=this;
        if (this.data.curTab === e.currentTarget.dataset.cur) {
            return false;
        } else {
            that.setData({
                curTab: e.currentTarget.dataset.cur
            });
        }
    },
    //历史视频切换
    playTab: function(e){
        var that=this;
        if (this.data.playId === e.currentTarget.dataset.playId) {
            return false;
        } else {
            that.setData({
                playId: e.currentTarget.dataset.playId
            });
        }
    },
    //  评论操作
    replyMenu: function (e) {
        var that = this;
        if (this.data.menuState == false) {
            that.setData({ menuState: true });
        } else {
            that.setData({ menuState: false });
        }

    }
}) 