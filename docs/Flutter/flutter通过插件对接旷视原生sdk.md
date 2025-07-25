# flutter通过插件对接旷视face++原生sdk
## 创建并编写插件通信代码
首先创建本地插件，为适配demo代码执行插件原生语言为java和oc
```bash
flutter create --template=plugin \                                                             
  --platforms=android,ios \
  --android-language=java \
  --ios-language=objc credit_kit
```
在项目中接入本地插件
```yaml
dependencies:
  flutter:
    sdk: flutter

  credit_kit:
    path: plugins/credit_kit
```
因插件的通信逻辑简单，减少插件的flutter代码模块，仅保留`lib/credit_kit.dart`，并相应实现接口：
```dart
import 'dart:async';
import 'dart:convert';

import 'package:flutter/services.dart';

class CreditKit {
  static const MethodChannel _channel = const MethodChannel('credit_kit');
  
  static MethodChannel get channel => _channel;

  /// 插件内调用的Flutter方法，用于传递上报数据
  static Future<void> marsActionHandler(String action, String message) async {
    /* 
      eg:
      1. 在Flutter端添加订阅通道
        FlutterFace.getMethodChannel().setMethodCallHandler((MethodCall call) async {
        if (call.method == 'marsActionHandler') {
          String action = call.arguments['action'];
          String message = call.arguments['message'];
          print('~~活体进度: $action, message: $message');
        }
      });
      2. 在ios的FlutterFacePlugin.mm中可以通下面代码通知到flutter端
      NSDictionary *arguments = @{@"action": @"someAction", @"message": @{@"key": @"value"}};
      [self.channel invokeMethod:@"marsActionHandler" arguments:arguments result:^(id _Nullable result) {
          if ([result isKindOfClass:[FlutterError class]]) {
          NSLog(@"Error from Flutter");
          } else if ([result isKindOfClass:[FlutterMethodNotImplemented class]]) {
          NSLog(@"Method not implemented");
          } else {
          NSLog(@"Received from Flutter: %@", result);
          }
      }];
     */
    return await _channel.invokeMethod('marsActionHandler', {
      'action': action,
      'message': message
    });
  }

  static Future<Map<String, dynamic>> goToLiceFace(Map<String, dynamic> args) async {
    // bool result = await _channel.invokeMethod('goToLiveFace', args);
    // return result;
    try {
      var result = await _channel.invokeMethod('goToLiveFace', args);
      return {"isOk": result['isOk'], "errData": result['errData']};
    } catch (e) {
      return {
        "isOk": false,
        "errData": {
          "errorDesc": "插件调用执行报错",
          "errorMessage": e.toString(),
          "errorCode": -1
        }
      };
    }
  }

  /// OCR识别
  static Future<Map<String, dynamic>> goToOcr(Map<String, dynamic> args) async {
    try {
      var result = await _channel.invokeMethod('goToOcr', args);
      if (result['isOk']) {
        String base64Result = base64Encode(result['data']);
        return { "isOk": true, "errData": result['errData'], "data": base64Result, };
      } else {
        return {"isOk": false, "errData": result['errData']};
      }
    } catch (e) {
      return {
        "isOk": false,
        "errData": {
          "errorDesc": "插件调用执行报错",
          "errorMessage": e.toString(),
          "errorCode": -1
        }
      };
    }
  }
}

```
通过channel与原生代码进行通信，调用原生的sdk实现相应功能
## 安卓端

### OCR接入
#### 1. sdk资源引入
按照对接文档，将资源拷贝到flutter的插件目录对应的android目录下：
![](../../static/docs/Pasted%20image%2020250715101717.png)

