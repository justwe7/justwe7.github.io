# 自定义 Claude Code 状态栏：额度、context 与花费监控

## 一、这个状态栏能看到什么

最后做出来的效果是这样一行,常驻在 Claude Code 界面最下面:

```text
Sonnet 5 xhigh · 5h 24% (15:31) · week -- · ctx 8% · $0.12 · cache 91%
```

![](../../static/docs/Pasted%20image%2020260926143940.png)
从左到右依次是:当前模型和 reasoning effort、5 小时滚动额度用量和重置时间、周额度用量和重置时间、context 占用百分比、这个 session 花了多少钱、prompt cache 命中率。不用等额度触发警告才知道自己用了多少,也不用手动敲 `/status` 查,眼睛扫一下最下面就知道现在处在什么状态。

这篇记录写的是这行状态栏怎么做出来的:statusLine 这套机制本身是什么原理、能拿到哪些数据、脚本怎么写、中途踩了哪些坑。

## 二、statusLine 到底是什么机制

Claude Code 的状态栏不是内置的固定展示,而是一个可以自己接管的挂载点。原理很直接:在 `settings.json` 里配一个 `command`,Claude Code 负责在合适的时机把当前会话状态打成一份 JSON,通过 stdin 喂给这个命令,再把命令的 stdout 原样渲染到界面最下面那一行。

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh"
  }
}
```

保存这个文件之后不用重启 Claude Code,官方文档写得很明确:「Claude Code reloads settings automatically and runs your script as soon as you save the file」——改完脚本或者改完配置,下一次刷新就直接生效。

刷新时机是事件驱动的:用户输入、工具调用、终端 resize 等动作都会触发一次,而且有 300ms 的防抖,短时间内的连续变化会合并成一次执行。如果状态栏里有跟时间强相关、需要在空闲时也持续跳动的内容(比如一个实时时钟),光靠事件驱动是不够的,官方给了一个 `refreshInterval` 字段,可以按固定秒数强制再跑一次——这个我后面会提到,一开始加了又删掉了。

有一个容易踩的坑是宽度检测。我最开始想把状态栏做成靠右对齐,直觉是用 `tput cols` 拿终端宽度,结果发现读不出来。查文档才明白原因:Claude Code 把脚本的 stdout **截获**了,不是直接接在真实终端上,所以脚本视角里根本没有一个真正的 tty,`tput cols` 和大多数语言里读终端宽度的 API 在这个执行环境下全部失效。正确做法是读 `COLUMNS` 和 `LINES` 这两个环境变量——文档原话是「Claude Code sets these to the current terminal dimensions before running your script」,它会在跑脚本之前把真实终端尺寸塞进这两个环境变量里,这是唯一可靠的取法。

## 三、输入 JSON 里能拿到什么

脚本收到的 JSON 里字段很多,这里只讲这次实际用到的几个。完整字段表只有官方文档( `code.claude.com/docs/en/statusline` )是准的,字段会随版本增减,没必要死记,知道去哪查、以及怎么应对字段缺失,比背字段名更重要。

**额度:`rate_limits.five_hour` / `rate_limits.seven_day`**

```json
"rate_limits": {
  "five_hour": { "used_percentage": 23.5, "resets_at": 1738425600 },
  "seven_day": { "used_percentage": 41.2, "resets_at": 1738857600 }
}
```

`used_percentage` 是 0 到 100 的用量百分比,`resets_at` 是 Unix 时间戳,标记这个窗口什么时候重置。这个字段只有 Pro/Max 订阅、并且当前会话已经发生过至少一次 API 响应之后才会出现——刚开一个新会话、还没发过一条消息的时候,`rate_limits` 整个对象都不存在。而且 `five_hour` 和 `seven_day` 是各自独立的,可能一个有一个没有;`resets_at` 时间点一过,Claude Code 会自动把那个窗口从 JSON 里摘掉。所以脚本里全程用 jq 的 `// empty` 兜底,取不到就当空值处理,不能假设这两个字段一定存在。

**context 占用:`context_window.used_percentage`**

```json
"context_window": {
  "total_input_tokens": 15500,
  "used_percentage": 8,
  "current_usage": {
    "input_tokens": 8500,
    "cache_creation_input_tokens": 5000,
    "cache_read_input_tokens": 2000,
    "output_tokens": 1200
  }
}
```

这个百分比的计算口径是 `input_tokens + cache_creation_input_tokens + cache_read_input_tokens`,**不包含** `output_tokens`。另外 `current_usage` 在两种情况下会是 `null`:一是会话刚开始、还没发生过第一次 API 调用,二是执行了 `/compact` 之后、直到下一次 API 调用重新填充之前。

