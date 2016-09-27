/**
 * Created by LiKun on 2016/9/17.
 */
setupWebViewJavascriptBridge(function (bridge) {
  var $aboutVM = new Vue({
    el: 'body',
    methods: {
      open: function (title, url) {
        bridge.callHandler('open', {
          title: title,
          url: url
        });
      }
    }
  })
});