因sdk资源在插件目录下，需要调整插件的gradle配置，使主工程及插件子工程功能正常且互不影响（包含活体配置)
```gradle
group = "com.example.credit_kit"
version = "1.0"

buildscript {
    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath("com.android.tools.build:gradle:8.1.0")
    }
}

rootProject.allprojects {
    repositories {
        google()
        mavenCentral()
        flatDir {
            // dirs 'libs'
            // 插件自身libs目录的引用，获取主工程libs
            // dirs "${rootProject.projectDir}/app/libs"
            // 插件工程绝对路径
            dirs "${rootProject.projectDir}/../plugins/credit_kit/android/libs"
        }
    }
}

apply plugin: "com.android.library"

android {
    namespace = "com.example.credit_kit"

    compileSdk = 35

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    defaultConfig {
        minSdk = 21
    }

    // .so 文件通过 jniLibs.srcDirs = ['libs'] 指定了资源目录，Gradle 会直接打包
    sourceSets { main { jniLibs.srcDirs = ['libs'] } }

    dependencies {
        testImplementation("junit:junit:4.13.2")
        testImplementation("org.mockito:mockito-core:5.0.0")

        // .jar 文件通过 fileTree(dir: 'libs', include: ['*.jar']) 直接引入
        implementation fileTree(dir: 'libs', include: ['*.jar', ])
        implementation(name: 'facelivev5', ext: 'aar') // faceid
    }

    testOptions {
        unitTests.all {
            testLogging {
               events "passed", "skipped", "failed", "standardOut", "standardError"
               outputs.upToDateWhen {false}
               showStandardStreams = true
            }
        }
    }
}
```
碰到了一些资源引入的问题，参见《flutter原生android插件aar资源引入问题》
#### 2. 借助demo实现插件调用
因为sdk中提供了demo代码，已经完整实现ocr扫描的界面，所以借助demo来实现插件调用是效率最高的方式，首先将demo引入到项目中：
![](../../static/docs/Pasted%20image%2020250715105446.png)
注意把res的资源文件也相应的引入到插件res下，同时参考demo的AndroidManifest.xml，修改插件的内容，对应的activity需要修改为当前插件的包层级
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="com.example.credit_kit">
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />

    <!-- android:name=".activity.FinAuthCardDetectActivity" -->
    <application>
        <activity
            android:name="com.card.finauth.demo.activity.FinAuthCardDetectActivity"
            android:configChanges="keyboardHidden|orientation|screenSize"
            android:launchMode="singleTop" />
    </application>
</manifest>

```
因资源文件已经放置在插件代码中，所以引入的插件代码需要调整：将导入的`import com.card.finauth.demo.R;` 修改为插件代码 `import com.example.credit_kit.R;`

创建 `credit_kit/FaceOcrHelper.java` 实现demo功能调用的桥接代码：
```java
package com.card.finauth.demo.utils;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.finauth.finauthcardquality.FinAuthCardQualityLicenseManager;
import com.finauth.licensemanager.Manager;
import com.card.finauth.demo.activity.FinAuthCardDetectActivity;
import com.card.finauth.demo.utils.CommonUtils;
import com.card.finauth.demo.utils.Configuration;
import com.card.finauth.demo.utils.ImageBinder;

import java.util.Map;

public class FaceOcrHelper {
    private String mfaceParameters;
    private static FaceOcrHelper instance;
    private String type;

    private FaceOcrHelper() {

    }

    private static Activity mActivity;

    public static FaceOcrHelper getInstance(Activity activity) {
        mActivity = activity;
        if (instance == null) {

            instance = new FaceOcrHelper();
        }
        return instance;
    }

    private FinAuthCardQualityLicenseManager megCardQualityLicenseManager;



    public void startGetLicense(String type,String params) {
        this.type = type;
        this.mfaceParameters = params;
        megCardQualityLicenseManager = new FinAuthCardQualityLicenseManager(mActivity);

        long status = 0;
        try {
            status = megCardQualityLicenseManager.checkCachedLicense();
        } catch (Throwable e) {
            e.printStackTrace();
        }
        if (status > 0) {//大于0，已授权或者授权未过期
            Intent intent = new Intent(mActivity, FinAuthCardDetectActivity.class);
            if ("front".equals(type)) {
                intent.putExtra("card_side", 1);
            }else {
                intent.putExtra("card_side", 2);
            }
            intent.putExtra("mfaceParameters", mfaceParameters);
            mActivity.startActivityForResult(intent, 3);
        } else { //需要重新授权

            new Thread(new Runnable() {
                @Override
                public void run() {
                    getLicense();
                }
            }).start();


        }

    }

    private void getLicense() {
        Manager manager = new Manager(mActivity, false);
        manager.registerLicenseManager(megCardQualityLicenseManager);

        String uuid = Configuration.getUUID(mActivity);
        String authMsg = megCardQualityLicenseManager.getContext(uuid);
        manager.takeLicenseFromNetwork(authMsg);
        if (megCardQualityLicenseManager.checkCachedLicense() > 0) {//大于0，已授权或者授权未过期
            mActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Intent intent = new Intent(mActivity, FinAuthCardDetectActivity.class);
                    if ("front".equals(type)) {
                        intent.putExtra("card_side", 1);
                    }else {
                        intent.putExtra("card_side", 2);
                    }
                    intent.putExtra("mfaceParameters", mfaceParameters);
                    mActivity.startActivityForResult(intent, 3);
                }
            });
        }
    }
}

