import { observe } from "./observer/observe";

export function initStatus(vm){
    const ops = vm.$options;
    console.log(ops)  // props  methods  data  computed     watch
    if(ops.props){
        initProps(vm)
    }
    if(ops.methods){
        initMethods(vm)
    }
    if(ops.data){
        initData(vm)
    }
    if(ops.computed){
        initComputed(vm)
    }
    if(ops.watch){
        initWatch(vm)
    }
}
function initProps(vm){

}
function initMethods(vm){

}
function initData(vm){
    console.log("初始化数据方法")
    // console.log(vm.$options.data())

    let data = vm.$options.data
    data = vm._data = typeof data === "function" ? data.call(vm) : data;
    observe(data) //数据监测
} 
function initComputed(vm){

}
function initWatch(vm){

}