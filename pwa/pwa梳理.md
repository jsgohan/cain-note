## 什么是PWA

Progressive Web App，简称PWA，是提升Web App的体验的一种新方法，能给用户原生应用的体验。

PWA能做到原生应用的体验不是靠特指某一项技术，而是经过应用一些新技术进行改进，在安全、性能和体验三个方面都有很大提升，PWA本质上是Web App，借助一些新技术具备了Native App的一些特性，兼具Web App和Native App的优点。

特点：

- **可靠**-即使在不稳定的网络环境下，也能瞬间加载并展现
- **体验**-快速响应了，并且有平滑的动画响应用户的操作
- **粘性**-像设备上的原生应用，具有沉浸式的用户体验，用户可以添加到桌面

### 离线和缓存

#### Service Worker

##### 前提条件

- Service Worker**要求HTTPS的环境**，通常可以借助github page进行学习调试。或者用**localhost、127.0.0.1**浏览器也允许调试Service Worker
- Service Worker的**缓存机制**依赖于**Cache API**实现
- 依赖HTML5 **fetch API**
- 依赖**Promise**实现

##### 注册

要安装Service Worker，需要通过在js主线程（常规的页面里的js）注册Service Worker来启动安装，这个过程会通知浏览器Service Worker线程的javaScript文件在什么地方呆着

```
if ('serviceWorker' in navigation) {
    window.addEventListener('load', function() {
        navigation.serviceWorker.register('/sw.js', {scope: '/'}).then(function(registration) {
            // 注册成功
            console.log('ServiceWorker registration successful with scope:' + registration.scope);
        }).catch(function(err) {
            // 注册失败
            console.log('ServiceWorker registration failed:' + err);
        });
    });
}
```

- 首先要判断ServiceWorker API在浏览器中是否可用，支持的话才继续实现
- 接下来在页面onload的时候注册位于./sw.js的Service Worker
- 每次页面加载成功后，就会调用register()方法，浏览器将会判断ServiceWorker线程是否已注册并作出相应的处理
- register方法的scope参数是可选的，用于指定让Service Worker控制的内容的子目录。以上demo服务工作线程文件位于根网域，意味着服务工作线程的作用域将是整个来源
- 说明register方法的**scope参数**：**ServiceWorker线程将接收scope指定网域目录上所有事项的fetch事件**，如果我们的ServiceWorker的JavaScript文件在/a/b/sw.js，不传scope值的情况下，scope的值就是/a/b
- scope的值得意义在于如果scope的值为/a/b，那么ServiceWorker线程只能捕获到path为/a/b开头的（/a/b/page1，/a/b/page2，…）页面的fetch事件。通过scope的意义也能看出ServiceWorker不是服务单个页面的，所以在ServiceWorker的js逻辑中全局变量需要慎用
- then()函数链式调用promise，当promise resolve的时候，里面的代码就会执行
- 最后链了一个catch()函数，当promise rejected才会执行

代码执行完成之后，就注册了一个Service Worker，它工作在worker context，所以**没有访问DOM的权限**。在正常的页面之外运行Service Worker的代码来控制他们的加载。

##### 查看是否注册成功

