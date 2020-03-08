## 地图绘制
1. 创建echarts[画布组件](地图组件代码)，组件需确保引入绘制地图相关模块、要绘制的对应区域数据信息
2. 请求疫情数据，处理为需要绘制的疫情数据，传入画布组件


### 引入地图区域数据有两种方式，以引入湖北数据为例：

- 使用 `echarts` 自带的区域数据：
  require(`echarts/map/js/province/hubei.js`)
- 使用本地的区域数据（echarts地图信息不太规范建议使用本地数据）
  1. 创建本地文件 `src/data/hubei.js`
  2. `ECharts.registerMap('湖北省', require(`@/data/hubei.js`))`
  3. hubei.js:
   ```js
   module.exports = {
    type: "FeatureCollection",
    features: [
      {
        id: "230100",
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [],
          encodeOffsets: [[128780, 46625]]
        },
        properties: {
          cp: [127.442464, 45.756967], // 控制在地图上 ’哈尔滨‘ 所展示的位置，代表经纬度
          name: "哈尔滨",
          childNum: 1
        }
      },
      ...
    ],
    UTF8Encoding: true
   ```

### 可能遇到的问题

#### 如何拿到区域数据的json信息？   
- 在 `node_modules\echarts\map\json\province` 找到对应省份的数据
- [GitHub](https://github.com/echarts-maps/echarts-china-cities-js)找到对应的json数据

### 如何定制地图某个城市的name样式（浙江省单独定制杭州市的样式）
参考[天津版定制地图](天津版定制代码)，131行，formatter方法返回 `{richKey|name}`，`name`表示在地图展示的城市名，`richKey`匹配`formatter`同级的`rich`对应key的内容样式

如果要将城市名称竖排，return城市名称以 `\n` 连接换行即可

### 地图展示色块与传入的数据不匹配？
echarts 以区域数据的 `name` 字段匹配传入的绘制数据，绘制数据`name`可能是 `杭州`，而区域绘制数据 `name` 是 `杭州市` 导致无法正确绘制

解决方式：

- 使用本地地图数据，将城市的name改为与接口匹配的name
- 地图组件，将传入的疫情数据的name改为与地图数据匹配的name
- 将引入的地图数据遍历处理，重新使用 `ECharts.registerMap(city, json)` 订阅

示例
```vue
<template>
  <div class="tianjin-map-wrapper">
    <v-chart :options="options" autoresize />
  </div>
</template>
<script type="text/ecmascript-6">
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

const mapData = require('@/data/tianjin')
ECharts.registerMap('天津', mapData)

const cityArr = [
  '和平区',
  '河东区',
  '河西区',
  '南开区',
  '红桥区',
  '河北区'
]

export default {
  components: {
    'v-chart': ECharts
  },
  props: {
    optionData: {
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      cityArr,
      options: {}
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      let rem = document.documentElement.clientWidth / 375
      ;(rem > 1.5) && (rem = 1.5)
      const getDprUnit = fz => fz * rem
      const optionData = this.optionData
      this.options = {
        title: {
          text: '天津疫情',
          textStyle: {
            color: '#2B313D',
            fontSize: getDprUnit(18)
          },
          left: '65%',
          top: '12%',
          subtext: '分布图',
          subtextStyle: {
            color: '#5E616B',
            fontSize: getDprUnit(12)
          }
        },
        tooltip: {
          transitionDuration: 0,
          triggerOn: 'mousemove',
          formatter: function ({value, name, data}) {
            const { cureCnt, suspectCnt, dieCnt } = data || {}
            if (value > 0) {
              return `${name}<br />确诊：${value}例<br />治愈：${cureCnt}例<br />死亡：${dieCnt}例`
            } else if (suspectCnt > 0) {
              return `${name}<br />疑似：${suspectCnt}例`
            }
            return `${name}：-`
          }
        },
        visualMap: {
          min: 0,
          max: 5000,
          align: 'left',
          left: '65%',
          bottom: '7%',
          showLabel: true,
          hoverLink: false, // 禁用hover
          textStyle: {
            color: '#5E616B',
            fontSize: getDprUnit(12)
          },
          itemWidth: getDprUnit(15),
          itemHeight: getDprUnit(10),
          textGap: getDprUnit(7), // 文本间距
          itemGap: getDprUnit(8), // 图元间距 色块
          pieces: [
            {
              gte: 11,
              label: '大于10人',
              symbol: 'roundRect',
              color: '#FF695C'
            },
            {
              gte: 5,
              lt: 11,
              label: '5-10人',
              symbol: 'roundRect',
              color: '#FFB8A3'
            }, {
              gte: 1,
              lt: 5,
              label: '1-4人',
              symbol: 'roundRect',
              color: '#FFDEBF'
            }, {
              value: 0,
              symbol: 'image://https://kano.guahao.cn/xbM261010333',
              label: '0',
              color: '#FFF'
            }
          ],
          show: true
        },
        geo: {
          type: 'map',
          map: '天津',
          left: '5%',
          label: {
            roam: false,
            zoom: 0.9,
            normal: {
              show: true,
              fontSize: getDprUnit(10),
              // position: 'inside',
              color: '#000',
              align: 'center',
              formatter: function ({name}) {
                let index = cityArr.findIndex(v => name === v)
                const getLabel = name => {
                  if (name.endsWith('新区')) {
                    return name.substr(name, name.length - 2)
                  }
                  if ((name.endsWith('县') || name.endsWith('区'))) {
                    return name.substr(name, name.length - 1)
                  }
                  return name
                }
                const label = index === -1 ? getLabel(name) : ++index
                return `{${typeof label === 'number' ? 'small' : 'default'}|${label}}`
              },
              rich: {
                'small': {fontSize: getDprUnit(6)}
                // 'small': {'color': 'blue', fontSize: getDprUnit(6)}
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#fff',
              borderColor: '#231916'
            },
            emphasis: {
              label: {
                color: '#fff'
              },
              areaColor: '#FFF588',
              borderWidth: 0
            }
          }
        },
        series: [{
          // name: '确诊病例',
          type: 'map',
          geoIndex: 0,
          data: optionData
        }]
      }
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
@r: 16/375rem;
@prefix: tianjin-map;
.@{prefix}-wrapper {
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  width: 350 * @r;
  height: 380 * @r;
  color: #000;
  background-size: 128 * @r 263 * @r;
  .m-tips {
    position: absolute;
    left: 66%;
    top: 28%;
    font-size: 12 * @r;
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
```