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

var $orderVM = new Vue({
  el: 'body',
  data: {
    couponModel: document.querySelector('#coupon-modal'),
    selectedCouponId: 0, // 选中的优惠券ID
    selectedCouponValue: 0, // 选中的优惠券面额
    detail: {
      "orderId": 2,
      "orderNo": "M16081700001",
      "title": "玉米开沟",
      "state": 2,
      "status": "待付款",
      "workAcreage": "10000亩",
      "expectedPrice": 80,
      "workPeriod": "2016-10-01~2016-10-07",
      "gmtCreate": "2016-08-12 11:19:27",
      "workType": "开沟",
      "publishType": 2,
      "crop": "玉米",
      "publisher": "老司机a",
      "quantity": null,
      "soilType": "旱地",
      "machineType": null,
      "taskId": null,
      "coupons": [
        {
          "couponId": 1,
          "title": "注册送券",
          "amount": 50,
          "state": 0,
          "expiredDate": "2016-10-30",
          "isUsed": 0
        },
        {
          "couponId": 2,
          "title": "注册送券",
          "amount": 66,
          "state": 0,
          "expiredDate": "2016-10-30",
          "isUsed": 0
        },
        {
          "couponId": 3,
          "title": "注册送券",
          "amount": 200,
          "state": 0,
          "expiredDate": "2016-10-30",
          "isUsed": 0
        }
      ],
      "remark": null,
      "address": "广东深圳龙华区清湖市场",
      "concactPhone": "",
      "deposit": 1000
    }
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
    }
  }
});
