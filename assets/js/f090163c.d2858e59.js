"use strict";(self.webpackChunkdev_portal=self.webpackChunkdev_portal||[]).push([[6433],{5680:(e,t,a)=>{a.d(t,{xA:()=>d,yg:()=>m});var r=a(6540);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},s=Object.keys(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),l=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,s=e.originalType,p=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),c=l(a),u=n,m=c["".concat(p,".").concat(u)]||c[u]||g[u]||s;return a?r.createElement(m,o(o({ref:t},d),{},{components:a})):r.createElement(m,o({ref:t},d))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=a.length,o=new Array(s);o[0]=u;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[c]="string"==typeof e?e:n,o[1]=i;for(var l=2;l<s;l++)o[l]=a[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},6744:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>g,frontMatter:()=>s,metadata:()=>i,toc:()=>l});var r=a(8168),n=(a(6540),a(5680));const s={title:"BOTD#4: Trade"},o="Trade protocol",i={unversionedId:"specs/trade-protocol",id:"version-1.0.0/specs/trade-protocol",title:"BOTD#4: Trade",description:"The Trade protocol defines the public interface of a non-custodial exchange on top of an Elements-based chain such as Liquid Network.",source:"@site/versioned_docs/version-1.0.0/specs/04-trade-protocol.md",sourceDirName:"specs",slug:"/specs/trade-protocol",permalink:"/docs/v1/specs/trade-protocol",draft:!1,editUrl:"https://github.com/tdex-network/dev-portal/edit/master/versioned_docs/version-1.0.0/specs/04-trade-protocol.md",tags:[],version:"1.0.0",sidebarPosition:4,frontMatter:{title:"BOTD#4: Trade"},sidebar:"version-1.0.0/tutorialSidebar",previous:{title:"BOTD#3: Swap",permalink:"/docs/v1/specs/swap-protocol"},next:{title:"BOTD#5: Pool",permalink:"/docs/v1/specs/pool-protocol"}},p={},l=[{value:"Overview",id:"overview",level:2},{value:"Trade",id:"trade",level:2},{value:"Data Structures",id:"data-structures",level:3},{value:"Glossary",id:"glossary",level:2}],d={toc:l},c="wrapper";function g(e){let{components:t,...a}=e;return(0,n.yg)(c,(0,r.A)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"trade-protocol"},"Trade protocol"),(0,n.yg)("p",null,"The Trade protocol defines the public interface of a non-custodial exchange on top of an Elements-based chain such as ",(0,n.yg)("a",{parentName:"p",href:"https://liquid.net"},"Liquid Network"),". "),(0,n.yg)("h2",{id:"overview"},"Overview"),(0,n.yg)("p",null,"The centralized exchange main business is providing a venue for ",(0,n.yg)("em",{parentName:"p"},"traders")," and ",(0,n.yg)("em",{parentName:"p"},"market makers")," to register their offers to buy and sell in an order-book. In order to execute the orders, both are required to deposit funds and trust the exchange as custodian.  "),(0,n.yg)("p",null,(0,n.yg)("strong",{parentName:"p"},"TDEX")," aims to create an open network that connects ",(0,n.yg)("em",{parentName:"p"},"traders")," and ",(0,n.yg)("em",{parentName:"p"},"market makers")," directly to each other, without the need of a centralized custodian, exploiting the atomic swap capability of Elements-based chains for executing trades in a trustless fashion."),(0,n.yg)("p",null,"The ",(0,n.yg)("strong",{parentName:"p"},"market makers")," provide always-on endpoints and put liquidity in various asset pairs forming a specified interface called ",(0,n.yg)("strong",{parentName:"p"},"Market"),".  Each ",(0,n.yg)("em",{parentName:"p"},"Market")," holds reserves of a ",(0,n.yg)("strong",{parentName:"p"},"base asset")," and a ",(0,n.yg)("strong",{parentName:"p"},"quote asset"),"."),(0,n.yg)("p",null,"Anyone can become a ",(0,n.yg)("strong",{parentName:"p"},"liquidity provider")," and contribute with reserves in a non-custodial manner running an always-on endpoint to process trading requests. This is different than buying or selling; it requires depositing an equivalent value of both base and quote assets and select an automated market making strategy. "),(0,n.yg)("p",null,"A ",(0,n.yg)("strong",{parentName:"p"},"trader")," connects to the provider using the ",(0,n.yg)("a",{parentName:"p",href:"/docs/v1/specs/transport-protocol"},"secure transport defined in the BOTD #2"),", fetches the current ",(0,n.yg)("em",{parentName:"p"},"market price")," defined by the provider's strategy and makes an atomic swap using the ",(0,n.yg)("a",{parentName:"p",href:"/docs/v1/specs/swap-protocol"},"swap protocol defined in the BOTD #3"),". Limit orders could be supported as well, delaying the time of execution of the swap proposal in the future."),(0,n.yg)("h2",{id:"trade"},"Trade"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},"The ",(0,n.yg)("strong",{parentName:"li"},"Provider")," deposits two reserves for each asset forming a ",(0,n.yg)("em",{parentName:"li"},"Market"),", defined as a pair of BASE ASSET and QUOTE ASSET, and expose a public reachable endpoint."),(0,n.yg)("li",{parentName:"ol"},"The ",(0,n.yg)("strong",{parentName:"li"},"Trader")," fetches from the ",(0,n.yg)("strong",{parentName:"li"},"Provider")," the list of supported pairs and linked provider's fees."),(0,n.yg)("li",{parentName:"ol"},"The ",(0,n.yg)("strong",{parentName:"li"},"Trader")," passing a supported market in the request recognized by the hashes of two assets, fetches the current ",(0,n.yg)("strong",{parentName:"li"},"market rate")),(0,n.yg)("li",{parentName:"ol"},"The ",(0,n.yg)("strong",{parentName:"li"},"Trader")," proposes a new ",(0,n.yg)("strong",{parentName:"li"},"swap request")," using the price given and awaits for Provider's response. The amounts in the swap request must not include the *",(0,n.yg)("em",{parentName:"li"},"trading fees"),", which must be explictly specified by the trader in the trade proposal message. The amounts in the swap request transaction, instead, must include the fees charged either on its inputs or outputs."),(0,n.yg)("li",{parentName:"ol"},"If the ",(0,n.yg)("strong",{parentName:"li"},"Provider")," accepts the terms will send back a ",(0,n.yg)("strong",{parentName:"li"},"swap accept")," message containing the partially signed transaction."),(0,n.yg)("li",{parentName:"ol"},"The ",(0,n.yg)("strong",{parentName:"li"},"Trader")," sends the signed transaction to finalize the trade using the ",(0,n.yg)("strong",{parentName:"li"},"swap complete")," message."),(0,n.yg)("li",{parentName:"ol"},"The ",(0,n.yg)("strong",{parentName:"li"},"Provider")," will finalize and broadcast the transaction to the network for on-chain settlement.")),(0,n.yg)("blockquote",null,(0,n.yg)("p",{parentName:"blockquote"},"NOTICE: The Trader could skip point 6-7 and right away broadcast the transaction himself. Even if valid would be better for clients software to let the Provider be aware of the finalized transaction id rather than watch the blockchain to scan for known swaps.")),(0,n.yg)("h3",{id:"data-structures"},"Data Structures"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},"Service Interface")),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-protobuf"},'syntax = "proto3";\n\nservice TradeService {\n  rpc ListMarkets(ListMarketsRequest) returns (ListMarketsResponse) {\n    option (google.api.http) = {\n      post: "/v2/markets"\n    };\n  }\n  rpc GetMarketBalance(GetMarketBalanceRequest) returns (GetMarketBalanceResponse) {\n    option (google.api.http) = {\n      post: "/v2/market/balance"\n      body: "*"\n    };\n  }\n  rpc GetMarketPrice(GetMarketPriceRequest) returns (GetMarketPriceResponse) {\n    option (google.api.http) = {\n      post: "/v2/market/price"\n      body: "*"\n    };\n  }\n  rpc PreviewTrade(PreviewTradeRequest) returns (PreviewTradeResponse) {\n    option (google.api.http) = {\n      post: "/v2/trade/preview"\n      body: "*"\n    };\n  }\n  rpc ProposeTrade(ProposeTradeRequest) returns (ProposeTradeResponse) {\n    option (google.api.http) = {\n      post: "/v2/trade/propose"\n      body: "*"\n    };\n  }\n  rpc CompleteTrade(CompleteTradeRequest) returns (CompleteTradeResponse) {\n    option (google.api.http) = {\n      post: "/v2/trade/complete"\n      body: "*"\n    };\n  }\n}\n')),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},"Messages ")),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-protobuf"},"message ListMarketsRequest {}\nmessage ListMarketsResponse { repeated MarketWithFee markets = 1; }\n\nmessage GetMarketBalanceRequest { Market market = 1; }\nmessage GetMarketBalanceResponse {\n  Balance balance = 1;\n  Fee fee = 2;\n}\n\nmessage GetMarketPriceRequest { Market market = 1; }\nmessage GetMarketPriceResponse {\n  double spot_price = 1;\n  uint64 min_tradable_amount = 2;\n  Balance balance = 3;\n}\n\nmessage PreviewTradeRequest {\n  Market market = 1;\n  TradeType type = 2;\n  uint64 amount = 3;\n  string asset = 4;\n  string fee_asset = 5;\n}\nmessage PreviewTradeResponse { repeated Preview previews = 1; }\n\nmessage ProposeTradeRequest {\n  Market market = 1;\n  TradeType type = 2;\n  SwapRequest swap_request = 3;\n  uint64 fee_amount = 4;\n  string fee_asset = 5;\n}\nmessage ProposeTradeResponse {\n  SwapAccept swap_accept = 1;\n  SwapFail swap_fail = 2;\n  uint64 expiry_time_unix = 3;\n}\n\nmessage CompleteTradeRequest {\n  SwapComplete swap_complete = 1;\n  SwapFail swap_fail = 2;\n}\nmessage CompleteTradeResponse {\n  string txid = 1;\n  SwapFail swap_fail = 2;\n}\n")),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},"Custom Types ")),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-protobuf"},"enum TradeType {\n  TRADE_TYPE_BUY = 0;\n  TRADE_TYPE_SELL = 1;\n}\nmessage Fee {\n  MarketFee percentage_fee = 1;\n  MarketFee fixed_fee = 2;\n}\nmessage MarketFee {\n  int64 base_asset = 1;\n  int64 quote_asset = 2;\n}\nmessage Balance {\n  uint64 base_amount = 1;\n  uint64 quote_amount = 2;\n}\nmessage Market {\n  string base_asset = 1;\n  string quote_asset = 2;\n}\nmessage MarketWithFee {\n  Market market = 1;\n  Fee fee = 2;\n}\nmessage Price {\n  double base_price = 1;\n  double quote_price = 2;\n}\nmessage Preview {\n  Price price = 1;\n  Fee fee = 2;\n  uint64 amount = 3;\n  string asset = 4;\n  Balance balance = 5;\n  uint64 fee_amount = 5;\n  string fee_asset = 6;\n}\n")),(0,n.yg)("h2",{id:"glossary"},"Glossary"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},(0,n.yg)("strong",{parentName:"p"},"Liquidity Provider"),": Holds reserves of pegged Bitcoin (eg. L-BTC) and an associated Elements asset in his non-custodial wallet, running automated market-making strategies both with or without an oracle. Providers are incentivized to be always on and need to expose a public reachable endpoint either via clearnet or using a ",(0,n.yg)("a",{parentName:"p",href:"https://2019.www.torproject.org/docs/tor-onion-service.html"},"Onion hidden service"))),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},(0,n.yg)("strong",{parentName:"p"},"Market"),": A single provider putting liquidity into an asset pair forms a market defines as ",(0,n.yg)("strong",{parentName:"p"},"BASE_ASSET-QUOTE_ASSET"),". Multiple markets can co-exist, although this is less beneficial for signaling offers to traders. ")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},(0,n.yg)("strong",{parentName:"p"},"Trader"),": Proposes new swaps using the provider's market rate. A trader can come and go, he only needs to support the ",(0,n.yg)("a",{parentName:"p",href:"/docs/v1/specs/swap-protocol"},"swap protocol defined in the BOTD #3")," and he can swap between the two assets in the ",(0,n.yg)("strong",{parentName:"p"},"Market")," in either direction by adding to the liquidity reserve of one and withdrawing from the reserve of the other. Traders can either connect directly to a ",(0,n.yg)("strong",{parentName:"p"},"provider")," if they already know the endpoint.")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},(0,n.yg)("strong",{parentName:"p"},"Pool"),": Providers can register into a distributed service mesh with other providers pooling together liquidity. This acts as a first responder for traders to lookup for provider's aggregated offers. A provider could run alone OR in a pool, but not both at the same time with the same reserves.")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},(0,n.yg)("strong",{parentName:"p"},"Automated Market Making"),": A liquidity provider has full control over the market making strategy to apply needed to calculate the ",(0,n.yg)("strong",{parentName:"p"},"market rate")," at which to accept trades. That being said, there is a possibility to apply an automated market-making relying only on the reserves balances and the amount requested by the trader, without the need to connect to an external price feed. One of the most famous algorithms is called ",(0,n.yg)("em",{parentName:"p"},"constant product market-making"),". In short, this model generates a full order-book based on an initial price for the market. Every transaction that occurs on this market will adjust the prices of the market accordingly. It's a basic supply and demand automated market making system. ")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},(0,n.yg)("strong",{parentName:"p"},"Trading fee"),": A small percentage of the amount of the trade can be taken out by the provider and added to the reserves, besides the network fees. Since the provider is conveniently in charge of paying network fees, and also to discourage low-amount trades, it could also charge an additional fixed fee amount to the trade to be partially reimbursed for this expense.  While the ",(0,n.yg)("em",{parentName:"p"},"BASE_ASSET-QUOTE_ASSET")," reserve ratio is constantly shifting, fees make sure that the total combined reserve size increases with every trade.\nGuaranteed arbitrage opportunities from price fluctuations should push a steady flow of transactions through the system and increase the amount of fee revenue generated.  On the trader side, he can decide to pay the trading fees in either the base or the quote asset of a market. When making a trade proposal, the fees must be explictly specified in the request message along with the swap request one. The swap request's amounts must not include the trading fees while they must be charged to the amounts of the transaction. It is duty of both parties to make sure the amounts presented in the trade proposal request message match those of the transaction they cooperatively build, sign and broadcast.  The trading fees must be either added or substracted to amount_p/amount_r of the swap request depending on the trade type and the asset in which they are going to be payed.  The following table resume all possible cases:"),(0,n.yg)("table",{parentName:"li"},(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Trade type"),(0,n.yg)("th",{parentName:"tr",align:null},"Fee asset"),(0,n.yg)("th",{parentName:"tr",align:"center"},"How to charge"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"BUY"),(0,n.yg)("td",{parentName:"tr",align:null},"base asset"),(0,n.yg)("td",{parentName:"tr",align:"center"},"Subtract")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"BUY"),(0,n.yg)("td",{parentName:"tr",align:null},"quote asset"),(0,n.yg)("td",{parentName:"tr",align:"center"},"Add")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"SELL"),(0,n.yg)("td",{parentName:"tr",align:null},"base asset"),(0,n.yg)("td",{parentName:"tr",align:"center"},"Add")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"SELL"),(0,n.yg)("td",{parentName:"tr",align:null},"quote asset"),(0,n.yg)("td",{parentName:"tr",align:"center"},"Subtract")))))))}g.isMDXComponent=!0}}]);