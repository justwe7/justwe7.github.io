越来越多用户不再去搜索引擎里翻链接列表，而是直接问 ChatGPT、Perplexity 或者 Google 的 AI Overview："这个问题的答案是什么"。这些产品返回的不是十条蓝色链接，而是一段综合过的答案，用户往往看完这段话就走了，根本不会点进原始网页。

这意味着，就算一篇内容在传统搜索引擎里排名第一，只要它没有被 AI 引擎"检索到并引用"，它在这个新场景里就等于不存在。GEO（Generative Engine Optimization，生成式引擎优化）要解决的正是这个问题：如何让内容更容易被生成式答案引擎检索、引用、复述。

---

## 一、GEO 是什么

GEO 是 SEO 在生成式 AI 时代的延伸：SEO 优化的是"如何让页面在搜索结果列表里排名靠前"，GEO 优化的是"如何让内容被 AI 生成的答案引用或复述"。两者的目标用户行为完全不同——SEO 假设用户会点击链接自己阅读，GEO 假设用户只看 AI 给出的那段综合答案。

| 维度 | 传统 SEO | GEO |
| --- | --- | --- |
| 优化目标 | 页面在搜索结果列表中的排名 | 内容被 AI 答案引用/复述的概率 |
| 评估指标 | 点击率、排名位置、跳出率 | 引用率、提及率、答案中出现的比例 |
| 内容形态 | 关键词密度、标题标签、反向链接 | 结构化直接答案、可独立成段的语义单元 |
| 底层机制 | 爬虫抓取 + 倒排索引 + 链接权重 | 检索增强生成（RAG）+ 预训练语料 |
| 可控性 | 有成熟工具链（Search Console 等） | 缺乏统一监测工具，依赖抽样测试 |

需要说明的是，GEO 并不是要取代 SEO——很多 AI 答案引擎（比如 Perplexity、Bing Copilot）本质上还是先做网页检索，再把检索结果喂给大模型，所以页面本身能不能被搜到，SEO 那一套基本功依然有效。GEO 是在这之上多了一层要求：即使被搜到了，内容是否"长得让 AI 愿意引用"。

---

## 二、工作原理：内容如何被 AI 引擎检索并引用

内容被生成式答案引擎"看到"，主要通过两条路径，理解这两条路径是理解 GEO 能做什么、不能做什么的关键。

**第一条路径：预训练语料吸收。** 大模型在预训练阶段读过互联网上的大量文本，如果你的内容当时被抓取并进入了训练语料，模型可能在没有联网检索的情况下"记住"了它。这条路径反馈周期极长（要等下一次模型训练/更新），内容创作者几乎无法在短期内验证或干预，因此不是 GEO 的主要发力点。

**第二条路径：实时检索增强（RAG）。** 这是当前主流答案引擎（Perplexity、Bing Copilot、Google AI Overview 等）的工作方式，也是 GEO 真正能影响的环节。整个链路大致是：

```
用户提问
  → 引擎做网络检索/向量检索，找到一批候选文档
  → 把候选文档中相关的片段拼接成上下文
  → LLM 基于这些片段生成答案，并标注引用来源
```

这条链路里有两个关键的"卡点"，决定了一篇内容最终会不会出现在答案里：

1. **能不能被检索到**：候选文档是通过关键词匹配或向量相似度召回的，如果内容的表述方式和用户提问的语义相差太远，哪怕内容本身质量很高，也可能连候选集都进不去。
2. **被检索到之后能不能被直接引用**：LLM 生成答案时倾向于摘取那些"自成一体、观点清晰、带具体数据或表述"的片段。如果一段内容需要读者结合上下文才能看懂，或者论述绕来绕去才给出结论，LLM 很可能宁愿自己转述大意，也不会原样引用它。

GEO 的实操，本质上就是围绕这两个卡点做内容调整：让内容在语义上更贴近用户会怎么提问，同时让关键结论以"可以被单独摘出来"的形式呈现。

---

## 三、真实案例

理论和 demo 之外，有两个已经发生的真实案例可以印证第二节里说的两个卡点。

**案例一：学术研究——GEO 论文的对照实验。** 普林斯顿大学团队在论文《GEO: Generative Engine Optimization》[^1] 中构建了一个包含大量真实用户提问的评测集 GEO-bench，在同一批网页内容上分别测试了多种优化手段（引用权威来源、加入具体统计数据、加入直接引语、传统关键词堆砌等），用"内容在生成式引擎答案中的可见度"作为评估指标。结果显示，加入引语和统计数据这类手段能明显提升内容被引用的概率，而传统 SEO 里常用的关键词堆砌手段在生成式引擎场景下效果有限，某些情况下反而会拖累表现。这从实验层面验证了第二节提到的"自成一体、带具体数据的片段更容易被直接引用"。

