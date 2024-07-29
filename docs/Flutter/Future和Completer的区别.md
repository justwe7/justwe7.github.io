### `Future`
`Future`表示一个可能在将来某个时间点完成的计算或操作。它可以成功完成并返回一个值，或者以错误完成并抛出异常。`Future`通常用于异步操作，比如网络请求、文件读写等。

```dart
Future<String> fetchUserOrder() {
  return Future.delayed(Duration(seconds: 2), () => 'Large Latte');
}

void main() {
  print('Fetching user order...');
  fetchUserOrder().then((order) {
    print('Order: $order');
  });
}
```
`fetchUserOrder`返回一个`Future`，该`Future`在2秒后完成，并返回字符串`'Large Latte'`

- 通常通过内置方法或异步函数自动创建和返回。
- 完成状态由系统自动控制，例如网络请求完成后自动返回结果。
- 适用于简单的异步操作，结果由系统或异步函数自动处理。

### `Completer`
类似`new Promise`通过resolve回调来终止该异步状态
`Completer`是一个用于手动控制`Future`完成状态的工具。通过`Completer`，可以创建一个`Future`并在需要的时候将其标记为完成（如需要等待用户授权结果的场景）

```dart
import 'dart:async';

Future<String> fetchUserOrder() {
  Completer<String> completer = Completer<String>();

  // 模拟一个异步操作
  Future.delayed(Duration(seconds: 2), () {
    completer.complete('Large Latte');
  });

  return completer.future;
}

void main() {
  print('Fetching user order...');
  fetchUserOrder().then((order) {
    print('Order: $order');
  });
}

```

- 手动创建，主要用于需要手动控制`Future`完成状态的场景。
- 开发者手动控制完成状态，调用`complete`或`completeError`方法。
- 适用于复杂的异步操作，特别是需要手动控制`Future`完成的场景，例如并发操作的协调。