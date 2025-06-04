### 1. **生成签名密钥（Keystore）**
首先需要生成一个签名密钥（`keystore`）文件，它通常存放在项目之外的安全路径。你可以通过以下命令生成：
```bash
keytool -genkey -v -keystore ./android/keystores/test-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias testKeyAlias
```
- `test-keystore.jks`: 生成的密钥文件，建议放在项目之外的安全位置，比如用户主目录。
- `testKeyAlias`: 密钥别名，可以根据需要自定义。
- `10000`: 是证书的有效期，单位天，差不多28年有效期，建议时间设置长一点，避免证书过期

**注意**：
1. 图方便，我当前是在flutter项目根目录下执行的命令，且将秘钥创建至项目中（**并不安全！**），执行前要先创建`android/keystores/` 目录
2. 回车会要求填写签名的信息，可以不写，然后y通过，生成：
![](../../static/docs/Pasted%20image%2020240925155737.png)
3. 证书是会过期的，过期时间设置长点
### 2. **签名配置文件的管理**
#### **`keystore.properties` 文件内容**：
在 `android/` 目录下创建 `keystore.properties` 文件，用于存放签名密钥的路径和密码：
```
storePassword=123321
keyPassword=123321
keyAlias=testKeyAlias
storeFile=../keystores/test-keystore.jks
```

- `storePassword`、`keyPassword` 填写签名生成输入的密码
- `storeFile` 可以是绝对路径，也可以是相对路径，注意层级关系

**最佳管理实践：**
- **将签名密钥保存在项目之外**：不要将签名密钥文件存放在项目目录中，特别是当使用版本控制系统（如 Git）时。将它放在用户目录等安全的地方，并通过 `key.properties` 引入路径。
- **敏感信息管理**：密钥文件路径、别名和密码等信息应保存在 `key.properties` 文件中，并使用 `.gitignore` 忽略它。

### 3. **配置 `build.gradle` 文件**
在 `android/app/build.gradle` 中，修改 `signingConfigs` 和 `buildTypes` 部分，将 `keystore.properties` 中的信息导入到签名配置中：
#### **示例配置**：
```java
plugins {
}

// 新增
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('keystore.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
	// 新增    
    signingConfigs {
        release {
            keyAlias = keystoreProperties['keyAlias']
            keyPassword = keystoreProperties['keyPassword']
            storeFile = keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword = keystoreProperties['storePassword']
        }
    }

    buildTypes {
        release {
            // 修改
            signingConfig = signingConfigs.release
        }
    }
}

flutter {
    source = "../.."
}

```

#### 打包
运行以下命令构建并签名应用的 `release` 版本：
```bash
flutter build apk --release
或
flutter build appbundle --release
```

签名后的 APK 或 AAB 文件将位于 `build/app/outputs/flutter-apk/` 或 `build/app/outputs/bundle/` 目录下

可以使用 `flutter build apk --split-per-abi` 直接编译出各平台下的拆分 APK 包：
- `<app dir>/build/app/outputs/apk/release/app-armeabi-v7a-release.apk`
- `<app dir>/build/app/outputs/apk/release/app-arm64-v8a-release.apk`
- `<app dir>/build/app/outputs/apk/release/app-x86_64-release.apk`

### 4. **验证apk签名**
#### 查看apk的签名
```bash
keytool -printcert -jarfile /Users/debugger/bugcave/xx/build/app/outputs/apk/release/app-release.apk
```
![](../../static/docs/Pasted%20image%2020240925161610.png)

#### 查看秘钥库文件
```bash
keytool -list -v -keystore /Users/debugger/bugcave/xxx/android/keystores/test-keystore.jks
```
会要求输入秘钥的密码，得到密钥库的信息

对比：
1. **证书指纹**：APK 的 SHA1 和 SHA256 证书指纹与密钥库中列出的证书指纹相匹配。
2. **序列号**：APK 和密钥库中的证书都有相同的序列号。
3. **签名算法**：两者都使用了 `SHA256withRSA` 签名算法。
4. **密钥长度**：两者都使用了 2048 位的 RSA 密钥。

### 5. **使用不同的签名配置进行调试和发布**
对于调试（`debug`）和发布（`release`）版本，可以采用不同的签名配置。在 `build.gradle` 文件中添加:
```java
buildTypes {
	debug {
		signingConfig = signingConfigs.debug
	}
	release {
		// TODO: Add your own signing config for the release build.
		// Signing with the debug keys for now, so `flutter run --release` works.
		signingConfig = signingConfigs.release
	}
}
```

