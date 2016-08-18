/**
 * Created by LiKun on 2016/8/15.
 */
setupWebViewJavascriptBridge(function (bridge) {
    var content = document.querySelector('#content');
    var listWrapper = document.querySelector('#list-wrapper');

    var $listVM = new Vue({
        el: '#content',
        data: {
            page: 1,
            list: []
        },
        methods: {
            viewDetail: function (id) {
                console.log(id);
            },
            onScroll: function () {
                var self = this;
                if (listWrapper.clientHeight === content.scrollTop + content.clientHeight) {
                    self.page++;
                    bridge.callHandler('appendList', {page: self.page}, function (data) {
                        self.items = self.items.concat(data.rows);
                    });
                }
            }
        }
    });


    bridge.registerHandler('initList', function (data) {
        $listVM.list = data.rows;
    });
});
