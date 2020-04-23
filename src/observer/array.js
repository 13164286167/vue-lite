let oldMethods = Array.prototype;
let arrayMethods = ['pop','push','shift','unshift','sort','reverse','splice'];
export let ArrayMethods = Object.create(oldMethods);
arrayMethods.forEach(method=>{
    ArrayMethods[method] = function (...args){
        let result = oldMethods[method].applay(this,args)
        let ob = this.__ob__;
        let inserted;
        switch (method) {    //需要对劫持到插入的新数据再次添加监测
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
            default:
                break;
        }
        if(inserted)ob.observeArray(inserted)
        return result ;
    }
})