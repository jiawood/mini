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