```

如果是普通的工程，类定义的包会自动导入，但插件工程无法自动解析，手动解压对应sdk的jar包可以找到其包路径
![](../../static/docs/Pasted%20image%2020250715182816.png)


#### 3.完成插件调用sdk功能
因插件代码最终需要借助demo代码的activity，所以需要补充抽象类的实现，添加相应的引入及继承:
```
import android.app.Activity;
import android.content.Intent;
```

1. flutter主进程通过channel调用插件通知到android，解析方法调用内部的java代码
2. 通过编写的桥接代码，实现demo界面的展示，并调起ocr扫描
3. 通过监听器的方式，得到ocr的结果

```java
package com.example.credit_kit;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import io.flutter.embedding.engine.plugins.FlutterPlugin;
import io.flutter.embedding.engine.plugins.activity.ActivityAware;
import io.flutter.embedding.engine.plugins.activity.ActivityPluginBinding;
import io.flutter.plugin.common.MethodCall;
import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugin.common.MethodChannel.MethodCallHandler;
import io.flutter.plugin.common.MethodChannel.Result;
import io.flutter.plugin.common.PluginRegistry;

import com.face.lv5.sdk.bean.FaceliveLocalFileInfo;
import com.face.lv5.sdk.manager.FaceLiveDetectConfig;
import com.face.lv5.sdk.manager.FaceLiveDetectListener;
import com.face.lv5.sdk.manager.FaceLiveManager;

import com.card.finauth.demo.utils.ImageBinder;
import com.card.finauth.demo.utils.FaceOcrHelper;

/** CreditKitPlugin */
public class CreditKitPlugin implements FlutterPlugin, MethodChannel.MethodCallHandler, ActivityAware {

    private MethodChannel channel;
    private Activity activity;
    private ActivityPluginBinding binding;

    private String type;
    private String params;
    private String bizToken;
    private String modelPath;

    private static final String HOST = "https://api.yljz.com";

    private Result resultCall;
    private PluginRegistry.ActivityResultListener resultListener;
    private boolean isAdd = false;

    @Override
    public void onAttachedToEngine(@NonNull FlutterPluginBinding flutterPluginBinding) {
        channel = new MethodChannel(flutterPluginBinding.getBinaryMessenger(), "credit_kit");
        channel.setMethodCallHandler(this);
    }

    @Override
    public void onDetachedFromEngine(@NonNull FlutterPluginBinding binding) {
        channel.setMethodCallHandler(null);
    }

    @Override
    public void onMethodCall(@NonNull MethodCall call, @NonNull final MethodChannel.Result result) {
        this.resultCall = result;
        if (call.method.equals("getPlatformVersion")) {
            result.success("Android " + android.os.Build.VERSION.RELEASE);
        } else if (call.method.equals("goToLiveFace")) {
            bizToken = call.argument("bizToken");
            startLiveFaceDetection(bizToken);
        } else if (call.method.equals("goToOcr")) {
            type = call.argument("type");
            params = call.argument("parameters");
            startOcrDetection(type, params);
        } else {
            result.notImplemented();
        }
    }

    @Override
    public void onAttachedToActivity(@NonNull ActivityPluginBinding binding) {
        this.activity = binding.getActivity();
        this.binding = binding;
    }

    @Override
    public void onDetachedFromActivity() {
        cleanupOcrDetection();
    }

    @Override
    public void onDetachedFromActivityForConfigChanges() {}

    @Override
    public void onReattachedToActivityForConfigChanges(@NonNull ActivityPluginBinding binding) {}

