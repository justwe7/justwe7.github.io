[机场订阅 | Surge 入门指南](https://wiki.surge.community/basic/ji-chang-ding-yue)
[导入配置 | Surge 入门指南](https://wiki.surge.community/basic/dao-ru-pei-zhi)
[GitHub - Loyalsoldier/surge-rules: 🦄 🎃 👻 Surge 规则集(DOMAIN-SET 和 RULE-SET)，适用于 Surge for iOS 和 Surge for Mac 客户端。](https://github.com/Loyalsoldier/surge-rules)
[GitHub - Rabbit-Spec/Surge: Surge自用配置以及模块和脚本](https://github.com/Rabbit-Spec/Surge)


### 增强模式与内网vpn域名冲突
首先配置 skip-proxy = 192.168.0.0/24, 10.0.0.0/8, 172.16.0.0/12, 127.0.0.1, localhost, \*domain.com

Surge 的增强模式使用 Tun 接管流量，它的 DNS 解析逻辑和系统不同：
1. **系统 `/etc/hosts`** 不再生效，必须用 Surge 的 `[Host]` 配置。
2. **DNS 查询会先走 Surge 内置的 DNS 配置**，然后才可能合并 VPN 下发的 DNS。    
3. **Surge 有 DNS 缓存**，一旦缓存了 NXDOMAIN，就算 VPN DNS 生效了，也要等缓存过期才能正常。

经测试，关闭增强模式后仍旧访问不通，是因为surge的dns缓存在生效。更新网络状态可立即刷新：可重连WiFi或者vpn