可以用[service-worker-inspect](chrome://inspect/#service-workers)

还可以通过[service-worker-internals](chrome://serviceworker-internals)来查看服务工作线程详情。如果只是很想了解服务工作线程的生命周期，这很有用，但很有可能被上者取代

##### 注册失败的原因

- 不是HTTPS环境，不是localhost或127.0.0.1
- Service Worker文件的地址没有写对，需要相对于origin
- Service Worker文件在不同的origin下而不是你的APP的，是不被允许的

##### 安装

注册成功后，就已经有了属于web app的worker context了。接下来浏览器会不停的尝试在站点里的页面安装并激活它，并且在这里可以把静态资源的缓存给办了

install事件会绑定在Service Worker文件中，在Service Worker安装成功后，install事件被触发。

install事件一般是被用来填充你的浏览器的离线缓存能力。Service Worker使用的是一个cache API的全局对象，它使我们可以存储网络响应发来的资源，并且根据他们的请求来生成key。这个API和浏览器的标准的缓存工作原理很相似，但是只对应在站点的域中。会一直持久存在直到告诉它不在存储

local storage是同步的用法在Service Worker中不允许使用

IndexedDB可以在Service Worker内做数据存储

```
// 监听service worker的install事件
this.addEventListener('install', function(event) {
	// 如果监听到了service worker已经安装成功的话，就会调用event.waitUntil回调函数
	event.waitUtil(
		// 安装成功后操作CacheStorage缓存，使用之前需要caches.open()打开对应缓存空间
		caches.open('my-test-cache-v1').then(function(cache) {
            // 通过cache缓存对象的addAll方法添加precache缓存
            return cache.addAll([
                '/',
                '/index.html',
                '/main.css',
                '/main.js',
                '/image.jpg'
            ])
		})
	)
})
```

ExtendableEvent.waitUtil()方法—确保Service Worker不会再waitUtil()里面的代码执行之前安装完成

##### 自定义请求响应

每次任何被Service Worker控制的资源被请求时，都会触发fetch事件，这些资源包括了指定的scope内的html文档，和这些html文档内引用的其他任何资源。

```
this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
            if (response) {
                return response;
            }

            // 如果 service worker 没有返回，那就得直接请求真实远程服务
            var request = event.request.clone(); // 把原始请求拷过来
            return fetch(request).then(function (httpRes) {

                // http请求的返回已被抓到，可以处置了。

                // 请求失败了，直接返回失败的结果就好了。。
                if (!httpRes || httpRes.status !== 200) {
                    return httpRes;
                }

                // 请求成功的话，将请求缓存起来。
                var responseClone = httpRes.clone();
                caches.open('my-test-cache-v1').then(function (cache) {
                    cache.put(event.request, responseClone);
                });

                return httpRes;
            });
        })
    );
});
```

因此，缓存静态资源可以通过两种方式，在**install**的时候进行和在**fetch事件处理回调**的时候动态实现

两种方式可以比较一下：

- on install 的优点是第二次访问即可离线，缺点是需要将需要缓存的 URL 在编译时插入到脚本中，增加代码量和降低可维护性；
- on fetch 的优点是无需更改编译过程，也不会产生额外的流量，缺点是需要多一次访问才能离线可用。

##### service worker版本更新

若/sw.js缓存策略要更新该怎么处理？

如果/sw.js内容有更新，当访问网站页面时浏览器获取了新的文件，逐字节比对/sw.js文件发现不同时会认为有更新启动更新算法，于是会安装新的文件并触发install事件。但是此时已经处于激活状态的旧的Service Worker还在运行，新的Service Worker完成安装后会进入waiting状态。直到所有已打开的页面都关闭，旧的Service Worker自动停止，新的Service Worker才会在接下来重新打开的页面里生效。

##### 自动更新所有页面

可以在install事件中执行**self.skipWaiting()**方法跳过waiting状态，然后会直接进入activate阶段。接着在activate事件发生时，通过执行**self.clients.claim()**方法，更新所有客户端上的Service Worker。

```
// 安装阶段跳过等待，直接进入 active
self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        Promise.all([

            // 更新客户端
            self.clients.claim(),

            // 清理旧版本
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        if (cacheName !== 'my-test-cache-v1') {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});
```

另外要注意一点，**/sw.js文件可能会因为浏览器缓存问题，当文件有了变化时，浏览器里还是旧的文件**。这会导致更新得不到响应。因此，**在Web Server上添加对该文件的过滤规则，不缓存或设置较短的有效期**。

##### 手动更新Service Worker

在**页面**中，可以借助**Registration.update()更新**。

```
var version='1.0.1';
navigator.serviceWorker.register('/sw.js').then(function(reg) {
    if (localStorage.getItem('sw_version') !== version) {
        reg.update().then(function () {
            localStorage.setItem('sw_version', version);
        });
    }
});
```

##### 生命周期

在页面脚本中注册Service Worker文件所在的URL。Worker就可以开始激活了，激活后的Service Worker可以监听当前域下的功能性事件，比如资源请求（fetch）、推送通知（push）、后台同步（sync）。

Service Worker基本步骤：

- 首先我们需要在页面的 JavaScript 主线程中使用 `serviceWorkerContainer.register()` 来注册 Service Worker ，在注册的过程中，浏览器会在后台启动尝试 Service Worker 的安装步骤。
- 如果注册成功，Service Worker 在 ServiceWorkerGlobalScope 环境中运行； 这是一个特殊的 worker context，与主脚本的运行线程相独立，同时也没有访问 DOM 的能力。
- 后台开始安装步骤， 通常在安装的过程中需要缓存一些静态资源。如果所有的资源成功缓存则安装成功，如果有任何静态资源缓存失败则安装失败，在这里失败的不要紧，会自动继续安装直到安装成功，如果安装不成功无法进行下一步 — 激活 Service Worker。
- 开始激活 Service Worker，必须要在 Service Worker 安装成功之后，才能开始激活步骤，当 Service Worker 安装完成后，会接收到一个激活事件（activate event）。激活事件的处理函数中，主要操作是清理旧版本的 Service Worker 脚本中使用资源。
- 激活成功后 Service Worker 可以控制页面了，但是只针对在成功注册了 Service Worker 后打开的页面。也就是说，页面打开时有没有 Service Worker，决定了接下来页面的生命周期内受不受 Service Worker 控制。所以，只有当页面刷新后，之前不受 Service Worker 控制的页面才有可能被控制起来。

![sw-lifecycle](sw-lifecycle.png)

- **安装( installing )**：这个状态发生在 Service Worker 注册之后，表示开始安装，触发 install 事件回调指定一些静态资源进行离线缓存。

`install` 事件回调中有两个方法：

- `event.waitUntil()`：传入一个 Promise 为参数，等到该 Promise 为 resolve 状态为止。
- `self.skipWaiting()`：`self` 是当前 context 的 global 变量，执行该方法表示强制当前处在 waiting 状态的 Service Worker 进入 activate 状态。
- **安装后( installed )**：Service Worker 已经完成了安装，并且等待其他的 Service Worker 线程被关闭。
- **激活( activating )**：在这个状态下没有被其他的 Service Worker 控制的客户端，允许当前的 worker 完成安装，并且清除了其他的 worker 以及关联缓存的旧缓存资源，等待新的 Service Worker 线程被激活。

`activate` 回调中有两个方法：

- `event.waitUntil()`：传入一个 Promise 为参数，等到该 Promise 为 resolve 状态为止。
- `self.clients.claim()`：在 activate 事件回调中执行该方法表示取得页面的控制权, 这样之后打开页面都会使用版本更新的缓存。旧的 Service Worker 脚本不再控制着页面，之后会被停止。
- **激活后( activated )**：在这个状态会处理 `activate` 事件回调 (提供了更新缓存策略的机会)。并可以处理功能性的事件 `fetch (请求)`、`sync (后台同步)`、`push (推送)`。
- **废弃状态 ( redundant )**：这个状态表示一个 Service Worker 的生命周期结束。

这里特别说明一下，进入废弃 (redundant) 状态的原因可能为这几种：

- 安装 (install) 失败
- 激活 (activating) 失败
- 新版本的 Service Worker 替换了它并成为激活状态

##### 支持的事件

- **install**：Service Worker 安装成功后被触发的事件，在事件处理函数中可以添加需要缓存的文件
- **activate**：当 Service Worker 安装完成后并进入激活状态，会触发 activate 事件。通过监听 activate 事件你可以做一些预处理，如对旧版本的更新、对无用缓存的清理等。
- **message**：Service Worker 运行于独立 context 中，无法直接访问当前页面主线程的 DOM 等信息，但是通过 postMessage API，可以实现他们之间的消息传递，这样主线程就可以接受 Service Worker 的指令操作 DOM。
- **fetch (请求)**：当浏览器在当前指定的 scope 下发起请求时，会触发 fetch 事件，并得到传有 response 参数的回调函数，回调中就可以做各种代理缓存的事情了。
- **push (推送)**：push 事件是为推送准备的。不过首先需要了解一下 [Notification API](https://developer.mozilla.org/zh-CN/docs/Web/API/notification) 和 [PUSH API](https://developer.mozilla.org/zh-CN/docs/Web/API/Push_API)。通过 PUSH API，当订阅了推送服务后，可以使用推送方式唤醒 Service Worker 以响应来自系统消息传递服务的消息，即使用户已经关闭了页面。
- **sync (后台同步)**：sync 事件由 background sync (后台同步)发出。background sync 配合 Service Worker 推出的 API，用于为 Service Worker 提供一个可以实现注册和监听同步处理的方法。但它还不在 W3C Web API 标准中。在 Chrome 中这也只是一个实验性功能，需要访问 `chrome://flags/#enable-experimental-web-platform-features` ，开启该功能，然后重启生效。

#### chrome浏览器debug

使用 Chrome 浏览器，可以通过进入控制台 `Application -> Service Workers` 面板查看和调试。

![chrome_debug](chrome_debug.png)

选项含义：

- **offline**： 复选框可以将 DevTools 切换至离线模式。它等同于 Network 窗格中的离线模式。
- **Update on reload**：复选框可以强制 Service Worker 线程在每次页面加载时更新。
- **Bypass for network**：复选框可以绕过 Service Worker 线程并强制浏览器转至网络寻找请求的资源。
- **Update**：按钮可以对指定的 Service Worker 线程执行一次性更新。
- **Push**：按钮可以在没有负载的情况下模拟推送通知。
- **Sync**：按钮可以模拟后台同步事件。
- **Unregister**：按钮可以注销指定的 Service Worker 线程。
- **Source**：告诉您当前正在运行的 Service Worker 线程的安装时间。 链接是 Service Worker 线程源文件的名称。点击链接会将您定向至 Service Worker 线程来源。
- **Status**：告诉您 Service Worker 线程的状态。此行上的数字（上方屏幕截图中的 #1）指示 Service Worker 线程已被更新的次数。如果启用 `update on reload`复选框，您会注意到每次页面加载时此数字都会增大。在状态旁边，您将看到 `start` 按钮（如果 Service Worker 线程已停止）或 `stop` 按钮（如果 Service Worker 线程正在运行）。 Service Worker 线程设计为可由浏览器随时停止和启动。 使用 stop 按钮明确停止 Service Worker 线程可以模拟这一点。停止 Service Worker 线程是测试 Service Worker 线程再次重新启动时的代码行为方式的绝佳方法。它通常可以揭示由于对持续全局状态的不完善假设而引发的错误。
- **Clients**：告诉您 Service Worker 线程作用域的原点。 如果您已启用 `show all`复选框，`focus` 按钮将非常实用。 在此复选框启用时，系统会列出所有注册的 Service Worker 线程。 如果您点击正在不同标签中运行的 Service Worker 线程旁的 `focus` 按钮，Chrome 会聚焦到该标签。

##### 查看Service worker缓存内容

Service Worker 使用 Cache API 缓存只读资源，我们同样可以在 Chrome DevTools 上查看缓存的资源列表。

Cache Storage 选项卡提供了一个已使用（Service Worker 线程）Cache API 缓存的只读资源列表。

##### 网络跟踪

经过 Service Worker 的 `fetch` 请求 Chrome 都会在 Chrome DevTools Network 标签页里标注出来，其中：

- 来自 Service Worker 的内容会在 Size 字段中标注为 `from ServiceWorker`
- Service Worker 发出的请求会在 Name 字段中添加 ⚙ 图标。



