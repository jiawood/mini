// 学习一下proxy的用法
const handler = {
  get: function(obj,prop) {
    return prop in obj ? obj[prop] : 37
  },
  set: function (obj,prop, value) {
    if(prop === 'age'){
      if(value > 200){
        throw new RangeError('the age seems invalid')
      }
    }
    obj[prop] = value 

    return true 
  }
}

const p = new Proxy({}, handler)
p.a = 1 

p.age = 2

console.log(p.a,p.b, p.age)


let current = 0 
Object.defineProperty(global,'a',{
  get() {
    current++
    return current
  }
})

console.log(a === 1 && a=== 2 && a === 3)

let num = 0
let handler1 = {
  get(target,name) {
    if(name === 'b'){
      num ++ 
      return num 
    }
  }
}

let p1 = new Proxy({},handler1)

console.log(p1.b1 === 1 && p1.b1 === 2)

