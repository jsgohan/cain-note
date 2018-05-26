### redux middleware

####演变史：

#####Monkeypatching，用自己的函数替换store.dispatch

```
function logger(store) {
    const next = store.dispatch;
    return function dispatchAndLog(action) {
        console.log('dispatching', action);
        let result = next(action);
        console.log('next state', store.getState());
        return result;
    }
}
```

在redux内部提供一个可以将实际的monkeypatching应用到store.dispatch中的辅助方法：

```
function applyMiddlewareByMonkeypatching(store, middlewares) {
    middlewares = middlewares.slice();
    middlewares.reverse();
    // 在每一个middleware中变换dispatch方法
    middlewares.forEach(middleware => store.dispatch = middleware(store));
    // 这里的store.dispatch赋值是最关键的，如果这里没有立即替换store.dispatch，那么store.dispatch将会一直指向原始的dispatch方法。也就是第二个middleware依旧作用在原始的dispatch方法。
}
```

应用多个middleware:

```
applyMiddlewareByMonkeypatching(store, [logger, crashReporter]);
```

##### 将middleware以方法参数的形式接收一个next()方法，不通过store实例去获取，结合箭头函数柯里化

```
const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

const crashReport = store => next => action => {
    try {
        return next(action);
    } catch(err) {
        console.log('Caught an exception', err);
        Raven.captureException(err, {
            extra: {
                action,
                state: store.getState()
            }
        });
        throw err;
    }
}
```

在redux内部提供applyMiddleware()方法，最终会获取到经过包装好的dispatch()函数，并返回一个store的副本：

```
function applyMiddleware(store, middlewares) {
    middlewares = middlewares.slice();
    middlewares.reverse();
    const dispatch = store.dispatch;
    middlewares.forEach(middleware => dispatch = middleware(store)(dispatch));
    return Object.assign({}, store, { dispatch });
}
```

在redux store中引用：

```
import { createStore, combineReducers, applyMiddleware } from 'redux';

const todoApp = combineReducers(reducers);
const store = createStore(
	todoApp,
	applyMiddleware(logger, crashReporter)
)
```







