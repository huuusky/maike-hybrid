/**
 * Created by LiKun on 2016/9/20.
 */
// 邀请人ID
var recommenderId = getParameter("recommenderId");

// 接口地址
// var HOST = 'http://192.168.168.88:8080/maike-mobile/v1';
// var HOST = 'http://www.maikezhongguo.com/maike-mobile/v1';
var HOST = 'http://www.xingdt.com/maike-mobile/v1';

// 微信分享内容
var SHARE_DATA = {
  title: '注册有礼', // 分享标题
  desc: '现在注册麦客中国就送200元优惠券，更多优惠等着您来领取。', // 分享描述
  link: 'http://www.xingdt.com/maike/register.html?recommenderId=' + recommenderId, // 分享链接
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
    this.$http.get(HOST + '/wechatSign/sign?url=' + encodeURIComponent(location.href.split('#')[0]))
      .then(function (response) {
        var data = response.body.data;
        if (response.body.success) {
          wx.config({
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
              "checkJsApi",
              "onMenuShareTimeline",
              "onMenuShareAppMessage"
            ]
          });

          wx.ready(function () {
            // 分享给朋友
            wx.onMenuShareAppMessage({
              title: SHARE_DATA.title,
              desc: SHARE_DATA.desc,
              link: SHARE_DATA.link,
              imgUrl: SHARE_DATA.imgUrl
            });

            // 分享到朋友圈
            wx.onMenuShareTimeline({
              title: SHARE_DATA.title,
              link: SHARE_DATA.link,
              imgUrl: SHARE_DATA.imgUrl
            });
          });
        }
      })
  },
  methods: {
    getVerificationCode: function () {
      var self = this;
      if (/^\d{11}$/g.test(self.mobile)) {
        // 显示重新获取验证码按钮 & 倒计时
        self.hasVerificationCode = true;
        var count = function count(seconds) {
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
          .get(HOST + '/auth/getRegCode?mobile=' + this.mobile)
          .then(function (response) {
            console.log(response.body);
            if (!response.body.success) {
              toast(response.body.msg)
            }
          });
      } else {
        toast('请输入正确的手机号码')
      }
    },
    register: function () {
      if (/^\d{4}$/g.test(this.verificationCode)) {
        // 发送注册请求
        this.$http
          .get(HOST + '/share/drawByRecommend?applyerMobile=' + this.mobile + '&verifyCode=' + this.verificationCode + '&recommenderId=' + recommenderId)
          .then(function (response) {
            console.log(response.body);
            if (response.body.success) {
              this.isRegistered = true;
              this.coupon = response.body.data;
            } else {
              toast(response.body.msg)
            }
          })
      } else {
        toast('验证码输入错误')
      }
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