**案例二：行业现象——AI 答案引擎偏爱 Reddit。** 从 2023 年起，可以明显观察到 Google 的 AI Overview、Perplexity 等产品在回答生活类、经验类问题时，高频引用 Reddit 上的帖子和跟帖。原因和 Reddit 内容的天然结构有关：帖子标题本身就是一个提问句，和用户搜索的 query 高度同构；热门回复通常直接给结论、带个人经验和具体数字；楼层式结构天然就是一个个可以独立摘出来的语义片段。这个现象后来也在商业层面得到了印证——2024 年初 Google 与 Reddit 签订了官方数据授权协议，将 Reddit 内容纳入其数据管道用于训练和检索场景[^2]。这个案例说明，"结构化、直接问答式"的内容优势不只是理论推演，已经在真实产品的引用偏好上体现出来。

这两个案例合在一起，可以作为第四节"内容层面实操建议"的依据来源，而不是凭空猜测的经验之谈。

---

## 四、最小可行 Demo：验证内容结构如何影响被引用概率

不需要接入真实的 Perplexity 或 ChatGPT 后台，也能在本地用一个最小的 RAG 流程，直观感受"内容写法"是如何影响上面提到的两个卡点的。

Demo 的思路很简单：准备同一主题的两个版本——一个是传统 SEO 风格（大段叙述、结论藏在文字中间），一个是 GEO 风格（开头直接给结论、结构清晰、带具体数字）。然后模拟检索环节，看哪个版本和用户提问的相似度更高、更容易被摘取。

### 1. 环境准备

只需要一个开源的本地 embedding 模型，不依赖任何付费 API：

```bash
pip install sentence-transformers
```

### 2. 准备两版对照内容

```python
# seo_style.py 中的示例文本

article_seo = """
在如今这个信息爆炸的时代，很多企业都在思考如何提升自己在网络世界中的
存在感。搜索引擎优化作为一种历史悠久的方法，一直以来都受到广泛关注，
不同的团队采用了各种各样的手段来尝试提升自己网站的表现，其中就包括对
页面加载速度进行持续的打磨和优化。
"""

article_geo = """
页面加载速度每提升 1 秒，转化率平均提升约 7%（数据来源见文末）。
提升方法：压缩图片体积、启用 CDN、延迟加载非首屏资源。
"""
```

两段话讲的是同一件事（页面加载速度影响转化率），但 SEO 版本把结论埋在长段落末尾，GEO 版本开头就是可以直接摘出来的结论句 + 具体数字。

### 3. 计算与用户提问的相似度

```python
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("all-MiniLM-L6-v2")

query = "页面加载速度对转化率有什么影响"

emb_query = model.encode(query, convert_to_tensor=True)
emb_seo = model.encode(article_seo, convert_to_tensor=True)
emb_geo = model.encode(article_geo, convert_to_tensor=True)

print("SEO 风格相似度:", util.cos_sim(emb_query, emb_seo).item())
print("GEO 风格相似度:", util.cos_sim(emb_query, emb_geo).item())
```

多次运行会发现，GEO 风格版本的相似度分数普遍更高——因为它的表述方式和用户提问的语义结构更接近（都是"XX 对 YY 的影响是 ZZ"这种直接因果表达），这正对应第二节里提到的第一个卡点："能不能被检索到"。

### 4.（可选进阶）验证是否被 LLM 引用

如果有 OpenAI（或其他）API Key，可以再加一步，把两段候选内容都喂给 LLM，看它组织答案时更倾向引用谁：

```python
from openai import OpenAI

client = OpenAI()

prompt = f"""
基于以下两段资料回答用户问题，并说明引用了哪一段资料。

资料一：{article_seo}
资料二：{article_geo}

用户问题：{query}
"""

resp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt}],
)
print(resp.choices[0].message.content)
```

多次测试通常会观察到，LLM 更倾向于直接摘录 GEO 版本里的数字和结论句，而对 SEO 版本大多只做泛泛转述，很少逐字引用。这对应第二节的第二个卡点："被检索到之后能不能被直接引用"。

> 这个 demo 只是用简化的方式复现 RAG 的检索环节，真实的答案引擎在召回、排序、去重、引用标注上要复杂得多，结果仅供直观感受趋势，不能等同于真实引擎的表现。

### 5. 把 Demo 上线为一个可访问的 GEO 评估服务

前面的脚本只能在本机跑一次，无法让编辑、运营或 CI 重复调用。要把它变成可上线的最小服务，目标应该收窄为：**输入用户问题和若干内容候选片段，返回它们对该问题的语义检索排序**。这可以用来发现“哪一段不够直接、不能进入候选集”，但它不是 Perplexity、ChatGPT 或 Google AI Overview 的真实引用预测器。

