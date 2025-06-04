### 手动创建证书
`打包机`本地创建`CertificateSigningRequest.certSigningRequest`后，通过apple development创建证书，选择iOS Distribution权限的类型，点击下一步，选择刚刚生成的 `.certSigningRequest` 文件，下载生成的 `.cer` 证书文件（通常1年有效期）
![](../../static/docs/Pasted%20image%2020250410152257.png)

在`打包机`安装后台生成的`.cer`证书文件，就可以从钥匙串看到该证书文件，然后可以导出`.p12`（导出时必须设置密码保护）分发给别的电脑进行安装 ![](../../static/docs/Pasted%20image%2020250410153008.png)

### 配置描述文件
1. 从develop后台创建描述文件，选择Ad Hoc的描述文件的类型（需要绑定测试设备UUID才可以安装）
![](../../static/docs/Pasted%20image%2020250410153247.png)

2. 继续，选择需要使用该文件打包的app的包名，点击下一步，会提示选择一个证书，选择刚刚生成的证书
![](../../static/docs/Pasted%20image%2020250410153638.png)

3. 下一步会要求选择允许安装的设备UUID，全选即可（**如果后续有设备新增，需要重新创建**描述文件）
4. 最后会要求输入描述文件的名称（DIST_HOC），这个名称在后面会有用，点击下一步
5. 将生成的文件保存至`~/Library/MobileDevice/Provisioning Profiles`目录下

### 编写打包脚本
整个打包流程主要分为如下几步：
#### 1.Flutter构建阶段
```bash
flutter pub get
flutter build ios \
  --dart-define=ENV=dev \    # 传递环境变量
  --release \                # 构建Release模式
  --no-codesign              # 跳过自动签名（后续手动处理）
```

####  2.Xcode归档操作
```bash
xcodebuild clean archive \
  -workspace "${PROJECT_NAME}.xcworkspace" \
  -scheme "${SCHEME_NAME}" \
  -configuration Release \
  -archivePath "${TEMP_ARCHIVE_PATH}" \
  DEVELOPMENT_TEAM="" \              # 显式清空自动签名配置
  CODE_SIGN_IDENTITY="" \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGNING_ALLOWED=NO
```
#### 3.动态生成ExportOptions.plist
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
     <!-- 分发方式：ad-hoc/development/app-store -->
    <string>ad-hoc</string>
    <key>provisioningProfiles</key>
    <dict>
	    <!-- Bundle ID必须完全匹配 -->
        <key>$BUNDLE_ID</key>
        <!-- 描述文件名称（开发者后台填写的name） -->
        <string>$PROVISIONING_PROFILE_NAME</string>
    </dict>
    <key>signingCertificate</key>
    <!-- 证书指纹需与钥匙串完全一致 (sha1) -->
    <string>$CERTIFICATE_SHA1</string>
    <key>signingStyle</key>
    <string>manual</string>
    <key>teamID</key>
    <string>$TEAM_ID</string>
    <key>compileBitcode</key>
    <false/>
    <key>stripSwiftSymbols</key>
    <true/>
    <key>thinning</key>
    <string>&lt;none&gt;</string>
</dict>
</plist>
```
#### 4.IPA导出命令
```bash
xcodebuild -exportArchive \
  -archivePath "${TEMP_ARCHIVE_PATH}" \
  -exportOptionsPlist "${OUTPUT_DIRECTORY}/${EXPORT_OPTIONS_PLIST}" \
  -exportPath "${OUTPUT_DIRECTORY}"
```

#### 注意事项
开发打包之前，需要先解锁mac，建议在脚本开头添加钥匙串解锁（需根据实际情况配置）。如果不配置的话首次打包会弹出密码输入，选择`始终允许`即可
```base
security unlock-keychain -p "Mac登录密码" "${HOME}/Library/Keychains/login.keychain-db"
```

查看刚刚生成的描述文件`DIST_HOC.mobileprovision`，提取几个关键信息，用于配置打包
![](../../static/docs/Pasted%20image%2020250410154810.png)

#### 完成的脚本
```bash
#!/bin/bash

# 设置变量
PROJECT_PATH="$(pwd)"  # 使用当前目录
PROJECT_NAME="Runner" # 项目名称
SCHEME_NAME="Runner" # scheme名称
EXPORT_OPTIONS_PLIST="ExportOptions.plist" # 导出选项配置文件
# OUTPUT_DIRECTORY="$PROJECT_PATH/build/ios/ipa" # IPA输出目录

PROVISIONING_PROFILE_NAME="qa_dist" # 描述文件名
CERTIFICATE_SHA1="xxx" # security find-identity -v -p codesigning 可获得p12的
TEAM_ID="xxx"
BUNDLE_ID="com.xxx.ooo"

TIMESTAMP=$(date +"%Y-%m-%d_%H:%M")
# ipa输出目录
OUTPUT_DIRECTORY="$PROJECT_PATH/build/ios/ipa/$TIMESTAMP"
# 临时存放归档文件的路径
TEMP_ARCHIVE_PATH="$PROJECT_PATH/build/ios/temp_archive/Runner.xcarchive"

# 确保输出目录存在
mkdir -p "$OUTPUT_DIRECTORY"

echo "===== 开始Flutter构建过程 ====="
# cd "$PROJECT_PATH"
# flutter clean
flutter pub get
flutter build ios --dart-define=ENV=dev --release --no-codesign

echo "===== 开始Xcode Archive过程 ====="
cd "$PROJECT_PATH/ios"

mkdir -p "$PROJECT_PATH/build/ios/temp_archive"

# 创建归档文件
xcodebuild clean archive \
  -workspace "$PROJECT_NAME.xcworkspace" \
  -scheme "$SCHEME_NAME" \
  -configuration Release \
  -archivePath "$TEMP_ARCHIVE_PATH" \
  DEVELOPMENT_TEAM="" CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO CODE_SIGNING_ALLOWED=NO

echo "===== 开始导出IPA ====="
# 首先需要创建ExportOptions.plist文件
cat > "$OUTPUT_DIRECTORY/$EXPORT_OPTIONS_PLIST" << EOL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>ad-hoc</string>
    <key>provisioningProfiles</key>
    <dict>
        <key>$BUNDLE_ID</key>
        <string>$PROVISIONING_PROFILE_NAME</string>
    </dict>
    <key>signingCertificate</key>
    <string>$CERTIFICATE_SHA1</string>
    <key>signingStyle</key>
    <string>manual</string>
    <key>teamID</key>
    <string>$TEAM_ID</string>
    <key>compileBitcode</key>
    <false/>
    <key>stripSwiftSymbols</key>
    <true/>
    <key>thinning</key>
    <string>&lt;none&gt;</string>
</dict>
</plist>
EOL

# 导出IPA
xcodebuild -exportArchive \
  -archivePath "$TEMP_ARCHIVE_PATH" \
  -exportOptionsPlist "$OUTPUT_DIRECTORY/$EXPORT_OPTIONS_PLIST" \
  -exportPath "$OUTPUT_DIRECTORY"

# 删除临时归档文件以节省空间
echo "===== 清理归档文件 ====="
rm -rf "$TEMP_ARCHIVE_PATH"

echo "===== IPA导出完成 ====="
echo "IPA文件路径: $OUTPUT_DIRECTORY"

echo "===== 全部流程完成 ====="

```