## 获取css样式
```js
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
```

## 缓冲函数
```js
var num=0 
 function starMove(obj,attr,target){
	timer = setInterval(function(){
		num++;
		var cur = parseInt(getStyle(obj,attr));
		var speed = (target - cur)/6;	
	if(speed > 0){
		speed = Math.ceil(speed);
	}else{
		speed = Math.floor(speed);
	}
	if(target == cur){
		clearInterval(timer);
	}
	obj.style[attr] = cur + speed +'px';
	},30);	
	}
```

## 抖动函数
```js
function shake (obj,attr,n,callback) {
	if(obj.onOff){
		return;
	}
	obj.onOff = true;
	var arr = [];
	var num = 0;
	for(var i=n;i>0;i-=2){
		arr.push(i,-i);
	}
	arr.push(0);
	var oStyle = parseInt(getStyle(obj,attr));
	var timer = setInterval(function(){
		obj.style[attr] = oStyle+arr[num]+'px';
		num++;
		if(num == arr.length){
			clearInterval(timer);
			num = 0;
			/*obj.onOff = false;
			callback && callback(obj);*/
			if (callback && typeof callback == 'function') {
			callback(obj);
			} else{
			obj.onOff = false;
			};
		}
		},30);
	}
```

## 获取一些上下左右节点
```js
function getNext(obj){//下一个
	if(!obj || !obj.nextSibling){
		return null;
	}
	return obj.nextSibling.nodeType==1?obj.nextSibling:getNext(obj.nextSibling);
}
function getPrev(obj){//上一个
	if(!obj || !obj.previousSibling){
		return null;
	}
	return obj.previousSibling.nodeType==1?obj.previousSibling:getPrev(obj.previousSibling);
}
function getFirst(obj){//第一个
	if(!obj || !obj.firstChild){
		return null;
	}
	return obj.firstChild.nodeType == 1?obj.firstChild:getNext(obj.firstChild);
}
function getLast(obj){//倒一个
	if(!obj || !obj.lastChild){
		return null;
	}
	return obj.lastChild.nodeType == 1?obj.lastChild:getPrev(obj.lastChild);
}
```

## 获取class
```js
function getByClass(sClass,obj){
	obj = obj || document;
	var aEle = obj.getElementsByTagName('*');
	var arr = [];
	for(var i=0;i<aEle.length;i++){
		var aClass = aEle[i].className.split(' ');
		for(var j=0;j<aClass.length;j++){
			if(aClass[j] == sClass){
				arr.push(aEle[i]);
			}
		}
	}
	return arr;
	}
```

## 添加class
```js
function addClass(obj,sClass){
	if(!obj.className){
		obj.className = sClass;
		return;
	}
	//aClass:将这个元素身上的class找到并且用' '切开。
	var aClass = obj.className.split(' ');
	//循环这个元素身上的所有class，如果传入的class正好等于元素自身的class，那么就不用添加了。
	for(var i=0;i<aClass.length;i++){
		if(aClass[i] == sClass){
			return;
		}
	}
	obj.className += ' ' + sClass;
}
```

## 删除class

```js
function removeClass(obj,sClass){
	if(!sClass){
		obj.className = '';
		return;
	}
	if(!obj.className){
		return;
	}
	var aClass = obj.className.split(' ');
	for(var i=0;i<aClass.length;i++){
		if(aClass[i] == sClass){
			aClass.splice(i,1);
		}
	}
	obj.className = aClass.join(' ');
}
```

## 获取dom位置
```js
function getPos(obj){
	var iLeft = 0,iTop = 0,Bl=0,Bt=0;
	while(obj){
		iLeft+=obj.offsetLeft + Bl;
		iTop+=obj.offsetTop + Bt;
		obj = obj.offsetParent;
		if(obj){
			Bl = parseInt(getStyle(obj,'borderLeftWidth'));
			Bl = isNaN(Bl)?0:Bl;
			Bt = parseInt(getStyle(obj,'borderTopWidth'));
			Bt = isNaN(Bt)?0:Bt;
		}
	}
	return {
		l:iLeft,
		t:iTop
	}
}
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
```

## 判断IE
```js
function getIE(v){
	var str = window.navigator.userAgent;
	if(str.toLowerCase().indexOf(v)!=-1){
		return true;
	}else{
		return false;
	}
}
```

## 取消冒泡
```js
function stopBubble(e) {
//如果提供了事件对象，则这是一个非IE浏览器
if ( e && e.stopPropagation )
    //因此它支持W3C的stopPropagation()方法
    e.stopPropagation();
else
    //否则，我们需要使用IE的方式来取消事件冒泡
    window.event.cancelBubble = true;
}
```

## 删数组的某个
```js
function cutArr(arr,val,num){
        num = num || 0;
        for(var i=num;arr.indexOf(val,i)!=-1;){
            i = arr.indexOf(val,i)+1;
            arr.splice(i-1,1)
        }
        return arr;
    }
```

