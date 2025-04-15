"use strict";(self.webpackChunkdev_portal=self.webpackChunkdev_portal||[]).push([[2623],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>m});var i=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=i.createContext({}),p=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return i.createElement(s.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,m=u["".concat(s,".").concat(d)]||u[d]||g[d]||a;return n?i.createElement(m,o(o({ref:t},c),{},{components:n})):i.createElement(m,o({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:r,o[1]=l;for(var p=2;p<a;p++)o[p]=n[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6397:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>g,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var i=n(8168),r=(n(6540),n(5680));const a={slug:"liquid-pegin-browser",title:"Liquid Bitcoin peg-in(s) in the browser!",author:"Marco Argentieri",draft:!1,author_title:"TDEX Contributor",author_image_url:"https://avatars.githubusercontent.com/u/3596602",tags:["pegin","liquid","tdex","bitcoin"]},o=void 0,l={permalink:"/blog/liquid-pegin-browser",editUrl:"https://github.com/tdex-network/dev-portal/edit/master/blog/blog/2021-09-20-liquid-pegin-browser.md",source:"@site/blog/2021-09-20-liquid-pegin-browser.md",title:"Liquid Bitcoin peg-in(s) in the browser!",description:"Any wallet developer can integrate trustless Liquid Bitcoin peg-in features in their own application, even in the browser!",date:"2021-09-20T00:00:00.000Z",formattedDate:"September 20, 2021",tags:[{label:"pegin",permalink:"/blog/tags/pegin"},{label:"liquid",permalink:"/blog/tags/liquid"},{label:"tdex",permalink:"/blog/tags/tdex"},{label:"bitcoin",permalink:"/blog/tags/bitcoin"}],readingTime:1.715,hasTruncateMarker:!0,authors:[{name:"Marco Argentieri",title:"TDEX Contributor",imageURL:"https://avatars.githubusercontent.com/u/3596602"}],frontMatter:{slug:"liquid-pegin-browser",title:"Liquid Bitcoin peg-in(s) in the browser!",author:"Marco Argentieri",draft:!1,author_title:"TDEX Contributor",author_image_url:"https://avatars.githubusercontent.com/u/3596602",tags:["pegin","liquid","tdex","bitcoin"]},prevItem:{title:"Announcing TDEX v2",permalink:"/blog/announcing-tdex-v2"},nextItem:{title:"Deploy a TDEX Daemon to AWS with Terraform",permalink:"/blog/tdex-terraform-deploy-aws"}},s={authorsImageUrls:[void 0]},p=[{value:"What&#39;s a peg-in?",id:"whats-a-peg-in",level:3},{value:"How a user can peg-in?",id:"how-a-user-can-peg-in",level:3},{value:"Trustless peg-in in the browser",id:"trustless-peg-in-in-the-browser",level:3},{value:"Try now!",id:"try-now",level:3}],c={toc:p},u="wrapper";function g(e){let{components:t,...n}=e;return(0,r.yg)(u,(0,i.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"Any wallet developer can integrate trustless Liquid Bitcoin peg-in features in their own application, even in the browser!"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"npm install --save pegin\n# or with yarn\nyarn add pegin\n")),(0,r.yg)("p",null,"Then in your JavaScript or TypeScript project"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"\nimport ElementsPegin from 'pegin';\n\n// initialize the module\nconst peginModule = new ElementsPegin(\n  await ElementsPegin.withGoElements(),\n  await ElementsPegin.withLibwally(),\n);\n\n// get a pegin address to deposit Bitcoin\nconst peginAddress = await peginModule.getMainchainAddress(\n  claimScript // Liquid scriptpubkey\n);\n\n\n// deposit funds to the Bitcoin address\nconsole.log(peginAddress); \n\n// retrieve the raw bitcoin transaction hex encoded and the merkle block proof, pass them along the Liquid script used to generate the pegin address\nlet claimTx = await peginModule.claimTx(\n    btcTxHex,\n    btcTxOutProof,\n    claimScript\n);\n\n// Now you can broadcast the transaction to the Liquid Network\n")),(0,r.yg)("h3",{id:"whats-a-peg-in"},"What's a peg-in?"),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://liquid.net"},"Liquid Network"),' allows anyone to "convert" BTC into L-BTC, the sidechain native asset, with a process called ',(0,r.yg)("strong",{parentName:"p"},"peg-in"),": it consists in sending Bitcoin to the Liquid federation multisignature script tweaked with the user's Liquid script. "),(0,r.yg)("p",null,"After 102 Bitcoin mainchain blocks, the user can ",(0,r.yg)("strong",{parentName:"p"},"claim")," his Liquid bitcoins creating a special Liquid transaction and broadcast it to the Liquid Network."),(0,r.yg)("h3",{id:"how-a-user-can-peg-in"},"How a user can peg-in?"),(0,r.yg)("p",null,"At the moment the process is quite cumbersome and requires the user to use an Elements node via command line interface. This basically forced the majority of users to use centralized exchanges, involving a custodial process and counterparty risks."),(0,r.yg)("h3",{id:"trustless-peg-in-in-the-browser"},"Trustless peg-in in the browser"),(0,r.yg)("p",null,"TDEX allows anyone to trade Liquid assets freely without being custodian of funds and the major road block to increase TDEX and Liquid Network usage is to let people to get Liquid Bitcoin with their mainchain Bitcoin."),(0,r.yg)("p",null,"Browsers and mobile apps built with web technologies such as React Native or Cordova can now use the npm ",(0,r.yg)("a",{parentName:"p",href:"https://www.npmjs.com/package/pegin"},"pegin")," module and integrate this in few lines of code."),(0,r.yg)("h3",{id:"try-now"},"Try now!"),(0,r.yg)("p",null,"Try the pegin feature, now live in the TDEX mobile app!"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Download iOS from ",(0,r.yg)("a",{parentName:"li",href:"https://apps.apple.com/app/truedex-trading-unleashed/id1545948177"},"App Store")),(0,r.yg)("li",{parentName:"ul"},"Download Android from ",(0,r.yg)("a",{parentName:"li",href:"https://play.google.com/store/apps/details?id=io.sevenlabs.app"},"Play Store")," or install the ",(0,r.yg)("a",{parentName:"li",href:"https://github.com/TDex-network/tdex-app/releases"},"APK from Github Releases"))))}g.isMDXComponent=!0}}]);