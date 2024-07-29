var uid = 0;
class Dep {
  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  static targetWatcher = null

  addSub(tWatcher) {
    this.subs.push(tWatcher);
  }
  depend() {
    Dep.targetWatcher.addDep(this);
  }
  notify() {
    this.subs.forEach(function(tWatcher) {
      tWatcher.update();
    });
  }
}


/* 观察数据 更新视图*/
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    
    this.value = this.getVal()
    // console.log(this.value);
    
    // console.warn(vm.$data.a);
    // Dep.target = this;
    // var value = this.getter.call(this.vm, this.vm);
    // Dep.target = null;
  }

  update() {
    console.log('watcher触发视图更新，data的key值:', this.key);
    this.cb && this.cb.call(this.vm, this.vm[this.key])
  }

  getVal() {
    Dep.targetWatcher = this //由于js是单线程
    // this.getter.call(this.vm, this.vm);
    const value = this.vm.$data[this.key]//访问一下实例的observer的data key属性，添加至dep中，修改时会触发视图更新
    Dep.targetWatcher = null
    return value;
  }

  parseGetter(exp) {
    if (/[^\w.$]/.test(exp)) return; 

    var exps = exp.split('.');

    return function(obj) {
        for (var i = 0, len = exps.length; i < len; i++) {
            if (!obj) return;
            obj = obj[exps[i]];
        }
        return obj;
    }
  }
}
