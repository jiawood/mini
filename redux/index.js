let counter = {
  count: 1,
};

function countReducer(state, action) {
  if (!state) {
    state = counter;
  }
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

let info = {
  name: "xj",
};

function infoReducer(state, action) {
  if (!state) {
    return info;
  }
  switch (action.type) {
    case "SETNAME":
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
}

function createStore(reducer, initialState, rewriteCreateStoreFunc) {

  if(typeof initialState === 'function'){
    initialState = {}
    rewriteCreateStoreFunc = initialState
  }

  // 如果有 rewriteCreateStoreFunc,那就采用新的 createStore
  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore);
    return newCreateStore(reducer, initialState);
  }
  let state = initialState;
  let listeners = [];

  function subcribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  function getState() {
    return state;
  }

  dispatch({ type: Symbol() });

  return {
    subcribe,
    dispatch,
    getState,
  };
}

// const state = {
//   counter: {
//     count: 1,
//   },
//   info: {
//     name: "xj",
//     description: "前端",
//   },
// };

const reducer = combineReducer({
  counter: countReducer,
  info: infoReducer,
});

function combineReducer(reducers) {
  let keys = Object.keys(reducers);
  return function combination(state = {}, action) {
    const nextState = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
}

let store = createStore(reducer);
// console.dir(store.getState())

// 中间件的概念  中间件就是对dispatch的增强
const next = store.dispatch;

// 重写 store.dispatch
// store.dispatch = (action) => {
//   console.log('this is bigger dispatch')
//   next(action)
// }

// 重写是可以达到要求的，但是如果有很多不一样的需求，重写起来很麻烦
// 如果有很多需求，我们的dispatch函数会变得很复杂
// 这时候我们要考虑一种简单的可以组合的中间件形式

const loggerMiddleware = (store) => (next) => (action) => {
  console.log("heihei");
  next(action);
};

// const errorMiddleware = (action) => {
//   try {
//     loggerMiddleware(action)
//   } catch (error) {
//     console.log('error')
//   }
// }

const errorMiddleware = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (error) {
    console.log("error");
  }
};

// const logger = loggerMiddleware(store);

// const error = errorMiddleware(store);

// store.dispatch = error(logger(next));

// 这种方法虽然实现了中间件，但是中间的使用起来不太舒服，需要一直嵌套函数
// 我们期望可以这样实现中间件机制

const applyMiddleware = function (...middlewares) {
  return function rewriteCreateStoreFunc(oldCreateStore) {
    return function newCreateStore(reducer, initState) {
      /*1.生成store */
      const store = oldCreateStore(reducer, initState);
      // 给每个 middleware 传下store，相当于 const logger = loggerMiddleware(store)
      // const chain = [error,logger]
      const chain = middlewares.map((middleware) => middleware(store));
      let dispatch = store.dispatch;
      // 实现 error(logger(next))
      chain.reverse().map((middleware) => {
        dispatch = middleware(dispatch);
      });

      // 重写dispatch
      store.dispatch = dispatch;
      return store;
    };
  };
};

const rewriteCreateStoreFunc = applyMiddleware(
  loggerMiddleware,
  errorMiddleware
); // 前一个参数传中间件进去，后一个参数传store进去，返回新的store

store = createStore(reducer, {}, rewriteCreateStoreFunc);

// 明天再來實現applyMiddleware吧

store.subcribe(() => {
  let state = store.getState();
  console.log("level change", state.counter.count, state.info.name);
});

const unsubcribe = store.subcribe(() => {
  let state = store.getState();
  console.log("level1 change", state.counter.count, state.info.name);
});

unsubcribe();

next({ type: "INCREMENT" });

store.dispatch({ type: "INCREMENT" });

store.dispatch({ type: "DECREMENT" });

store.dispatch({ type: "SETNAME", name: "xiao" });