    // OCR 检测
    private void startOcrDetection(String type, String parameters) {
        channel.invokeMethod("marsActionHandler", createMessage("OCR检测开始", "success"), null);

        if (isAdd && resultListener != null && binding != null) {
            binding.removeActivityResultListener(resultListener);
            isAdd = false;
        }

        if (!isAdd) {
            resultListener = new PluginRegistry.ActivityResultListener() {
                @Override
                public boolean onActivityResult(int requestCode, int resultCode, Intent data) {
                    Log.e("faceidv5", "startOcrDetection : requestCode=" + requestCode + ",resultCode=" + resultCode + ",data=" + data);

                    if (requestCode == 2342) {
                        return false;
                    }

                    Result resultCopy = resultCall;
                    resultCall = null;

                    if (requestCode == 3 && resultCode == Activity.RESULT_OK) {
                        Log.e("faceidv5", "识别成功");
                        Bundle extras = data.getExtras();
                        ImageBinder binder = (ImageBinder) extras.getBinder("cardimg_bitmap");

                        if (binder != null) {
                            byte[] bytes = binder.getImage();
                            Log.e("faceidv5", "cardimg_bitmap length: " + (bytes != null ? bytes.length : 0));
                            channel.invokeMethod("marsActionHandler", createMessage("OCR身份证识别成功", "Success"), null);
                            resultCopy.success(createSuccessResultWithData(bytes));
                        } else {
                            Log.e("faceidv5", "cardimg_bitmap 获取失败");
                            channel.invokeMethod("marsActionHandler", createMessage("OCR身份证识别失败", "Error"), null);
                            resultCopy.success(createErrorResult("OCR识别失败", "未获取到身份证图片数据", -1));
                        }
                    } else {
                        Log.e("faceidv5", "识别失败");
                        channel.invokeMethod("marsActionHandler", createMessage("OCR身份证识别失败", "Error"), null);
                        resultCopy.success(createErrorResult("OCR识别失败", "未识别成功", -1));
                    }

                    if (binding != null) {
                        binding.removeActivityResultListener(resultListener);
                        isAdd = false;
                    }

                    return false;
                }
            };

            binding.addActivityResultListener(resultListener);
            isAdd = true;
        }

        FaceOcrHelper.getInstance(this.activity).startGetLicense(type, params);
    }

    private void cleanupOcrDetection() {
        if (binding != null && resultListener != null) {
            binding.removeActivityResultListener(resultListener);
        }
        resultListener = null;
        resultCall = null;
        isAdd = false;
    }

    // 活体检测启动逻辑
    private void startLiveFaceDetection(String bizToken) {
        channel.invokeMethod("marsActionHandler", createMessage("活体检测SDK初始化开始", "success"), null);
        Log.e("faceidv5", "活体检测SDK初始化开始 : errorCode=" + bizToken);

        modelPath = saveAssets("facelivemodel.bin", "model");
        if (modelPath == null) {
            resultCall.success(createErrorResult("模型加载失败", "无法加载模型文件", -1));
            return;
        }

        FaceLiveDetectConfig config = new FaceLiveDetectConfig();
        config.setBizToken(bizToken);
        config.setHost(HOST);
        config.setModelPath(modelPath);

        FaceLiveManager.getInstance().startDetect(activity, config, new FaceLiveDetectListener() {
            @Override
            public void onPreDetectFinish(int errorCode, String errorMessage) {
                Log.e("faceidv5", "onPreDetectFinish : errorCode=" + errorCode + ",errorMessage=" + errorMessage);
                channel.invokeMethod("marsActionHandler", createMessage("活体检测SDK初始化结束", "success"), null);
                if (errorCode != 1000) {
                    resultCall.success(createErrorResult("活体检测初始化失败", errorMessage, errorCode));
                }
            }

            @Override
            public void onDetectFinish(int errorCode, String errorMessage, String bizToken) {
                Log.e("faceidv5", "onDetectFinish : errorCode=" + errorCode + ",errorMessage=" + errorMessage);
                if (errorCode == 1000) {
                    channel.invokeMethod("marsActionHandler", createMessage("活体检测成功", "success"), null);
                    resultCall.success(createSuccessResult());
                } else {
                    channel.invokeMethod("marsActionHandler", createMessage("活体检测失败", errorMessage), null);
                    resultCall.success(createErrorResult("活体检测失败", errorMessage, errorCode));
                }
            }

            @Override
            public void onLivenessFileCallback(String livenessFilePath) {
                Log.e("faceidv5", "Liveness file path: " + livenessFilePath);
            }

            @Override
            public void onLivenessLocalFileCallBack(FaceliveLocalFileInfo faceliveLocalFileInfo) {
                // 可选：处理本地文件回调
            }
        });
    }

