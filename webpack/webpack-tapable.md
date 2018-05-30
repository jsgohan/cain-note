#### Tapable

webpack本质是一种事件流的机制，工作流程就是将各插件串联起来，实现一切的核心就是Tapable，webpack中最核心的负责编译的Compiler和负责创建bundles的Compilation都是Tapable的实例。

##### 钩子类

```
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");
```

所有的钩子类的构造函数都接收一个可选的参数，这个参数是个字符串数组

##### hooks

包括同步和异步，异步又分为并发执行和串行执行

1. Sync* hoook
   - SyncHook

不关心监听函数的返回值

```
const { SyncHook } = require("tapable");
let queue = new SyncHook(['name']); //所有的构造函数都接收一个可选的参数，这个参数是一个字符串的数组。

// 订阅
queue.tap('1', function (name, name2) {// tap 的第一个参数是用来标识订阅的函数的
    console.log(name, name2, 1);
    return '1'
});
queue.tap('2', function (name) {
    console.log(name, 2);
});
queue.tap('3', function (name) {
    console.log(name, 3);
});

// 发布
queue.call('webpack', 'webpack-cli');// 发布的时候触发订阅的函数 同时传入参数

// 执行结果:
/* 
webpack undefined 1 // 传入的参数需要和new实例的时候保持一致，否则获取不到多传的参数
webpack 2
webpack 3
*/
```

```
class SyncHook_MY{
    constructor(){
        this.hooks = [];
    }

    // 订阅
    tap(name, fn){
        this.hooks.push(fn);
    }

    // 发布
    call(){
        this.hooks.forEach(hook => hook(...arguments));
    }
}
```

- SyncBailHook

  只要监听函数中有一个函数的返回值不为null，则跳过剩下所有的逻辑

  ```
  class SyncBailHook_MY {
      constructor() {
          this.hooks = [];
      }
  
      // 订阅
      tap(name, fn) {
          this.hooks.push(fn);
      }
  
      // 发布
      call() {
          for (let i = 0, l = this.hooks.length; i < l; i++) {
              let hook = this.hooks[i];
              let result = hook(...arguments);
              if (result) {
                  break;
              }
          }
      }
  }
  ```

- SyncWaterfallHook

  上一个监听函数的返回值可以传给下一个监听函数

  ```
  class SyncWaterfallHook_MY{
      constructor(){
          this.hooks = [];
      }
      
      // 订阅
      tap(name, fn){
          this.hooks.push(fn);
      }
  
      // 发布
      call(){
          let result = null;
          for(let i = 0, l = this.hooks.length; i < l; i++) {
              let hook = this.hooks[i];
              result = i == 0 ? hook(...arguments): hook(result); 
          }
      }
  }
  ```

- SyncLoopHook

  当监听函数被触发的时候，如果该监听函数返回true时则这个监听函数会反复执行，如果返回undefined则表示退出循环

  ```
  class SyncLoopHook_MY {
      constructor() {
          this.hook = null;
      }
  
      // 订阅
      tap(name, fn) {
          this.hook = fn;
      }
  
      // 发布
      call() {
          let result;
          do {
              result = this.hook(...arguments);
          } while (result)
      }
  }
  ```

