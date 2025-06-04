# GetX 控制器生命周期详解

GetxController 的生命周期是构建 GetX 应用程序的基础。以下是完整的生命周期流程、使用场景和重要 API。

## 完整生命周期顺序

1. **实例化** - 控制器对象被创建
2. **onInit()** - 初始化阶段
3. **onReady()** - 构建完成后
4. **onClose()** - 控制器被销毁前

## 详细说明和使用场景

### 1. 实例化

发生时机：控制器通过 `Get.put()`, `Get.lazyPut()`, `Get.putAsync()` 等方法注册时。

```dart
final controller = Get.put(MyController());
```

使用场景：
- 直接访问控制器属性和方法
- 设置初始依赖关系

### 2. onInit()

```dart
@override
void onInit() {
  super.onInit();
  // 初始化代码
}
```

发生时机：控制器被实例化后立即调用。

使用场景：

- 初始化变量，特别是 .obs 响应式变量
- 设置初始值
- 启动服务
- 创建和初始化 StreamController
- 添加 workers (ever, once, debounce, interval)
- 开始监听事件

重要 API：

- `ever(obs, callback)`: 每次 obs 变量改变时调用回调
- `once(obs, callback)`: 仅在 obs 首次变化时调用回调
- `debounce(obs, callback, time)`: 在指定时间内值不再变化后调用回调
- `interval(obs, callback, time)`: 每隔指定时间调用一次回调，无论值是否变化

示例：

```dart
@override
void onInit() {
  super.onInit();
  
  // 初始化变量
  name.value = 'Initial Name';
  
  // 设置 worker
  ever(counter, (_) => print('Counter changed to: ${counter.value}'));
  debounce(searchQuery, (_) => fetchResults(), time: Duration(milliseconds: 500));
  
  // 启动初始数据加载
  fetchInitialData();
}
```

### 3. onReady()

```dart
@override
void onReady() {
  super.onReady();
  // 界面构建完成后执行的代码
}
```

发生时机：当关联视图完全构建后调用，在 `onInit()` 之后，通常是下一帧渲染时。

使用场景：

- 需要在界面完全构建后执行的操作
- 显示对话框、SnackBar 等覆盖在 UI 上的元素
- 依赖于视图尺寸或位置的初始化操作
- 执行需要视图就绪的动画

重要 API：

- `Get.dialog()`: 显示对话框
- `Get.snackbar()`: 显示 snackbar 提示
- `Get.bottomSheet()`: 显示底部弹出窗口

示例：

```dart
@override
void onReady() {
  super.onReady();
  
  // 显示欢迎对话框
  if (!hasSeenWelcome.value) {
    Get.dialog(WelcomeDialog());
    hasSeenWelcome.value = true;
  }
  
  // 启动初次加载动画
  startLoadingAnimation();
  
  // 检查更新
  checkForUpdates();
}
```

### 4. onClose()

```dart
@override
void onClose() {
  // 清理资源
  super.onClose();
}
```

发生时机：当控制器不再使用并即将被销毁时调用，通常是关联的路由被移除时。

使用场景：

- 关闭流和订阅
- 释放资源
- 保存状态
- 取消定时器
- 取消网络请求

示例：

```dart
@override
void onClose() {
  // 关闭流订阅
  subscription.cancel();
  
  // 关闭控制器
  textEditingController.dispose();
  
  // 取消计时器
  timer?.cancel();
  
  // 保存状态
  saveCurrentState();
  
  super.onClose();
}
```

## 重要 API 和特殊场景

### 实例创建和查找

- **Get.put()**: 立即创建并注册控制器，返回实例
    
    ```dart
    final controller = Get.put(MyController(), permanent: true);
    ```
    
- **Get.lazyPut()**: 延迟创建，首次使用 Get.find() 时才初始化
    
    ```dart
    Get.lazyPut(() => MyController(), fenix: true);
    ```
    
- **Get.putAsync()**: 异步创建控制器
    
    ```dart
    Get.putAsync<MyController>(() async {
      final prefs = await SharedPreferences.getInstance();
      return MyController(prefs);
    });
    ```
    
