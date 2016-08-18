/**
 * Created by LiKun on 2016/8/17.
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
        $detailVM.detail = data;
    });
});

