
## 图像生成
因为需要不断的重做，微调，所以AI绘图又称“炼丹”，

通俗易懂简单讲一讲ai图像生成的原理及常见的方案


### GPT-4o
“4o 图像生成是一个嵌入在 ChatGPT 中的自回归模型”
新模型+一句话指令，效果就超过了人类精心设计的工作流。GPT-4o图像生成功能具有以下特点：
>- 精准渲染图像内文字，能够制作logo、菜单、邀请函和信息图等；
> - 精确执行复杂指令，甚至在细节丰富的构图中也能做到;
> - 基于先前的图像和文本进行扩展，确保多个交互之间的视觉一致性
> - 支持各种艺术风格，从写实照片到插图等.

示例：
一   图生图：修改吉卜力风格的照片
二  文生图：赛博朋克风格，六个葱油饼，在末日商店档口展示，门店招牌标题”食不食油饼“，高对比度
![](../../static/docs/Pasted%20image%2020250415141921.png)

三 图生图 参考图片风格，为我生成健身训练的：杠铃卧推，直腿硬拉的图片素材
![](../../static/docs/Pasted%20image%2020250415142551.png)

让AI绘画零门槛！生图、改图比SD、Comfy 都更加简单、优秀。但是，在使用自然语言生图的过程中，首先确定想要的风格至关重要，而不是将元素、布局这些次要原则前置。

四 prompt创建素材
上传参考图，金融借贷类产品，偏好主色#0032a1， 包含借款，还款，银行卡，账单，账户，个人中心，人脸识别，OCR识别等图标

Minimalist UI icon for a financial app, theme: [图标名称], flat style with soft 3D shadows, white background, soft gradients using #0032a1 as primary color, clean vector design, modern and professional look, iOS app style

### Flux
分三个版本：Schnell、Dev、Pro（闭源，API调用）
使用方式：本地使用ComfyUI和ForgeUI，完整版fp16需要极高性能（64G-RAM和24G显存）
[一口气了解FLUX.1：AI生图的“新王”，凭什么震惊世界？FLUX模型使用教程，基本用法到进阶应用，一网打尽！（含SD Forge与ComfyUI整合包）\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1UytNexEUk/)

### stable diffusion
Stable Diffusion（简称 SD）是由 Stability AI 推出的文生图模型，从最早的 1.0 版本到 SDXL-Turbo，每一代模型都有显著的改进。

| 功能       | SD 1.5     | SD 2.1       | SDXL           | SDXL-Turbo  |
| -------- | ---------- | ------------ | -------------- | ----------- |
| 图像质量     | ⭐⭐⭐        | ⭐⭐⭐⭐         | ⭐⭐⭐⭐⭐          | ⭐⭐⭐⭐（高速）    |
| 细节表现     | 一般         | 较好           | 极佳（更拟真）        | 较好          |
| 理解复杂提示词  | 一般         | 良好（OpenCLIP） | 极佳             | 一般          |
| 支持大分辨率   | 512x512 为佳 | 768x768 为佳   | 原生支持 1024x1024 | 同上          |
| 推理速度     | 较慢         | 较慢           | 更慢             | **非常快（实时）** |
| 视频/连续帧生成 | ❌          | ❌            | ❌              | ✅（适合短视频）    |

### Midjourney
大概讲讲，主要的风格及应用方向等

### recraft
大模型竞技场上，还有一个叫做Recraft V3模型，一出场就技压群雄，生图质量将Midjorrney、ideogram、FLUX等一众明星模型，按在地上摩擦，成为当下时刻全球评分NO.1

#### 默认的提示词
Portrait of a young woman, shot in shadows, with a vertical beam of light projected onto her eye
年轻女子肖像，拍摄于阴影中，一道垂直光束投射在她的眼睛上。
![](../../static/docs/Pasted%20image%2020250415145810.png)
![](../../static/docs/Pasted%20image%2020250415145822.png)


#### 使用
选择生图模式
![](../../static/docs/Pasted%20image%2020250415150304.png)

选择生图模型，输入提示词
![](../../static/docs/Pasted%20image%2020250415152336.png)

套索圈选眼部区域微调，补充提示词：戴上眼镜，用模糊的眼睛看着阳光
![](../../static/docs/Pasted%20image%2020250415153123.png)

![](../../static/docs/Pasted%20image%2020250415153250.png)

支持多种生图模型：照片风格类、素材类、艺术类、图标类

### ideogram

### PixAI XL
丰富生动的二次元画图模型
专攻二次元风格，为动漫与游戏设计带来生动创意，适合特定领域创新。
AI绘画现在商用还是吃力，大多还是玩玩看，或者用于个人项目


## 视频生成

### pika
由两位华人女博士创立，主打动画风格的文本生成视频工具，在2024年11月发布的Pika 1.0版本在社交媒体上迅速走红。
[Pika](https://pika.art/)
![](../../static/docs/Pasted%20image%2020250414111720.png)
![](../../static/docs/Pasted%20image%2020250414111750.png)


### runway

[Runway | Tools for human imagination.](https://runwayml.com/)
提供Gen-1、Gen-2和Gen-3、Gen-4等视频生成模型，支持从文本、图像或视频片段生成新视频，被用于电影《瞬息全宇宙》的特效制作。

真实度：5星

#### 白嫖体验
体验额度：免费账号有固定的100
限定模型： 四星 Gen4
排队：快 五星


### 可灵
[可灵 AI - 新一代 AI 创意生产力平台](https://www.klingai.com/cn/)
国产，快手
#### 创作方式
- 运动笔刷， 选中图片运动主体并绘制运动轨迹，即可让图片根据你期望的轨迹动起来
- 首尾帧，定义首帧和尾帧，即可生成衔接自然的创意视频
- 多图参考，上传 1-4 张参考图，框选希望参考的人物、物品、道具、场景，描述它们之间的变化或互动，模型将为你创造性地生成视频。

### flux
[Flux AI - 免费的在线高级Flux 1.1 AI图像生成器](https://flux-ai.io/cn/)


### Viggle
提供100多种动态动作模版，支持人物动作精准控制的免费AI生成视频工具
[Viggle AI](https://viggle.ai/home)

### 海螺
[海螺视频：每个想法都是一部大片](https://hailuoai.com/video)

免费体验：
体验额度：每天会发放100额度，每天重置
限定模型： 不限定 五星
排队：快 五星

