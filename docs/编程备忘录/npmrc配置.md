`.npmrc`

```bash
; semver 锁定 minor 版本
save-prefix=^
; 打印安装日志
loglevel=http
; 关闭 npm 自动检查更新
update-notifier=false
; 淘宝源
registry=https://registry.npmmirror.com/
; 禁用lock文件
package-lock=false
; 当 true，所有依赖项都被提升到 node_modules/.pnpm。 这使得 node_modules所有包都可以访问 未列出的依赖项。
hoist=true
; 默认情况下，pnpm 创建一个半严格的 node_modules，这意味着依赖项可以访问未声明的依赖项，但 node_modules 之外的模块不行。 通过这种布局，生态系统中的大多数的包都可以正常工作。 但是，如果某些工具仅在提升的依赖项位于根目录的 node_modules 时才有效，您可以将其设置为 true 来为您提升它们。
shamefully-hoist=true
; 如果启用该选项，pnpm 将不安装任何声称不与当前 Node 版本兼容的包
engine-strict=true
```