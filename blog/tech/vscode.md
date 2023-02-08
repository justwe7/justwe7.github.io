---
title: 'vscode快捷键速查'
tags: ['效率']
keywords: ['效率']
date: 2019-11-23
toc_max_heading_level: 3
---
<!-- truncate -->

### 忽略目录/文件(setting中设置)
```json
// 文件目录展示忽略
"files.exclude": {
  "filder/": true,
  "file": true
}
// 搜索忽略
"search.exclude": {
  "filder/": true,
  "file": true
}
```

### 常用快捷键（装Sublime Importer for VS Code插件）
- `F1` 或者 `Ctrl + shift + P` 呼出命令面板
- `Ctrl + P` 文件跳转（搜索）
- `Ctrl + shift + Tab` 文件跳转（搜索）
- `Ctrl + shift + O` 跳转到文件中的变量（方法）
- `Ctrl + T` 跳转到**所有**文件中的变量（方法）
- `Ctrl + G` 跳转到某行
- `F12` 跳转到定义
- `shift + -` 后退（跳转到定义后可以后退到上个文件）
- `shift + alt + -` 前进
- `Ctrl + K  再敲 R` 在文件管理器中打开当前文件

> 可以装某些之前习惯使用的编辑器快捷键的插件来修改快捷方式

[官方快捷键参考](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)


### 终端快捷键
- ``Ctrl + ` `` 打开终端
- ``Ctrl + shift + ` `` 打开新的终端
- `Ctrl + shift + PageUp` 上翻页
- `Ctrl + shift + PageDown` 下翻页
- `Ctrl + PageUp` 
- `Ctrl + PageDown` 
- `Ctrl + Home` 翻页到顶部
- `Ctrl + End` 翻页到底部


### 插件
- `Visual Studio live share` 实时共享代码，多人协作
- `REST Client` postman
- `leetCode` 
- `Visual Studio IntelliCode`  根据上下文智能提示
- `Remote Development`  基于SSH\Containers\WSL远程开发
