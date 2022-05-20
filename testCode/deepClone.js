// 浅比较也称引用相等，在js中，===是作浅比较，只检查左右两边是否是同一个对象的引用
function shallowCompare(a,b) {
  return a === b 
}

let a = 1
let b = 2

// console.log(shallowCompare(a,b))


// 深比较  也称为 原值比较，深比较是指两个对象的所有属性是否都相等，深比较需要以递归的
// 方式遍历两个对象的所有属性，操作比较耗时间


// 深比较是要深入遍历的比较每个值的
function deepCompare(a,b){
  for(let k in a){
    if(!b.hasOwnProperty(k)){
      return false 
    }
    if(typeof a[k] === 'object'){
      if(!deepCompare(a[k],b[k])){
        return false 
      }
    }
  }
  for(let k in b){
    if(!a.hasOwnProperty(k)){
      return false 
    }
    if(typeof b[k] === 'object'){
      if(!deepCompare(a[k],b[k])){
        return false 
      }
    }
  }
  return true 
}

let aa = {
  name: 'xj',
  age: {
    a: 1
  }
}

let bb = {
  name: 'xj',
  age: {
    a: 1
  }
}


// 浅拷贝和深拷贝的区别,浅拷贝拷贝的是对象的引用，浅拷贝得到的对象里面的引用对象
let aaCopy = Object.assign(aa)

aa.age.a = 2 

let testObj = {
  a : 1
}

testObj.b = testObj


// function deepClone(obj,res={},weakMap = new WeakMap()) {
//   for(let key in obj){
//     if(typeof obj[key] === 'object'){
//       if(weakMap.has(obj[key])){
//         return weakMap.get(obj[key])
//       }
//       let result = obj[key] instanceof Array ? [] : {}
//       weakMap.set(obj[key],result)
//       for(let k in obj[key]){
//         result[key] = deepClone(obj[key][k],{},weakMap)
//       }
//       res[key] = result 
//     }else{
//       res[key] = obj[key]
//     }
//   }
//   return res 
// }

function deepClone(obj) {
  let visitedMap = new WeakMap()
  function baseClone(target){
    if(typeof target !== 'object'){
      return target 
    }
    if(visitedMap.has(target)){
      return visitedMap.get(target)
    }
    const result = Array.isArray(target) ? [] : {}
    visitedMap.set(target,result)
    for(let key in target){
      result[key] = baseClone(target[key])
    }
    return result 
  }
  return baseClone(obj)
}

function baseClone(target, visitedMap = new WeakMap()){
  if(typeof target !== 'object'){
    return target 
  }
  if(visitedMap.has(target)){
    return visitedMap.get(target)
  }
  const result = Array.isArray(target) ? [] : {}
  visitedMap.set(target,result)
  for(let key in target){
    result[key] = baseClone(target[key], visitedMap)
  }
  return result 
}

console.log(baseClone(testObj))

// function cloneDeep(obj) {
//   let vistedMap = new Map();
//   function baseClone(target) {
    
//     if(typeof target !== 'object') return target

//     if(vistedMap.get(target)) return vistedMap.get(target)

//     let result = Array.isArray(target) ? [] : {}

//     vistedMap.set(target, result)
    
//     const keys = Object.keys(target);
//     for(let i = 0, len = keys.length; i < len; i++) {
//       result[keys[i]] = baseClone(target[keys[i]])
//     }
//     return result
//   }
//   return baseClone(obj)
// }

// console.log(cloneDeep(testObj))