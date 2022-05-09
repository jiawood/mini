// 实现object的迭代
Object.prototype[Symbol.iterator] = function () {
  let i = 0 
  let keys = Object.keys(this)
  return {
    next: () => {
      if(i < keys.length){
        return {done: false, value: this[keys[i++]]}
      }
      return {done: true, value: undefined}
    }
  }
}

let obj = {
  test: 'haha',
  num: 23
}

for(let v of obj){
  console.log(v)
}

Symbol.iterator

// 遍历map
const map1 = new Map();

map1.set('a', 1);
map1.set('b', 2);
map1.set('c', 3);


const v = Array.from(map1.entries())

// 实现curry
function add(a,b,c) {
  return a + b + c 
}

// 参数肯定是传入一个函数
function curry(func) {
  return function step(...args){
    if(func.length === args.length){
      return func(...args)
    }else{
      return function(...args1){
        return step(...args,...args1)
      }
    }
  }
}

const add1 = curry(add)

console.log(add1(1,2)(3))
console.log(add1(1)(2)(3))


// 做一道面试题

