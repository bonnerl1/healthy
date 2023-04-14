// index.js
var mqtt = require('../../utils/mqtt.min.js')
var client = null
var app=getApp()
Page({
  data: {
    list: [],
    tempo: '0',
    hum: '0',
    lx: '0',
    led: false,
    beep: false,
    tip: '',
    city: '',
    type: '',
    PM: '',
    heart: '',
    blood: '',
    Diastolic: '',
    pulse: '',
    humantem: '',
    myintervalid:''
  },
  getweather() {
    let that = this
    let city = '韶关'
    wx.request({
      url: "http://wthrcdn.etouch.cn/weather_mini?city=" + city,
      method: 'GET',
      header: {
        // "content-type": 'application/x-www-form-urlencoded',
      },
      success(res) {
        // console.log(res)
        if (res.statusCode === 200) {
          that.setData({
            tip: res.data.data.ganmao,
            city: res.data.data.city,
            type: res.data.data.forecast[0].type
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '系统错误'
        })
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  getData() {
    var that = this
    let deviceid = "969897356"
    let apikey = "IYp9RbN5thc0tcNYB48=zxzuQIc="
    wx.request({
      url: "http://api.heclouds.com/devices/" + deviceid + '/datapoints',
      method: 'GET',
      header: {
        "content-type": 'application/x-www-form-urlencoded',
        "api-key": apikey
      },
      success(res) {
        // console.log(res)
        var datalist = res.data.data.datastreams
        // console.log(datalist);
        // console.log("111");
        // console.log(app.globalData.datalist);
        if (res.statusCode === 200) {
          that.setData({
            list:datalist,
            tempo: datalist[5].datapoints[0].value,
            hum: datalist[4].datapoints[0].value,
            PM: datalist[3].datapoints[0].value,
            heart: datalist[7].datapoints[0].value,
            blood: datalist[9].datapoints[0].value,
            Diastolic: datalist[8].datapoints[0].value,
            pulse: datalist[0].datapoints[0].value,
            humantem: datalist[1].datapoints[0].value,
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '系统错误'
        })
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  //保存历史数据
  click(){
    // // console.log(this.data.list);
    // var time= new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8)
    // this.data.list.push(time)
    // app.globalData.datalist.push(this.data.list);
    // // console.log(app.globalData.datalist);
    // wx.showToast({
    //   title: '保存成功',
    // })
    wx.request({
      url: 'https://openapi.vmall.com/mcp/content/getPageInfoListAsync?pageId=257&lang=zh_CN&country=CN&portal=2',
      success(res){
        console.log(res);
      }
    })
  },
  // 事件处理函数
  onLoad() {
    // this.connectmqtt()
    this.getweather()
    this.getData()
  },
  connectmqtt: function () {
    var that = this
    const options = {
      connectTimeout: 4000,
      clientId: 'wsy',
      port: 8084,
      username: '82e635f08e8a793204d3a6006f53cf9c',
      password: '123123'
    }
    client = mqtt.connect('wxs://t.yoyolife.fun/mqtt', options)
    client.on('connect', (e) => {
      console.log('服务器连接成功')
      client.subscribe('/iot/160/cc', {
        qos: 0
      }, function (err) {
        if (!err) {
          console.log('订阅成功')
        }
      })
    })
    //信息监听事件
    client.on('message', function (topic, message) {
      let tem = {}
      tem = JSON.parse(message)
      that.setData({
        tempo: tem.temp,
        hum: tem.humi,
        lx: tem.lengtn
      })
      console.log(tem)
      console.log('收到' + message.toString())
    })
    client.on('reconnect', (error) => {
      console.log('正在重新连接', error)
    })
    client.on('error', (error) => {
      console.log('连接失败', error)
    })
  },
  onledchange: function (event) {
    console.log(event.detail)
    let sw = event.detail.value
    console.log(event.detail.value)
    if (sw) {
      client.publish('/iot/160/wsy', '{"target":"led","value":1}', function (err) {
        if (!err) {
          console.log('成功发送指令-开')
        }
      })
    } else {
      client.publish('/iot/160/wsy', '{"target":"led","value":0}', function (err) {
        if (!err) {
          console.log('成功发送指令-关')
        }
      })
    }
  },
  onbeepchange: function (event) {
    console.log(event.detail)
    let sw = event.detail.value
    console.log(event.detail.value)
    if (sw) {
      client.publish('/iot/160/wsy', '{"target":"beep","value":1}', function (err) {
        if (!err) {
          console.log('成功发送指令-开')
        }
      })
    } else {
      client.publish('/iot/160/wsy', '{"target":"beep","value":0}', function (err) {
        if (!err) {
          console.log('成功发送指令-关')
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;

    that.data.myintervalid = setInterval(function () {
      that.getData()
    }, 1000)
  },

  onHide: function () {
    // 页面隐藏
    clearInterval(this.data.myintervalid);
    },
    
    onUnload: function () {
    
    // 页面关闭
    
    clearInterval(this.data.myintervalid);
    
    },

})