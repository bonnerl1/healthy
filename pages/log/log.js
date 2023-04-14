// pages/log.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  message:'56',
  name:'微信名称',
  pic:'/picture/头像.png',
  dizhi:'获取地址'
  },
led:function(){
console.log(this.data.message)
this.setData({
  message:'789'
})


},
get:function(e){

  wx.getUserProfile({
    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      console.log(res)
      this.setData({
        name:res.userInfo.nickName,
       pic:res.userInfo.avatarUrl
      })
    }
  })
},
local:function(e){
var that=this
  wx.chooseLocation({
    success: (res) => {
      console.log(res)
            that.setData({
       dizhi:res.address
      })
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})