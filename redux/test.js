const a = (a) => (b) => {
  console.log(a, b);
};

// a('hello')('xj')

function b(a) {
  return function c(b) {
    console.log(a, b);
  };
}

// b('hello')('xj')

//compose 组合函数：把多层函数嵌套调用扁平化
//常基于reduce，柯里化函数思想解决函数调用扁平化的问题

//函数嵌套：b函数依赖a函数的返回值，c函数依赖b函数的返回值

const f1 = (x) => x + 1;
const f2 = (x) => x * 3;
const f3 = (x) => x / 2;

// 依次执行了f3 f2 f1
console.log(f1(f2(f3(4))));

function compose(...args) {
  return function (res) {
    args.reverse().map((c) => {
      res = c(res);
    });
    console.log(res);
  };
}

compose(f1, f2, f3)(4);

function compose1(...args) {

  if(args.length === 1){
    return args[0]
  }

  return args.reduce((a, b) => (...args1) => a(b(...args1)))
  
}

// f1(f1)

console.log(compose1(f1, f2, f3)(4))
