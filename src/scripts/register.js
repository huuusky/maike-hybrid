/**
 * Created by LiKun on 2016/9/20.
 */
// 邀请人ID
var recommenderId = getParameter("recommenderId");

// 接口地址
// var HOST = 'http://192.168.168.88:8080/maike-mobile';
var HOST = 'http://www.xingdt.com/maike-mobile';

// 微信分享内容
var SHARE_DATA = {
  title: '注册有礼', // 分享标题
  desc: '现在注册麦客中国就送200元优惠券，更多优惠等着您来领取。', // 分享描述
  link: 'http://www.xingdt.com/maike/register.html?id=' + recommenderId, // 分享链接
  imgUrl: 'http://www.xingdt.com/maike/assets/images/logo/logo-small.png' // 分享图标
};

var $registerVM = new Vue({
  el: 'body',
  data: {
    mobile: '',
    verificationCode: '',
    hasVerificationCode: false,
    isRegistered: false,
    coupon: null
  },
  ready: function () {
    // todo 微信分享
  },
  methods: {
    getVerificationCode: function () {
      var self = this;

      // 显示重新获取验证码按钮 & 倒计时
      self.hasVerificationCode = true;
      var count = function (seconds) {
        setTimeout(function () {
          if (seconds === 0) {
            self.hasVerificationCode = false;
            document.querySelector('#retrieve-code-btn').innerText = '重新获取(30)';
          } else {
            seconds--;
            document.querySelector('#retrieve-code-btn').innerText = '重新获取(' + seconds + ')';
            count(seconds)
          }
        }, 1000)
      };
      count(30);

      // 发送获取验证码请求
      this.$http
        .get(HOST + '/v1/auth/getRegCode?mobile=' + this.mobile)
        .then(function (response) {
          if (!response.data.success) {
            toast(response.data.msg)
          }
        });
    },
    register: function () {
      // 发送注册请求
      this.$http
        .get(HOST + '/v1/share/drawByRecommend?applyerMobile=' + this.mobile + '&verifyCode=' + this.verificationCode + '&recommenderId=' + recommenderId)
        .then(function (response) {
          if (response.data.success) {
            this.isRegistered = true;
            this.coupon = response.data.data;
          } else {
            toast(response.data.msg)
          }
        })

    }
  }
});

// 提示信息
function toast(toastText) {
  var $toast = document.querySelector('#toast');
  var $toastText = document.querySelector('#toast-text');

  $toast.className = 'toast show';
  $toastText.innerText = toastText;

  setTimeout(function () {
    $toast.className = 'toast';
    $toastText.innerText = '';
  }, 2000);
}

// 获取地址栏传递参数的值
function getParameter(parameter) {
  var reg = new RegExp('[\?\&]' + parameter + '=([^\&]*)(\&?)', 'i');
  var str = location.search.match(reg);
  return str ? str[1] : str;
}
