/**
 * Created by LiKun on 2016/8/10.
 */
var swiper = new Swiper('.swiper-container', {
    // Optional parameters
    effect: 'slide',
    loop: true,
    autoplay: 3000,
    autoHeight: true,
    autoplayDisableOnInteraction: false
});

setupWebViewJavascriptBridge(function(bridge) {

    var $indexVM = new Vue({
        el: '#index',
        data: {
            city: '定位中...'
        },
        methods: {
            showCities: function (event) {
                bridge.callHandler('showCities');
            }
        }
    });

    bridge.registerHandler('updateLocation', function(city) {
        $indexVM.city = city;
    });
});
