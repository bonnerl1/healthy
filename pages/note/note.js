var arrayincp = [] //待办
var arraycp = [] //已办
var array //待办
var array1 //已办
Page({
  data: {
    array: arrayincp,
    array1: arraycp,
    condition1: true,
    condition2: false,
    input: false,
    nav1: "nav1",
    nav2: "nav2"
  },
  //页面加载，提取保存数据
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'array',
      success: function (res) {
        var arraystore = res.data
        console.log(arraystore)
        arrayincp = arraystore[0]
        arraycp = arraystore[1]
        that.setData({
          array: arrayincp,
          array1: arraycp,
        })
      }
    })
  },

  //点击待办
  click1: function (e) {

    this.setData({
      condition1: true,
      condition2: false,
      nav1: "nav1",
      nav2: "nav2",
      input: false
    })
  },

  //点击已办
  click2: function (e) {

    this.setData({
      condition1: false,
      condition2: true,
      nav1: "nav2",
      nav2: "nav1",
      input: false
    })
  },

  //待办变已办
  short: function (e) {
    // console.log(e.target.id);
    // var id = e.target.id
    // console.log(e.currentTarget.dataset.index);
    var id = e.currentTarget.dataset.index
    var newitem = arrayincp[id]
    arrayincp.splice(id, 1)
    arraycp.push(newitem)
    this.setData({
      array: arrayincp,
      array1: arraycp,
    })
  },
  //删除已办事件
  delete(e){
    // console.log(e.currentTarget.dataset.index);
    var id1=e.currentTarget.dataset.index;
    arraycp.splice(id1, 1);
    this.setData({
      array1: arraycp,
    })
  },
  //增加
  click: function (e) {
    this.setData({
      input: true,
      condition1: false,
      condition2: false,
      nav1: "nav2",
      nav2: "nav2",
    })

  },
  // 输入完成
  confirm: function (e) {
    // console.log(e.detail.value);
    arrayincp.push(e.detail.value.note)
    this.setData({
      array: arrayincp,
      input: false,
      condition1: true,
      condition2: false,
      nav1: "nav1",
      nav2: "nav2",
    })
  },

  //卸载页面，储存数据
  onUnload: function () {
    var arraystore = [arrayincp, arraycp]
    wx.setStorage({
      key: "array",
      data: arraystore
    })
  },
})