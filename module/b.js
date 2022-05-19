const say = require('./a')
const  object = {
   name:'《React进阶实践指南》',
   author:'我不是外星人'
}
console.log('我是 b 文件')
console.log('打印a模块',say)
setTimeout(() => {
    console.log('异步打印a模块',say)
})
module.exports = function(){
    return object
}

