"use strict";(self.webpackChunkdev_portal=self.webpackChunkdev_portal||[]).push([[8246],{3836:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=n(8168),a=(n(6540),n(5680));const o={title:"Run Standalone",sidebar_position:3},i=void 0,l={unversionedId:"provider/daemon/getting_started/run_standalone",id:"version-1.0.0/provider/daemon/getting_started/run_standalone",title:"Run Standalone",description:"In order to run the daemon as a standalone executable you need to:",source:"@site/versioned_docs/version-1.0.0/provider/daemon/getting_started/run_standalone.md",sourceDirName:"provider/daemon/getting_started",slug:"/provider/daemon/getting_started/run_standalone",permalink:"/docs/v1/provider/daemon/getting_started/run_standalone",draft:!1,editUrl:"https://github.com/tdex-network/dev-portal/edit/master/versioned_docs/version-1.0.0/provider/daemon/getting_started/run_standalone.md",tags:[],version:"1.0.0",sidebarPosition:3,frontMatter:{title:"Run Standalone",sidebar_position:3},sidebar:"version-1.0.0/tutorialSidebar",previous:{title:"Run with Docker",permalink:"/docs/v1/provider/daemon/getting_started/run_docker"},next:{title:"Configure the daemon",permalink:"/docs/v1/provider/daemon/getting_started/configure_daemon"}},d={},s=[],p={toc:s},c="wrapper";function u(e){let{components:t,...n}=e;return(0,a.yg)(c,(0,r.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,"In order to run the daemon as a standalone executable you need to:"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},"Download the latest ",(0,a.yg)("a",{parentName:"li",href:"https://github.com/vulpemventures/ocean/releases"},"release")," of the Ocean wallet (",(0,a.yg)("em",{parentName:"li"},"oceand"),") for Linux or MacOS."),(0,a.yg)("li",{parentName:"ol"},"Rename the binary to ",(0,a.yg)("inlineCode",{parentName:"li"},"oceand"),", move it to your ",(0,a.yg)("em",{parentName:"li"},"PATH")," (eg. ",(0,a.yg)("inlineCode",{parentName:"li"},"/usr/local/bin"),"), and grant executable permissions with ",(0,a.yg)("inlineCode",{parentName:"li"},"chmod +x /usr/local/bin/oceand")," "),(0,a.yg)("li",{parentName:"ol"},"Download the latest ",(0,a.yg)("a",{parentName:"li",href:"https://github.com/tdex-network/tdex-daemon/releases"},"releases")," of daemon (",(0,a.yg)("em",{parentName:"li"},"tdexd"),") and CLI (",(0,a.yg)("em",{parentName:"li"},"tdex"),") for Linux or MacOS."),(0,a.yg)("li",{parentName:"ol"},"Rename the binaries to ",(0,a.yg)("inlineCode",{parentName:"li"},"tdexd")," and ",(0,a.yg)("inlineCode",{parentName:"li"},"tdex"),", move them to your ",(0,a.yg)("em",{parentName:"li"},"PATH"),", and grante executable permissions with ",(0,a.yg)("inlineCode",{parentName:"li"},"chmod +x /usr/local/bin/tdexd")," and ",(0,a.yg)("inlineCode",{parentName:"li"},"chmod +x /usr/local/bin/tdex"),".")),(0,a.yg)("p",null,"You're now ready to start the services."),(0,a.yg)("p",null,"Let's start with the Ocean wallet by running it on testnet network with a filesystem db - for the sake of simplicity."),(0,a.yg)("p",null,"Note that the command below redirects all logs produced by the service to the file ",(0,a.yg)("inlineCode",{parentName:"p"},"~/tdex-logs/ocean.logs.txt"),", therefore make sure to create the folder ",(0,a.yg)("inlineCode",{parentName:"p"},"tdex-logs")," in your home directory, or change it if you need."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-bash"},"$ OCEAN_LOG_LEVEL=5 \\\n  OCEAN_NO_TLS=true \\ \n  OCEAN_NO_PROFILER=true \\\n  OCEAN_ELECTRUM_URL=ssl://blockstream.info:465 \\\n  OCEAN_NETWORK=testnet \\\n  OCEAN_UTXO_EXPIRY_DURATION_IN_SECONDS=240 \\ \n  OCEAN_DB_TYPE=badger \\\n  oceand &> ~/tdex-logs/oceand.logs.txt &\n")),(0,a.yg)("p",null,"The default path for the Ocean wallet's datadir is ",(0,a.yg)("inlineCode",{parentName:"p"},"~/.oceand")," for Linux and ",(0,a.yg)("inlineCode",{parentName:"p"},"~/Library/Application\\ Support/Oceand")," for MacOS but you can change it by exporting the env var ",(0,a.yg)("inlineCode",{parentName:"p"},"OCEAN_DATADIR=path/to/datadir")," if you need."),(0,a.yg)("p",null,"You can easily inspect the logs produced by the service at anytime by running ",(0,a.yg)("inlineCode",{parentName:"p"},"more ~/tdex-logs/oceand.logs.txt"),"."),(0,a.yg)("p",null,"Now that the wallet is running, let's start the tdex provider:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-bash"},"$ TDEX_WALLET_ADDR=localhost:18000 \\\n  TDEX_LOG_LEVEL=5 \\\n  TDEX_NO_OPERATOR_TLS=true \\\n  TDEX_CONNECT_PROTO=http \\\n  tdexd &> ~/tdex-logs/tdexd.logs.txt &\n")),(0,a.yg)("p",null,"The daemon's datadir path defaults to ",(0,a.yg)("inlineCode",{parentName:"p"},"~/.tdex-daemon")," for Linux and ",(0,a.yg)("inlineCode",{parentName:"p"},"~/Library/Application\\ Support/Tdex-daemon")," for MacOS but you can change it by exporting the env var ",(0,a.yg)("inlineCode",{parentName:"p"},"TDEX_DATADIR=path/to/datadir")," if you need."),(0,a.yg)("p",null,"The commands above, similarly to the one for starting the wallet, redirects all logs to a file so you can conveniently check the logs of the service at anytime with ",(0,a.yg)("inlineCode",{parentName:"p"},"more ~/tdex-logs/tdexd.logs.txt"),"."),(0,a.yg)("p",null,"If you followed the tutorial until this point, you've successfully started your proivider!"),(0,a.yg)("p",null,"What's next? You can get some insights about ",(0,a.yg)("a",{parentName:"p",href:"/docs/v1/provider/daemon/getting_started/configure_daemon"},"the daemon's configuration"),", or you can take a look at how to ",(0,a.yg)("a",{parentName:"p",href:"/docs/v1/provider/daemon/getting_started/configure_cli"},"configure the CLI")," to setup your markets, deposit and withdraw funds and even more cool stuff."),(0,a.yg)("admonition",{type:"tip"},(0,a.yg)("p",{parentName:"admonition"},"Think about configuring your host so that it keeps these service always up&running with the help of ",(0,a.yg)("inlineCode",{parentName:"p"},"systemd")," or some similar tool.")))}u.isMDXComponent=!0},5680:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>m});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=r.createContext({}),s=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(d.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,d=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=s(n),g=a,m=c["".concat(d,".").concat(g)]||c[g]||u[g]||o;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=g;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l[c]="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"}}]);