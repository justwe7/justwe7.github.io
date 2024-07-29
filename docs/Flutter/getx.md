### 响应式数据
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
