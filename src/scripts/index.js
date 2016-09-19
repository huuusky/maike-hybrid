/**
 * 首页
 */
var swiper = new Swiper('.swiper-container', {
  // Optional parameters
  loop: true,
  autoplay: 3000,
  autoHeight: true,
  pagination: '.swiper-pagination',
  autoplayDisableOnInteraction: false
});

// 计算首页推荐列表的高度，使其高度适应不同屏幕大小
var swiperContainerHeight = document.querySelector('.swiper-container').scrollHeight;
var menuHeight = document.querySelector('.menu').scrollHeight;
var grayTitleHeight = document.querySelector('.gray-title').scrollHeight;
document.querySelector('.recommend').style.height = 'calc(100% - ' + (swiperContainerHeight + menuHeight + grayTitleHeight) + 'px)';

setupWebViewJavascriptBridge(function (bridge) {
  var $indexVM = new Vue({
    el: 'body',
    data: {
      recommend: [],
      isError: false
    },
    methods: {
      findFarmWork: function () {
        bridge.callHandler('findFarmWork');
      },
      findFarmMachinery: function () {
        bridge.callHandler('findFarmMachinery');
      },
      workGuide: function () {
        bridge.callHandler('workGuide');
      },
      contactCustomerService: function () {
        bridge.callHandler('contactCustomerService');
      },
      viewDetail: function (id, publishType) {
        bridge.callHandler('viewDetail', {id: id, publishType: publishType});
      },
      viewMore: function () {
        this.more === 'work' ?  this.findFarmWork() : this.findFarmMachinery();
      },
      reload: function () {
        this.isError = false;
        bridge.callHandler('reload');
      }
    }
  });

  bridge.registerHandler('init', function (data) {
    var indexJson = JSON.parse(data);
    $indexVM.recommend = indexJson.recommend;
  });

  bridge.registerHandler('loadError', function () {
    $indexVM.isError = true;
  });
});

/*
var $indexVM = new Vue({
  el: 'body',
  data: {
    recommend: [],
    isError: false
  },
  methods: {
    findFarmWork: function () {
      bridge.callHandler('findFarmWork');
    },
    findFarmMachinery: function () {
      bridge.callHandler('findFarmMachinery');
    },
    workGuide: function () {
      bridge.callHandler('workGuide');
    },
    contactCustomerService: function () {
      bridge.callHandler('contactCustomerService');
    },
    viewDetail: function (id, publishType) {
      bridge.callHandler('viewDetail', {id: id, publishType: publishType});
    },
    viewMore: function () {
      this.more === 'work' ?  this.findFarmWork() : this.findFarmMachinery();
    },
    reload: function () {
      this.isError = false;
      console.log('reload');
    }
  }
});

setTimeout(function () {
  $indexVM.recommend = [
    {
      "pubId": 1,
      "title": "条播机 东方红SX11",
      "address": "广东深圳",
      "workPeriod": "2016-08-11~2016-08-11",
      "publishType": "1",
      "publishDate": "2016-08-11",
      "publishItem": "期望价格-100.0",
      "introPic": null
    },
    {
      "pubId": 14,
      "title": "玉米深耕10000亩",
      "address": "广东深圳市",
      "workPeriod": "2016-10-01~2016-10-09",
      "publishType": "2",
      "publishDate": "2016-08-25",
      "publishItem": "作业面积-10000亩",
      "introPic": null
    },
    {
      "pubId": 4,
      "title": "玉米开沟2000亩",
      "address": "广东深圳",
      "workPeriod": "2016-08-19~2016-08-27",
      "publishType": "2",
      "publishDate": "2016-08-19",
      "publishItem": "作业面积-2000亩",
      "introPic": null
    },
    {
      "pubId": 5,
      "title": "玉米开沟3000亩",
      "address": "广东深圳",
      "workPeriod": "2016-08-20~2016-08-21",
      "publishType": "2",
      "publishDate": "2016-08-19",
      "publishItem": "作业面积-3000亩",
      "introPic": null
    },
    {
      "pubId": 7,
      "title": "玉米开沟8000亩",
      "address": "广东深圳",
      "workPeriod": "2016-08-11~2016-08-27",
      "publishType": "2",
      "publishDate": "2016-08-19",
      "publishItem": "作业面积-8000亩",
      "introPic": null
    },
    {
      "pubId": 2,
      "title": "水稻开沟10000亩",
      "address": "广东深圳",
      "workPeriod": "2016-08-26~2016-08-30",
      "publishType": "2",
      "publishDate": "2016-08-11",
      "publishItem": "作业面积-10000亩",
      "introPic": null
    }
  ]
}, 3000)
*/
