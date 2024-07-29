
### 查看当前可用版本
```bash
flutter --version
```

### Flutter降级到指定版本
版本号可以从发布日志中选择 [Tags · flutter/flutter · GitHub](https://github.com/flutter/flutter/tags)
```bash
flutter downgrade 3.19.6  
```
如果出现报错`There is no previously recorded version for channel "stable".`，切换至Flutter sdk的目录，手动切换sdk目录的文件至对应的commit节点：`git reset --hard commitId`

然后更新本地的依赖
```bash
flutter doctor
```

### Flutter版本升级
明确自己的升级需求，追新版本升级可能会导致项目的依赖库还未使用新版本api，导致项目异常
```bash
flutter upgrade
```