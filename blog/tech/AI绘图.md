AI绘画属于AIGC中的一项应用场景，目前常见的绘画产品有：Midjourney、Stable Diffusion、DALL·E、Novel AI（二次元风格），最新的Midjourney和DALLE付费用户生成出的图像是有使用版权的。

## Midjourney
**它都能做什么？**
- 文生图(给一段文字生成图片)
- 图生图(垫图，参考图片风格绘制新的图像)
- 图生文(将喜欢的图片拆分为AI能够识别的文字进行二次创作)
- 融图(把我的脸和彭于晏的身体合成)

官方教程中，最简单的Prompt结构就是一段文本描述：
![image.png](https://s2.loli.net/2024/01/05/w3ZC1lHhiXKagRs.png)

以下是官方解释：
> Prompt是一个简短的文本短语，Midjourney Bot 会解释该短语以生成图像。Midjourney Bot 将提示中的单词和短语分解为更小的部分，称为标记，可以与其训练数据进行比较，然后用于生成图像。准确的Prompt可以帮助制作独特而令人兴奋的图像。

使用 Prompt 快速生成一张图片: 
> The cat sleeping at the entrance of the coffee shop.  (在咖啡店门口睡觉的猫)
![image.png](https://s2.loli.net/2024/01/11/o6wAYZg3SUntE49.png)

### Prompt实践
> Midjourney不理解语法、句子结构或人类一样的词汇。词语选择也很重要。在许多情况下，更具体的同义词效果更好。不要使用"大"，尝试使用"巨大"、"庞大"或"极大"。在可能的情况下删除词语。较少的词语意味着每个词语都具有更强大的影响力。使用逗号、括号和连字符来帮助组织思维，但要知道mj Bot可能不会可靠地解释它们。mj Bot不考虑大写。

进阶版的Prompt：
![image.png](https://s2.loli.net/2024/01/03/FO8skIcnBjYvuiN.png)


简单说，Midjourney 机器人最适合使用简单、简短的句子来描述您想要看到的内容。避免长串的描述。
举个例子：
> 不要说：**给我看很多盛开的加利福尼亚虞美人花的照片，让它们明亮、充满活力的橙色，并以彩色铅笔的插图风格绘制它们。**
> 请尝试：**用彩色铅笔绘制的明亮橙色加利福尼亚虞美人花。**

**重要：顺序会影响结果，越早出现的词，对结果影响越大。**

#### Image2Image（图生图）
假如有如下需求：
- 喜欢的图片，但没有版权，需要付费
- 图片大体符合需求，细节需要微调

以下图实践一下
![](https://res.craft.do/user/full/d845172f-becd-4255-bf79-d722098b2d83/doc/15EA26B6-9B49-4076-B8D8-DFE53ABD52C8/ABFCBA68-C353-43B5-B0D8-EB8CA8B93718_2/DOoxcVSfiXgkl66z77M8vPNbxQSbpXzBTPEh7I5FFWkz/MJ019.jpeg)

我们只需以 Image Prompt + Text Prompt 就可以修改掉之前的图像：
> `图片链接` + `one Afican-American hand and one Asian woman hand`(一只非洲裔美国人的手和一只亚洲女人的手)
![](https://res.craft.do/user/full/d845172f-becd-4255-bf79-d722098b2d83/doc/15EA26B6-9B49-4076-B8D8-DFE53ABD52C8/B9BD4D78-6C58-4A4A-8433-9D562A949CBB_2/xb58eLg0qFxYh6JyyMs4HpXvI1oFxcWfDDXi70zpY1Az/MJ162.png)

#### 文生图的常见注意事项

##### 语法
prompt 不是越长越好。特别是各种定语从句，它根本就不懂，还不如把指令用逗号隔开，一个个输入。

官方的语法建议：
- 使用形容词+名词的词序来替换介词短语。
    - hair flowing in the wind 应该改为 flowing hair
    - a carrot for a nose 应该改为 carrot nose
- 使用非常具体的动词来替换介词短语。
    - a girl with a flashlight 应该改为 a girl using a flashlight
    - a girl with a big smile on her face 应该改为 smiling girl
##### 单词
在单词的部分，Midjourney 跟 ChatGPT 有点类似，它对同义词的理解也不是很好。比如举两个例子：
1. big （大）这个词，到底指多大？越具象的大，对于 Midjourney 来说，效果越好，比如用 gigantic 就比用通用的 big 好。
2. cats（猫）这个词是个复数，但到底是多少只？对于 Midjourney 来说，two cats（两只猫）比 cats 更明确。

##### 明确需求
**考虑哪些细节重要**，因为图像信息的信息量远超过文字，所以很多时候，Midjourney 会随机填充一些内容给你，它既是缺陷，也是亮点功能。如果你想减少这些随机性，就需要用到一些 prompt 框架（或者所谓的模板）
自然语言支持不太好，使用标准的Prompt（咒语）格式生成效果更佳。

**关键词的常用结构是：主题+环境+构图+风格+图像设定**

尽量明确您重要的任何上下文或细节。考虑以下内容：
- **主题**：人物，动物，角色，地点，物体等。  
- **媒介**：照片，绘画，插图，雕塑，涂鸦，挂毯等。  
- **环境**：室内，户外，月球上，纳尼亚，水下，翡翠城等。  
- **照明**：柔和，环境，阴天，霓虹，工作室灯等。  
- **颜色**：充满活力，柔和，明亮，单色，多彩，黑白，淡彩等。  
- **情绪**：宁静，平静，喧闹，充满活力等。  
- **构图**：肖像，特写，特写，鸟瞰视角等。
##### 实践一下
the owner's orange cat is stretching, In the coffee shop, indoors, afternoon, cloudy (在咖啡店内，店主养的橘猫正在伸懒腰，室内，下午，阴天)
![image.png](https://s2.loli.net/2024/01/11/Mr5adwKvUhYgCLc.png)

the owner's orange cat is stretching on the sofa, In the coffee shop, Indoors, afternoon, cloudy day(在咖啡店内，店主养的橘猫正在**沙发上**伸懒腰，室内，下午，阴天)
指名了沙发，你不说，模型就会随机给你
![image.png](https://s2.loli.net/2024/01/11/FmKSh4VfMCnuER9.png)

**翻车示例：** 下面两个Prompt属于Midjourney生成翻车的示例，对应的不翻车版本可以后面的章节看DALL·E生成的（DALLE更像个听话的孩子，Midjourney更喜欢按它自己的思路做一些“创造”）

the owner's orange cat is stretching on the sofa, In the coffee shop, indoors, there are two guests chatting happily in the afternoon, cloudy day (在咖啡店内，店主养的橘猫正在沙发上伸懒腰，室内，**旁边有两个客人在开心的聊天**，下午，阴天)
![image.png](https://s2.loli.net/2024/01/28/VxU19REi2cKqzOg.png)

the owner's orange cat is stretching on the sofa, In the coffee shop, Indoors, afternoon, cloudy day, Cyberpunk (在咖啡店内，店主养的橘猫正在沙发上伸懒腰，室内，旁边有两个客人在开心的聊天，下午，阴天，**赛博朋克**)
![image.png](https://s2.loli.net/2024/01/28/BTOFjZbVe6aNnAk.png)

#### 总结
![image.png](https://s2.loli.net/2024/01/06/ts1BWdnEF4ouKeJ.png)

### 实战插画
企业插画的魔法公式，主要基于关键词Corporate Flat Illustration（企业平面插画）构成，再结合常用的设计风格，比如孟菲斯风格，线条艺术，等距视图等关键词辅助，然后根据产品需求，融合插画色彩等组成
企业插画魔法公式：
> 公式：Corporate Flat Illustration  + 主题＋色彩 + 风格参考
> 
> 魔法词：Corporate Flat Hllustration
> 辅助词：corporate memphis style（孟菲斯风格），Business Style Illustration（商业风格插画），Boho Watercolor（波西米亚水彩画），Cottagecore （Cottagecore公司），Ethereal lllustration（空灵的插图），Innovative Design Aesthetics（创新设计美学），Verdadism（维达主义），Line Art （线条艺术），Danish Design（丹麦设计），MatissePoster（马蒂斯海报），Animation Style（动画风格），Isometric Illustration（等距插图），Isometric Data Visualization（等距数据可视化），Isometric Figures（等距数字），white background（白色背景），dreamy color palette（梦幻色调），with charts（用图表），simple and clean（简单干净），light color（浅色），Teamwork concept（团队合作），minimalist （极简主义），website（网页）

#### 扁平化风格
> 办公室职员站在仪表板前的平面插图，图表，蓝色和青色，渐变
> Flat illustration of a office worker standing in front of a dashboard with chart, blue and cyan, gradient --niji 5 --aspect 1:1 --stylize 50 --quality 1 --chaos 0 --style original
![image.png](https://s2.loli.net/2024/01/18/huHoWNdlGIUPBr5.png)

#### 插画
> 一个贪婪的年轻人拿着金币快乐地奔跑，蓝色和金色的企业扁平图案。
> A greedy youth running happily with gold coins, Corporate Flat Hllustration, in blue and gold. --niji 5 --aspect 1:1 --stylize 50 --quality 1 --chaos 0 --style original
![image.png](https://s2.loli.net/2024/01/18/kaYH5q1tMnbyWiJ.png)

这里有一篇[插画实战](https://www.sohu.com/a/700420548_121124379)的文章，有更多的例子

### 相关网站推荐
- [设计师的 Midjourney 入门真保姆级教程 - 知乎](https://zhuanlan.zhihu.com/p/617025808)
- MJ艺术样式数据库 -[Homepage - lib.KALOS.art](https://lib.kalos.art/)
- AIGC周刊 - [Site Unreachable](https://quail.ink/op7418/)
- AIGC Prompt编辑器 - [GitHub - Moonvy/OpenPromptStudio: 🥣 AIGC 提示词可视化编辑器 | OPS | Open Prompt Studio](https://github.com/Moonvy/OpenPromptStudio)
- MJ 知识库 - [📌 MJ 内容索引](https://tob-design.yuque.com/kxcufk/mj/index)

## DALL·E3
支持自然语言，不需要像Midjourney那样需要特殊的咒语。得益于chatgpt，可以将我们的白话文描述转为DALLE的Prompt。**对新手更友好**

#### 与Midjourney同样的提示词做对比
刚刚mj的示例交给DALLE再生成一遍，但是**只给他中文的描述**：

（一）在咖啡店门口睡觉的猫
![image.png](https://s2.loli.net/2024/01/05/LSCo1t7IVkRrBEl.png)

（二）在咖啡店内，店主养的橘猫正在伸懒腰，室内，下午，阴天
![image.png](https://s2.loli.net/2024/01/05/1pOHgl3aYhxIkrN.png)

（三）在咖啡店内，店主养的橘猫正在**沙发上**伸懒腰，室内，下午，阴天
**你不说，模型就会随机给你**
![image.png](https://s2.loli.net/2024/01/05/sI5UPaE1pHR4heB.png)
（四）在咖啡店内，店主养的橘猫正在沙发上伸懒腰，室内，**旁边有两个客人在开心的聊天**，下午，阴天
![image.png](https://s2.loli.net/2024/01/05/3BYzG6kE48brXIL.png)

（五）在咖啡店内，店主养的橘猫正在沙发上伸懒腰，室内，旁边有两个客人在开心的聊天，下午，阴天，**赛博朋克**
![image.png](https://s2.loli.net/2024/01/05/2934XfpPHxguISK.png)

## 总结
目前只对更主流的Mj和DALLE进行了调研，Stable Diffusion只是浅尝辄止，只用别人的模型玩过，而且难度比另外两个更高。下面是之前用sd生成的图像：
![](../../static/docs/Pasted%20image%2020240201123112.png)
Stable Diffusion可以在本地部署生成图像，其它的产品在线使用更方便，个人感觉它的上限应该会更高，但也更难控制。

AI生成的图像对语言的处理能力有限，尤其是中文会出现各种乱码。如果应用在工作设计中，个人理解，正确的工作流应该是：
1. AI生成想要的插图起手，作为素材；
2. AI生成合适的背景，作为素材；
3. 挑选生成想要的艺术字，作为素材。可以用一些免费商业授权的字体，也可以试试阿里的绘图大模型[通义万相\_AI创意作画\_AI绘画\_人工智能-阿里云](https://tongyi.aliyun.com/wanxiang/)看下效果；
4. 将以上三个素材在自己合成为完整的图像。
这里有一个完整的视频例子来实现海报banner[【MJ辅助B端】仅需6步，轻松设计商业banner图\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1ZM4y1H7cx/?spm_id_from=333.999.0.0&vd_source=1b521ffc97529ec801ca0ad47f6233b3)

真正用在工作中的话，还需要考虑：
- 设计一致性，一个产品应该有一套完整的设计语言。AI的话就需要自己整理一套Prompt规范来控制；
- AI不可控，所以很容易翻车，需要不断尝试
- 版权问题
