let counter = {
  count: 1
}

function countReducer(state, action) {
  if(!state){
    state = counter
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
  name: 'xj'
}

function infoReducer(state, action) {
  if(!state){
    return info 
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

function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  function subcribe(listener) {
    listeners.push(listener);
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

  dispatch({type: Symbol()})

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
  info: infoReducer
})

function combineReducer(reducers){
  let keys = Object.keys(reducers)
  return function combination(state = {}, action) {
    const nextState = {}
    for(let i = 0; i < keys.length; i++){
      const key = keys[i]
      const reducer = reducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey,action)
      nextState[key] = nextStateForKey
    }
    return nextState
  }
}

const store = createStore(reducer);
// console.dir(store.getState())

// 中间件的概念  中间件就是对dispatch的增强
const next = store.dispatch

// 重写 store.dispatch 
// store.dispatch = (action) => {
//   console.log('this is bigger dispatch')
//   next(action)
// }

// 重写是可以达到要求的，但是如果有很多不一样的需求，重写起来很麻烦
// 如果有很多需求，我们的dispatch函数会变得很复杂
// 这时候我们要考虑一种简单的可以组合的中间件形式

const loggerMiddleware = (store) => (next) => (action) => {
  console.log('heihei')
  next(action)
}

// const errorMiddleware = (action) => {
//   try {
//     loggerMiddleware(action)
//   } catch (error) {
//     console.log('error')
//   }
// }

const errorMiddleware = (store) => (next) => (action) => {
  try {
    next(action)
  }catch(error){
    console.log('error')
  }
}

const logger = loggerMiddleware(store)

const error = errorMiddleware(store)

store.dispatch =  error(logger(next))


store.subcribe(() => {
  let state = store.getState();
  console.log("level change", state.counter.count, state.info.name);
});

next({type: "INCREMENT"})

store.dispatch({ type: "INCREMENT" });

store.dispatch({type:"DECREMENT"})

store.dispatch({type:"SETNAME",name:'xiao'})
