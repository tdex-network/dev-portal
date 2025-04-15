"use strict";(self.webpackChunkdev_portal=self.webpackChunkdev_portal||[]).push([[2249],{1305:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>d});var n=t(8168),o=(t(6540),t(5680));const a={sidebar_position:1},i="Overview",s={unversionedId:"provider/intro",id:"version-1.0.0/provider/intro",title:"Overview",description:"A Provider holds Liquid reserves of both a BASE_ASSET-QUOTE_ASSET in his non-custodial Liquid hot-wallet, running automated market-making strategies, either with or without an oracle. Providers are incentivized to be always on and need to expose a public reachable endpoint either via clearnet or using a Onion hidden service",source:"@site/versioned_docs/version-1.0.0/provider/intro.md",sourceDirName:"provider",slug:"/provider/intro",permalink:"/docs/v1/provider/intro",draft:!1,editUrl:"https://github.com/tdex-network/dev-portal/edit/master/versioned_docs/version-1.0.0/provider/intro.md",tags:[],version:"1.0.0",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"version-1.0.0/tutorialSidebar",previous:{title:"Browser App",permalink:"/docs/v1/trader/browser"},next:{title:"Overview",permalink:"/docs/v1/provider/daemon/overview"}},l={},d=[{value:"Provide liquidity for traders and earn fees",id:"provide-liquidity-for-traders-and-earn-fees",level:3},{value:"Register the provider on the network",id:"register-the-provider-on-the-network",level:3}],p={toc:d},c="wrapper";function u(e){let{components:r,...t}=e;return(0,o.yg)(c,(0,n.A)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"overview"},"Overview"),(0,o.yg)("p",null,"A ",(0,o.yg)("strong",{parentName:"p"},"Provider")," holds Liquid reserves of both a ",(0,o.yg)("em",{parentName:"p"},"BASE_ASSET-QUOTE_ASSET")," in his non-custodial Liquid hot-wallet, running automated market-making strategies, either with or without an oracle. Providers are incentivized to be always on and need to expose a public reachable endpoint either via clearnet or using a ",(0,o.yg)("a",{parentName:"p",href:"https://2019.www.torproject.org/docs/tor-onion-service.html"},"Onion hidden service")),(0,o.yg)("p",null,"A small provider's fee can be taken out of each trade and added to the reserves. While the ",(0,o.yg)("em",{parentName:"p"},"BASE_ASSET-QUOTE_ASSET")," reserve ratio is constantly shifting, fees make sure that the total combined reserve size increases with every trade.\nGuaranteed arbitrage opportunities from price fluctuations should push a steady flow of transactions through the system and increase the amount of fee revenue generated."),(0,o.yg)("p",null,"A liquidity provider has full control over the market making strategy to apply needed to calculate the ",(0,o.yg)("strong",{parentName:"p"},"market rate")," at which to accept trades. That being said, there is a possibility to apply an automated market-making relying only on the reserves balances and the amount requested by the trader, without the need to connect to an external price feed. The default strategy of the alpha daemond is the ",(0,o.yg)("em",{parentName:"p"},"constant product market-making"),". In short, this model generates a full order-book based on an initial price for the market. Every transaction that occurs on this market will adjust the prices of the market accordingly. It's a basic supply and demand automated market making system. "),(0,o.yg)("h3",{id:"provide-liquidity-for-traders-and-earn-fees"},"Provide liquidity for traders and earn fees"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("a",{parentName:"li",href:"/docs/v1/provider/daemon/overview"},"Install and run TDEX Daemon on your server")),(0,o.yg)("li",{parentName:"ul"},"Install and run on RaspiBlitz (Coming Soon)"),(0,o.yg)("li",{parentName:"ul"},"One-click deploy on Ocelot.net (Coming Soon)"),(0,o.yg)("li",{parentName:"ul"},"One-click deploy on Amazon Web Services (Coming Soon)")),(0,o.yg)("h3",{id:"register-the-provider-on-the-network"},"Register the provider on the network"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("a",{parentName:"li",href:"/docs/v1/provider/registry"},"Register your provider on TDEX registry")),(0,o.yg)("li",{parentName:"ul"},"Create your own registry (Coming soon)")))}u.isMDXComponent=!0},5680:(e,r,t)=>{t.d(r,{xA:()=>p,yg:()=>m});var n=t(6540);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=n.createContext({}),d=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},p=function(e){var r=d(e.components);return n.createElement(l.Provider,{value:r},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},v=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=d(t),v=o,m=c["".concat(l,".").concat(v)]||c[v]||u[v]||a;return t?n.createElement(m,i(i({ref:r},p),{},{components:t})):n.createElement(m,i({ref:r},p))}));function m(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=v;var s={};for(var l in r)hasOwnProperty.call(r,l)&&(s[l]=r[l]);s.originalType=e,s[c]="string"==typeof e?e:o,i[1]=s;for(var d=2;d<a;d++)i[d]=t[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}v.displayName="MDXCreateElement"}}]);