### 6. **包名和签名的关系**
以下内容来自kimi：
在 Android 应用开发中，签名和包名（Application ID）是两个不同的概念，但它们在应用的发布和更新过程中都扮演着重要的角色。下面是它们各自的定义以及它们之间的关系：
1. **包名（Application ID）**：
   - 包名是应用的唯一标识符，用于区分不同的应用或应用的各个版本。
   - 它通常以反向域名的形式出现，例如 `com.example.myapp`。
   - 在 AndroidManifest.xml 文件中定义，并且在整个应用开发周期中应该是不变的。
2. **签名**：
   - 签名是用来验证应用的完整性和来源的加密手段。
   - 应用必须被签名才能安装到 Android 设备上，并且如果签名改变，系统会将其视为一个全新的应用。
   - 签名与应用的包名没有直接的关联，但是它们共同确保了应用的唯一性和安全性。

**关联关系**：
- **更新和分发**：签名用于验证应用的更新。如果一个应用更新使用了不同的签名，系统会将其视为一个全新的应用，而不是现有应用的更新。包名在这一过程中用于确保更新的是正确的应用。
- **Google Play Store**：在 Google Play Store 中，应用的包名和签名共同决定了应用的身份。如果开发者更换了签名，即使包名相同，应用也将无法更新，因为签名变了。
- **安全性**：包名和签名一起确保了应用的身份验证。在 Android 设备上，系统使用签名来验证应用的完整性，而包名用于识别应用。

**重要注意事项**：
- **不要更改包名**：在应用发布后，不应该更改包名，因为这会导致用户无法接收到更新。
- **保护签名密钥**：签名密钥应该保密且安全地存储，不应该泄露或丢失。如果签名密钥丢失，将无法对应用进行更新。

总的来说，虽然签名和包名是两个独立的概念，但它们在确保应用的完整性、安全性和可更新性方面是相辅相成的。


### 7. **Proguard 混淆配置**
发布时启用代码混淆（Proguard），以保护代码：
- 在 `android/app/proguard-rules.pro` 文件中定义混淆规则
- 在 `build.gradle` 中开启 `minifyEnabled` 和 `shrinkResources` 以启用代码混淆和资源收缩。

比如debug正常，release环境会运行报错。从错误日志来看，这是一个与反射(Reflection)相关的类型转换错误，发生在release模式下，是因为sdk的代码被混淆导致
```
E/AndroidRuntime(22398): FATAL EXCEPTION: main
E/AndroidRuntime(22398): Process: com.xxx.yyy, PID: 22398
E/AndroidRuntime(22398): java.lang.RuntimeException: Unable to start activity ComponentInfo{com.xiaodai.credit/com.megvii.lv5.sdk.detect.actionflash.ActionFlashLivenessActivity}: java.lang.ClassCastException: java.lang.Class cannot be cast to java.lang.reflect.ParameterizedType
E/AndroidRuntime(22398): at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:4372)
E/AndroidRuntime(22398): at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:4569)
E/AndroidRuntime(22398): at android.app.servertransaction.LaunchActivityItem.execute(LaunchActivityItem.java:126)
E/AndroidRuntime(22398): at android.app.servertransaction.TransactionExecutor.executeNonLifecycleItem(TransactionExecutor.java:179)
```

创建`proguard-rules.pro`文件
```
## Flutter wrapper
 -keep class io.flutter.app.** { *; }
 -keep class io.flutter.plugin.** { *; }
 -keep class io.flutter.util.** { *; }
 -keep class io.flutter.view.** { *; }
 -keep class io.flutter.** { *; }
 -keep class io.flutter.plugins.** { *; }
# -keep class com.google.firebase.** { *; } // uncomment this if you are using firebase in the project
 -dontwarn io.flutter.embedding.**
 -ignorewarnings
```
修改`gradle.properties`添加：
```
extra-gen-snapshot-options=--obfuscate
```
修改`app/build.gradle`:
```
release {
		signingConfig = signingConfigs.release
		// 添加下方配置
		minifyEnabled true
		shrinkResources true
		proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
	}
}
```

### 8. **使用adb安装apk文件**
使用 `adb devices` 查看已连接设备
```
List of devices attached
emulator-5554	device
```

进行安装
```
adb -s emulator-5554 install /path/app-debug.apk
```

### 参考链接
- [Android平台签名证书(.keystore)生成指南 - DCloud问答](https://ask.dcloud.net.cn/article/35777)
- [Flutter Android 打包保姆式全流程 2023 版 这是一份 2023 完整的最新版的 Flutter An - 掘金](https://juejin.cn/post/7207078219215929402)
- [Flutter 应用混淆（包体积优化实践） | Joker's Blog](https://meandni.com/2020/11/04/obfuscating-the-flutter-app/)
