/**
 * Created by LiKun on 2016/9/5.
 */
setupWebViewJavascriptBridge(function (bridge) {
  var $messagesVM = new Vue({
    el: 'body',
    data: {
      messages: []
    }
  });

  bridge.registerHandler('init', function (data) {
    $messagesVM.messages = JSON.parse(data);
  });
});

