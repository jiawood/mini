// 实现一个task函数，支持task().eat().sleep(2000).eat().sleep(3000).eat()

// 这种方法没有办法实现连续两次eat
const task = function () {
  class Task {
    constructor() {
      this.lazy = 0;
      this.pause = false;
    }
    eat() {
      if (!this.pause) {
        console.log("eat");
      }
      return this;
    }
    sleep(time) {
      this.pause = true 
      let timer = setTimeout(() => {
        clearTimeout(timer);
        console.log("sleep");
        this.pause = false;
        this.eat();
      }, time);

      return this;
    }
  }

  return new Task();
};

// task().eat().sleep(2000).eat().eat().sleep(1000).eat();


// 尝试使用任务队列

const task1 = function () {
  class Task {
    constructor() {
      this.list = []
      this.flag = false  // 如果为true 就暂停
    }
    eat() {
      const func = function () {
        console.log('eat')
      }
      this.list.push(func)
      return this.run()
    }

    sleep(time){
      const that = this 
      const func = function () {
        that.flag = true 
        const timer = setTimeout(() => {
          that.flag = false
          clearTimeout(timer) 
          that.run()
        },time)
      }
      this.list.push(func)
      return this.run()
    }

    run() {
      if(this.flag){
        return this
      }
      const func = this.list.shift()
      if(func instanceof Function){
        func()
        return this.run() 
      }
      return this 
    }
  }
  return new Task()
}

// task1().eat().sleep(2000).eat().eat().sleep(3000).eat()

const data =['D','a',2,'F','B',1,'c',5,'A','z' ] 

function BlendSort(arr) {
  let left = 0 
  let right = arr.length - 1 
  let index = 0 
  while(index < right){
    const a = arr[index]
    if(typeof a === 'number'){
      index++
    }else{
      if(a >= 'a'){
        swap(arr,left++,index++)
      }else{
        swap(arr,right--,index)
      }
    }
  }

  return arr

}

console.log(BlendSort(data))

function swap(arr,i,j){
  if(i === j){
    return
  }
  [arr[i],arr[j]] = [arr[j],arr[i]]
}