## 拖拽函数
```js
function drag(obj) {
    obj.onmousedown = function(ev) {
        var ev = ev || event;
        var disX = ev.clientX - this.offsetLeft;
        var disY = ev.clientY - this.offsetTop;
        if ( obj.setCapture ) {
            obj.setCapture();
        }
        document.onmousemove = function(ev) {
            var ev = ev || event;
            obj.style.left = ev.clientX - disX + 'px';
            obj.style.top = ev.clientY - disY + 'px';
        }
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
            //释放全局捕获 releaseCapture();
            if ( obj.releaseCapture ) {
                obj.releaseCapture();
            }
        }
        return false;
    }
}
```

## 碰撞函数
```js
function drag(obj,obj2,boFn,noBoFn){
    obj.onmousedown = function(ev){
        var e = ev || event;
        var disX = e.clientX - obj.offsetLeft;
        var disY = e.clientY - obj.offsetTop;
        if(obj.setCapture){
            obj.setCapture();
        }
        document.onmousemove = function(ev){
            var oEvent = ev || event;
            if(boom(obj,obj2)){
                boFn && boFn();
            }else{
                noBoFn && noBoFn();
            }
            obj.style.left = oEvent.clientX - disX + 'px';
            obj.style.top = oEvent.clientY - disY + 'px';
        }
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null;
            if(obj.releaseCapture){
                obj.releaseCapture();
            }
        }
        return false;
    }
}
function boom(obj,obj2){
    //要拖拽元素的上下左右的边。
    var l1 = obj.offsetLeft;
    var r1 = l1 + obj.offsetWidth;
    var t1 = obj.offsetTop;
    var b1 = t1 + obj.offsetHeight;
    //要被碰撞的上下左右边。
    var l2 = obj2.offsetLeft;
    var r2 = l2 + obj2.offsetWidth;
    var t2 = obj2.offsetTop;
    var b2 = t2 + obj2.offsetHeight;
    if(r1 < l2 || b1 < t2 || r2 < l1 || t1 > b2){ //没碰到
        return false;
    }else{
        return true;
    }
}
```

## 判断设备ua
```js
function parseUA() {
    var u = navigator.userAgent;
    var u2 = navigator.userAgent.toLowerCase();
    return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
        weixin: u2.match(/MicroMessenger/i) == "micromessenger",
        ali: u.indexOf('AliApp') > -1,
    };
}
var ua = parseUA();

if (!ua.mobile) {
    location.href = './pc.html';
}

/* dom写入 */
function usragent() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    if (Sys.ie) document.write('IE: ' + Sys.ie);
    if (Sys.firefox) document.write('Firefox: ' + Sys.firefox);
    if (Sys.chrome) document.write('Chrome: ' + Sys.chrome);
    if (Sys.opera) document.write('Opera: ' + Sys.opera);
    if (Sys.safari) document.write('Safari: ' + Sys.safari);
}
```

## url解析
```js
function urlParse() {
  var url = window.location.search;
  var _obj = {};
  var reg = /[?&][^?&]+=[^?&]+/g; //匹配 ?或者&  +  非?或者&一个或多个 +  =  +  非?或者&一个或多个 + 全局
  var arr = url.match(reg);  //切割为两个数组  ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach(function(item) {
      var tempArr = item.substring(1).split('=');
      var key = decodeURIComponent(tempArr[0]);
      var val = decodeURIComponent(tempArr[1]);
      _obj[key] = val;
    });
  }
  return _obj;
}
```

## 日期格式化
```js
function formatDate(date, fmt) {
  fmt = fmt || "YYYY-MM-DD HH:mm:ss";
  if (!date) {
    return "";
  }
  if (typeof date === "string") {
    date = isNaN(Number(date)) ? new Date(date.replace(/-/g, '/')) : new Date(+date);
  }
  if (typeof date === "number") {
    date = new Date(date);
  }
  var o = {
    "M+": date.getMonth() + 1,
    "D+": date.getDate(),
    "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    "S": date.getMilliseconds()
  };
  var week = {
    "0": "\u65e5",
    "1": "\u4e00",
    "2": "\u4e8c",
    "3": "\u4e09",
    "4": "\u56db",
    "5": "\u4e94",
    "6": "\u516d"
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? "\u661f\u671f"
          : "\u5468"
        : "") + week[date.getDay() + ""]
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}
```

