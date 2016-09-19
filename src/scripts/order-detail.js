/**
 * 农活、农机订单详情
 */

/*var $orderVM = new Vue({
  el: 'body',
  data: {
    couponModel: document.querySelector('#coupon-modal'),
    selectedCouponId: null, // 选中的优惠券ID
    selectedCouponValue: 0, // 选中的优惠券面额
    detail: {
      "orderId": 22,
      "orderNo": "M16091400001",
      "title": "水稻深耕",
      "state": 3,
      "status": "待付款",
      "workAcreage": "545787亩",
      "expectedPrice": 2158,
      "workPeriod": "2016-09-06~2016-09-07",
      "gmtCreate": "2016-09-14 12:56:22",
      "workType": "深耕",
      "publishType": 2,
      "crop": "水稻",
      "publisher": "博大农机合作社",
      "quantity": null,
      "soilType": "旱地",
      "machineType": null,
      "taskId": "367bd5e9fcc749729f4d925f16744bb0",
      "coupons": [
        {
          "couponId": 1,
          "title": "注册送券",
          "amount": 200,
          "state": 0,
          "expiredDate": "2016-09-30",
          "isUsed": 0
        }
      ],
      "remark": null,
      "address": "黑龙江齐齐哈尔市富裕县fghjj",
      "concactPhone": "",
      "deposit": 1
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
});*/

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

