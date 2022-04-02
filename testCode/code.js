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