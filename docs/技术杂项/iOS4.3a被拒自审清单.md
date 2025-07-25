- 图片素材是否复用旧项目，避免过多重复
- flutter应用的目录结构和类名定义对最终编译结果影响不大，更多的是常量、字符串属性
- 功能不能与复制的app基本雷同，且功能太简单，普通且简单的应用很难通过4.3(a)条款
- 重构软件未必可以解决问题，因此应该考虑在现有的代码基础上，不断优化和开发新的功能，多次提审优化较大的应用版本，有助于通过；应用的代码量和视图要足够多，简单的应用功能以及十个以内的视图，都有可能被判定为4.3(a)。
- UI不仅仅是换色换logo
- flutter打包时启用混淆指令 `flutter build ios --obfuscate --split-debug-info=./symbols`
- 最好使用新的mac打包机
- 橱窗图可以丑，可以使用改版后界面的截屏尝试
- 审查后台的元数据信息，文字相似度



[App Store Connect审核拒绝原因：Guideline 4.3(a) – Design – Spam – 方君宇](https://fangjunyu.com/2024/10/31/app-store-connect%E5%AE%A1%E6%A0%B8%E6%8B%92%E7%BB%9D%E5%8E%9F%E5%9B%A0%EF%BC%9Aguideline-4-3a-design-spam/)