"use strict";(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[7920],{3777:function(e,t,r){r.d(t,{c:function(){return o}});var n=r(7294),a=r(9962),u=["zero","one","two","few","many","other"];function s(e){return u.filter((function(t){return e.includes(t)}))}var l={locale:"en",pluralForms:s(["one","other"]),select:function(e){return 1===e?"one":"other"}};function c(){var e=(0,a.Z)().i18n.currentLocale;return(0,n.useMemo)((function(){try{return t=e,r=new Intl.PluralRules(t),{locale:t,pluralForms:s(r.resolvedOptions().pluralCategories),select:function(e){return r.select(e)}}}catch(n){return console.error('Failed to use Intl.PluralRules for locale "'+e+'".\nDocusaurus will fallback to the default (English) implementation.\nError: '+n.message+"\n"),l}var t,r}),[e])}function o(){var e=c();return{selectMessage:function(t,r){return function(e,t,r){var n=e.split("|");if(1===n.length)return n[0];n.length>r.pluralForms.length&&console.error("For locale="+r.locale+", a maximum of "+r.pluralForms.length+" plural forms are expected ("+r.pluralForms.join(",")+"), but the message contains "+n.length+": "+e);var a=r.select(t),u=r.pluralForms.indexOf(a);return n[Math.min(u,n.length-1)]}(r,t,e)}}}},7604:function(e,t,r){r.r(t),r.d(t,{default:function(){return F}});var n=r(7855),a=r(4165),u=r(5861),s=r(7294),l=r(9962),c=r(1990),o=r(1514),i=r(3699),h=r(7325),m=r(3777),f=r(6550),d=r(6136);var p=function(){var e=(0,f.k6)(),t=(0,f.TH)(),r=(0,l.Z)().siteConfig.baseUrl,n=d.Z.canUseDOM?new URLSearchParams(t.search):null,a=(null==n?void 0:n.get("q"))||"",u=(null==n?void 0:n.get("ctx"))||"",s=(null==n?void 0:n.get("version"))||"",c=function(e){var r=new URLSearchParams(t.search);return e?r.set("q",e):r.delete("q"),r};return{searchValue:a,searchContext:u,searchVersion:s,updateSearchPath:function(t){var r=c(t);e.replace({search:r.toString()})},generateSearchPageLink:function(e){var t=c(e);return r+"search?"+t.toString()}}},g=r(5202),v=r(6654),Z=r(1523),y=r(7976),S=r(9395),I=r(4056),w=r(318),R=r(5901),b={searchQueryInput:"searchQueryInput_CFBF",searchResultItem:"searchResultItem_U687",searchResultItemPath:"searchResultItemPath_uIbk",searchResultItemSummary:"searchResultItemSummary_oZHr"},P=r(5944);function k(){var e=(0,l.Z)().siteConfig.baseUrl,t=(0,m.c)().selectMessage,r=p(),n=r.searchValue,c=r.searchContext,i=r.searchVersion,f=r.updateSearchPath,d=(0,s.useState)(n),Z=d[0],y=d[1],S=(0,s.useState)(),w=S[0],R=S[1],k=(0,s.useState)(),F=k[0],_=k[1],C=""+e+i,T=(0,s.useMemo)((function(){return Z?(0,h.I)({id:"theme.SearchPage.existingResultsTitle",message:'Search results for "{query}"',description:"The search page title for non-empty query"},{query:Z}):(0,h.I)({id:"theme.SearchPage.emptyResultsTitle",message:"Search the documentation",description:"The search page title for empty query"})}),[Z]);(0,s.useEffect)((function(){f(Z),w&&(Z?w(Z,(function(e){_(e)})):_(void 0))}),[Z,w]);var q=(0,s.useCallback)((function(e){y(e.target.value)}),[]);return(0,s.useEffect)((function(){n&&n!==Z&&y(n)}),[n]),(0,s.useEffect)((function(){function e(){return(e=(0,u.Z)((0,a.Z)().mark((function e(){var t,r,n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,g.w)(C,c);case 2:t=e.sent,r=t.wrappedIndexes,n=t.zhDictionary,R((function(){return(0,v.v)(r,n,100)}));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[c,C]),(0,P.BX)(s.Fragment,{children:[(0,P.BX)(o.Z,{children:[(0,P.tZ)("meta",{property:"robots",content:"noindex, follow"}),(0,P.tZ)("title",{children:T})]}),(0,P.BX)("div",{className:"container margin-vert--lg",children:[(0,P.tZ)("h1",{children:T}),(0,P.tZ)("input",{type:"search",name:"q",className:b.searchQueryInput,"aria-label":"Search",onChange:q,value:Z,autoComplete:"off",autoFocus:!0}),!w&&Z&&(0,P.tZ)("div",{children:(0,P.tZ)(I.Z,{})}),F&&(F.length>0?(0,P.tZ)("p",{children:t(F.length,(0,h.I)({id:"theme.SearchPage.documentsFound.plurals",message:"1 document found|{count} documents found",description:'Pluralized label for "{count} documents found". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)'},{count:F.length}))}):(0,P.tZ)("p",{children:(0,h.I)({id:"theme.SearchPage.noResultsText",message:"No documents were found",description:"The paragraph for empty search result"})})),(0,P.tZ)("section",{children:F&&F.map((function(e){return(0,P.tZ)(x,{searchResult:e},e.document.i)}))})]})]})}function x(e){var t=e.searchResult,r=t.document,a=t.type,u=t.page,s=t.tokens,l=t.metadata,c=0===a,o=2===a,h=(c?r.b:u.b).slice(),m=o?r.s:r.t;c||h.push(u.t);var f="";if(R.vc&&s.length>0){for(var d,p=new URLSearchParams,g=(0,n.Z)(s);!(d=g()).done;){var v=d.value;p.append("_highlight",v)}f="?"+p.toString()}return(0,P.BX)("article",{className:b.searchResultItem,children:[(0,P.tZ)("h2",{children:(0,P.tZ)(i.Z,{to:r.u+f+(r.h||""),dangerouslySetInnerHTML:{__html:o?(0,Z.C)(m,s):(0,y.o)(m,(0,S.m)(l,"t"),s,100)}})}),h.length>0&&(0,P.tZ)("p",{className:b.searchResultItemPath,children:(0,w.e)(h)}),o&&(0,P.tZ)("p",{className:b.searchResultItemSummary,dangerouslySetInnerHTML:{__html:(0,y.o)(r.t,(0,S.m)(l,"t"),s,100)}})]})}var F=function(){return(0,P.tZ)(c.Z,{children:(0,P.tZ)(k,{})})}}}]);