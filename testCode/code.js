// 实现一个连续加的add，利用了闭包的特性
const add = (() => {
  let result = 0;
  function add(...args) {
    result += args.reduce((a, b) => a + b);
    return add;
  }
  add.value = function () {
    return result;
  };
  return add;
})();

// console.log(add(1)(2,3)(4).value())


// function reqListener() {
//   console.log(this)
// }

// let oReq = new XMLHttpRequest()
// oReq.addEventListener("load", reqListener)
// oReq.open("GET","http://www.baidu.com")
// oReq.send()


function get(time) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve('succ')
    },time)
  })
}

function request(time){
  return new Promise((resolve,reject) => {
    const timer = setTimeout(() => {
      reject('time out')
      clearTimeout(timer)
    },time)
    get(3000).then(res => {
      resolve(res)
    })
  })
}

// request(4000).then(res => console.log(res)).catch(res => console.log(res)) 


// 判断数组的方法
let a  =  []
console.log(a instanceof Array)
console.log(a.__proto__ === Array.prototype)


// 在time时间后再执行callback，中间如果被打断，则重新及时
function debounce(time,callback){
  const self = this 
  let timer = null;
  return function(){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      callback.apply(self)
    },time)
  }
}


// 节流，如果在一段时间内一直触发某个函数，每过time时间，才触发一次
function throttle(time,callback){
  const self = this 
  let timer = null
  return function(){
    if(!timer){
      timer = setTimeout(() => {
        callback.apply(self, [].slice().apply(arguments))
        timer = null 
        clearTimeout(timer)
      },time)
    }
  }
}