这里选择 `FastAPI + Docker + Cloud Run`：`sentence-transformers` 模型不适合 Edge Runtime，容器更容易固定 Python 依赖与模型版本；Cloud Run 则负责 HTTPS、弹性实例和版本化部署。[^3]

#### 服务目录

新建一个独立目录：

```text
geo-score-api/
├── app/
│   └── main.py
├── requirements.txt
├── Dockerfile
└── .dockerignore
```

`requirements.txt`：

```text
fastapi[standard]
sentence-transformers
```

`app/main.py`：

```python
from contextlib import asynccontextmanager
from typing import Any

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from sentence_transformers import SentenceTransformer

MODEL_NAME = "all-MiniLM-L6-v2"
model: SentenceTransformer | None = None


class ScoreRequest(BaseModel):
    query: str = Field(min_length=2, max_length=500)
    candidates: list[str] = Field(min_length=2, max_length=8)


@asynccontextmanager
async def lifespan(_: FastAPI):
    global model
    model = SentenceTransformer(MODEL_NAME)
    yield


app = FastAPI(
    title="GEO retrieval score API",
    version="0.1.0",
    lifespan=lifespan,
)


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok", "model": MODEL_NAME}


@app.post("/v1/retrieval-score")
def retrieval_score(payload: ScoreRequest) -> dict[str, Any]:
    if model is None:
        raise HTTPException(status_code=503, detail="model is still loading")

    # 归一化后点积等于余弦相似度，分数只用于同一请求内的候选排序。
    embeddings = model.encode(
        [payload.query, *payload.candidates],
        normalize_embeddings=True,
    )
    query_embedding = embeddings[0]
    candidate_embeddings = embeddings[1:]

    ranking = [
        {"rank": index + 1, "content": content, "score": round(float(score), 4)}
        for index, (content, score) in enumerate(
            sorted(
                zip(payload.candidates, candidate_embeddings @ query_embedding),
                key=lambda item: item[1],
                reverse=True,
            )
        )
    ]

    return {"query": payload.query, "model": MODEL_NAME, "ranking": ranking}
```

这个 API 故意只接收文本，而不接收任意 URL。让服务端主动抓取用户提交的 URL 会引入 SSRF、内网探测、版权和抓取频率等问题；第一版应由调用方先提取、清洗内容，再把片段传给服务。

#### 容器化并在本地验收

`Dockerfile`：

```dockerfile
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    HF_HOME=/opt/huggingface

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY app ./app

# 构建镜像时下载模型，避免每次冷启动再联网下载。
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
```

`.dockerignore`：

```text
__pycache__/
.venv/
.git/
*.pyc
```

在 `geo-score-api/` 中构建并启动：

```bash
docker build -t geo-score-api:local .
docker run --rm -p 8080:8080 geo-score-api:local
```

另开一个终端验收接口：

```bash
curl http://127.0.0.1:8080/healthz

curl -X POST http://127.0.0.1:8080/v1/retrieval-score \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "页面加载速度对转化率有什么影响",
    "candidates": [
      "企业应持续优化网站表现和页面加载速度。",
      "页面加载速度每提升 1 秒，转化率平均提升约 7%；可通过压缩图片、CDN 和延迟加载优化。"
    ]
  }'
```

预期是第二段排在第一位。服务启动后还可以访问 `http://127.0.0.1:8080/docs`，用 FastAPI 自动生成的 Swagger UI 手动测试接口。

#### 部署到 Cloud Run

以下示例使用 Google Cloud 的 Artifact Registry 存储镜像、Cloud Build 构建镜像、Cloud Run 提供公开 HTTPS 服务。首次部署前，需要本机已经安装并登录 `gcloud`，并拥有对应 Google Cloud 项目的部署权限。区域要按目标用户位置、预算和合规要求选择；示例使用 `asia-northeast1`。[^4]

```bash
# 首次配置：替换为自己的项目 ID
export PROJECT_ID='your-gcp-project-id'
export REGION='asia-northeast1'
export REPOSITORY='geo'
export IMAGE="$REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/geo-score-api:v0.1.0"

gcloud config set project "$PROJECT_ID"
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

# 每个区域只需创建一次 Docker 制品仓库
gcloud artifacts repositories create "$REPOSITORY" \
  --repository-format=docker \
  --location="$REGION"

# 在云端构建镜像，再部署为 Cloud Run 服务
gcloud builds submit --tag "$IMAGE"
gcloud run deploy geo-score-api \
  --image "$IMAGE" \
  --region "$REGION" \
  --allow-unauthenticated \
  --port 8080 \
  --memory 2Gi \
  --cpu 1 \
  --min 1 \
  --max 3
```

