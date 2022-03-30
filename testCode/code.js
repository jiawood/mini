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