## 上传图片
方法暂未支持多选
```js
/**
 * @param {*} [{
 *   max = 1000,
 *   accept = 'image/jpg,image/jpeg,image/png,image/gif'
 * }={}]
 * @return {Promise<{file: Blob, base64: string}>} 
 */
export async function uploadImg ({
  multiple = false,
  max = 1000,
  accept = 'image/jpg,image/jpeg,image/png,image/gif'
} = {}) {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.setAttribute('style', 'opacty:0;height: 0;display: none;')
    input.setAttribute('hidden', 'hidden')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/jpg,image/jpeg,image/png,image/gif')
    const oBody = document.getElementsByTagName('body')[0]
    oBody.appendChild(input)
    input.click()
    input.onchange = function () {
      const files = this.files
      const file = files[0]
      const maxsize = max * 1024
      if (!/\/(?:jpeg|jpg|png|gif|webp)/i.test(file.type)) {
        oBody.removeChild(input)
        return reject('请选择正确的图片格式')
      }
      const reader = new FileReader()
      reader.onload = function () {
        // const baseStr = this.result
        // 默认如果图片大于 1m，不传
        if (file.size >= maxsize) {
          oBody.removeChild(input)
          return reject('请选择小于' + max + 'kb的文件')
        }
        compressFileToBase64(file).then(base64 => {
          resolve({ file: dataURLtoBlobAsFile(base64, file.name || 'temp1.jpg'), base64: base64 })
          oBody.removeChild(input) // 上传完成移除input
        })
      }
      reader.readAsDataURL(file)
    }
  })
}

export function compressFileToBase64 (file, compressQuality = 0.8, maxLength = 1500) {
  // 图片压缩
  return new Promise(resolve => {
    // 通过fileReader对象，读取浏览器中存储的文件
    const fd = new FileReader()
    // 读取指定的Blob中的内容，最后得到一个data: URL格式的字符串以表示所读取文件的内容
    fd.readAsDataURL(file)
    fd.onloadend = e => {
      const image = new Image()
      image.onload = () => {
        let width = image.width
        let height = image.height
        let rate = 1 // 像素比例
        if (Math.max(width, height) > maxLength) {
          rate = maxLength / Math.max(width, height)
        }
        if (rate < 1 || file.size >= 2 * 1024 * 1024) {
          // 超出最大边长等比例缩放
          width = width * rate
          height = height * rate
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.width = width
          canvas.height = height
          ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
          resolve(canvas.toDataURL('image/jpeg', compressQuality))
          /* getFileExif(file).then(orientation => { // https://github.com/exif-js/exif-js
            if (orientation !== '' && orientation !== 1 && orientation !== undefined && orientation !== 0) {
              switch (orientation) {
                case 6:// 需要顺时针（向左）90度旋转
                  canvas.width = height
                  canvas.height = width
                  ctx.rotate(Math.PI / 2)
                  ctx.drawImage(image, 0, -height, width, height)
                  break
                case 8:// 需要逆时针（向右）90度旋转
                  canvas.width = height
                  canvas.height = width
                  ctx.rotate(-90 * Math.PI / 180)
                  ctx.drawImage(image, -width, 0, width, height)
                  break
                case 3:// 需要180度旋转
                  ctx.rotate(Math.PI)
                  ctx.drawImage(image, -width, -height, width, height)
                  break
                default: ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
              }
            } else {
              ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
            }
            resolve(canvas.toDataURL('image/jpeg', this.compressQuality))
          }) */
        } else {
          resolve(e.target.result)
        }
      }
      image.src = e.target.result
    }
  })
}

function dataURLtoBlobAsFile (dataurl, fileName) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  const file = new Blob([u8arr], { type: mime }) // 将blob转换为file
  file.lastModifiedDate = new Date()
  file.name = fileName
  return file
}

export function genUuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

```

## 防抖
```js
function debounce(func) {
	var timeout;
	return function() {
		var context = this;
		var args = arguments;
		clearTimeout(timeout)
		timeout = setTimeout(function(){
			func.apply(context, args);
		}, 300)
	}
}
```

## 从日期中获取时间
```js
new Date().toTimeString().slice(0,8) // 12:20:40
```

## 给url添加查询字符串
```js
function addQuery (url, params) {
  let separator = url.indexOf('?') !== -1 ? '&' : '?'
  const queryStringParameter = Object.entries(params).reduce((result, target, index) => {
    result += separator + target[0] + '=' + target[1]
    separator = '&'
    return result
  }, '')
  return url + queryStringParameter
}
```

## 小程序批量上传图片
```js
/**
 * @param {*} wxfilelist chooseImg的图片信息
 */
export async function uploadWxImg (wxfilelist) {
  return Promise.all(
    wxfilelist.map((tempFiles, index) => {
      wx.showLoading({ title: '图片上传中', mask: true })
      return new Promise(function (resolve, reject) {
        wx.uploadFile({
          url: '/upload/uploadImg',
          filePath: tempFiles,
          name: 'file',
          success: function (res) {
            if (res.statusCode === 200) {
              if (JSON.parse(res.data).result === 200) {
                resolve({
                  url: JSON.parse(res.data).data.url
                })
                return false
              } else {
                return reject(JSON.parse(res.data).msg)
              }
            }
            reject(new Error('failed to upload file'))
          },
          fail: function () {
            reject(new Error('failed to upload file'))
          }
        })
      })
    })
  )
    .then(res => {
      wx.hideLoading()
      return res.map(el => el.url)
    })
    .catch(err => {
      wx.hideLoading()
      wx.showToast({ title: err || '上传失败：请重新上传', icon: 'none' })
      return []
    })
}
```

## 客户端获取定位
```js
// 1. 使用搜狐提供接口（IP）
GET: https://pv.sohu.com/cityjson?ie=utf-8

// 2. 浏览器自带api（需用户梯子）
navigator.geolocation.getCurrentPosition(function (position) {
  console.dir(position)
}, function (error) {
  console.error(error)
})
```
