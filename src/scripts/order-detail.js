/**
 * 农活、农机订单详情
 */
setupWebViewJavascriptBridge(function (bridge) {
  var $orderVM = new Vue({
    el: 'body',
    data: {
      detail: {}
    }
  });

  bridge.registerHandler('initDetail', function (data) {
    $orderVM.detail = JSON.parse(data);
  });
});

