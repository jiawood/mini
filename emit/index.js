class emit {
    constructor(){
        this.mitt = new Map()
    }
    on(type,e){
        if(!this.mitt.get(type)){
            this.mitt.set(type,[e])
        }else {
            this.mitt.get(type).push(e)
        }
    }

    off(type,e){
        if(this.mitt.get(type)){
            this.mitt.get(type).splice(this.mitt.get(type).indexOf(e),1)
        }
    }

    emit(type,arg){
        const arr = this.mitt.get(type)
        if(arr){
            for(let i = 0; i < arr.length; i++){
                arr[i](arg)
            }
        }
    }
}

const emitter = new emit()

const Func = (e) => console.log(e)

emitter.on('a',Func)
emitter.off('a',Func)
emitter.on('b',Func)

emitter.emit('a','woman')