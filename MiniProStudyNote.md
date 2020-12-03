### 学习目标

自定义组件

小程序组件库使用

### 项目功能

tabBar 导航栏（已完成）

#### 阅读页

1. 轮播预览图（swiper 组件，已完成）
2. 文章列表（列表渲染，已完成）
3. 文章详情页（页面通信，已完成）
4. 文章收藏、分享（缓存，弹窗，已完成）
5. 音乐播放（BackgroundAudioManager，已完成 ）
6. 文章列表顶部图片跳转（已完成）

数据来源：假数据

#### 电影页

1. 电影列表（已完成）
2. 更多列表（无限滚动加载数据）（已完成）
3. 电影详情页（已完成）
4. 搜索（已完成）

数据来源：api 接口数据

# Day01

小程序一切都是组件

### 页面基本文件

一个页面由4个基本文件组成：

- js：业务逻辑
- json：页面配置
- wxml：页面骨架
- wxss：样式

### rpx

根据分辨率改变动态调整大小

### 小技巧

##### 设置全屏背景色

可以给当前页面的 `page` 标签添加 `background-color`

# Day02

### 数据绑定

大部分是单向数据绑定，但也可以实现双向数据绑定

Page.data 和 Page.prototype.setData

### 页面生命周期

`onLoad`：监听页面加载，大部分页面初始化工作函数

`onReady`：监听页面初次渲染完成

`onShow`：监听页面显示

`onHide`：监听页面隐藏

`onUnload`：监听页面卸载

### 条件渲染

使用 `wx:if=""` 来判断是否需要渲染该代码块，也可以用 `wx:elif` 和 `wx:else` 来添加一个 else 块：

```html
<view wx:if="{{length > 5}}"> 1 </view>
<view wx:elif="{{length > 2}}"> 2 </view>
<view wx:else> 3 </view>
```

### 列表渲染

在组件上使用 `wx:for` 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件。

默认数组的当前项的下标变量名默认为 `index`，数组当前项的变量名默认为 `item`

```html
<view wx:for="{{array}}">
  {{index}}: {{item.message}}
</view>
```

使用 `wx:for-item` 可以指定数组当前元素的变量名

使用 `wx:for-index` 可以指定数组当前下标的变量名

如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态，需要使用 `wx:key` 来指定列表中项目的唯一的标识符。

### 事件

- 事件是视图层到逻辑层的通讯方式
- 事件可以将用户的行为反馈到逻辑层进行处理
- 事件可以绑定在组件上，当达到触发事件，就会执行逻辑层中对应的事件处理函数
- 事件对象可以携带额外信息，如 id, dataset, touches

##### 使用

```html
<view bindtap="tapName"> Click me! </view>
```

点击时会触发页面的 tapName 函数

```html
<view bindtap="{{ handlerName }}"> Click here! </view>
```

点击时会触发页面的 `this.data.handlerName` 

##### 分类

- 冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递
- 非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递

##### 绑定并阻止事件冒泡

用 `catch` 来绑定事件会阻止事件向上冒泡

多由于开发自定义组件

```html
<view id="outer" bindtap="handleTap1">
  outer view	// handleTap1
  <view id="middle" catchtap="handleTap2">
    middle view		// handleTap2
    <view id="inner" bindtap="handleTap3">
      inner view	// handleTap3 handleTap2
    </view>
  </view>
</view>
```

##### 互斥事件绑定

使用 `mut-bind` 来绑定事件。一个 `mut-bind` 触发后，如果事件冒泡到其他节点上，其他节点上的 `mut-bind` 绑定函数不会被触发，但 `bind` 绑定函数和 `catch` 绑定函数依旧会被触发。

```html
<view id="outer" mut-bind:tap="handleTap1">
  outer view	// handleTap1
  <view id="middle" bindtap="handleTap2">
    middle view		// handleTap2 handleTap1
    <view id="inner" mut-bind:tap="handleTap3">
      inner view	// handleTap3 handleTap2
    </view>
  </view>
</view>
```

##### 事件的捕获阶段

触摸类事件支持捕获阶段。

捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。需要在捕获阶段监听事件时，可以采用`capture-bind`、`capture-catch`关键字，后者将中断捕获阶段和取消冒泡阶段。

```html
<view id="outer" bind:touchstart="handleTap1" capture-bind:touchstart="handleTap2">
  outer view
  <view id="inner" bind:touchstart="handleTap3" capture-bind:touchstart="handleTap4">
    inner view	// handleTap2 handleTap4 handleTap3 handleTap1
  </view>
</view>
```

更多参考 [官方文档-事件系统](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)

# Day03

### 路由

##### wx.navigateTo(Object)

保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。

小程序中页面栈最多十层。

##### wx.redirectTo(Object)

关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。

##### wx.switchTab(Object)

跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面

### 自定义属性

`data-xxx`，可在触发函数的 event 中获取到

### 页面通讯

##### url 传递

通过跳转页面函数的 url 传递参数，在新页面的 onLoad 函数的 options 中获取

```js
// post.js
wx.navigateTo({
	url: `/pages/post-detail/post-detail?pid=${pid}`
});
```

```js
// post-detail.js
onLoad: function (options) {
  console.log(options)	// {pid: 3}
}
```

### 全局变量

在 `app.js` 中定义变量，在任何组件使用 `getApp()`  可获取小程序实例

### 小程序缓存

每个微信小程序都可以有自己的本地缓存，可以通过 [wx.setStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorage.html)/[wx.setStorageSync](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html)、[wx.getStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorage.html)/[wx.getStorageSync](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageSync.html)、[wx.clearStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.clearStorage.html)/[wx.clearStorageSync](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.clearStorageSync.html)，[wx.removeStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.removeStorage.html)/[wx.removeStorageSync](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.removeStorageSync.html) 对本地缓存进行读写和清理。

