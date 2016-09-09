/**
 * 农活、农机订单详情
 */
setupWebViewJavascriptBridge(function (bridge) {
  var $orderVM = new Vue({
    el: 'body',
    data: {
      couponModel: document.querySelector('#coupon-modal'),
      selectedCouponId: null, // 选中的优惠券ID
      selectedCouponValue: 0, // 选中的优惠券面额
      detail: {}
    },
    methods: {
      showCoupons: function () {
        this.couponModel.className += ' active';
      },
      selectCoupon: function (selectedIndex, couponId, couponValue) {
        this.selectedCouponId = couponId;
        this.selectedCouponValue = couponValue;
        console.log(this.selectedCouponValue);
        // 给当前选中的优惠券添加选中状态，并且去掉其他优惠券的选中状态
        document.querySelectorAll('.coupon').forEach(function (item, index) {
          selectedIndex === index ? item.className += ' active' : item.className = 'coupon';
        });
      },
      cancelCoupons: function () {
        this.selectedCouponId = 0;
        this.hideCoupons();
      },
      hideCoupons: function () {
        this.couponModel.className = 'modal coupon-modal';
      },
      confirm: function () {
        bridge.callHandler('confirm', {orderId: this.detail.orderId, taskId: this.detail.taskId});
      },
      pay: function () {
        bridge.callHandler('pay', {orderId: this.detail.orderId, taskId: this.detail.taskId, couponId: this.selectedCouponId});
      },
      done: function () {
        bridge.callHandler('done', {orderId: this.detail.orderId, taskId: this.detail.taskId});
      },
      feedback: function () {
        bridge.callHandler('feedback', {orderId: this.detail.orderId, taskId: this.detail.taskId});
      }
    }
  });

  bridge.registerHandler('initDetail', function (data) {
    $orderVM.detail = JSON.parse(data);
  });
});
