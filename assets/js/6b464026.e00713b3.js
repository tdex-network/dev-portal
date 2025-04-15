"use strict";(self.webpackChunkdev_portal=self.webpackChunkdev_portal||[]).push([[449],{5680:(e,t,n)=>{n.d(t,{xA:()=>l,yg:()=>m});var r=n(6540);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var d=r.createContext({}),c=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},l=function(e){var t=c(e.components);return r.createElement(d.Provider,{value:t},e.children)},p="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,d=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),p=c(n),u=i,m=p["".concat(d,".").concat(u)]||p[u]||y[u]||a;return n?r.createElement(m,s(s({ref:t},l),{},{components:n})):r.createElement(m,s({ref:t},l))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,s=new Array(a);s[0]=u;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o[p]="string"==typeof e?e:i,s[1]=o;for(var c=2;c<a;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},9562:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>s,default:()=>y,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var r=n(8168),i=(n(6540),n(5680));const a={title:"Identity",sidebar_position:2},s=void 0,o={unversionedId:"trader/SDK/Javascript/Identity",id:"version-0.9.1/trader/SDK/Javascript/Identity",title:"Identity",description:"Identities are Javascript objects representing the trader's private key(s). They come from Liquid Development Kit (LDK) and implement the IdentityInterface. tdex-sdk re-exports LDK classes, types and functions.",source:"@site/versioned_docs/version-0.9.1/trader/SDK/Javascript/Identity.md",sourceDirName:"trader/SDK/Javascript",slug:"/trader/SDK/Javascript/Identity",permalink:"/docs/v0/trader/SDK/Javascript/Identity",draft:!1,editUrl:"https://github.com/tdex-network/dev-portal/edit/master/versioned_docs/version-0.9.1/trader/SDK/Javascript/Identity.md",tags:[],version:"0.9.1",sidebarPosition:2,frontMatter:{title:"Identity",sidebar_position:2},sidebar:"version-0.9.1/tutorialSidebar",previous:{title:"Install",permalink:"/docs/v0/trader/SDK/Javascript/install"},next:{title:"Trade",permalink:"/docs/v0/trader/SDK/Javascript/trade"}},d={},c=[{value:"Create a <code>Mnemonic</code> Identity instance",id:"create-a-mnemonic-identity-instance",level:3},{value:"Restore your Identity",id:"restore-your-identity",level:3},{value:"Fetch and unblind UTXOS",id:"fetch-and-unblind-utxos",level:3},{value:"Send a confidential transaction with Mnemonic",id:"send-a-confidential-transaction-with-mnemonic",level:3}],l={toc:c},p="wrapper";function y(e){let{components:t,...n}=e;return(0,i.yg)(p,(0,r.A)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("p",null,"Identities are Javascript objects representing the trader's private key(s). They come from ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/vulpemventures/ldk"},"Liquid Development Kit (LDK)")," and implement the ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/vulpemventures/ldk/blob/master/src/identity/identity.ts#L32-L52"},"IdentityInterface"),". ",(0,i.yg)("inlineCode",{parentName:"p"},"tdex-sdk")," re-exports LDK classes, types and functions."),(0,i.yg)("h3",{id:"create-a-mnemonic-identity-instance"},"Create a ",(0,i.yg)("inlineCode",{parentName:"h3"},"Mnemonic")," Identity instance"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-js"},'import { IdentityOpts, MnemonicOpts, IdentityType, Mnemonic } from "tdex-sdk";\n\nconst options: IdentityOpts<MnemonicOpts> = {\n  chain: "regtest",\n  type: IdentityType.Mnemonic,\n  opts: {\n    mnemonic: "<MNEMONIC WORDS>",\n  },\n};\n\nconst identity = new Mnemonic(options);\n')),(0,i.yg)("h3",{id:"restore-your-identity"},"Restore your Identity"),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"Restorer")," are functions using to restore the mnemonic ",(0,i.yg)("strong",{parentName:"p"},"addresses"),". ",(0,i.yg)("inlineCode",{parentName:"p"},"mnemonicRestorerFromEsplora")," is one of the restorer exported by ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/vulpemventures/ldk"},"LDK"),". It requests an Esplora endpoint to inspect the blockchain. It follows the spec described by ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#the-key-tree"},"BIP32"),"."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-typescript"},'const identity = await mnemonicRestorerFromEsplora(new Mnemonic(options))({\n  esploraURL: "https://blockstream.info/liquid/api", // blockstream explorer URL\n  gapLimit: 20, // default gap limit for BIP44/BIP32 wallet\n});\n\n// the identity\'s addresses already used are re-generated\nconst notUsedAddress = await identity.getNextAddress();\n')),(0,i.yg)("h3",{id:"fetch-and-unblind-utxos"},"Fetch and unblind UTXOS"),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"fetchAndUnblindUtxos")," uses an Esplora endpoint to fetch the identity's unspents."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-typescript"},'const addrs = await identity.getAddresses(); // return all the addresses restored/generated\nconst utxos = await fetchAndUnblindUtxos(\n  addrs, // addrs contains the private blinding keys using to unblind the utxos\n  "https://blockstream.info/liquid/api"\n);\n')),(0,i.yg)("h3",{id:"send-a-confidential-transaction-with-mnemonic"},"Send a confidential transaction with Mnemonic"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-js"},'import {\n  walletFromAddresses,\n  Mnemonic,\n  IdentityType,\n  greedyCoinSelector,\n  address,\n  mnemonicRestorerFromEsplora,\n  decodePset,\n} from "tdex-sdk";\n\n// we\'ll send 850 sats of LBTC (5ac9f65...)\nconst recipientInfos = {\n  value: 850,\n  asset: "5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225",\n  address:\n    "Azpk3oLvSDtYScUcWTc2VDyqj78HmNqPuoYDEGMZtPNLEJmNz33cy36S1cJXAAoikLVf2Zv4muNM2FCQ",\n};\n\nconst network = "regtest"; // "liquid" for mainchain\nconst esploraURL = "http://localhost:3001"; // LDK uses Esplora endpoints to fetch blockchain data\n// you can use Nigiri to run a local regtest node: https://nigiri.vulpem.com/\n\n// Create the Identity\nconst identity = new Mnemonic({\n  chain: network,\n  type: IdentityType.Mnemonic,\n  opts: {\n    mnemonic: "<MNEMONIC WORDS>",\n  },\n});\n\n// Let\'s use Esplora to re-generate already used addresses (LDK restorer)\nconst restoredIdentity = await mnemonicRestorerFromEsplora(identity)({\n  esploraURL,\n  gapLimit: 20,\n});\n\n// Get addresses from identity\nconst addresses = await restoredIdentity.getAddresses();\n\n// create a WalletInterface object from addresses, we\'ll use it to build the PSET\n// `walletFromAddresses` will fetch and unblind unspents.\nconst wallet = await walletFromAddresses(addresses, esploraURL, network);\n\nconst changeAddress = await identity.getNextChangeAddress();\n\n// buildTx lets to create PSET ready to be signed by Identity\nlet tx = wallet.buildTx(\n  wallet.createTx(), // -> create an empty PSET\n  [recipientInfos], // the outputs to create\n  greedyCoinSelector(), // how the build must select the unspents to fund the transaction\n  (asset) => changeAddress.confidentialAddress, // specify to builder the change address to use\n  true // will add the fee output, default to false\n);\n\n// we can blind our transaction using identity\ntx = await identity.blindPset(\n  tx,\n  [0, 1], // 1 is change, 0 is the recipient output\n  new Map().set(\n    0, // here, we only need to specify blinding key for outputs not owned by our identity\n    address.fromConfidential(recipientInfos.address).blindingKey.toString("hex")\n  )\n);\n\n// Now we can sign with identity abstraction\nconst signedTx = await identity.signPset(tx);\n\n// finalize the tx and encode to hex\nconst finalizedTx = decodePset(signedTx)\n  .finalizeAllInputs()\n  .extractTransaction()\n  .toHex();\n\n// finalizedTx can be broadcasted\nconsole.log(finalizedTx);\n')))}y.isMDXComponent=!0}}]);