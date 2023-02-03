"use strict";(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[5237],{5237:function(e,t,n){n.d(t,{D:function(){return Oe}});var r=n(7294),o=n(3935);function i(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function a(e){return e instanceof i(e).Element||e instanceof Element}function s(e){return e instanceof i(e).HTMLElement||e instanceof HTMLElement}function f(e){return"undefined"!=typeof ShadowRoot&&(e instanceof i(e).ShadowRoot||e instanceof ShadowRoot)}var c=Math.max,u=Math.min,p=Math.round;function l(){var e=navigator.userAgentData;return null!=e&&e.brands?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function d(){return!/^((?!chrome|android).)*safari/i.test(l())}function m(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);var r=e.getBoundingClientRect(),o=1,f=1;t&&s(e)&&(o=e.offsetWidth>0&&p(r.width)/e.offsetWidth||1,f=e.offsetHeight>0&&p(r.height)/e.offsetHeight||1);var c=(a(e)?i(e):window).visualViewport,u=!d()&&n,l=(r.left+(u&&c?c.offsetLeft:0))/o,m=(r.top+(u&&c?c.offsetTop:0))/f,h=r.width/o,v=r.height/f;return{width:h,height:v,top:m,right:l+h,bottom:m+v,left:l,x:l,y:m}}function h(e){var t=i(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function v(e){return e?(e.nodeName||"").toLowerCase():null}function y(e){return((a(e)?e.ownerDocument:e.document)||window.document).documentElement}function g(e){return m(y(e)).left+h(e).scrollLeft}function b(e){return i(e).getComputedStyle(e)}function w(e){var t=b(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function x(e,t,n){void 0===n&&(n=!1);var r,o,a=s(t),f=s(t)&&function(e){var t=e.getBoundingClientRect(),n=p(t.width)/e.offsetWidth||1,r=p(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(t),c=y(t),u=m(e,f,n),l={scrollLeft:0,scrollTop:0},d={x:0,y:0};return(a||!a&&!n)&&(("body"!==v(t)||w(c))&&(l=(r=t)!==i(r)&&s(r)?{scrollLeft:(o=r).scrollLeft,scrollTop:o.scrollTop}:h(r)),s(t)?((d=m(t,!0)).x+=t.clientLeft,d.y+=t.clientTop):c&&(d.x=g(c))),{x:u.left+l.scrollLeft-d.x,y:u.top+l.scrollTop-d.y,width:u.width,height:u.height}}function O(e){var t=m(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function j(e){return"html"===v(e)?e:e.assignedSlot||e.parentNode||(f(e)?e.host:null)||y(e)}function E(e){return["html","body","#document"].indexOf(v(e))>=0?e.ownerDocument.body:s(e)&&w(e)?e:E(j(e))}function D(e,t){var n;void 0===t&&(t=[]);var r=E(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),a=i(r),s=o?[a].concat(a.visualViewport||[],w(r)?r:[]):r,f=t.concat(s);return o?f:f.concat(D(j(s)))}function k(e){return["table","td","th"].indexOf(v(e))>=0}function A(e){return s(e)&&"fixed"!==b(e).position?e.offsetParent:null}function L(e){for(var t=i(e),n=A(e);n&&k(n)&&"static"===b(n).position;)n=A(n);return n&&("html"===v(n)||"body"===v(n)&&"static"===b(n).position)?t:n||function(e){var t=/firefox/i.test(l());if(/Trident/i.test(l())&&s(e)&&"fixed"===b(e).position)return null;var n=j(e);for(f(n)&&(n=n.host);s(n)&&["html","body"].indexOf(v(n))<0;){var r=b(n);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n;n=n.parentNode}return null}(e)||t}var M="top",P="bottom",W="right",B="left",H="auto",R=[M,P,W,B],S="start",T="end",C="viewport",q="popper",U=R.reduce((function(e,t){return e.concat([t+"-"+S,t+"-"+T])}),[]),V=[].concat(R,[H]).reduce((function(e,t){return e.concat([t,t+"-"+S,t+"-"+T])}),[]),F=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function N(e){var t=new Map,n=new Set,r=[];function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}var I={placement:"bottom",modifiers:[],strategy:"absolute"};function _(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function z(e){void 0===e&&(e={});var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,o=t.defaultOptions,i=void 0===o?I:o;return function(e,t,n){void 0===n&&(n=i);var o,s,f={placement:"bottom",orderedModifiers:[],options:Object.assign({},I,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],u=!1,p={state:f,setOptions:function(n){var o="function"==typeof n?n(f.options):n;l(),f.options=Object.assign({},i,f.options,o),f.scrollParents={reference:a(e)?D(e):e.contextElement?D(e.contextElement):[],popper:D(t)};var s=function(e){var t=N(e);return F.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}(function(e){var t=e.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{});return Object.keys(t).map((function(e){return t[e]}))}([].concat(r,f.options.modifiers)));return f.orderedModifiers=s.filter((function(e){return e.enabled})),f.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect;if("function"==typeof o){var i=o({state:f,name:t,instance:p,options:r}),a=function(){};c.push(i||a)}})),p.update()},forceUpdate:function(){if(!u){var e=f.elements,t=e.reference,n=e.popper;if(_(t,n)){f.rects={reference:x(t,L(n),"fixed"===f.options.strategy),popper:O(n)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach((function(e){return f.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<f.orderedModifiers.length;r++)if(!0!==f.reset){var o=f.orderedModifiers[r],i=o.fn,a=o.options,s=void 0===a?{}:a,c=o.name;"function"==typeof i&&(f=i({state:f,options:s,name:c,instance:p})||f)}else f.reset=!1,r=-1}}},update:(o=function(){return new Promise((function(e){p.forceUpdate(),e(f)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(o())}))}))),s}),destroy:function(){l(),u=!0}};if(!_(e,t))return p;function l(){c.forEach((function(e){return e()})),c=[]}return p.setOptions(n).then((function(e){!u&&n.onFirstUpdate&&n.onFirstUpdate(e)})),p}}var X={passive:!0};function Y(e){return e.split("-")[0]}function G(e){return e.split("-")[1]}function J(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function K(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?Y(o):null,a=o?G(o):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(i){case M:t={x:s,y:n.y-r.height};break;case P:t={x:s,y:n.y+n.height};break;case W:t={x:n.x+n.width,y:f};break;case B:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var c=i?J(i):null;if(null!=c){var u="y"===c?"height":"width";switch(a){case S:t[c]=t[c]-(n[u]/2-r[u]/2);break;case T:t[c]=t[c]+(n[u]/2-r[u]/2)}}return t}var Q={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Z(e){var t,n=e.popper,r=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,f=e.position,c=e.gpuAcceleration,u=e.adaptive,l=e.roundOffsets,d=e.isFixed,m=s.x,h=void 0===m?0:m,v=s.y,g=void 0===v?0:v,w="function"==typeof l?l({x:h,y:g}):{x:h,y:g};h=w.x,g=w.y;var x=s.hasOwnProperty("x"),O=s.hasOwnProperty("y"),j=B,E=M,D=window;if(u){var k=L(n),A="clientHeight",H="clientWidth";if(k===i(n)&&"static"!==b(k=y(n)).position&&"absolute"===f&&(A="scrollHeight",H="scrollWidth"),o===M||(o===B||o===W)&&a===T)E=P,g-=(d&&k===D&&D.visualViewport?D.visualViewport.height:k[A])-r.height,g*=c?1:-1;if(o===B||(o===M||o===P)&&a===T)j=W,h-=(d&&k===D&&D.visualViewport?D.visualViewport.width:k[H])-r.width,h*=c?1:-1}var R,S=Object.assign({position:f},u&&Q),C=!0===l?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1;return{x:p(t*r)/r||0,y:p(n*r)/r||0}}({x:h,y:g}):{x:h,y:g};return h=C.x,g=C.y,c?Object.assign({},S,((R={})[E]=O?"0":"",R[j]=x?"0":"",R.transform=(D.devicePixelRatio||1)<=1?"translate("+h+"px, "+g+"px)":"translate3d("+h+"px, "+g+"px, 0)",R)):Object.assign({},S,((t={})[E]=O?g+"px":"",t[j]=x?h+"px":"",t.transform="",t))}var $={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=V.reduce((function(e,n){return e[n]=function(e,t,n){var r=Y(e),o=[B,M].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[B,W].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=a}},ee={left:"right",right:"left",bottom:"top",top:"bottom"};function te(e){return e.replace(/left|right|bottom|top/g,(function(e){return ee[e]}))}var ne={start:"end",end:"start"};function re(e){return e.replace(/start|end/g,(function(e){return ne[e]}))}function oe(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&f(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function ie(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function ae(e,t,n){return t===C?ie(function(e,t){var n=i(e),r=y(e),o=n.visualViewport,a=r.clientWidth,s=r.clientHeight,f=0,c=0;if(o){a=o.width,s=o.height;var u=d();(u||!u&&"fixed"===t)&&(f=o.offsetLeft,c=o.offsetTop)}return{width:a,height:s,x:f+g(e),y:c}}(e,n)):a(t)?function(e,t){var n=m(e,!1,"fixed"===t);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(t,n):ie(function(e){var t,n=y(e),r=h(e),o=null==(t=e.ownerDocument)?void 0:t.body,i=c(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=c(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),s=-r.scrollLeft+g(e),f=-r.scrollTop;return"rtl"===b(o||n).direction&&(s+=c(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:s,y:f}}(y(e)))}function se(e,t,n,r){var o="clippingParents"===t?function(e){var t=D(j(e)),n=["absolute","fixed"].indexOf(b(e).position)>=0&&s(e)?L(e):e;return a(n)?t.filter((function(e){return a(e)&&oe(e,n)&&"body"!==v(e)})):[]}(e):[].concat(t),i=[].concat(o,[n]),f=i[0],p=i.reduce((function(t,n){var o=ae(e,n,r);return t.top=c(o.top,t.top),t.right=u(o.right,t.right),t.bottom=u(o.bottom,t.bottom),t.left=c(o.left,t.left),t}),ae(e,f,r));return p.width=p.right-p.left,p.height=p.bottom-p.top,p.x=p.left,p.y=p.top,p}function fe(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function ce(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function ue(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=void 0===r?e.placement:r,i=n.strategy,s=void 0===i?e.strategy:i,f=n.boundary,c=void 0===f?"clippingParents":f,u=n.rootBoundary,p=void 0===u?C:u,l=n.elementContext,d=void 0===l?q:l,h=n.altBoundary,v=void 0!==h&&h,g=n.padding,b=void 0===g?0:g,w=fe("number"!=typeof b?b:ce(b,R)),x=d===q?"reference":q,O=e.rects.popper,j=e.elements[v?x:d],E=se(a(j)?j:j.contextElement||y(e.elements.popper),c,p,s),D=m(e.elements.reference),k=K({reference:D,element:O,strategy:"absolute",placement:o}),A=ie(Object.assign({},O,k)),L=d===q?A:D,B={top:E.top-L.top+w.top,bottom:L.bottom-E.bottom+w.bottom,left:E.left-L.left+w.left,right:L.right-E.right+w.right},H=e.modifiersData.offset;if(d===q&&H){var S=H[o];Object.keys(B).forEach((function(e){var t=[W,P].indexOf(e)>=0?1:-1,n=[M,P].indexOf(e)>=0?"y":"x";B[e]+=S[n]*t}))}return B}function pe(e,t,n){return c(e,u(t,n))}var le={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0!==a&&a,f=n.boundary,p=n.rootBoundary,l=n.altBoundary,d=n.padding,m=n.tether,h=void 0===m||m,v=n.tetherOffset,y=void 0===v?0:v,g=ue(t,{boundary:f,rootBoundary:p,padding:d,altBoundary:l}),b=Y(t.placement),w=G(t.placement),x=!w,j=J(b),E="x"===j?"y":"x",D=t.modifiersData.popperOffsets,k=t.rects.reference,A=t.rects.popper,H="function"==typeof y?y(Object.assign({},t.rects,{placement:t.placement})):y,R="number"==typeof H?{mainAxis:H,altAxis:H}:Object.assign({mainAxis:0,altAxis:0},H),T=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,C={x:0,y:0};if(D){if(i){var q,U="y"===j?M:B,V="y"===j?P:W,F="y"===j?"height":"width",N=D[j],I=N+g[U],_=N-g[V],z=h?-A[F]/2:0,X=w===S?k[F]:A[F],K=w===S?-A[F]:-k[F],Q=t.elements.arrow,Z=h&&Q?O(Q):{width:0,height:0},$=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},ee=$[U],te=$[V],ne=pe(0,k[F],Z[F]),re=x?k[F]/2-z-ne-ee-R.mainAxis:X-ne-ee-R.mainAxis,oe=x?-k[F]/2+z+ne+te+R.mainAxis:K+ne+te+R.mainAxis,ie=t.elements.arrow&&L(t.elements.arrow),ae=ie?"y"===j?ie.clientTop||0:ie.clientLeft||0:0,se=null!=(q=null==T?void 0:T[j])?q:0,fe=N+oe-se,ce=pe(h?u(I,N+re-se-ae):I,N,h?c(_,fe):_);D[j]=ce,C[j]=ce-N}if(s){var le,de="x"===j?M:B,me="x"===j?P:W,he=D[E],ve="y"===E?"height":"width",ye=he+g[de],ge=he-g[me],be=-1!==[M,B].indexOf(b),we=null!=(le=null==T?void 0:T[E])?le:0,xe=be?ye:he-k[ve]-A[ve]-we+R.altAxis,Oe=be?he+k[ve]+A[ve]-we-R.altAxis:ge,je=h&&be?function(e,t,n){var r=pe(e,t,n);return r>n?n:r}(xe,he,Oe):pe(h?xe:ye,he,h?Oe:ge);D[E]=je,C[E]=je-he}t.modifiersData[r]=C}},requiresIfExists:["offset"]};var de={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=Y(n.placement),f=J(s),c=[B,W].indexOf(s)>=0?"height":"width";if(i&&a){var u=function(e,t){return fe("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:ce(e,R))}(o.padding,n),p=O(i),l="y"===f?M:B,d="y"===f?P:W,m=n.rects.reference[c]+n.rects.reference[f]-a[f]-n.rects.popper[c],h=a[f]-n.rects.reference[f],v=L(i),y=v?"y"===f?v.clientHeight||0:v.clientWidth||0:0,g=m/2-h/2,b=u[l],w=y-p[c]-u[d],x=y/2-p[c]/2+g,j=pe(b,x,w),E=f;n.modifiersData[r]=((t={})[E]=j,t.centerOffset=j-x,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&oe(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function me(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function he(e){return[M,W,P,B].some((function(t){return e[t]>=0}))}var ve=z({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,a=void 0===o||o,s=r.resize,f=void 0===s||s,c=i(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&u.forEach((function(e){e.addEventListener("scroll",n.update,X)})),f&&c.addEventListener("resize",n.update,X),function(){a&&u.forEach((function(e){e.removeEventListener("scroll",n.update,X)})),f&&c.removeEventListener("resize",n.update,X)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=K({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c={placement:Y(t.placement),variation:G(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,Z(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,Z(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e];s(o)&&v(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e];!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});s(r)&&v(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]},$,{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,u=n.boundary,p=n.rootBoundary,l=n.altBoundary,d=n.flipVariations,m=void 0===d||d,h=n.allowedAutoPlacements,v=t.options.placement,y=Y(v),g=f||(y===v||!m?[te(v)]:function(e){if(Y(e)===H)return[];var t=te(e);return[re(e),t,re(t)]}(v)),b=[v].concat(g).reduce((function(e,n){return e.concat(Y(n)===H?function(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?V:f,u=G(r),p=u?s?U:U.filter((function(e){return G(e)===u})):R,l=p.filter((function(e){return c.indexOf(e)>=0}));0===l.length&&(l=p);var d=l.reduce((function(t,n){return t[n]=ue(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[Y(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}(t,{placement:n,boundary:u,rootBoundary:p,padding:c,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),w=t.rects.reference,x=t.rects.popper,O=new Map,j=!0,E=b[0],D=0;D<b.length;D++){var k=b[D],A=Y(k),L=G(k)===S,T=[M,P].indexOf(A)>=0,C=T?"width":"height",q=ue(t,{placement:k,boundary:u,rootBoundary:p,altBoundary:l,padding:c}),F=T?L?W:B:L?P:M;w[C]>x[C]&&(F=te(F));var N=te(F),I=[];if(i&&I.push(q[A]<=0),s&&I.push(q[F]<=0,q[N]<=0),I.every((function(e){return e}))){E=k,j=!1;break}O.set(k,I)}if(j)for(var _=function(e){var t=b.find((function(t){var n=O.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return E=t,"break"},z=m?3:1;z>0;z--){if("break"===_(z))break}t.placement!==E&&(t.modifiersData[r]._skip=!0,t.placement=E,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},le,de,{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=ue(t,{elementContext:"reference"}),s=ue(t,{altBoundary:!0}),f=me(a,r),c=me(s,o,i),u=he(f),p=he(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:u,hasPopperEscaped:p},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":p})}}]}),ye=n(9590),ge=n.n(ye),be=function(e){return e.reduce((function(e,t){var n=t[0],r=t[1];return e[n]=r,e}),{})},we="undefined"!=typeof window&&window.document&&window.document.createElement?r.useLayoutEffect:r.useEffect,xe=[],Oe=function(e,t,n){void 0===n&&(n={});var i=r.useRef(null),a={onFirstUpdate:n.onFirstUpdate,placement:n.placement||"bottom",strategy:n.strategy||"absolute",modifiers:n.modifiers||xe},s=r.useState({styles:{popper:{position:a.strategy,left:"0",top:"0"},arrow:{position:"absolute"}},attributes:{}}),f=s[0],c=s[1],u=r.useMemo((function(){return{name:"updateState",enabled:!0,phase:"write",fn:function(e){var t=e.state,n=Object.keys(t.elements);o.flushSync((function(){c({styles:be(n.map((function(e){return[e,t.styles[e]||{}]}))),attributes:be(n.map((function(e){return[e,t.attributes[e]]})))})}))},requires:["computeStyles"]}}),[]),p=r.useMemo((function(){var e={onFirstUpdate:a.onFirstUpdate,placement:a.placement,strategy:a.strategy,modifiers:[].concat(a.modifiers,[u,{name:"applyStyles",enabled:!1}])};return ge()(i.current,e)?i.current||e:(i.current=e,e)}),[a.onFirstUpdate,a.placement,a.strategy,a.modifiers,u]),l=r.useRef();return we((function(){l.current&&l.current.setOptions(p)}),[p]),we((function(){if(null!=e&&null!=t){var r=(n.createPopper||ve)(e,t,p);return l.current=r,function(){r.destroy(),l.current=null}}}),[e,t,n.createPopper]),{state:l.current?l.current.state:null,styles:f.styles,attributes:f.attributes,update:l.current?l.current.update:null,forceUpdate:l.current?l.current.forceUpdate:null}}}}]);