**模型和 reasoning effort:`model.display_name` / `effort.level`**

`effort.level` 只有在当前模型支持 reasoning effort 这个参数时才会出现,比如 `high`、`xhigh`。不支持的模型这个字段直接不存在,脚本里判断一下有没有就行,不用单独处理"空字符串"这种情况。

**花费:`cost.total_cost_usd`**

这是这次 session 累计花费,按 list price 客户端估算,`/clear` 之后会归零重新计。

**缓存命中率:`prompt_cache.hit_ratio`**

0 到 1 的浮点数,同样是主对话第一次 API 响应之后才出现。

## 四、脚本怎么写

最终版本长这样:

```bash
#!/bin/bash
input=$(cat)

five_h=$(echo "$input" | jq -r '.rate_limits.five_hour.used_percentage // empty')
five_h_reset=$(echo "$input" | jq -r '.rate_limits.five_hour.resets_at // empty')
week=$(echo "$input" | jq -r '.rate_limits.seven_day.used_percentage // empty')
week_reset=$(echo "$input" | jq -r '.rate_limits.seven_day.resets_at // empty')
ctx=$(echo "$input" | jq -r '.context_window.used_percentage // empty')
model=$(echo "$input" | jq -r '.model.display_name // empty')
effort=$(echo "$input" | jq -r '.effort.level // empty')
cost=$(echo "$input" | jq -r '.cost.total_cost_usd // empty')
hit_ratio=$(echo "$input" | jq -r '.prompt_cache.hit_ratio // empty')

RESET=$'\033[0m'
GRAY=$'\033[90m'
GREEN=$'\033[32m'
YELLOW=$'\033[33m'
RED=$'\033[31m'

color_for() {
  local val=$1
  if [ -z "$val" ]; then printf '%s' "$GRAY"; return; fi
  awk -v v="$val" 'BEGIN{exit !(v>=80)}' && { printf '%s' "$RED"; return; }
  awk -v v="$val" 'BEGIN{exit !(v>=50)}' && { printf '%s' "$YELLOW"; return; }
  printf '%s' "$GREEN"
}

fmt() {
  local label=$1 val=$2 reset=$3 datefmt=${4:-%H:%M}
  local color body
  color=$(color_for "$val")
  if [ -z "$val" ]; then
    printf "%s%s --%s" "$color" "$label" "$RESET"
    return
  fi
  body=$(printf "%s%s %.0f%%%s" "$color" "$label" "$val" "$RESET")
  if [ -n "$reset" ]; then
    body="$body $GRAY($(LC_TIME=C date -r "$reset" +"$datefmt"))$RESET"
  fi
  printf '%s' "$body"
}

line=""
if [ -n "$model" ]; then
  if [ -n "$effort" ]; then
    line="$GRAY$model $effort$RESET"
  else
    line="$GRAY$model$RESET"
  fi
fi

metrics=$(printf "%s · %s · %s" \
  "$(fmt '5h' "$five_h" "$five_h_reset" '%H:%M')" \
  "$(fmt 'week' "$week" "$week_reset" '%a %H:%M')" \
  "$(fmt 'ctx' "$ctx")")

if [ -n "$line" ]; then
  line="$line · $metrics"
else
  line="$metrics"
fi

if [ -n "$cost" ]; then
  line="$line · $GRAY\$$(printf '%.2f' "$cost")$RESET"
fi

if [ -n "$hit_ratio" ]; then
  line="$line · ${GRAY}cache $(awk -v r="$hit_ratio" 'BEGIN{printf "%.0f", r*100}')%$RESET"
fi

printf '%s' "$line"
```

逻辑分四层:

1. **取数据**:用 `jq -r '... // empty'` 把每个字段单独抽出来,取不到就是空字符串,不让脚本因为字段缺失而报错。
2. **颜色分级**:`color_for` 按百分比给颜色,小于 50 绿色、50 到 80 黄色、80 以上红色,拿不到值统一灰色。阈值是我自己拍的,没有什么权威依据,纯粹是"红色代表快满了,该悠着点"这种直觉映射。
3. **格式化单元**:`fmt` 把"标签 + 百分比 + 重置时间"封装成一个可复用的输出单元,`datefmt` 参数留了活口——5 小时窗口只需要 `%H:%M`,周窗口因为跨度是一周,多带了星期缩写 `%a`。
4. **拼接顺序**:先判断有没有 `model`,有就放最前面;中间接 5h/week/ctx 三段核心指标;最后按需追加 cost 和 cache 命中率,两个都缺失时不会留下多余的分隔符。

## 五、两个真实踩的坑

### 坑一:颜色转义码用错了引号

一开始给变量赋值写的是普通单引号:

```bash
RESET='\033[0m'
GREEN='\033[32m'
```