2. Async* Hook

   异步并行

   - AsyncParallelHook

     不关心监听函数的返回值

     有三种注册/发布的模式

     | 异步订阅   | 调用方法  |
     | ---------- | --------- |
     | tap        | callAsync |
     | tapAsync   | callAsync |
     | tapPromise | promise   |

     tap:

     ```
     const {
         AsyncParallelHook
     } = require("tapable");
     
     let queue1 = new AsyncParallelHook(['name']);
     console.time('cost');
     queue1.tap('1', function (name) {
         console.log(name, 1);
     });
     queue1.tap('2', function (name) {
         console.log(name, 2);
     });
     queue1.tap('3', function (name) {
         console.log(name, 3);
     });
     queue1.callAsync('webpack', err => {
         console.timeEnd('cost');
     });
     
     // 执行结果
     /* 
     webpack 1
     webpack 2
     webpack 3
     cost: 4.520ms
     */
     ```

     tapAsync:

     ```
     let queue2 = new AsyncParallelHook(['name']);
     console.time('cost1');
     queue2.tapAsync('1', function (name, cb) {
         setTimeout(() => {
             console.log(name, 1);
             cb();
         }, 1000);
     });
     queue2.tapAsync('2', function (name, cb) {
         setTimeout(() => {
             console.log(name, 2);
             cb();
         }, 2000);
     });
     queue2.tapAsync('3', function (name, cb) {
         setTimeout(() => {
             console.log(name, 3);
             cb();
         }, 3000);
     });
     
     queue2.callAsync('webpack', () => {
         console.log('over');
         console.timeEnd('cost1');
     });
     
     // 执行结果
     /* 
     webpack 1
     webpack 2
     webpack 3
     over
     time: 3004.411ms
     */
     ```

     Promise:

     ```
     let queue3 = new AsyncParallelHook(['name']);
     console.time('cost3');
     queue3.tapPromise('1', function (name, cb) {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                console.log(name, 1);
                resolve();
            }, 1000);
        });
     });
     
     queue3.tapPromise('1', function (name, cb) {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                console.log(name, 2);
                resolve();
            }, 2000);
        });
     });
     
     queue3.tapPromise('1', function (name, cb) {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                console.log(name, 3);
                resolve();
            }, 3000);
        });
     });
     
     queue3.promise('webpack')
        .then(() => {
            console.log('over');
            console.timeEnd('cost3');
        }, () => {
            console.log('error');
            console.timeEnd('cost3');
        });
     /* 
     webpack 1
     webpack 2
     webpack 3
     over
     cost3: 3007.925ms
     */
     ```

   - AsyncParallelBailHook

     只要监听函数返回值不为null，就会忽略后面的监听函数执行，直接跳到callAsync等触发函数绑定的回调函数，然后执行这个被绑定的回调函数

   异步串行

   - AsyncSeriesHook

     不关心callback()参数

     ```
     class AsyncSeriesHook_MY {
         constructor() {
             this.hooks = [];
         }
     
         tapAsync(name, fn) {
             this.hooks.push(fn);
         }
     
         callAsync() {
             var slef = this;
             var args = Array.from(arguments);
             let done = args.pop();
             let idx = 0;
     
             function next(err) {
                 // 如果next的参数有值，就直接跳跃到 执行callAsync的回调函数
                 if (err) return done(err);
                 let fn = slef.hooks[idx++];
                 fn ? fn(...args, next) : done();
             }
             next();
         }
     }
     ```

   - AsyncSeriesBailHook

     callback()参数不为null，就会直接执行callAsync等触发函数绑定的回调函数

   - AsyncSeriesWaterfallHook

     上一个监听函数中的callback(err, data)的第二个参数，可以作为下一个监听函数的参数

     ```
     class AsyncSeriesWaterfallHook_MY {
         constructor() {
             this.hooks = [];
         }
     
         tapAsync(name, fn) {
             this.hooks.push(fn);
         }
     
         callAsync() {
             let self = this;
             var args = Array.from(arguments);
     
             let done = args.pop();
             console.log(args);
             let idx = 0;
             let result = null;
     
             function next(err, data) {
                 if (idx >= self.hooks.length) return done();
                 if (err) {
                     return done(err);
                 }
                 let fn = self.hooks[idx++];
                 if (idx == 1) {
     
                     fn(...args, next);
                 } else {
                     fn(data, next);
                 }
             }
             next();
         }
     }
     ```

     

#### compiler钩子

访问方式

```
compiler.hooks.someHook.tap(...)
```

取决于不同的钩子类型，也可以在某些钩子上访问tapAsync和tapPromise

- entryOption - SyncBailHook - 在entry配置处理过之后，执行插件
- afterPlugins - SyncHook - 设置完初始插件之后，执行插件
- afterResolvers- SyncHook - resolver安装完成之后，执行插件
- environment - SyncHook - environment安装完成之后，执行插件
- beforeRun - AsyncSeriesHook - compiler.run()执行之前，添加一个钩子
- run - AsyncSeriesHook - 开始读取records之前，钩入（hook into）compiler
- watchRun - AsyncSeriesHook - 监听模式下，一个新的编译（compilation）触发之后，执行一个插件，但是是在实际编译开始之前
- normalModuleFactory - SyncHook - NormalModuleFactory创建之后，执行插件
- contextModuleFactory - ContextModuleFactory创建之后，执行插件
- beforeCompile - AsyncSeriesHook - 编译（compilation）参数创建之后，执行插件
- compile - SyncHook - 一个新的编译（compilation）创建之后，钩入（hook into） compiler
- thisCompilation - SyncHook - 触发compilation事件之前执行
- compilation - SyncHook - 编译（compilation）创建之后，执行插件
- make - AsyncParallelHook
- afterCompile - AsyncParallelHook
- shouldEmit - SyncBailHook
- needAdditionalPass - SyncBailHook
- emit - AsyncSeriesHook - 生成资源到output目录之前
- afterEmit - AsyncSeriesHook
- done - SyncHook - 编译（compilation）完成
- failed - SyncHook
- invalid - SyncHook
- watchClose - SyncHook