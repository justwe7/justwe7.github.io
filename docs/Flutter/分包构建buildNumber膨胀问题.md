 ### **1. 现象**
在 build.gradle 或 pubspec.yaml 中设置了较小的版本号（如 `22`），但在使用 `flutter build apk --split-per-abi` 打包后
arm64 架构的 APK versionCode 自动变大为 `2022`。

### **2. 根本原因**
- **触发源：** `--split-per-abi` 命令。    
- **执行者：** `dev.flutter.flutter-gradle-plugin` 插件（隐藏在幕后）。
- 默认逻辑： 插件为了防止不同架构的 APK 版本号冲突，强制执行了一套默认算法：    
    $$ABI权重(arm64=2) \times 1000 + 原始版本号(22) = 2022$$
- **armeabi-v7a:** $1 \times 1000 + 22 = 1022$
- **arm64-v8a:** $2 \times 1000 + 22 = 2022$    
- **x86_64:** $3 \times 1000 + 22 = 3022$

### **3. 对比分析**
- **Flutter 默认行为：** 粗暴地用 `* 1000` 拉开差距，导致版本号很长（2022, 1022）。    
- **大厂（闲鱼）行为：** 在 `build.gradle` 中覆盖了默认算法，改用微小的增量（如 `+1`），保持版本号紧凑（如 23, 22）。