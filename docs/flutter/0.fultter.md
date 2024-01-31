## 学习日志
基础概念的笔记大多摘自[第二版序 | 《Flutter实战·第二版》](https://book.flutterchina.club/)
为什么需要再copy一遍？
- 自己用心cv的笔记才能记得住🐶
- 遇到一些疑惑可以手敲代码或查阅资料后进行标注
- 后续开发时在自己的笔记中查找要更快一些

## 创建一个基本实例
基于项目根目录的 `lib/main.dart`:
```dart
import 'package:flutter/material.dart'; // 1. 引入控件

void main(List<String> args) { // 2.程序入口
  runApp(
    MaterialApp( // 应用
      home: Home() // 主页
    )
  ); // 启动应用
}

class Home extends StatelessWidget {
  // demo1 文本控件
  @override
  Widget build(BuildContext context) {
    return const Text('Hello World',
      style: TextStyle(
        fontSize: 30.0,
        color: Colors.blue,
      )
    );
  }
}
```
1. [Material (opens new window)](https://material.io/guidelines/)是一种标准的移动端和web端的视觉设计语言， Flutter 默认提供了一套丰富的 Material 风格的UI组件。
2. Flutter 应用中 main 函数为应用程序的入口。main 函数中调用了runApp 方法，它的功能是启动Flutter应用。runApp它接受一个 Widget参数，在本示例中它是一个MaterialApp对象，是 Flutter 应用的根组件。