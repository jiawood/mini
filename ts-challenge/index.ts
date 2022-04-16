type ReplaceStr<Str extends string, From extends string, To extends string> = Str extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}` : Str 

type ReplaceResult = ReplaceStr<"he is my", "he", "she">

type ReplaceResul = ReplaceStr<"test", "hi", "s">

type TrimStrRight<Str extends string> = Str extends `${infer Rest}${' '| '\n' | '\t'}` ? TrimStrRight<Rest> : Str 

type TrimStrLeft<Str extends string> = Str extends `${' '| '\n' | '\t'}${infer Rest}` ? TrimStrLeft<Rest> : Str 

type tr = TrimStrRight<'sdf  '>

type TrimStr<Str extends string> = TrimStrLeft<TrimStrRight<Str>>

type tt = TrimStr<'  ss  '>

type GetParameters<Func extends Function> = Func extends (...args : infer Args) => unknown ? Args: never  

type ParametersResult = GetParameters<(name: number, age: string) => string>

type getReturnType<Func extends Function> = Func extends (...args: any[]) => infer returnType ? returnType : never

type returnType = getReturnType<() => void>


let a:undefined
console.log(a)

type b<T> = '2'

function setName<T>(name: T) : T {
    return name 
}

const setCount = <T,>(x:T):T => x 

const foo = <T extends string | number>(x:T):T => x  
console.log(setCount(2))

// ts 不同给类型变量重新赋值，要产生新的类型，只能重新构造 

type zip<One extends [unknown,unknown], Other extends [unknown,unknown]> = 
One extends [infer OneFirst,infer OneSecend] ? Other extends [infer OtherFirst, infer OtherSecend] ? [[OneFirst,OtherFirst],[OneSecend,OtherSecend]] :[] : []

type zipResult = zip<[1,2],[2,3]>

// 如果有多项，需要递归，递归的逻辑其实也很清晰
type Zip<One extends any[],Other extends any[]> = 
One extends [infer OneFirst,...infer OneRest] ? Other extends [infer OtherFirst, ... infer OtherRest] ? [[OneFirst,OtherFirst],...Zip<OneRest,OtherRest>] : [] : [] 

type ZipRes = Zip<[1,2,3],[2,3,4]>

// 要看一下尖括号的用法
type Up<str extends string> = Uppercase<str>

type Upres = Up<'sfd'>

type obj = {
    readonly name: string,
    age?: number,
    gender: boolean,
}

type Mapping<Obj extends Object> = {
     [key in keyof Obj]: Obj[key]
} 

type MappingR = Mapping<obj>

type Record1<K extends string | number, T> = {
    [key in K] : T 
}

type RecordRes = Record1<string,undefined>

type RecordR = Record<string,undefined>

let obj: RecordR = {'':undefined, 2:undefined}

type ttt = Promise<Promise<Promise<Record<string,any>>>>

type getPromiseReturn<p extends Promise<any>> = p extends Promise<infer value> ? value extends Promise<any> ? getPromiseReturn<value> : value : never 

type pr = getPromiseReturn<ttt>

// 当不再约束参数是promise类型时，可以减少一层判断
type getPromiseReturn2<T> = T extends Promise<infer value> ? getPromiseReturn2<value> : T 

type pr2 = getPromiseReturn2<ttt>

// 类型系统递归真的有意思
type ReverseArr<Arr extends unknown[]> = Arr extends [infer first, ...infer rest] ? [...ReverseArr<rest>,first] : Arr 

type arrr = ReverseArr<[1,2,3]>

type Includes<Arr extends unknown[], FindItem> = 
    Arr extends [infer First, ...infer Rest]
        ? IsEqual<First, FindItem> extends true
            ? true
            : Includes<Rest, FindItem>
        : false;

// isEqual 有点意思，a是b的子类型，b是a的子类型 啊哈哈
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);

// 删除,太好玩了
type RemoveItem<Arr extends unknown[], Item, Result extends unknown[] = []> = 
Arr extends [infer first, ...infer rest] ? IsEqual<first,Item> extends true ? RemoveItem<[...rest],Item,Result> : RemoveItem<[...rest],Item,[...Result,first]> : Result 

type RemoveRes = RemoveItem<[1,2,2,3],2>

// 这个写不出来是不知道联合类型运算符
type StringToUnion<Str extends string> = Str extends `${infer first}${infer rest}` ? first | StringToUnion<rest> : never  

// 数值计算,ts里面没有数值计算，所有的加减乘除都需要转换成数值的长度来进行计算
type num1 = [unknown]['length']

type BuildArr<Length extends number,Ele = unknown, Arr extends unknown[] = []> = 
Arr extends [...infer Args] ? IsEqual<Length, Arr['length']> extends true ?  Arr : BuildArr<Length,Ele,[...Args,Ele]> : never 

type baRes = BuildArr<3,2>

//有了buildArr，然后可以实现Add了
type Add<Num1 extends number, Num2 extends number, Arr extends unknown[] = []> = 

IsEqual<Num1,0> extends true ? IsEqual<Num2,0> extends true ? Arr['length'] : Add<Num1,0,[...BuildArr<Num2>]> : Arr extends [...infer rest] ? Add<0,0, [...rest, ...BuildArr<Num1>]> : Arr

type AddRes = Add<3,4>

type Add1<Num1 extends number, Num2 extends number> = [...BuildArr<Num1>, ...BuildArr<Num2>]['length']

type Add1res = Add1<3,4>

type Subtract<Num1 extends number, Num2 extends number> = BuildArr<Num1> extends [...arr1: BuildArr<Num2>, ...arr2: infer Rest ] ? Rest['length'] : never 

type SubRes = Subtract<5,3>