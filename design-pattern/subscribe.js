// 由于观察者模式的耦合度太高，观察者与被观察对象的依赖关系太大，所以才有了发布订阅模式

// 发布订阅相比于观察者模式多了一个调度中心的概念
// 订阅者把自己想订阅的事件注册到调度中心，
// 当发布者发布该事件到调度中心, 也就是该事件触发时，由调度中心统一调度订阅者注册到调度中心的处理代码。
// 调度中心起到了降低耦合度，让订阅者和发布者的依赖关系没有那么强，需要通过调度中心这个三方进行处理订阅者和发布者的消息


// 什么是发布订阅模式？ 基于一个事件（主题）通道，希望接收通知的对象 Subscriber 通过自定义事件订阅主题
// 被激活事件的对象 Publisher 通过发布主题事件的方式通知各个订阅该主题的Subscriber对象

class PubSub {
  constructor() {
    // 里面储存的类型：type：Arr[listener]
    this.events = {}
  }
  // 订阅者
  on(type,cb){
    if(!this.events[type]){
      this.events[type] = [cb]
    }else{
      this.events[type].push(cb)
    }
  }

  // 发布方法
  emit(type,...args) {
    if(this.events[type]){
      this.events[type].forEach(cb => cb(...args))
    }
  }

  off(type,cb) {
    if(this.events[type]){
      const index = this.events[type].findIndex(e => e === cb)
      this.events[type].splice(index,1)
    }
    if(this.events[type].length === 0){
      delete this.events[type]
    }
  }

  once(type,cb) {
    if(this.events[type]){
      this.emit(type)
      this.off(type,cb)
    }
  }
}

const p = new PubSub()

let fn1 = () => console.log('fn1')
let fn2 = () => console.log('fn2')

p.on('t', fn1)
p.on('t',fn2)
p.once('t', fn2)
p.emit('t')
p.emit('t')