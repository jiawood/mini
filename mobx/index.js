// 从零实现mobx：深入理解Mobx原理
// https://github.com/yinguangyao/blog/issues/54

// 1.页面事件（生命周期、点击事件）来触发action
// 2.通过action来改变状态
// 3.与状态相关的computed value 也改变了
// 4.状态更新后会触发reaction，从而响应状态变化来进行一些操作（组件渲染、打印日志等）

// 依赖管理类，每一个id，分别对应它的依赖，观察者模式
class DependenceManager {
  static Dep = null;
  // static Target = null;
  _store = {};
  beginCollect(handler, target) {
      // console.log('handler', handler)
      // console.log('target', target)
      DependenceManager.Dep = handler
      // DependenceManager.Target = target
  }
  collect(id) {
      // console.log('DependenceManager id', id)
      if (DependenceManager.Dep) {
          this._store[id] = this._store[id] || {}
          // this._store[id].target = DependenceManager.Target;
          this._store[id].watchers = this._store[id].watchers || []
          this._store[id].watchers.push(DependenceManager.Dep);
      }
  }
  endCollect() {
      DependenceManager.Dep = null
      // DependenceManager.Target = null
  }
  trigger = (id) => {
      const store = this._store[id];
      if(store && store.watchers) {
          store.watchers.forEach(s => {
              // console.log('watcher', s)
              s.call(this);
          });
      }
  }
}

// 全局的依赖管理器
const dependenceManager = new DependenceManager()

// Observable 类，让一个值可以被观察到，指被observable的值发生变化的时候，所有用到这个值的地方都会更新
let observabelId = 0 // 用一个全局状态来管理不同被检测对象的依赖

class Observable {
  id = 0 
  // v 是被检测的值
  constructor(v) {
    this.id = observabelId++
    this.value = v 
  }
  // get时收集依赖
  get() {
    dependenceManager.collect(this.id)
    return this.value 
  }
  // set时触发依赖
  set(v) {
    this.value = v 
    dependenceManager.trigger(this.id)
  }
}

// v是被监测的值
function observable(obj) {
  Object.keys(obj).forEach(key => {
    const o = new Observable(obj[key])
    //劫持对象的所有属性，拦截它的get/set,交给 Observable 里面的方法处理
    Object.defineProperty(obj,key,{
      enumerable: true,
      configurable: true,
      get(){
        return o.get()
      },
      set(v){
        return o.set(v)
      }
    })

  })
  return obj 
}


// const handler = () => {
//   const o = new Observable()
//   return {
//     get(target,key){
//       o.get()
//       return Reflect.get(target,key)
//     },
//     set(target,key,value){
//       o.set(value)
//       return Reflect.set(target,key,value)
//     }
//   }
// }

// function observable(obj) {
//   return new Proxy(obj, handler())
// }

// autorun 

function autorun(handler){
  dependenceManager.beginCollect(handler)
  handler(); // 触发 Observable.get,执行 dependenceManager.collect()
  dependenceManager.endCollect()
}

const obj = {
  a : 1,
  b: 2
}

const oobj = observable(obj) 

autorun(() => {
  console.log(obj.a)
})

obj.a = 33 
