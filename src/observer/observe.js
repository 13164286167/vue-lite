import { isObject, def } from "../utils/index";
import { ArrayMethods } from "./array";
class Observer {
  constructor(data) {
    //   data.__ob__ = this;
    def(data, "__ob__", this);
    console.log("xixi")
    if (Array.isArray(data)) {
      //不监测数组的index，只监测数组的item和会改变原数组方法
      data.__poto__ = ArrayMethods;
      this.observerArray(data);
    } else {
      this.walk(data);
    }
  }
  observerArray(data) {
    data.forEach((item) => {
      observe(item);
    });
  }
  walk(data) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
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
      observe(newVal); //直接修改对象时添加劫持
      console.log(`${key}从${value}被修改成了${newVal}`);
      value = newVal;
    },
  });
}
export function observe(data) {
  if (!isObject(data)) return;
  return new Observer(data);
}
