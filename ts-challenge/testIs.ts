// ts is 运算符用来限定函数的返回值，如果函数返回true，那么可以限定函数参数的类型
function isString(test: any): test is string{
  return typeof test === "string";
}

function example(foo: any){
  if(isString(foo)){
      console.log("it is a string" + foo);
      console.log(foo.length); // string function
      // console.log(foo.toExponential(2))
  }
}
example('sd');