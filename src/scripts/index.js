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
      recommend: null,
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
      farmProduce: function () {
        bridge.callHandler('farmProduce');
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
