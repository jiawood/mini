interface Animal {
  name: string 
}

interface Dog extends Animal {
  wangwang(): void;
}

let a1: Animal;
let d1: Dog; 

let arrA: Array<Animal>
let arrD: Array<Dog> 

arrA = arrD 

// 具有父子关系的多个类型，通过某种构造关系构造成的新类型，如果还具有父子关系则是协变的，而关系逆转了就是逆变的

type AnimalFn = (arg: Animal) => void; 
type DogFn = (arg: Dog) => void; 

let animalFn: AnimalFn;
let DogFn: DogFn; 

DogFn = animalFn

// 有一个概念是，兼容性检查
// 只有传参的时候，两个变量之间才会进行兼容性的比较
// 赋值的时候并不会比较，会直接报错

// React.FC 是泛型的一种用法
const ReactFC = <T>(T)=>ReactElement => {
  return 
}

// 泛型指类型变量，指我们在定义一个类型的时候，可以已尖括号的形式声明一个泛型，在后续类型变换的过程中，可以使用这个泛型
// 当函数、接口或者类需要作用于很多类型、或者需要被用在很多地方的时候，就需要使用类
// 泛型还有一个作用是，在成员之间提供有意义的约束，比如说函数的参数和返回值