    private String saveAssets(String fileName, String path) {
        File dir = new File(this.activity.getExternalFilesDir("face"), path);
        if (!dir.exists() && !dir.mkdirs()) {
            return null;
        }

        File file = new File(dir, fileName);

        try (FileOutputStream fos = new FileOutputStream(file);
             InputStream is = this.activity.getAssets().open(fileName)) {

            byte[] buffer = new byte[1024];
            int count;
            while ((count = is.read(buffer)) != -1) {
                fos.write(buffer, 0, count);
            }

            return file.getAbsolutePath();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 通用创建成功返回
    private Map<String, Object> createSuccessResult() {
        Map<String, Object> result = new HashMap<>();
        result.put("isOk", true);
        Map<String, String> errData = new HashMap<>();
        errData.put("errorDesc", "操作成功");
        errData.put("errorMessage", "Success");
        result.put("errData", errData);
        return result;
    }

    // 通用成功+数据
    private Map<String, Object> createSuccessResultWithData(byte[] data) {
        Map<String, Object> result = createSuccessResult();
        result.put("data", data);
        return result;
    }

    // 通用错误返回
    private Map<String, Object> createErrorResult(String errorDesc, String errorMessage, int errorCode) {
        Map<String, Object> result = new HashMap<>();
        result.put("isOk", false);
        Map<String, Object> errData = new HashMap<>();
        errData.put("errorDesc", errorDesc);
        errData.put("errorMessage", errorMessage);
        errData.put("errorCode", errorCode);
        result.put("errData", errData);
        return result;
    }

    // 用于 Flutter 端消息通知
    private Map<String, String> createMessage(String action, String message) {
        Map<String, String> msg = new HashMap<>();
        msg.put("action", action);
        msg.put("message", message);
        return msg;
    }
}
```

> 关于extras.getBinder("cardimg_bitmap")及ImageBinder获取ocr图像数据，参考FinAuthCardDetectActivity实现的handleSuccessResult的数据组装

### 活体检测接入
#### 1. sdk资源引入
按照文档同样将资源文件拷贝到插件对应的资源目录下即可，需要注意sdk代码的lib同级存在model目录，将facelivemodel.bin 文件拷贝到插件的assets下
![](../../static/docs/Pasted%20image%2020250715114722.png)
#### 2.参考demo代码实现功能
参考demo的`MainActivity.java`，首先需要加载模型文件(.bin)，然后通过sdk的单例进行活体功能的调用，通过FaceLiveDetectListener的完整实现，接收活体结果

### 添加混淆排除
flutter打包时release会启用代码混淆（Proguard），以保护代码：
- 在 `android/app/proguard-rules.pro` 文件中定义混淆规则
但会误伤sdk的aar资源，导致程序运行报错闪退，所以需要将对应的类名排除：
```
# MegLive SDK
-keep class com.finauth.** {*;}
-keep interface com.finauth.** {*;}
-keepclassmembers class com.finauth.** {
    *;
}

-keep class com.face.** {*;}
-keep interface com.face.** {*;}
-keepclassmembers class com.face.** {
    *;
}

-keep class com.megvii.** {*;}
-keep interface com.megvii.** {*;}
-keepclassmembers class com.megvii.** {
    *;
}
-dontshrink

```

> 删除主工程android的AndroidManifest.xml， android:taskAffinity="" 避免任务管理器出现多个相同进程

## ios端
#### OCR接入
##### 1. 资源引入
首先修改插件的podspec配置，添加插件资源的引入及配置支持
![](../../static/docs/Pasted%20image%2020250716145257.png)

同时创建framework目录，将sdk目录的`.framework`(`.xcframework` 已签名)、`resource/xx.bundle`复制到目录下，以提供插件引入。

按照sdk接入文档，调整项目的xcode配置，配置动态链库引入刚刚的framework及resource，可以直接拖拽到该区域实现引入，需要手动添加系统依赖：
![](../../static/docs/Pasted%20image%2020250716151101.png)

**相应的调整项目编译配置：**
搜索`sources as`和`other linker`，linking可能会有多项，直接添加到前面即可
![](../../static/docs/Pasted%20image%2020250716151512.png)

##### 2. 引入demoui
直接打开demo项目编译
1. xcode编译选项选择any ios device
2. 菜单 product -> build
3. product -> show build folder in finder 找到编译后的FinAuthCardUIDetect.framework
4. 按照资源引入的流程，同样复制到framework目录，并在xcode添加引入
![](../../static/docs/Pasted%20image%2020250716151800.png)

##### 3.原生插件代码
修改头文件`CreditKitPlugin.h`
```h
#import <Flutter/Flutter.h>

@interface CreditKitPlugin : NSObject<FlutterPlugin>
@property (nonatomic, strong) FlutterMethodChannel *channel; // 添加通道
@end
```

因sdk包含c++代码，修改插件的代码后缀`CreditKitPlugin.m` -> `CreditKitPlugin.mm`，并引入相关的sdk资源：


找到demo文件，联网校验需要与demo的host一致
![](../../static/docs/Pasted%20image%2020250716154355.png)
