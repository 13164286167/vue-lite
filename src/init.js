import {initStatus} from './status'
export function initMixin(Vue){
    //初始化
    Vue.prototype._init = function(options){
        //数据劫持
        const vm = this;
        vm.$options = options;
        initStatus(vm)
    }
}