跑起来之后状态栏里全是字面上的反斜杠和方括号,完全没有颜色。第一反应是以为终端不支持 ANSI 颜色,或者是 Claude Code 把颜色码过滤掉了。结果发现,问题出在 bash 自己身上:普通单引号里的 `\033` 就是字面意义上的反斜杠加 `0`、`3`、`3` 四个字符,bash 根本不会把它解释成真正的 ESC 控制字节(`0x1B`)。要让 bash 把这种八进制转义翻译成实际字节,得用 ANSI-C quoting,也就是 `$'...'` 这种带 `$` 前缀的单引号:

```bash
RESET=$'\033[0m'
GREEN=$'\033[32m'
```

改完之后颜色立刻就出来了。这个坑说白了跟 Claude Code 没关系,是 bash 引号语义的基础问题,只是刚好在这次实践里第一次真正撞上。

### 坑二:`date` 拼星期缩写在中文 locale 下出乱码

给周额度加重置时间的时候,想在时间前面带上星期几,用的是 `%a`:

```bash
date -r "$reset" +"%a %H:%M"
```

单独在终端里跑这条命令,输出的是"五 18:56"这种中文星期缩写,看起来没问题——因为这台机器的 `LC_TIME` 是 `zh_CN.UTF-8`。但是把它塞进脚本里、通过 `$(...)` 命令替换去拿这个字符串再拼接到状态栏的完整输出时,结果发现输出的是一段乱码字节,而不是正常的中文字符。

当时第一反应是怀疑 `date -r` 没吃对 `resets_at` 这个 Unix 时间戳,或者是命令替换本身在处理多字节字符时出了编码问题。用 `od -c` 把脚本的原始输出扒出来看,发现问题字节确实出现在 `%a` 对应的位置,说明命令替换和时间戳解析都没错,根源就是 `LC_TIME=zh_CN.UTF-8` 输出的本地化中文星期缩写,在这条链路上(command substitution → 多层字符串拼接 → 最终 printf)没有被正确地保持住编码。

解决办法很直接,不用去改系统 locale,只在这一条 `date` 命令上临时覆盖:

```bash
LC_TIME=C date -r "$reset" +"%a %H:%M"
```

强制这条命令用 C locale 输出英文缩写(Sun、Mon...),跟用户系统的 locale 设置完全解耦,不管运行脚本的机器 `LC_TIME` 是什么,输出都是稳定的 ASCII 字符。

## 六、这行状态栏是怎么一步步改出来的

这行输出不是一次性设计好的,是边用边改出来的,记一下过程,方便以后照着这个思路继续加东西:

1. 最早版本只有三个百分比,中文标签:`5h额度 xx% / 周额度 xx% / context xx%`。
2. 改成英文标签,更紧凑:`5h xx% / week xx% / context xx%`。
3. 试过把整行往右对齐,靠读 `COLUMNS` 算宽度、拿空格填充实现——效果不稳定,后来直接删掉了,改回默认左对齐。
4. 加过一个实时跳动的时钟(`date +%H:%M:%S`),配合 `refreshInterval: 1` 让脚本每秒重跑一次。后来发现真正想要的其实是"额度什么时候重置",而不是"现在几点",时钟这个方向本身就选错了,删掉了时钟和 `refreshInterval`。
5. 换成额度重置时间:5h/week 两个窗口各自的 `resets_at`,格式化成本地时间挂在百分比后面的括号里。
6. 依次加上 session 花费(`cost.total_cost_usd`)和 prompt cache 命中率(`prompt_cache.hit_ratio`)。
7. 最后把模型名和 effort 从末尾挪到了最前面,变成现在看到的顺序。

## 七、写这类脚本的通用姿势

回头看,这次真正花时间的不是"哪个字段叫什么名字",而是两类更底层的东西:一是 shell 本身的引号语义和 locale 行为,二是 Claude Code 这个宿主环境的执行模型(stdout 被截获、没有真实 tty、事件驱动 + 防抖)。字段名可以查文档,这两类坑查不到,只能踩一次记一次。

如果之后还要往状态栏里加别的信息,建议按这个顺序走:

- 先去 `code.claude.com/docs/en/statusline` 确认这个数据在 JSON 里叫什么、出现条件是什么,不要凭记忆或者猜测字段名。
- 假设它随时可能缺失,统一用 `jq '... // empty'` 取值,脚本逻辑里对空值分支单独处理,不要假设字段一定在。
- 涉及颜色、时间格式化这类跟 shell/系统环境强相关的写法,想清楚它是不是依赖了某个隐藏前提(引号类型、locale、tty),这类前提一旦变了,坏的方式往往是安静地输出错误内容,而不是直接报错。
