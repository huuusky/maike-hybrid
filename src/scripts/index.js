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

setupWebViewJavascriptBridge(function (bridge) {
  var $indexVM = new Vue({
    el: 'body',
    data: {
      recommend: [],
      more: ''
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
      }
    }
  });

  bridge.registerHandler('init', function (data) {
    var indexJson = JSON.parse(data);
    $indexVM.recommend = indexJson.recommend;
    $indexVM.more = indexJson.more;
  });
});

