function countReducer(state, action) {
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

function infoReducer(state, action) {
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

  return {
    subcribe,
    dispatch,
    getState,
  };
}

const state = {
  counter: {
    count: 1,
  },
  info: {
    name: "xj",
    description: "前端",
  },
};

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

const store = createStore(reducer, state);


store.subcribe(() => {
  let state = store.getState();
  console.log("level change", state.counter.count, state.info.name);
});

store.dispatch({ type: "INCREMENT" });

store.dispatch({type:"DECREMENT"})

store.dispatch({type:"SETNAME",name:'xiao'})
