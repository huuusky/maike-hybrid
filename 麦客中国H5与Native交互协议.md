# 麦客中国H5与Native交互协议

H5与Native交互使用WebViewJavascriptBridge,
使用方法详见： 
>*  [Android版](https://github.com/gzsll/WebViewJavascriptBridge) 
>*  [iOS版](https://github.com/marcuswestin/WebViewJavascriptBridge)


##*参数说明*
    url       页面地址
    method    方法
    arguments 传递参数

## 首页

### **url**
 
> **maike/index.html**

### **method**

>#### H5
>
>*  **init** 初始化首页数据   
>*  **loadError** 加载错误
>
>#### Native
>
>*  **findFarmWork** 找农活   
>*  **findFarmMachinery** 找农机   
>*  **workGuide** 作业指南 
>*  **contactCustomerService** 联系客服 
>*  **farmProduce** 农产品销售
>*  **viewDetail(id, publishType)** 查看详情
>*  **reload** 重新加载

### **arguments**

>*  **id** 农活或农机ID
>*  **publishType** 类型 1-农机 2-农活

## 找农活、找农机列表

### **url** 
> **maike/list.html**

### **method**

>#### H5
>
>*  **initList** 初始化列表
>
>#### Native
>
>*  **appendList** 追加翻页后的数据至列表  

### **arguments**

>*  **page** 页码


## 找农活、找农机详情
### **url** 
>* **maike/farm-work-detail.html** 农活详情
>* **maike/farm-machinery-detail.html** 农机详情

### **method**

>#### H5
>
>*  **initDetail** 初始化详情页类容  
>
>#### Native
>
>*  **submit** 提交 
>*  **favour** 收藏
>

### **arguments**

>*  **id** 农活、农机ID

## 农活、农机订单详情
### **url** 
>* **maike/order-detail.html** 

### **method**

>#### H5
>
>*  **initDetail** 初始化订单详情页类容  
>
>#### Native
>
>*  **confirm(orderId, taskId)** 确认
>*  **pay(orderId, taskId)** 付款
>*  **done(orderId, taskId)** 服务完成
>*  **feedback(orderId, taskId)** 评价

## 发现
### **url** 
>* **maike/discover.html**

### **method**

>#### Native
>
>*  **open(title, url)** 打开新窗口


## 我的消息
### **url** 
>* **maike/messages.html** 

### **method**

>#### H5
>
>*  **init** 初始化消息列表

## 作业指南
### **url** 
>* **maike/operation-manual.html** 

## 关于
### **url** 
>* **maike/about.html**

## 关于麦客
### **url**
>* **maike/about-maike.html**

### **method**

>#### Native
>
>* **open(title, url)** 打开新窗口

## 注册协议 & 条款说明
### **url**
>* **maike/registration-agreement.html**

## 优惠券使用规则
### **url**
>* **maike/coupon-agreement.html**