部署成功后，命令会输出服务 URL。用它替换本地地址再跑一次 `healthz` 和 `retrieval-score` 请求：

```bash
export SERVICE_URL='https://geo-score-api-xxxxx-xx.a.run.app'
curl "$SERVICE_URL/healthz"
```

`--min 1` 能避免模型服务在完全缩容后出现第一次请求很慢的冷启动，但会产生持续费用；若只是内部试用或演示，可以改为 `--min 0`。`--allow-unauthenticated` 适合公开 Demo；如果服务只供编辑后台或 CI 使用，应移除它，并通过 IAM、API Gateway 或自有鉴权保护接口。

#### 上线后还缺什么

可访问 URL 只是服务上线的开始。要让它可以长期使用，还至少要补四件事：

1. **限流与鉴权**：公开接口至少按 IP 或 API Key 限流，避免被批量调用耗尽推理资源。
2. **可观测性**：记录请求耗时、模型加载时间、4xx/5xx、候选数量和版本号；不要默认记录完整内容正文，避免把用户数据写入日志。
3. **评测集**：维护一组固定问题和已知优质/劣质内容，每次升级模型或改 chunk 策略时回归比较排序是否退化。
4. **内容发布链路**：把编辑后的页面、FAQ、结构化数据、站点地图和 robots 规则正常部署到公开域名；这个评分 API 只能帮助诊断内容，不能替代让内容本身被爬虫访问。

---

## 五、内容层面的实操建议

结合上面两个卡点，把 GEO 的内容调整落到具体可执行的动作上：

- **开头直接给结论**：把"是什么/结论/答案"放在段落最前面，不要先做长篇铺垫再揭晓结果。
- **用结构化排版组织内容**：标题、列表、表格比大段叙述更容易被切块（chunk）和抽取。
- **提供具体数据和来源**：带明确数字、统计和引用来源的表述，比模糊的定性描述更容易被直接摘录。
- **让每个段落语义自洽**：一段话单独拿出来也要能看懂，不要依赖"接上文"才能理解，因为检索召回的是片段，不是整篇文章。
- **覆盖长尾问题，采用 FAQ 式表达**：用户对 AI 提问的方式更接近自然语言提问，而不是关键词堆砌，内容里直接覆盖这些问句形式的表述会更容易匹配。
- **确认 AI 爬虫可以抓取内容**：检查 `robots.txt` 是否放行 `GPTBot`、`ClaudeBot`、`PerplexityBot`、`Google-Extended` 等 AI 爬虫的 User-Agent，如果历史上因为防爬把它们也拦掉了，内容再好也进不了候选集。

---

## 六、适用边界与代价

GEO 目前还没有像 Google Search Console 那样官方、统一的效果监测工具，只能通过第三方模拟测试或人工抽样提问来估算效果，量化难度明显高于传统 SEO。

为了迎合"可被直接摘录"的要求，内容会更倾向于短句、直给结论，这在一定程度上会牺牲长文的叙事节奏和阅读深度，需要根据内容定位权衡——纯知识科普类内容适合往 GEO 风格靠，强调阅读体验和观点铺陈的深度文章则不必为了 GEO 牺牲行文风格。

另外，不同答案引擎的机制差异很大：Perplexity、Bing Copilot 这类以实时检索为主的产品，GEO 手段能较快看到效果；而依赖预训练语料的部分能力（比如模型"记住"的知识），内容创作者短期内几乎无法干预，这部分只能等待模型下一次训练更新。

---

## 七、实践建议

如果想在实际内容里落地 GEO，建议先挑 1-2 篇高流量页面做小范围 A/B 改造（加结论前置、加数据来源、改 FAQ 结构），然后用本文 Demo 里的检索相似度方法或直接向几个主流 AI 引擎提问做抽样验证，再决定是否推广到更多内容，而不是一次性改写整站。

---

## 参考资料

[^1]: Aggarwal, P., Murahari, V., Rajpurohit, T., Kalyan, A., Narasimhan, K., Deshpande, A. — *GEO: Generative Engine Optimization*（2024），提出 GEO-bench 评测集，对比多种内容优化手段对生成式引擎引用率的影响。
[^2]: 2024 年初 Google 与 Reddit 达成数据授权合作的公开报道，Reddit 内容被纳入 Google 的数据管道用于训练与检索场景。
[^3]: FastAPI — [FastAPI in Containers - Docker](https://fastapi.tiangolo.com/deployment/docker/) · FastAPI 文档。
[^4]: Google Cloud — [Deploy container images to Cloud Run services](https://docs.cloud.google.com/run/docs/deploying)；[Build sources to containers](https://docs.cloud.google.com/run/docs/building/containers) · Google Cloud 文档。
