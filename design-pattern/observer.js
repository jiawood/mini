// 目标对象，提供增加观察者的方法，以及当自身发生变化后通知所有观察者
class Subject {
  constructor(){
    this.list = []  // 维护一个观察者对象
  }
  addObserver(observer){
    this.list.push(observer)
  }
  // 通知
  notify(task){
    this.list.forEach((observer) => {
      observer.update(task)
    })
  }
}

// 观察者
class Observer {
  constructor(name){
    this.name = name 
  }
  update(task){
    if(this.name === '张三'){
      console.log('通知张三')
    }
    console.log(task)
  }
}

const sub = new Subject()
const ob1 = new Observer('张三')
const ob2 = new Observer('李四')
// sub.addObserver(ob1)
// sub.addObserver(ob2)
// sub.notify('changed')

// 观察者模式只有目标对象和观察者，耦合性很高

