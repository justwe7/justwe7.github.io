(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[2711],{78765:(t,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>$});r(96540);var n=r(35358),i=r(23230),s=r(69817),a=r(75150),u=r(25066);const c={archiveCount:"archiveCount_PPhu",archive:"archive_vh_8",archiveTitle:"archiveTitle_GTNj",archiveYear:"archiveYear_BGbJ",archiveList:"archiveList_zxYn",archiveItem:"archiveItem_NSF0",archiveTime:"archiveTime_FAbX"};var o=r(74353),h=r.n(o),l=r(2445);function d(t){let{posts:e}=t;return(0,l.Y)(l.FK,{children:(0,l.Y)("ul",{className:c.archiveList,children:e.map((t=>(0,l.Y)("li",{className:c.archiveItem,children:(0,l.FD)(n.A,{to:t.metadata.permalink,children:[(0,l.Y)("time",{className:c.archiveTime,children:h()(t.metadata.date).format("MM-DD")}),(0,l.Y)("span",{children:t.metadata.title})]})},t.metadata.permalink)))})})}function f(t){let{years:e}=t;return(0,l.Y)("div",{className:"margin-top--md margin-left--sm",children:e.map(((t,r)=>(0,l.FD)("div",{children:[(0,l.FD)("h3",{className:c.archiveYear,children:[t.year,(0,l.FD)("span",{children:[(0,l.FD)("i",{children:[e[r].posts.length," "]}),(0,l.Y)(i.A,{id:"theme.blog.archive.posts.unit",children:"\u7bc7"})]})]}),(0,l.Y)(d,{...t})]},r)))})}function $(t){let{archive:e}=t;const r=(0,i.T)({id:"theme.blog.archive.title",message:"Archive",description:"The page & hero title of the blog archive page"}),n=(0,i.T)({id:"theme.blog.archive.description",message:"Archive",description:"The page & hero description of the blog archive page"}),o=function(t){const e=t.reduceRight(((t,e)=>{var r;const n=e.metadata.date.split("-")[0],i=null!=(r=t.get(n))?r:[];return t.set(n,[e,...i])}),new Map);return Array.from(e,(t=>{let[e,r]=t;return{year:e,posts:r}})).reverse()}(e.blogPosts);return(0,l.FD)(l.FK,{children:[(0,l.Y)(s.be,{title:r,description:n}),(0,l.Y)(a.A,{children:(0,l.Y)("div",{className:"container-wrapper padding-vert--md",children:(0,l.FD)("div",{className:c.archive,children:[(0,l.FD)("h2",{className:c.archiveTitle,children:[(0,l.Y)(u.In,{icon:"carbon:blog",width:24,height:24}),r]}),(0,l.Y)("div",{className:c.archiveCount,children:(0,l.Y)(i.A,{id:"theme.blog.archive.posts.total",values:{total:e.blogPosts.length},children:"\u5171 {total} \u7bc7\u6587\u7ae0"})}),o.length>0&&(0,l.Y)(f,{years:o})]})})})]})}},74353:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,r=36e5,n="millisecond",i="second",s="minute",a="hour",u="day",c="week",o="month",h="quarter",l="year",d="date",f="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],r=t%100;return"["+t+(e[(r-20)%10]||e[r]||e[0])+"]"}},g=function(t,e,r){var n=String(t);return!n||n.length>=e?t:""+Array(e+1-n.length).join(r)+t},p={s:g,z:function(t){var e=-t.utcOffset(),r=Math.abs(e),n=Math.floor(r/60),i=r%60;return(e<=0?"+":"-")+g(n,2,"0")+":"+g(i,2,"0")},m:function t(e,r){if(e.date()<r.date())return-t(r,e);var n=12*(r.year()-e.year())+(r.month()-e.month()),i=e.clone().add(n,o),s=r-i<0,a=e.clone().add(n+(s?-1:1),o);return+(-(n+(r-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:o,y:l,w:c,d:u,D:d,h:a,m:s,s:i,ms:n,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",M={};M[D]=m;var y="$isDayjsObject",b=function(t){return t instanceof _||!(!t||!t[y])},w=function t(e,r,n){var i;if(!e)return D;if("string"==typeof e){var s=e.toLowerCase();M[s]&&(i=s),r&&(M[s]=r,i=s);var a=e.split("-");if(!i&&a.length>1)return t(a[0])}else{var u=e.name;M[u]=e,i=u}return!n&&i&&(D=i),i||!n&&D},S=function(t,e){if(b(t))return t.clone();var r="object"==typeof e?e:{};return r.date=t,r.args=arguments,new _(r)},Y=p;Y.l=w,Y.i=b,Y.w=function(t,e){return S(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function m(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[y]=!0}var g=m.prototype;return g.parse=function(t){this.$d=function(t){var e=t.date,r=t.utc;if(null===e)return new Date(NaN);if(Y.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var n=e.match($);if(n){var i=n[2]-1||0,s=(n[7]||"0").substring(0,3);return r?new Date(Date.UTC(n[1],i,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)):new Date(n[1],i,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)}}return new Date(e)}(t),this.init()},g.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},g.$utils=function(){return Y},g.isValid=function(){return!(this.$d.toString()===f)},g.isSame=function(t,e){var r=S(t);return this.startOf(e)<=r&&r<=this.endOf(e)},g.isAfter=function(t,e){return S(t)<this.startOf(e)},g.isBefore=function(t,e){return this.endOf(e)<S(t)},g.$g=function(t,e,r){return Y.u(t)?this[e]:this.set(r,t)},g.unix=function(){return Math.floor(this.valueOf()/1e3)},g.valueOf=function(){return this.$d.getTime()},g.startOf=function(t,e){var r=this,n=!!Y.u(e)||e,h=Y.p(t),f=function(t,e){var i=Y.w(r.$u?Date.UTC(r.$y,e,t):new Date(r.$y,e,t),r);return n?i:i.endOf(u)},$=function(t,e){return Y.w(r.toDate()[t].apply(r.toDate("s"),(n?[0,0,0,0]:[23,59,59,999]).slice(e)),r)},v=this.$W,m=this.$M,g=this.$D,p="set"+(this.$u?"UTC":"");switch(h){case l:return n?f(1,0):f(31,11);case o:return n?f(1,m):f(0,m+1);case c:var D=this.$locale().weekStart||0,M=(v<D?v+7:v)-D;return f(n?g-M:g+(6-M),m);case u:case d:return $(p+"Hours",0);case a:return $(p+"Minutes",1);case s:return $(p+"Seconds",2);case i:return $(p+"Milliseconds",3);default:return this.clone()}},g.endOf=function(t){return this.startOf(t,!1)},g.$set=function(t,e){var r,c=Y.p(t),h="set"+(this.$u?"UTC":""),f=(r={},r[u]=h+"Date",r[d]=h+"Date",r[o]=h+"Month",r[l]=h+"FullYear",r[a]=h+"Hours",r[s]=h+"Minutes",r[i]=h+"Seconds",r[n]=h+"Milliseconds",r)[c],$=c===u?this.$D+(e-this.$W):e;if(c===o||c===l){var v=this.clone().set(d,1);v.$d[f]($),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f]($);return this.init(),this},g.set=function(t,e){return this.clone().$set(t,e)},g.get=function(t){return this[Y.p(t)]()},g.add=function(n,h){var d,f=this;n=Number(n);var $=Y.p(h),v=function(t){var e=S(f);return Y.w(e.date(e.date()+Math.round(t*n)),f)};if($===o)return this.set(o,this.$M+n);if($===l)return this.set(l,this.$y+n);if($===u)return v(1);if($===c)return v(7);var m=(d={},d[s]=e,d[a]=r,d[i]=t,d)[$]||1,g=this.$d.getTime()+n*m;return Y.w(g,this)},g.subtract=function(t,e){return this.add(-1*t,e)},g.format=function(t){var e=this,r=this.$locale();if(!this.isValid())return r.invalidDate||f;var n=t||"YYYY-MM-DDTHH:mm:ssZ",i=Y.z(this),s=this.$H,a=this.$m,u=this.$M,c=r.weekdays,o=r.months,h=r.meridiem,l=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].slice(0,s)},d=function(t){return Y.s(s%12||12,t,"0")},$=h||function(t,e,r){var n=t<12?"AM":"PM";return r?n.toLowerCase():n};return n.replace(v,(function(t,n){return n||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return Y.s(e.$y,4,"0");case"M":return u+1;case"MM":return Y.s(u+1,2,"0");case"MMM":return l(r.monthsShort,u,o,3);case"MMMM":return l(o,u);case"D":return e.$D;case"DD":return Y.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return l(r.weekdaysMin,e.$W,c,2);case"ddd":return l(r.weekdaysShort,e.$W,c,3);case"dddd":return c[e.$W];case"H":return String(s);case"HH":return Y.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,a,!0);case"A":return $(s,a,!1);case"m":return String(a);case"mm":return Y.s(a,2,"0");case"s":return String(e.$s);case"ss":return Y.s(e.$s,2,"0");case"SSS":return Y.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},g.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},g.diff=function(n,d,f){var $,v=this,m=Y.p(d),g=S(n),p=(g.utcOffset()-this.utcOffset())*e,D=this-g,M=function(){return Y.m(v,g)};switch(m){case l:$=M()/12;break;case o:$=M();break;case h:$=M()/3;break;case c:$=(D-p)/6048e5;break;case u:$=(D-p)/864e5;break;case a:$=D/r;break;case s:$=D/e;break;case i:$=D/t;break;default:$=D}return f?$:Y.a($)},g.daysInMonth=function(){return this.endOf(o).$D},g.$locale=function(){return M[this.$L]},g.locale=function(t,e){if(!t)return this.$L;var r=this.clone(),n=w(t,e,!0);return n&&(r.$L=n),r},g.clone=function(){return Y.w(this.$d,this)},g.toDate=function(){return new Date(this.valueOf())},g.toJSON=function(){return this.isValid()?this.toISOString():null},g.toISOString=function(){return this.$d.toISOString()},g.toString=function(){return this.$d.toUTCString()},m}(),O=_.prototype;return S.prototype=O,[["$ms",n],["$s",i],["$m",s],["$H",a],["$W",u],["$M",o],["$y",l],["$D",d]].forEach((function(t){O[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),S.extend=function(t,e){return t.$i||(t(e,_,S),t.$i=!0),S},S.locale=w,S.isDayjs=b,S.unix=function(t){return S(1e3*t)},S.en=M[D],S.Ls=M,S.p={},S}()}}]);