function fun(...dimentions){
  const [layer,...d] = dimentions 
  return d.length ? Array(layer).fill(0).map(_ => fun(...d)) :Array(layer)
}

fun(2,3)   // 生成2 * 3 的二维数组  

fun(2,3,4) // 生成2 * 3 * 4 的三维数组

Array.from(new Array(2),() => new Array(3))


Array.prototype.reduce = function reduce(callback,initValue) {
  let arr = this 
  if(arr.length === 0){
    throw new Error('TypeError: 数组的长度不能为0')
  }
  let hasInit = typeof initValue !== "undefined"
  for(let i = hasInit ? 0 : 1; i < arr.length; i++){
    initValue = callback(hasInit ? initValue : arr[0],arr[i],i,arr)
    hasInit = true
  }
  return initValue
}

let arr = [2,3,5,2]



function customReduce(callback, initialValue) {
  let context = this; //获取数组
  if (context.length === 0) throw new Error('TypeError: 数组长度不能为 0');
  let hasInit = typeof initialValue === 'undefined'; //判断是否有初始值

  for (var i = hasInit ? 1 : 0; i < context.length; i++) {
    initialValue = callback(
      hasInit ? context[0] : initialValue,
      context[i],
      i,
      context
    );
    hasInit = false  
  }

  return initialValue;
}

Array.prototype.customReduce = customReduce;



// console.log(arr.reduce((a,b) => a+b))

console.log(arr.customReduce((a,b) => a+b,2))