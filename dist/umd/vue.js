(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    function isObject(obj){
        return typeof obj === "object" && obj !== null;
    }


    function def(data,key,value){
        Object.defineProperty(data,key,{
            enumerable:false,
            writable:false,
            value:value
        });
    }

    let oldMethods = Array.prototype;
    let arrayMethods = ['pop','push','shift','unshift','sort','reverse','splice'];
    let ArrayMethods = Object.create(oldMethods);
    arrayMethods.forEach(method=>{
        ArrayMethods[method] = function (...args){
            let result = oldMethods[method].applay(this,args);
            let ob = this.__ob__;
            let inserted;
            switch (method) {    //需要对劫持到插入的新数据再次添加监测
                case 'push':
                case 'unshift':
                    inserted = args;
                    break;
                case 'splice':
                    inserted = args.slice(2);
            }
            if(inserted)ob.observeArray(inserted);
            return result ;
        };
    });

    class Observer {
      constructor(data) {
        //   data.__ob__ = this;
          def(data,'__ob__',this);
          console.log(data);
          if(Array.isArray(data)){  //不监测数组的index，只监测数组的item和会改变原数组方法
            data.__poto__ = ArrayMethods;
            this.observerArray(data);
          }else { 
              this.walk(data);
          }
      }
      observerArray(data){
          data.forEach(item=>{
              observe(item);
          });
      }
      walk(data) {
        let keys = Object.keys(data);
        keys.forEach(key=>{
            defineReactive(data, key, data[key]);
        });
      }
    }
    function defineReactive(data, key, value) {
      observe(value);
      Object.defineProperty(data, key, {
        get() {
          return value;
        },
        set(newVal) {
          if (newVal === value) {
            return;
          }
          observe(newVal);  //直接修改对象监控
          console.log(`${key}从${value}被修改成了${newVal}`);
          value = newVal;
        },
      });
    }
    function observe(data) {
        if (!isObject(data))return ;
        return new Observer(data);
    }

    function initStatus(vm){
        const ops = vm.$options;
        console.log(ops);  // props  methods  data  computed     watch
        if(ops.props);
        if(ops.methods);
        if(ops.data){
            initData(vm);
        }
        if(ops.computed);
        if(ops.watch);
    }
    function initData(vm){
        console.log("初始化数据方法");
        // console.log(vm.$options.data())

        let data = vm.$options.data;
        data = vm._data = typeof data === "function" ? data.call(vm) : data;
        observe(data); //数据监测
    }

    function initMixin(Vue){
        //初始化
        Vue.prototype._init = function(options){
            //数据劫持
            const vm = this;
            vm.$options = options;
            initStatus(vm);
        };
    }

    function Vue(options){
        this._init(options);
    }
    initMixin(Vue);

    return Vue;

})));
//# sourceMappingURL=vue.js.map
