"use strict";(self.webpackChunkdev_portal=self.webpackChunkdev_portal||[]).push([[9534],{5680:(e,t,n)=>{n.d(t,{xA:()=>d,yg:()=>u});var o=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),l=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):A(A({},t),e)),n},d=function(e){var t=l(e.components);return o.createElement(c.Provider,{value:t},e.children)},p="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},g=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=l(n),g=r,u=p["".concat(c,".").concat(g)]||p[g]||s[g]||a;return n?o.createElement(u,A(A({ref:t},d),{},{components:n})):o.createElement(u,A({ref:t},d))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,A=new Array(a);A[0]=g;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[p]="string"==typeof e?e:r,A[1]=i;for(var l=2;l<a;l++)A[l]=n[l];return o.createElement.apply(null,A)}return o.createElement.apply(null,n)}g.displayName="MDXCreateElement"},6627:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>A,default:()=>s,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var o=n(8168),r=(n(6540),n(5680));const a={title:"TDexdconnect",sidebar_position:5},A=void 0,i={unversionedId:"provider/tdexdconnect",id:"version-0.9.1/provider/tdexdconnect",title:"TDexdconnect",description:"To connect a service with your daemon, like for example the Operator CLI, you have to first configure it, and generally, this is done by creating a configuration file for the service, or by tweaking some flags or environment variables at its startup.",source:"@site/versioned_docs/version-0.9.1/provider/tdexdconnect.md",sourceDirName:"provider",slug:"/provider/tdexdconnect",permalink:"/docs/v0/provider/tdexdconnect",draft:!1,editUrl:"https://github.com/tdex-network/dev-portal/edit/master/versioned_docs/version-0.9.1/provider/tdexdconnect.md",tags:[],version:"0.9.1",sidebarPosition:5,frontMatter:{title:"TDexdconnect",sidebar_position:5},sidebar:"version-0.9.1/tutorialSidebar",previous:{title:"Registry",permalink:"/docs/v0/provider/registry"},next:{title:"Overview",permalink:"/docs/v0/provider/feeder/overview"}},c={},l=[{value:"Generate connection URL for operator CLI",id:"generate-connection-url-for-operator-cli",level:2},{value:"Generate connection URL for TDex Feeder",id:"generate-connection-url-for-tdex-feeder",level:2}],d={toc:l},p="wrapper";function s(e){let{components:t,...n}=e;return(0,r.yg)(p,(0,o.A)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"To connect a service with your daemon, like for example the Operator CLI, you have to first configure it, and generally, this is done by creating a configuration file for the service, or by tweaking some flags or environment variables at its startup."),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"tdexdconnect")," is a service that aims to facilitate this pairing process and make it full-automatized.  "),(0,r.yg)("p",null,"With this service you can generate a single URL or a QRCode that other clients can parse/scan to automatically connect with your daemon's Operator interface, without requiring to configure things like the address and port where to reach it, or whether to use a TLS certificate and macaroon if the auth is enabled."),(0,r.yg)("p",null,"By default, ",(0,r.yg)("inlineCode",{parentName:"p"},"tdexdconnect")," looks into the daemon's datadir (",(0,r.yg)("inlineCode",{parentName:"p"},"~/.tdex-daemon")," in Linux, ",(0,r.yg)("inlineCode",{parentName:"p"},"~/Library/Application\\ Support/Tdex-daemon")," in OSX) to find at least a TLS certificate to encode. If the macaroon file is not found it won't be included because it should mean that the daemon hasn't been initialized yet."),(0,r.yg)("p",null,"The URL generated in this case can be used ",(0,r.yg)("strong",{parentName:"p"},"ONLY")," by the operator CLI. Other applications such as the TDex feeder require also the macaroon to be encoded, therefore make sure to generate the URL with ",(0,r.yg)("inlineCode",{parentName:"p"},"tdexdconnect")," only after the initialization phase has completed for these apps."),(0,r.yg)("p",null,"You can explicitly set where to find a TLS certificate or a macaroon file with the flags ",(0,r.yg)("inlineCode",{parentName:"p"},"--tls_cert_path")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"--macaroons_path"),". The service will return an error in case the files are not found or the paths are invalid."),(0,r.yg)("p",null,"If you have disabled the TLS/macaroon auth on your daemon's Operator interface, you can skip the encoding of the certificate and macaroon with the ",(0,r.yg)("inlineCode",{parentName:"p"},"--insecure")," flag."),(0,r.yg)("h2",{id:"generate-connection-url-for-operator-cli"},"Generate connection URL for operator CLI"),(0,r.yg)("p",null,"After you started up your daemon, you can generate a connection URL with:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"$ tdexdconnect --out url\n# tdexdconnect://localhost:9000?cert=MIICpzCCAk6gAwIBAgIRAL8OABMF9I4BA7qXQaqXwfIwCgYIKoZIzj0EAwIwQjENMAsGA1UEChMEdGRleDExMC8GA1UEAxMoTUJQZGlQaXJhbGJlcnRvLmhvbWVuZXQudGVsZWNvbWl0YWxpYS5pdDAeFw0yMTEwMDcxNDM2MTFaFw0yMjEwMDgxNDM2MTFaMEIxDTALBgNVBAoTBHRkZXgxMTAvBgNVBAMTKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQ6ANPEW3WLpgD6ziosN7PdvRWwg7kYR9CrIu3qvZNychEPC9mUsXKpTVIr5B1xAaFVlCktJ97M_EtDxrUYujJOo4IBIzCCAR8wDgYDVR0PAQH_BAQDAgKkMA8GA1UdEwEB_wQFMAMBAf8wHQYDVR0OBBYEFOjOtc87r1eukTrhwXvns90Fmae4MIHcBgNVHREEgdQwgdGCKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXSCCWxvY2FsaG9zdIIEdW5peIIKdW5peHBhY2tldIcEfwAAAYcQAAAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAQCEC_uSHHLIcEwKgB14cQ_oAAAAAAAACcVyn__lDMuocQ_oAAAAAAAADp7kZyxh-R8IcQ_oAAAAAAAABBBISbVTjXoYcQ_oAAAAAAAACu3kj__gARIjAKBggqhkjOPQQDAgNHADBEAiB92avtyxI535y1zgtEUYSoSpve6rU5mPPU5j7MLm16kwIgfZuZma37mh70_8b659p3yO1-BzI8jFwkzIzbaRnFnnQ\n\n#\xa0Or generate one with no TLS cert/macaroon if auth is disabled\n$ tdexdconnect --out url --insecure\n# tdexdconnect://localhost:9000\n")),(0,r.yg)("p",null,"In case you want to configure your local CLI to connect with a remote daemon, within the machine hosting the daemon run:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},'$ tdexdconnect --out url --rpcserver "1.2.3.4:9000"\n# tdexdconnect://1.2.3.4:9000?cert=MIICpzCCAk6gAwIBAgIRAL8OABMF9I4BA7qXQaqXwfIwCgYIKoZIzj0EAwIwQjENMAsGA1UEChMEdGRleDExMC8GA1UEAxMoTUJQZGlQaXJhbGJlcnRvLmhvbWVuZXQudGVsZWNvbWl0YWxpYS5pdDAeFw0yMTEwMDcxNDM2MTFaFw0yMjEwMDgxNDM2MTFaMEIxDTALBgNVBAoTBHRkZXgxMTAvBgNVBAMTKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQ6ANPEW3WLpgD6ziosN7PdvRWwg7kYR9CrIu3qvZNychEPC9mUsXKpTVIr5B1xAaFVlCktJ97M_EtDxrUYujJOo4IBIzCCAR8wDgYDVR0PAQH_BAQDAgKkMA8GA1UdEwEB_wQFMAMBAf8wHQYDVR0OBBYEFOjOtc87r1eukTrhwXvns90Fmae4MIHcBgNVHREEgdQwgdGCKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXSCCWxvY2FsaG9zdIIEdW5peIIKdW5peHBhY2tldIcEfwAAAYcQAAAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAQCEC_uSHHLIcEwKgB14cQ_oAAAAAAAACcVyn__lDMuocQ_oAAAAAAAADp7kZyxh-R8IcQ_oAAAAAAAABBBISbVTjXoYcQ_oAAAAAAAACu3kj__gARIjAKBggqhkjOPQQDAgNHADBEAiB92avtyxI535y1zgtEUYSoSpve6rU5mPPU5j7MLm16kwIgfZuZma37mh70_8b659p3yO1-BzI8jFwkzIzbaRnFnnQ\n')),(0,r.yg)("p",null,"Change the IP address  ",(0,r.yg)("inlineCode",{parentName:"p"},"1.2.3.4")," in the example with the public one associated with your remote host and make sure to use the correct port based on the configuration of your daemon (the default for the Operator interface is ",(0,r.yg)("inlineCode",{parentName:"p"},"9000"),")."),(0,r.yg)("p",null,"Now, configure the CLI with:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},'$ tdex config connect "tdexdconnect://..."\n#\n# CLI configured via tdexdconnect URL.\n# Check configuration with `tdex config`\n')),(0,r.yg)("p",null,"And this is all you need to do to be ready to ",(0,r.yg)("a",{parentName:"p",href:"/docs/v0/provider/daemon/init_daemon"},"initialize the daemon's wallet"),"."),(0,r.yg)("h2",{id:"generate-connection-url-for-tdex-feeder"},"Generate connection URL for TDex Feeder"),(0,r.yg)("p",null,"The feeder service makes use of a dedicated macaroon file named ",(0,r.yg)("inlineCode",{parentName:"p"},"price.macaroon")," that can be found in the daemon's datadir *",(0,r.yg)("em",{parentName:"p"},"AFTER")," it's been initialized.",(0,r.yg)("br",{parentName:"p"}),"\n","This caveat limits its user to have access only to the UpdateMarketPrice RPC of the Operator interface."),(0,r.yg)("p",null,"To generate a connection URL usable by a feeder service for one of its targets, in the daemon's host run:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"$ tdexdconnect --out url --macaroons_path ~/.tdex-daemon/macaroons/price.macaroon\n# tdexdconnect://localhost:9000?cert=MIICpzCCAk6gAwIBAgIRAL8OABMF9I4BA7qXQaqXwfIwCgYIKoZIzj0EAwIwQjENMAsGA1UEChMEdGRleDExMC8GA1UEAxMoTUJQZGlQaXJhbGJlcnRvLmhvbWVuZXQudGVsZWNvbWl0YWxpYS5pdDAeFw0yMTEwMDcxNDM2MTFaFw0yMjEwMDgxNDM2MTFaMEIxDTALBgNVBAoTBHRkZXgxMTAvBgNVBAMTKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQ6ANPEW3WLpgD6ziosN7PdvRWwg7kYR9CrIu3qvZNychEPC9mUsXKpTVIr5B1xAaFVlCktJ97M_EtDxrUYujJOo4IBIzCCAR8wDgYDVR0PAQH_BAQDAgKkMA8GA1UdEwEB_wQFMAMBAf8wHQYDVR0OBBYEFOjOtc87r1eukTrhwXvns90Fmae4MIHcBgNVHREEgdQwgdGCKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXSCCWxvY2FsaG9zdIIEdW5peIIKdW5peHBhY2tldIcEfwAAAYcQAAAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAQCEC_uSHHLIcEwKgB14cQ_oAAAAAAAACcVyn__lDMuocQ_oAAAAAAAADp7kZyxh-R8IcQ_oAAAAAAAABBBISbVTjXoYcQ_oAAAAAAAACu3kj__gARIjAKBggqhkjOPQQDAgNHADBEAiB92avtyxI535y1zgtEUYSoSpve6rU5mPPU5j7MLm16kwIgfZuZma37mh70_8b659p3yO1-BzI8jFwkzIzbaRnFnnQ&macaroon=AgEFdGRleGQChQEDChAaDhCJUurJJwLVwvzUH-hZEgEwGhUKBm1hcmtldBIEcmVhZBIFd3JpdGUaFwoIb3BlcmF0b3ISBHJlYWQSBXdyaXRlGg4KBXByaWNlEgV3cml0ZRoVCgZ3YWxsZXQSBHJlYWQSBXdyaXRlGhYKB3dlYmhvb2sSBHJlYWQSBXdyaXRlAAAGIHMNd7Gp6l1gYiChAySJ3JmhriJVxW8F7nF2b4aouZXl\n")),(0,r.yg)("p",null,"In the example above the feeder will connect the daemon in localhost, but you can change the daemon's address with the ",(0,r.yg)("inlineCode",{parentName:"p"},"--rpcserver")," flag if you need."),(0,r.yg)("p",null,"You're ready to follow the steps to ",(0,r.yg)("a",{parentName:"p",href:"/docs/v0/provider/feeder/overview#connect-to-target-with-tdexdconnect-url"},"start a feeder service"),"."))}s.isMDXComponent=!0}}]);