type BusClass={
    emit:(name:string)=>void
    on:(name:string,callback:(...args:any[])=>void)=>void
}
class Bus implements BusClass{
    private _listeners: {[name:string]:((...args:any[])=>void)[]} = {}
    emit(name:string,...args:any[]){
        if(this._listeners[name]){
            this._listeners[name].forEach(callback=>{
                callback(...args)
            })
        }
    }
    on(name:string,callback:(...args:any[])=>void){
        if(!this._listeners[name]){
            this._listeners[name]=[]
        }
        this._listeners[name].push(callback)
    }
}
export default new Bus()