- **Get.create()**: 每次调用 Get.find() 时创建新实例
    
    ```dart
    Get.create<MyController>(() => MyController());
    ```
    
- **Get.find()**: 查找已注册的控制器
    
    ```dart
    final controller = Get.find<MyController>();
    ```
    

### 状态管理和响应式

- **响应式变量**:
    
    ```dart
    var count = 0.obs;
    var user = User().obs;
    var products = <Product>[].obs;
    ```
    
- **状态更新**:
    
    ```dart
    // 直接更新值
    count.value++;
    
    // 更新对象属性
    user.update((val) {
      val?.name = 'New Name';
      val?.age = 25;
    });
    
    // 更新列表
    products.add(newProduct);
    products.assignAll(newProducts);
    products.clear();
    ```
    

### 生命周期控制

- **永久控制器**: 使用 `permanent: true` 创建的控制器不会被自动销毁
    
    ```dart
    Get.put(GlobalController(), permanent: true);
    ```
    
- **"Fenix"模式**: 使用 `fenix: true` 的控制器在被销毁后会重新创建
    
    ```dart
    Get.lazyPut(() => MyController(), fenix: true);
    ```
    
- **手动管理**: 使用 `Get.delete<T>()` 手动移除控制器
    
    ```dart
    Get.delete<UserController>();
    ```
    

## 特殊场景和最佳实践

### 1. 在 TabBarView 和 PageView 中

在有多个标签页的场景中，结合 `AutomaticKeepAliveClientMixin` 和 GetX:

```dart
class MyTabPage extends StatefulWidget {
  @override
  _MyTabPageState createState() => _MyTabPageState();
}

class _MyTabPageState extends State<MyTabPage> with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true;
  
  final controller = Get.put(MyTabController(), tag: 'tab1');
  
  @override
  Widget build(BuildContext context) {
    super.build(context);
    return GetBuilder<MyTabController>(
      tag: 'tab1',
      builder: (controller) => YourWidget(),
    );
  }
}
```

### 2. 嵌套控制器依赖

当控制器需要依赖其他控制器时:

```dart
class ChildController extends GetxController {
  final ParentController parentController;
  
  ChildController({required this.parentController});
  
  @override
  void onInit() {
    super.onInit();
    // 使用 parentController 
    ever(parentController.someVar, (_) => handleParentUpdate());
  }
}

// 使用时
Get.put(ParentController());
Get.put(ChildController(parentController: Get.find<ParentController>()));
```

### 3. 使用 UniqueID

在同一类型有多个控制器实例时使用 tag:

```dart
// 创建实例
Get.put(ProductController(), tag: 'product_${product.id}');

// 获取特定实例
final controller = Get.find<ProductController>(tag: 'product_${product.id}');
```

### 4. 重要生命周期监听技巧

```dart
@override
void onInit() {
  super.onInit();
  
  // 监听并响应其他控制器变化
  ever(authController.user, (user) {
    if (user == null) {
      // 用户登出，重置状态
      resetState();
    } else {
      // 用户登录，加载数据
      loadUserData(user.id);
    }
  });
  
  // 防抖搜索实现
  debounce(
    searchQuery, 
    (_) => performSearch(), 
    time: Duration(milliseconds: 500)
  );
  
  // 周期性刷新
  interval(
    refreshTrigger, 
    (_) => refreshData(), 
    time: Duration(seconds: 30)
  );
}
```

GetX 控制器生命周期系统提供了一种强大而灵活的方式来管理应用状态和逻辑。正确使用这些生命周期方法和 API 可以创建出响应式、高效且易于维护的应用程序。



## 响应式数据
#### 手动更新
定义的非响应式数据需要在改变后手动调用update();
```dart
class HomeState {
  bool isLogin = false;
}

Text(controller.state.isLogin ? '已登录' : '未登录', style: const TextStyle(color: BaseColor.mainColor),),

handleDoLogin() async {
	state.isLogin = !state.isLogin;
	update();
}
```

#### 响应式更新


#### 生命周期
```dart
class DemoController extends GetxController {
  final DemoState state = DemoState();

  @override
  void onInit() {
    super.onInit();
    print('进入了DemoController页面');
  }

  @override
  void onClose() {
    super.onClose();
    
  }
}
```

