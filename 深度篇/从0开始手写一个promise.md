首先回忆一下promise使用：  
```js
  new Promise((resolve, reject) => {
    resolve(123)
  }).then(res => {
    console.log('success'+res);
  }, err => {
    console.log('fail'+err);
  })
```

### 分析：
1. new Promise(fn),首先实例化了一个名为promise的构造函数，传入了一个方法: fn
   1. fn接收两个形参：resolve，reject
   2. fn函数体内代码执行，异步代码执行完成，执行接收的实参resolve/reject
2. 执行promise链上的then方法，传入两个方法作为实参 p.then(successFn, failFn)
3. successFn/failFn有一个方法会执行，判断依据是调用了resolve还是reject

### low版实现： 
```js
    class P {
      constructor(runFn) {//构造函数默认执行
        this.status = "pending";//声明默认状态
        this.value//声明一个闭包变量 
        let resolve = res => {//执行函数体更改状态的实参  --- 更改内部的状态  接收执行更改状态传入的实参
          if (this.status === 'pending') {//状态只能更改一次  默认状态才能更改
            this.status = 'fulfilled'
            this.value = res
          }
        }
        let reject = rej => {
          if (this.status === 'pending') {
            this.status = 'rejected'
            this.value = rej
          }
        }
        runFn(resolve, reject)//执行函数体  传入两个更改状态的参数
      }
      then(resolveFn, rejectFn) {//promise().then(fn1, fn2)接收的两个回调 
        switch (this.status) {//判断状态执行不同回调
          case "fulfilled":
            resolveFn(this.value)// 将执行函数体 更改状态值时的形参作为实参传入回调
            break;
          case "rejected":
            rejectFn(this.value)
            break;
        
          default:
            break;
        }
      }
    }
```
大概用起来好像是没什么毛病了。。
```js
    new P((resolve, reject) => {
      resolve(1234)
      // setTimeout(() => { // !!! 这样实现有个问题  先执行then方法是无法执行内部更改状态的方法的
      //   resolve(1234)
      // }, 1000);
    }).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
```
如果promise传入fn执行真的是异步来更改状态的，可能就是:  
promise => fn() => then() => resolve/reject。  
假设用setTimeout来模拟异步，可以知道*setTimeout作为宏任务是在下一轮的event Loop*执行栈中来执行的，而**then方法**属于调用P构造函数内的一个方法，所以**会先于resolve/reject**状态更改执行，内部也就还是pending状态。

**解决真·异步的问题：**
借鉴[发布订阅模式](https://17qu.top/shi-yao-shi-fa-bu-ding-yue-mo-shi/)的思路：如果**执行then的时候没有进入结束**状态，可以在P中订阅一个终止的状态(包括成功和失败)传入要执行的方法，然后在异步结束状态的时候更改状态时候(这种情况--很简单使用其实内部状态已经没有影响了)，resolve/reject方法内部将分别**订阅的任务列表中的方法遍历执行**
```js
   /* 
      顺序应该是 
      如果执行then时状态还是 pending 先订阅 将将要执行的方法传入订阅列表
      状态更改后 执行发布 执行订阅队列的方法 （发布订阅的拆解）
    */
  class P {
    constructor(runFn) {
      this.status = "pending"; //声明默认状态
      this.value; //声明一个闭包变量

      this.onResolvedCallbacks = [];//成功的订阅列表  -- 解决异步then问题
      this.onRejectedCallbacks = [];//失败的
      let resolve = res => {
        //执行函数体更改状态的实参  --- 更改内部的状态  接收执行更改状态传入的实参
        if (this.status === "pending") {
          //状态只能更改一次  默认状态才能更改
          this.status = "fulfilled";
          this.value = res;
          this.onResolvedCallbacks.forEach(cb => cb());
        }
      };
      let reject = rej => {
        if (this.status === "pending") {
          this.status = "rejected";
          this.value = rej;
          this.onRejectedCallbacks.forEach(cb => cb());
        }
      };
      runFn(resolve, reject); //执行函数体  传入两个更改状态的参数
    }
    then(resolveFn, rejectFn) {
      switch (
        this.status //判断状态执行不同回调
      ) {
        case "fulfilled":
          resolveFn(this.value); // 将执行函数体 更改状态值时的形参作为实参传入回调
          break;
        case "rejected":
          rejectFn(this.value);
          break;

        default:
          this.onResolvedCallbacks.push(() => {
            resolveFn(this.value);
          });
          this.onRejectedCallbacks.push(() => {
            rejectFn(this.value);
          });
          break;
      }
    }
  }
```