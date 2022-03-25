function plan(state, action) {
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

function createStore(initialState,plan) {
  let state = initialState;
  let listeners = [];

  function subcribe(listener) {
    listeners.push(listener);
  }

  function changeState(action) {
    state = plan(state,action)
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  function getState() {
    return state;
  }

  return {
    subcribe,
    changeState,
    getState,
  };
}

const store = createStore({
  count: 2,
}, plan);

store.subcribe(() => {
  let state = store.getState();
  console.log("info change", state.count);
});

store.subcribe(() => {
  let state = store.getState();
  console.log("level change", state.count);
});

store.changeState({type: 'INCREMENT'})


