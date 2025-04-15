"use strict";(self.webpackChunkdev_portal=self.webpackChunkdev_portal||[]).push([[3793],{5680:(e,t,n)=>{n.d(t,{xA:()=>h,yg:()=>g});var a=n(6540);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},h=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,h=l(e,["components","mdxType","originalType","parentName"]),c=p(n),d=o,g=c["".concat(s,".").concat(d)]||c[d]||u[d]||r;return n?a.createElement(g,i(i({ref:t},h),{},{components:n})):a.createElement(g,i({ref:t},h))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:o,i[1]=l;for(var p=2;p<r;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7092:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var a=n(8168),o=(n(6540),n(5680));const r={slug:"announcing-tdex-v2",title:"Announcing TDEX v2",author:"Pietralberto Mazza",draft:!1,author_title:"TDEX Contributor",author_image_url:"https://avatars.githubusercontent.com/u/18440657",tags:["liquid","tdex","bitcoin","v2"]},i=void 0,l={permalink:"/blog/announcing-tdex-v2",editUrl:"https://github.com/tdex-network/dev-portal/edit/master/blog/blog/2023-08-04-announcing-tdex-v2.md",source:"@site/blog/2023-08-04-announcing-tdex-v2.md",title:"Announcing TDEX v2",description:"Today we are pleased to announce the new version of the TDEX protocol.",date:"2023-08-04T00:00:00.000Z",formattedDate:"August 4, 2023",tags:[{label:"liquid",permalink:"/blog/tags/liquid"},{label:"tdex",permalink:"/blog/tags/tdex"},{label:"bitcoin",permalink:"/blog/tags/bitcoin"},{label:"v2",permalink:"/blog/tags/v-2"}],readingTime:3.625,hasTruncateMarker:!1,authors:[{name:"Pietralberto Mazza",title:"TDEX Contributor",imageURL:"https://avatars.githubusercontent.com/u/18440657"}],frontMatter:{slug:"announcing-tdex-v2",title:"Announcing TDEX v2",author:"Pietralberto Mazza",draft:!1,author_title:"TDEX Contributor",author_image_url:"https://avatars.githubusercontent.com/u/18440657",tags:["liquid","tdex","bitcoin","v2"]},nextItem:{title:"Liquid Bitcoin peg-in(s) in the browser!",permalink:"/blog/liquid-pegin-browser"}},s={authorsImageUrls:[void 0]},p=[{value:"What&#39;s changed?",id:"whats-changed",level:2},{value:"Daemon",id:"daemon",level:3},{value:"Dashboard",id:"dashboard",level:3}],h={toc:p},c="wrapper";function u(e){let{components:t,...n}=e;return(0,o.yg)(c,(0,a.A)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"Today we are pleased to announce the new version of the TDEX protocol."),(0,o.yg)("p",null,"The newest ",(0,o.yg)("inlineCode",{parentName:"p"},"v2")," comes with updates to ",(0,o.yg)("strong",{parentName:"p"},"BOTD#3")," and ",(0,o.yg)("strong",{parentName:"p"},"BOTD#4")," that affect the way a trade is both presented and cooperatively crafted by a trader and a provider."),(0,o.yg)("p",null,"We have released a new major version of all our services in order to be compliant with TDEX v2.\nThe newest version ",(0,o.yg)("inlineCode",{parentName:"p"},"v1.0.0")," of the daemon contains very few changes at the interface level, but at the same time, under the hood, it has been completely refactored by drastically improving its performances."),(0,o.yg)("p",null,"And the same stands for the official app! The new ",(0,o.yg)("inlineCode",{parentName:"p"},"v2.0.0")," version of the app is a lot faster than the previous one and supports both versions of the TDEX protocol. You won't even notice if you're trading against a TDEX v1 or v2 provider!"),(0,o.yg)("h2",{id:"whats-changed"},"What's changed?"),(0,o.yg)("p",null,"The main change of the new protocol is the adoption of the new PSETv2 format (BIP-370) as a means to describe and (cooperatively) build the transactions."),(0,o.yg)("p",null,"This required inevitable breaking changes to ",(0,o.yg)("a",{parentName:"p",href:"/docs/latest/specs/swap-protocol"},"BOTD#3"),", so we took the chance to make some little but impactful changes to ",(0,o.yg)("a",{parentName:"p",href:"/docs/latest/specs/trade-protocol"},"BOTD#4")),(0,o.yg)("p",null,"Let's see briefly how the services have changed."),(0,o.yg)("h3",{id:"daemon"},"Daemon"),(0,o.yg)("p",null,"The service that has changed the most is unavoidably the daemon, which has undergone a huge process of redesigning and refactoring."),(0,o.yg)("p",null,"The biggest change of the new ",(0,o.yg)("inlineCode",{parentName:"p"},"v1.0.0")," version is the detachment of the wallet. The daemon, in fact, now requires a connection to an ",(0,o.yg)("em",{parentName:"p"},"Ocean wallet")," that acts as the bag of keys for crafting/signing transactions, but also as the source of all blockchain-related events.  "),(0,o.yg)("p",null,"The coolest thing about this is that you can plug your daemon not only with the official ",(0,o.yg)("em",{parentName:"p"},"Ocean wallet")," implementation but with any wallet that sticks with the ",(0,o.yg)("em",{parentName:"p"},"Ocean protos")," really. This opens the daemon up to a lot of new scenarios - for example, you could wrap up your preferred wallet's API and let it be used by the daemon! "),(0,o.yg)("p",null,"Now that the handling keys and watching the blockchain are not up to the daemon anymore, we have introduced a brand new feature that might turn out useful to you: you can set up price feeds for your markets!"),(0,o.yg)("p",null,"This means that you can configure your provider to connect to some exchange (e.g. bitfinex) and feed your market with the prices retrieved from it asynchronously!"),(0,o.yg)("p",null,"The providers come with the typical CLI - with a rethinked set of commands and flags - and a brand new service that takes care of migrating your daemon from the old ",(0,o.yg)("inlineCode",{parentName:"p"},"v0.9.x")," the the new ",(0,o.yg)("inlineCode",{parentName:"p"},"v1.0.0"),"."),(0,o.yg)("p",null,"Take a look at the ",(0,o.yg)("a",{parentName:"p",href:"/docs/latest/provider/intro"},"official documentation")," and follow the tutorial to learn everything you need to manage your provider."),(0,o.yg)("p",null,"You can see the list of all the new ",(0,o.yg)("inlineCode",{parentName:"p"},"v2/")," APIs by looking directly at the ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/tdex-network/tdex-daemon/blob/master/api-spec/protobuf/tdex-daemon/v2"},"github repo"),"."),(0,o.yg)("h3",{id:"dashboard"},"Dashboard"),(0,o.yg)("p",null,"The dashboard lets you set up your daemon by means of a user interface that might make you more comfortable compared to the CLI."),(0,o.yg)("p",null,"The main change that affects the new ",(0,o.yg)("inlineCode",{parentName:"p"},"v1.0.0")," version of the dashboard is that it supports only daemons with version ",(0,o.yg)("inlineCode",{parentName:"p"},"v1.0.0")," and won't be able to connect to older ones. You'll get notified with an error otherwise."),(0,o.yg)("p",null,"If you already used the dashboard, you won't see big changes on the user interface besides the higher number of options you have to customize your market."),(0,o.yg)("p",null,"###\xa0App"),(0,o.yg)("p",null,"The app allows users to trade their funds against the markets of the providers listed on the public registry."),(0,o.yg)("p",null,"It supports both TDEX v1 and TDEX v2 protocols in order to offer them the smoothest experience. You won't even notice if they're trading against a TDEX v1-compatible or a v2-compatible provider!"),(0,o.yg)("p",null,"We didn't make any relevant changes to the user interface of the app, but you'll notice for sure the step forward in terms of performance!"),(0,o.yg)("p",null,"Much faster, and much reliable, the app has been refactored in order to sharply reduce the time spent on watching the blockchain."),(0,o.yg)("p",null,"Similarly to the daemon, the app gets notified about blockchain events in an asynchronous way instead of polling a block explorer. This grants a higher level of personage that you can appreciate especially when restoring your wallet - the very first operation done by the app once you update and unlock it."),(0,o.yg)("p",null,"Go to your app store and download the latest version of the app now to enjoy the new TDEX!"))}u.isMDXComponent=!0}}]);