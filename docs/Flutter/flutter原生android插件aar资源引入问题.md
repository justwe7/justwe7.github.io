## Flutter插件AAR依赖路径问题
### 现状
在插件的配置中已经添加了依赖，且文件路径是正确的，facadeidv5的在插件中的路径是 plugins/xxx_plugin/android/libs/faceidv5.aar
```
/// plugins/xxx_plugin/android/build.gradle

dependencies {
        testImplementation("junit:junit:4.13.2")
        testImplementation("org.mockito:mockito-core:5.0.0")

        implementation(name: 'faceidv5', ext: 'aar')
    }
```
但是在编译时会报错
```
FAILURE: Build failed with an exception. What went wrong:Execution failed for task ':app:checkDebugAarMetadata'.> Could not resolve all files for configuration ':app:debugRuntimeClasspath'. > Could not find :faceidv5:. Searched in the following locations: - file:/Users/debugger/bugcave/bjwl/xx_flutter/android/app/libs/faceidv5.aar
```
我需要在项目的android主工程下放置该依赖才可正常编译, 按照常规思路，放置在插件目录下，直接寻找插件目录应该是没有问题的。因为插件中的 .jar 和 .so都可以正常被寻找

反过来尝试：
如果在插件工程下缺失faceidv5 文件则会报错
```
FAILURE: Build failed with an exception. What went wrong:Execution failed for task ':flutter_face:compileDebugJavaWithJavac'.> Could not resolve all files for configuration ':flutter_face:debugCompileClasspath'. > Could not find :faceidv5:. Required by: project :flutter_face* Try:> Run with --stacktrace option to get the stack trace.> Run with --info or --debug option to get more log output.> Run with --scan to get full insights.> Get more help at https://help.gradle.org.BUILD FAILED in 1s
```

所以得保证同一个文件要在两个目录下都存在，这样不符合插件独立维护避免侵入主工程配置的原则，查询原因：

### 问题分析
1. **插件模块的路径范围**  
    当你在插件的 `build.gradle` 中配置 `flatDir { dirs 'libs' }`，Gradle 会在 **插件模块的根目录（即 `flutter_face/android/libs`）** 下查找 AAR。但若在插件模块的依赖中直接使用 `implementation(name: 'faceidv5', ext: 'aar')`，Gradle 默认只会从 **当前模块的 `libs` 目录** 查找，不会自动传递路径到主工程。    
2. **主工程的路径范围**  
    主工程（`:app`）构建时，会解析所有依赖（包括插件），但默认只在 **主工程的 `libs` 目录（即 `android/app/libs`）** 查找 AAR。因此，当插件依赖的 AAR 未放置在主工程的 `libs` 目录时，主工程会报错。
3. **为何 `.jar` 和 `.so` 可以正常找到？**    
    - `.jar` 文件通过 `fileTree(dir: 'libs', include: ['*.jar'])` 直接引入，路径明确。        
    - `.so` 文件通过 `jniLibs.srcDirs = ['libs']` 指定了资源目录，Gradle 会直接打包。

#### **`flatDir` 的作用**  
`flatDir` 允许直接从本地目录加载依赖，但需要明确指定路径。通过 `projectDir` 动态获取插件模块的绝对路径，确保主工程能定位到插件的 `libs`。


### 解决方案
通过配置插件的 `flatDir` 路径指向插件的绝对路径，避免主工程和插件工程通过相对路径来寻找aar
使用 {rootProject.projectDir} 定位到flutter项目的Android工程，再通过路径跳转来寻找到插件目录

```
group = "com.example.flutter_face"
version = "1.0"

buildscript {
    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath("com.android.tools.build:gradle:7.3.0")
    }
}

// 尝试不同的路径方式来找到主工程的libs目录
// def mainAppLibsDir = null

// // 尝试相对路径
// if (mainAppLibsDir == null) {
//     // println "进入判断2: ${mainAppLibsDir}"
//     def possiblePaths = [
//         "${rootProject.projectDir}/app/libs",                     // 标准Android项目结构
//         "${rootProject.projectDir}/../../../android/app/libs",    // Flutter插件到Flutter主工程的路径
//         "${project.projectDir}/../../../android/app/libs"         // 另一种可能的路径
//     ]
    
//     for (path in possiblePaths) {
//         if (new File(path).exists()) {
//             mainAppLibsDir = path
//             break
//         }
//     }
// }

// // 打印找到的路径，用于调试
// println "Main app libs directory: ${mainAppLibsDir}"
// println "Main app libs directory: ${rootProject.projectDir}"


// 针对整个flutter项目配置，影响主项目及所有子项目
rootProject.allprojects {
    repositories {
        google()
        mavenCentral()
        flatDir {
            // dirs 'libs'
            // 插件自身libs目录的引用，获取主工程libs
            // dirs "${rootProject.projectDir}/app/libs"
            // 插件工程绝对路径
            dirs "${rootProject.projectDir}/../plugins/flutter_face/android/libs"
        }
        
        // 如果找到了主工程的libs目录，也添加引用
        // if (mainAppLibsDir != null) {
        //     flatDir {
        //         dirs mainAppLibsDir
        //     }
        // }
    }
}

apply plugin: "com.android.library"


android {
    if (project.android.hasProperty("namespace")) {
        namespace = "com.example.flutter_face"
    }

    compileSdk = 34

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }

    defaultConfig {
        minSdk = 21
    }

    // repositories {
    //     flatDir { dirs 'libs' }
    // }

    lintOptions {
        checkReleaseBuilds = false
        abortOnError = false
    }

    // .so 文件通过 jniLibs.srcDirs = ['libs'] 指定了资源目录，Gradle 会直接打包
    sourceSets { main { jniLibs.srcDirs = ['libs'] } }

    dependencies {
        testImplementation("junit:junit:4.13.2")
        testImplementation("org.mockito:mockito-core:5.0.0")

        // .jar 文件通过 fileTree(dir: 'libs', include: ['*.jar']) 直接引入
        implementation fileTree(dir: 'libs', include: ['*.jar', ])
        // implementation files('libs/faceidv5.aar')
        implementation(name: 'faceidv5', ext: 'aar')
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

## repositories作用
在 Flutter 插件的 Android 模块中，`buildscript` 和 `rootProject.allprojects` 中配置的 `repositories` 有以下主要区别：

### buildscript 中的 repositories
```gradle
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    // ...
}
```
这部分配置是为构建脚本本身使用的
主要用于下载和使用 Gradle 插件依赖
例如 com.android.tools.build:gradle 这样的构建工具依赖
这些依赖是在构建过程中使用，而不是在应用运行时使用

### rootProject.allprojects 中的 repositories
```
rootProject.allprojects {
    repositories {
        google()
        mavenCentral()
        flatDir {
            dirs 'libs'
        }
    }
}
```
- 这部分配置是为**项目本身的依赖**使用的
- 用于下载应用或库在运行时需要的依赖
- 影响所有子项目（包括主项目和所有模块）
- 例如 implementation 声明的依赖都会从这里配置的仓库中查找

### 主要差异总结
1. **作用范围**：buildscript 只针对构建脚本，allprojects 针对整个项目及其子模块
2. **依赖类型**：buildscript 主要用于构建工具依赖，allprojects 用于运行时依赖
3. **生命周期**：buildscript 在构建期间使用，allprojects 中的依赖会打包到最终的应用中
