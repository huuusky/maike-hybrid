/**
 * 农活、农机详情
 */
setupWebViewJavascriptBridge(function (bridge) {
  var $detailVM = new Vue({
    el: 'body',
    data: {
      detail: {}
    },
    methods: {
      submit: function (id) {
        bridge.callHandler('submit', {id: id});
      },
      favour: function (id) {
        bridge.callHandler('favour', {id: id});
      }
    }
  });

  bridge.registerHandler('initDetail', function (data) {
    $detailVM.detail = JSON.parse(data);
  });
});

