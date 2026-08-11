---
title: Timeline
slug: /
---

# 动态流

记录最近看到的、折腾过的和想留存的小事。内容按时间倒序整理，快速回溯最近在忙什么。

## 2026 年 8 月

### 08-01 · AI
- [Codex 雷达](https://codexradar.com/)检测oai降智评分的网站

### 08-02 · AI / 职位 / 程序员
- 刷到 [FDE（Forward Deployed Engineer）指南](https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer) 这个职位概念又在炒热度，貌似和我自己接全栈一把梭的私活很像，核心就是客户不知道想要什么，得先“做做看”，但需要立好准则。
- [AI 时代下程序员的价值](https://jt26wzz.com/posts/0017-the-value-of-programmers-in-the-ai-era/)：代码会越来越廉价，真正值钱的是定义问题、知道什么证据可信，以及为上线后的真实结果负责。

## 2026 年 7 月

### 07-31 · JS / 异步
- JS 的异步大白话版理解记下来：
  - 要先分清 JS 语言和宿主环境。早期 JS 引擎本身可以理解为只提供 `runCode(代码)`——一段代码同步跑完就返回；按钮 `click`、`setTimeout`、网络返回这些“过一会儿再发生”的事，其实是浏览器或 Node.js 记录回调，并在合适时机把回调交回 JS 引擎执行。多个回调不能同时跑，宿主就用任务队列让它们排队；所以常说的宏任务，更接近宿主给 JS 引擎派活的队列，而不是 JS 语言自己突然学会了异步。
  - ES6 有了 Promise 后，语言规范里多了一类必须紧跟当前代码收尾的 Job，也就是日常说的微任务。JS 引擎跑完这一轮 `runCode`，会先把 Promise 产生的微任务清空，再把控制权还给宿主去取下一个任务；“微任务总在当前宏任务之后、下一个宏任务之前执行”就是这么来的。真实浏览器和 Node.js 在事件循环阶段、`process.nextTick` 等细节上还会有差别，但先抓住“宿主负责投递，JS 负责执行并清空微任务”这个分工，很多八股就没那么玄学了。

### 07-29 · U卡
- bybit eu继续申请下，拿一张EWE电费账单手动P成自己提交成功，由于是护照申请，姓名那需要中文。又要求提交无fanzui记录证明，找到【北京jing务】小程序能线上申请
- 看到一句话，记录下来以鞭策自己现在的状态：“具体，是一个人停止骗自己的开始。”

### 07-27 · esim / U卡 / 学习
- giffgaff 大面积封号了，留个备用的退款地址：[Log in | giffgaff](https://support2.giffgaff.com/app/ask/Plans-Credit-and-Payment-Details/Cancelling-a-plan-or-top-up-purchase/form/)。
- 最近做appstore的cpp需要有单独的橱窗图设计，橱窗图需要多个版本，基于之前的痛点，今天把[橱窗图平台](https://appshots.lihx.top/)新增支持了多项目切换的功能（bmad怎么越用越难受，大部分时间都在写文档了，可能codex高级模型+重型skill工作流不适合一起协作， 换5.5反而更快速实现需求）
- gpt5.6 - 大任务用sol 小改动用terra

### 07-26 · AI / 学习 / 前端
- GPT 目前的代码逻辑强化，前端 UI 需要使用 skill。可以参考 [Anthropic 的 frontend-design skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)。
- 需要华丽 UI 的项目，直接使用官方插件 Product Design：它会先生成 3 张视觉设计稿供选择，再根据选中的风格复刻页面。如果只是简单调整 UI，就没必要使用 Product Design，纯粹浪费 Token。
- 发现一套轻量级的 AI 编程工作流 [GSD Core](https://github.com/open-gsd/gsd-core/blob/next/README.zh-CN.md)，按照 Discuss → Plan → Execute → Verify → Ship 五个阶段推进任务，重点解决长任务里的上下文膨胀问题。
- 从卖课手里拿了分面试题大纲https://y03l2iufsbl.feishu.cn/drive/folder/QuakfoOtZlsfffdaqKPc01Kankf

### 07-24 · Google Play / Claude Pro / esim
- 刷到卡兹克新上线了ai资讯网站[virxact](https://aihot.virxact.com/)
- 看到 Google Play 玻利维亚区的 Claude Pro 只要 86 元，顺手开了个， 从这个 [应用商店商店价格查询](https://priceradar.store/zh/app/d50af74a-7437-4f60-a895-7d3f6e82743a) 网站可以对比价格， https://x.com/xfengbro/status/2080489354070479088?s=46&t=LiJssSVoLQXRtm3XVz8gHA 。
- 更换 Google Play 地区时参考这篇 [Google Play 更换教程](https://itangtalk.com/google-play/)。
- 看到 [菲律宾dito](https://x.com/kood520/status/2080499960232149108) 虚拟卡开通教程，可以顺便开通maya卡，鉴于最近Bitget半拉闸，两个48team续费告急，再囤张境外手机卡吧。

### 07-16 · 开发工作流 / 设计 / skill
- [Pencil（pen.dev）](https://docs.pencil.dev/) 把矢量设计画布直接放进 IDE，用 `.pen` 文件管理组件、变量和设计稿，还能让 AI 协助同步设计与代码。挺适合边设计边实现的工作流，后面做前端项目时可以试试。
- [dbskill](https://github.com/dontbesilent2025/dbskill) 是一套面向创业者和内容创作者的中文 AI Skills 工具箱，`/dbs` 会根据上下文从 29 个 skills 中选择入口，覆盖商业诊断、内容创作、行动复盘和本地知识库等场景，并且支持 Codex。仓库使用 CC BY-NC 4.0，个人学习可以直接用，商业用途需要单独授权。
- 看到一个专门约束 AI Agent 过度设计的 [Ponytail](https://github.com/DietrichGebert/ponytail)：先判断功能是否真的需要，再依次考虑复用现有代码、标准库和平台原生能力，最后才写最小实现。挺适合小改动，避免 Agent 为简单需求堆出一整套复杂方案。
- [Headroom](https://github.com/headroomlabs-ai/headroom) 会在工具输出、日志、文件、RAG 片段和对话历史进入 LLM 前做内容感知压缩，原始内容还能按需取回；可以作为 library、proxy 或 MCP server 接入，也支持直接包装 Codex。适合长上下文和工具输出很多的 Agent 工作流，先收藏，实际能省多少 Token 还是要自己跑数据再看。
- [CodeStable](https://github.com/codestable/CodeStable) 是一套强调人在环的 AI 编码工作流，不以多 Agent 编排为中心，而是把需求、架构、特性、问题和历史决策组织在项目的 `.codestable/` 目录里，让开发过程可以追溯。感觉更适合长期维护的严肃项目，临时小改动没必要上这么完整的流程。

### 07-05 · AI / skill
- 最近在家写自己项目多，skill也用的多，管理起来很乱[宝玉 on X: "分享一下我管理 Skills 的方式，" / X](https://x.com/dotey/status/2069632132431929651?s=46)， 基于他的思路自己也整理一份自己的[Skill统一软链方案](../docs/AI/集中管理skill的方案.md)和仓库。 
- 前端动效找灵感可以翻 [Motion 示例库](https://motion.dev/examples)，里面整理了 React、JavaScript 和 Vue 的可复用动效代码片段。
- 看到一个增强 Agent 联网能力的 [web-access skill](https://github.com/eze-is/web-access)，补上了联网工具调度、CDP 浏览器操作和站点经验积累，兼容 Codex、Claude Code 等支持 `SKILL.md` 的 Agent。

### 07-05 · U卡
- 最近U的汇率很划算，比真实汇率都便宜，[Bybit Card](https://www.bybit.com/zh-MY/invite?ref=JR0NXJ0) 酷酷买U，100送10U奖励到手

### 07-01 · U卡 / ChatGPT
- 今天终于上车11镑英区gpt team车，加上之前的25澳元的team，双车四座位，舒服了。存一下网上看到的[开卡教程](https://www.notion.so/48-Team-35f66848c3f080c78393fd3c455d85fd)

---------

## 2026 年 6 月

### 06-25 · appstore礼品卡
- https://www.seagm.com/zh/itunes-gift-card-turkey 土区

### 06-24 · cloudflare / 开发
- [顶级白嫖指南：拥有一个域名后，Cloudflare 到底能送你多少服务？](https://blog.wildsaltlab.com/post/ultimate-cloudflare-free-tier-2026/)
- 游戏素材站：https://github.com/wellingfeng/UltraGameStudio/blob/main/app/doc/README.zh-CN.md, https://www.bilibili.com/video/BV1NbmXYDEhB/, https://itch.io/， https://www.spriters-resource.com/

### 06-22 · 跨境
- 今天去兴业银行办了张寰宇人生卡，配合之前申请的[英国 iFAST 开户/入金教程：大陆用户从 0 到 1 线上开户入金 - 香港境外银行 | 投资导航](https://invest-nav.com/tutorials/hk-banks/text/ifast-bank/) 以及申请的wise，可以无忧保号德国沃达丰了。

### 06-19 · U卡 / ChatGPT / AI
- 申请的泰国teamcode收到邮件了，亲测有用记一下申请网址 [Thinking Machines x OpenAI | ChatGPT for Business](https://thinkingmachin.es/thinking-machines-chatgpt-business/) 
- [Request ChatGPT Business | TalentGenius](https://talentgenius.io/chatgpt/request)

### 06-15  AI / 工作流 / 绘图
- [Hot AI Agent Skills — Right Now](https://www.skills.sh/hot)
- [AI产品需求文档框架-以 Deer-Flow 为例 - 飞书云文档](https://bytesmore.feishu.cn/wiki/KP5ywyaKyiLmQrk3atrcIG2tnrz)
- [AI绘图提示词灵感-目录指引](https://www.yuque.com/juennn/dnf7st/12e8b259c9ffd6d36c33b0e68a5a19e1)

### 06-03 
- 鉴于最近codex需要手机号二验，买了张xesim，按照[giffgaff](https://youtu.be/kcmAnZNXjsg?si=d40LM8UbaVqz2tkI)和[Clubsim / X](https://x.com/AI_Jasonyu/status/2007432863525015973)教程申请了英国卡和港卡，港卡虽然用不了gpt，但应该会稳定点吧
- 德国沃达丰的[申请教程 - LINUX DO](https://linux.do/t/topic/2294447/410)教程， wise转账充值的账号
> Mein Vodafone登录不要49，号码前加0  
企业/组织名称” Vodafone GmbH  
BIC：DEUTDEDDXXX  
IBAN：DE68 3007 0010 0250 8000 00  
债权人 ID：DE26ZZZ00000006194  
wise转账在备注49____________

## 2026 年 4 月
### 04-03 AI
- [00 — Claude Code 完整架构解析 | Claude Reviews Claude](https://openedclaude.github.io/claude-reviews-claude/zh-CN/overview)

### 04-01 U卡
- 申请了一张美区卡头的U卡[Bitget Wallet](https://web3.bgw.live/share/3aHNTj?inviteCode=678lTFZ8) 可以直充cc， [\[教科书级\] 中英对照版 Bitget Wallet & Fiat24虚拟卡注册开卡教程，免费开卡、无年费、0手续费，还有5U奖励！](https://www.nodeseek.com/post-595670-1)

## 2026 年 3 月
### 漫剧 / 中转站 / AI
- [AI 中转站黑话大全整理，带你一次性了解中转站逻辑，别用中转站，用的不明不白 - V2EX](https://cn.v2ex.com/t/1196011)
- 最近在玩ai漫剧生成，自己做了个漫剧平台，感觉核心还是剧本和提示词，工作流不是核心 [Seedance2.0制作《水墨花木兰》，短片制作思路全流程及避坑指南，干货满满，看完就会！提示词、智能体创建模板，知识库分享\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1Rdc4zXEPo/?spm_id_from=333.1387.homepage.video_card.click&vd_source=1b521ffc97529ec801ca0ad47f6233b3)
- [04-NanoBananaPro 提示词 - 飞书云文档](https://my.feishu.cn/wiki/YoCnwo0xMi8FX2kj8hgcED8rnQe)
- [通往AGI之路 - 飞书云文档](https://waytoagi.feishu.cn/wiki/QPe5w5g7UisbEkkow8XcDmOpn8e)

## 2026 年 1 月
### agent / AI
- 用字节的“Manus”[Home - AnyGen](https://www.anygen.io/home?invitation_code=NGNFVBVLCEW563X)做了一个flapybird https://www.anygen.io/share/79dlEmDNWBMyoohaRxafgU 

## 2025年 11 月
- 看到的[AI编码提示词工程](https://github.com/jwangkun/ai-coding-prompt-java)，后续再了解下
- 开源白板工具： https://drawnix.com/

## 2025年 9 月
- https://1key.me/ 白嫖了一年的google pro学生包
- 因为clashX代理不了gemini cli同时最近好玩的反重力也用不了，以后换梯子了[surge规则](https://github.com/Rabbit-Spec/Surge/blob/Master/Conf/Spec/Surge-CN.conf)

## 2025年 8 月
- 申请了张港卡[pokepay](https://app.pokepay.cc/pages/invitation/regist?r=227080) ，不支持ai会员订阅，踩坑了

<!--
## YYYY 年 M 月

### MM-DD · 主题 / 主题

- 记录内容；需要时附上 [链接文字](https://example.com)。
-->
