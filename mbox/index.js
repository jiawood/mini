let trapping = null 

const store = new Proxy(
  {
    a: 0,
    b: 0,
  },
  {
    set: function(target, prop, value) {
      const res = Reflect.set(...arguments);
      if (!trapping) {
        obMap.get(prop).forEach((view) => view());
      }
      return res;
    },
    get: function(target, prop, receiver) {
      if (trapping) {
        if (!obMap.has(prop)) obMap.set(prop, new Set());
        obMap.get(prop).add(trapping)
      }
      return Reflect.get(...arguments);
    }
  }
);


function autoRun() {
  trapping = view 
  view() 
  trapping = null 
}

const obMap = new Map()

autoRun(() => {
  console.log('the value changed', store.a)
})

store.a = 2 
store.b = 3