提供的 api 有同步版本和异步版本

小程序目前对异步版的 api 已经支持了 promise 和 async/await 的方法操作异步

```js
wx.getStorage({
  key: 'key'
}).then((res) => {
	console.log(res)
})
```

```js
async onLoad() {
	const res = await wx.getStorage({
		key: 'key'
	});
    console.log(res);
}
```

##### wx.setStorage/wx.setStorageSync

将数据存储在本地缓存中指定的 key 中

会覆盖掉原来该 key 对应的内容。除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。

单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。

```js
wx.setStorage({
  key:"key",
  data:"value"
})
```

```js
wx.setStorageSync('key', 'value')
```

##### wx.removeStorage/wx.removeStorageSync

从本地缓存中移除指定 key

```js
wx.removeStorage({
  key: 'key',
  success (res) {
    console.log(res)
  }
})
```

```js
wx.removeStorageSync('key')
```

##### wx.getStorage/wx.getStorageSync

从本地缓存中异步获取指定 key 的内容

```js
wx.getStorage({
  key: 'key',
  success (res) {
    console.log(res.data)
  }
})
```

```js
wx.getStorageSync('key')
```

##### wx.getStorageInfo/wx.getStorageInfoSync

获取当前storage的相关信息

```js
wx.getStorageInfo({
  success (res) {
    console.log(res.keys)
    console.log(res.currentSize)
    console.log(res.limitSize)
  }
})
```

```js
wx.getStorageInfoSync()
```

##### wx.clearStorage/wx.clearStorageSync

清理本地数据缓存

```js
wx.clearStorage()
```

```js
wx.clearStorageSync()
```

### 交互弹窗

##### wx.showToast

显示消息提示框

```js
wx.showToast({
  title: '成功',
  icon: 'success',
  duration: 2000
})
```

##### wx.showModal

显示模态对话框，可监听确认和取消函数

```js
wx.showModal({
  title: '提示',
  content: '这是一个模态弹窗',
  success (res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
```

##### wx.showLoading

显示 loading 提示框。需主动调用 `wx.hideLoading` 才能关闭提示框

##### wx.showActionSheet

显示自定义操作菜单，success 回调返回值属性 tapIndex 是点击的按钮序号 

```js
wx.showActionSheet({
  itemList: ['A', 'B', 'C'],
  success (res) {
    console.log(res.tapIndex)
  },
  fail (res) {
    console.log(res.errMsg)
  }
})
```

### 背景音乐

##### wx.getBackgroundAudioManager()

获取**全局唯一**的背景音频管理器

##### BackgroundAudioManager

背景音乐实例

```js
const backgroundAudioManager = wx.getBackgroundAudioManager()

backgroundAudioManager.title = '此时此刻'
backgroundAudioManager.epname = '此时此刻'
backgroundAudioManager.singer = '许巍'
backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
// 设置了 src 之后会自动播放
backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
```

##### 小问题

音乐加载后立即调用 `.pause()` 方法无法立即暂停播放，原因是这时音乐还没开始播放，可先调用 `.play()` 再调用 `.pause()` 

`setData` 设置 data 里的背景音乐实例无效，需直接用 `this.data.backgroundAudioManager.src = xxx` 赋值形式才能触发

### 小优化

视频中对收藏图片的切换直接用 vx:if 切换性能不如用变量修改 src 的属性

# Day04

### 底部导航

`app.json` 配置 `tabBar` 可以配置底部导航

### 自定义组件

##### this 问题

是否在页面文件中使用 `usingComponents` 会使得页面的 `this` 对象的原型稍有差异，包括：

- 使用 `usingComponents` 页面的原型与不使用时不一致，即 `Object.getPrototypeOf(this)` 结果不同。
- 使用 `usingComponents` 时会多一些方法，如 `selectComponent` 。
- 出于性能考虑，使用 `usingComponents` 时， `setData` 内容不会被直接深复制，即 `this.setData({ field: obj })` 后 `this.data.field === obj` 。（深复制会在这个值被组件间传递时发生。）

### 文本省略换行

```css
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
word-break: break-all;
// 需指定固定宽度
```

### 路由请求

##### wx.request

```js
wx.request({
	url: 'http://t.talelin.com/v2/movie/in_theaters',
	success(res) {
		console.log(res)
	}
})
```

# Day05

### 下拉刷新

配置 json 文件里的 `enablePullDownRefresh`

### 动态导航标题

`wx.setNavigationBarTitle` 动态设置当前页面的标题，建议在 `onReady` 中设置

```js
wx.setNavigationBarTitle({
  title: '当前页面'
})
```

### 自定义事件

组件内抛出事件 `this.triggerEvent()`，指定事件名、detail 对象和事件选项：

```html
<!-- 子组件 wxml -->
<view bind:tap="handleTap"></view>
```

```js
// 子组件 js
handleTap() {
  const id = 0;
	this.triggerEvent(
  	'compTap',
    // eventDetail
  	{
    	id: id
  	},
    // eventOption
    {
      bubbles: true,	// 事件是否冒泡
      composed: true,	// 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
      capturePhase: true	// 事件是否拥有捕获阶段
    }
  )
}
```

```html
<!-- 父组件 wxml -->
<view bind:compTap="handleCompTap"></view>
```

```js
// 父组件 js
handleCompTap(e) {
	console.log(e.detail.id);	// 0
}
```

### 图片预览

`wx.previewImage` 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。

```js
wx.previewImage({
	urls: [urls]
})
```

