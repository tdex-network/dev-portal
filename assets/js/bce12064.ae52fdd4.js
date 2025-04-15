"use strict";(self.webpackChunkdev_portal=self.webpackChunkdev_portal||[]).push([[6908],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>m});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=d(e,["components","mdxType","originalType","parentName"]),s=l(n),g=a,m=s["".concat(p,".").concat(g)]||s[g]||u[g]||o;return n?r.createElement(m,i(i({ref:t},c),{},{components:n})):r.createElement(m,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=g;var d={};for(var p in t)hasOwnProperty.call(t,p)&&(d[p]=t[p]);d.originalType=e,d[s]="string"==typeof e?e:a,i[1]=d;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},9797:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>d,toc:()=>l});var r=n(8168),a=(n(6540),n(5680));const o={title:"Run Standalone",sidebar_position:3},i=void 0,d={unversionedId:"provider/daemon/getting_started/run_standalone",id:"version-0.9.1/provider/daemon/getting_started/run_standalone",title:"Run Standalone",description:"In order to run the daemon as a standalone executable you need to:",source:"@site/versioned_docs/version-0.9.1/provider/daemon/getting_started/run_standalone.md",sourceDirName:"provider/daemon/getting_started",slug:"/provider/daemon/getting_started/run_standalone",permalink:"/docs/v0/provider/daemon/getting_started/run_standalone",draft:!1,editUrl:"https://github.com/tdex-network/dev-portal/edit/master/versioned_docs/version-0.9.1/provider/daemon/getting_started/run_standalone.md",tags:[],version:"0.9.1",sidebarPosition:3,frontMatter:{title:"Run Standalone",sidebar_position:3},sidebar:"version-0.9.1/tutorialSidebar",previous:{title:"Run with Docker",permalink:"/docs/v0/provider/daemon/getting_started/run_docker"},next:{title:"Run in Production",permalink:"/docs/v0/provider/daemon/getting_started/run_prod"}},p={},l=[],c={toc:l},s="wrapper";function u(e){let{components:t,...n}=e;return(0,a.yg)(s,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,"In order to run the daemon as a standalone executable you need to:"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Download the latest ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/tdex-network/tdex-daemon/releases"},"releases")," of daemon (",(0,a.yg)("em",{parentName:"p"},"tdexd"),") and CLI (",(0,a.yg)("em",{parentName:"p"},"tdex"),") for Linux or MacOS.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Move the binaries into a folder in your ",(0,a.yg)("em",{parentName:"p"},"PATH")," (eg. ",(0,a.yg)("inlineCode",{parentName:"p"},"/usr/local/bin"),") and rename the daemon as just ",(0,a.yg)("inlineCode",{parentName:"p"},"tdexd")," and the CLI as ",(0,a.yg)("inlineCode",{parentName:"p"},"tdex"),".")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Give them executable permissions. (eg. ",(0,a.yg)("inlineCode",{parentName:"p"},"chmod a+x /usr/local/bin/tdexd")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"chmod a+x /usr/local/bin/tdex"),")"))),(0,a.yg)("p",null,"Now you're ready to start it up:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-bash"},'# Run on Liquid network connecting to blockstream.info for sourcing blockchain data\n$ tdexd\n\n# Run on Liquid connecting to a local explorer\n$ export TDEX_EXPLORER_ENDPOINT="http://127.0.0.1:3001"\n$ tdexd\n\n# Run on Regtest connecting to a local explorer and using regtest LBTC asset hash.\n$ export TDEX_NETWORK="regtest"\n$ export TDEX_BASE_ASSET="5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225"\n$ export TDEX_EXPLORER_ENDPOINT="http://127.0.0.1:3001"\n$ tdexd\n\n# Run on Liquid and specify USDt as base asset instead of default L-BTC\n$ export TDEX_BASE_ASSET="ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2"\n$ tdexd\n')),(0,a.yg)("p",null,"By default, you can find the data directory at the path ",(0,a.yg)("inlineCode",{parentName:"p"},"~/.tdex-daemon")," if using Linux or ",(0,a.yg)("inlineCode",{parentName:"p"},"~/Library/Application\\ Support/Tdex-daemon")," if using MacOs instead."),(0,a.yg)("p",null,"You can change the default path by exporting it into the environment variable ",(0,a.yg)("inlineCode",{parentName:"p"},"TDEX_DATA_DIR_PATH"),". "),(0,a.yg)("p",null,"Next step is to ",(0,a.yg)("a",{parentName:"p",href:"/docs/v0/provider/daemon/getting_started/configure_cli"},"configure the operator CLI"),"."))}u.isMDXComponent=!0}}]);