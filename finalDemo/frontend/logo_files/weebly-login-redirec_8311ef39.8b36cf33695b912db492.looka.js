(window.webpackJsonp=window.webpackJsonp||[]).push([["pages/account-settings~pages/assets~pages/checkout-weebly~pages/generator~pages/weebly-login-redirec~8311ef39"],{676:function(e,t,a){"use strict";a.d(t,"a",function(){return d});var n=a(1),r=a.n(n),o=a(8),i=a.n(o),c=a(94),l=a.n(c);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function u(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p={star:"star",menu:"menu",phone:"phone",arrow:"play_arrow",heart:"favorite",info:"info",lock:"lock",check:"check",close:"close",add:"add",subtract:"remove",delete:"delete",undo:"undo",redo:"redo",share:"share",link:"link","shopping-cart":"shopping_cart","check-in-circle":"check_circle","empty-heart":"favorite_border","up-arrow":"arrow_drop_up","down-arrow":"arrow_drop_down","left-arrow":"arrow_back","right-arrow":"arrow_forward","expand-up":"expand_less","left-chevron":"keyboard_arrow_left","right-chevron":"keyboard_arrow_right"};function d(e){var t=e.name,a=e.className,n=u(e,["name","className"]),o=l()(function(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}({"material-icons":!0},a,!0));return r.a.createElement("i",s({className:o},n),p[t])}d.propTypes={name:i.a.string,className:i.a.oneOfType([i.a.string,i.a.object])}},687:function(e,t,a){"use strict";a.d(t,"a",function(){return y});var n=a(1),r=a.n(n),o=a(11),i=a(53),c=a(94),l=a.n(c),s=a(66),u=a.n(s);function p(e){"@babel/helpers - typeof";return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var a,n=h(e);if(t){var r=h(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return function(e,t){if(t&&("object"===p(t)||"function"==typeof t))return t;return m(e)}(this,a)}}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var v={container:Object(o.a)({position:"relative"}),toolTip:Object(o.a)(g({opacity:0,visibility:"hidden",position:"absolute",top:"calc(100% + 5px)",left:"50%",transform:"translateX(-50%)",transition:"opacity 600ms ease",backgroundColor:"#222",color:"#fff",padding:"10px 12px",borderRadius:4,fontSize:14,fontWeight:500,zIndex:99999,whiteSpace:"nowrap",":after":{content:'""',position:"absolute",bottom:"100%",left:"50%",border:"solid transparent",height:0,width:0,borderColor:" rgba(34, 34, 34, 0)",borderBottomColor:"#222",borderWidth:5,marginLeft:-5}},"@media (max-width: ".concat(i.c,"px)"),{display:"none"})),activeTooltip:Object(o.a)({opacity:1,visibility:"visible"})},y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(a,n["Component"]);var t=f(a);function a(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),n=t.call(this,e),u()(m(n)),n.state={hovered:!1},n}return function(e,t,a){t&&d(e.prototype,t),a&&d(e,a)}(a,[{key:"onMouseEnter",value:function(){this.setState({hovered:!0})}},{key:"onMouseLeave",value:function(){this.setState({hovered:!1})}},{key:"render",value:function(){var e,t=this.props,a=t.text,n=t.children,o=t.className,i=t.isDisabled;if(!a)return n;var c=(g(e={},v.toolTip,!0),g(e,v.activeTooltip,this.state.hovered),e);o&&(c["".concat(o)]=!0);var s=l()(c);return r.a.createElement(r.a.Fragment,null,i?n:r.a.createElement("span",{className:v.container,onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave},n,r.a.createElement("div",{className:s},a)))}}]),a}()},702:function(e,t,a){"use strict";a.d(t,"b",function(){return r}),a.d(t,"a",function(){return o});var n=a(7),r=function(){return{type:n.A}},o=function(){return{type:n.b}}},722:function(e,t,a){"use strict";var n=a(1),r=a.n(n),o=a(11),i=a(8),c=a.n(i),l=a(25);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var u={container:Object(o.a)({position:"fixed",top:0,zIndex:111,pointerEvents:"none",overflow:"hidden",width:"100%",height:"100%"}),activeContainer:Object(o.a)({pointerEvents:"all"}),overlay:Object(o.a)({position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0, 0, 0, .4)",opacity:0,pointerEvents:"none",transition:"all 0.3s linear"}),activeOverlay:Object(o.a)({opacity:1,pointerEvents:"all"}),root:function(e){return Object(o.a)({transition:"all 500ms cubic-bezier(0.45, 0.01, 0.04, 0.98)",willChange:"transform",width:420,top:10,height:"calc(100% - 20px)",overflow:"hidden",borderRadius:e.styles.borderRadius,background:e.palette.ui.background,position:"fixed","@media (max-width: 425px)":{width:"calc(100% - 20px)"}})},left:Object(o.a)({transform:"translateX(-420px)"}),leftActive:Object(o.a)({transform:"translateX(10px)"}),right:Object(o.a)({right:0,transform:"translateX(420px)"}),rightActive:Object(o.a)({transform:"translateX(-10px)"}),scroll:Object(o.a)({overflow:"scroll"})},p=function(e){var t,a,n,i=e.theme,c=e.children,l=e.isOpen,p=e.onCloseSidebar,d=e.scroll,b=e.large,f=e.side,m=Object(o.b)((s(t={},u.overlay,!0),s(t,u.activeOverlay,l),t)),h=Object(o.b)((s(a={},u.root(i,b),!0),s(a,u[f],!0),s(a,u.activeSidebar,l),s(a,u["".concat(f,"Active")],l),s(a,u.scroll,d),a)),g=Object(o.b)((s(n={},u.container,!0),s(n,u.activeContainer,l),n));return r.a.createElement("div",{className:g},r.a.createElement("div",{onClick:p,className:m}),r.a.createElement("div",{className:h},c))};p.propTypes={children:c.a.node,isOpen:c.a.bool,onCloseSidebar:c.a.func,side:c.a.string,scroll:c.a.bool,large:c.a.bool,theme:c.a.object.isRequired},p.defaultProps={side:"right"},t.a=Object(l.b)(p)},729:function(e,t,a){"use strict";var n=a(1),r=a.n(n),o=a(8),i=a.n(o),c=a(11),l=a(676),s=a(25),u={button:Object(c.a)({cursor:"pointer",padding:8,border:0,fontSize:0,zIndex:1}),icon:function(e,t){return Object(c.a)({color:t?e.editor.palette.ui[300]:e.palette.text.primary})}};function p(e){var t=e.theme,a=e.onOpenSidebar,n=e.darkMode;return r.a.createElement("button",{onClick:a,className:u.button},r.a.createElement(l.a,{className:u.icon(t,n),name:"menu"}))}t.a=Object(s.b)(p),p.propTypes={darkMode:i.a.bool,onOpenSidebar:i.a.func,theme:i.a.object.isRequired}},746:function(e,t,a){"use strict";var n=a(34),r=a(702),o=a(69),i=a(44),c=a(1),l=a.n(c),s=a(11),u=a(8),p=a.n(u),d=a(672),b=a.n(d),f=a(722),m=a(35),h=a(676),g=a(25),v=a(0);function y(){return(y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function O(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function j(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var w={root:Object(s.a)({overflow:"hidden"}),footer:function(e){return Object(s.a)({position:"absolute",bottom:0,width:"100%",background:e.palette.ui.divider,padding:"10px 10px 10px 30px",margin:0})},footerDiv:Object(s.a)({display:"inline"}),footerItem:function(e){return Object(s.a)({listStyle:"none",display:"inline-block",fontSize:13,cursor:"pointer",color:e.palette.text.primary,padding:"5px 0",paddingRight:"20px"," a":{color:e.palette.text.primary}})},header:function(e){return Object(s.a)({background:e.palette.primary.main,padding:10})},username:function(e){return Object(s.a)({color:e.palette.primary.contrastText,fontSize:16,fontWeight:600})},menu:Object(s.a)({height:"calc(100vh - 131px)",marginTop:30,paddingBottom:40,position:"relative",overflow:"auto"}),linkItem:Object(s.a)({textDecoration:"none"}),menuItem:function(e){return Object(s.a)({color:e.palette.text.primary,fontSize:16,padding:"12px 30px",margin:0,fontWeight:600,cursor:"pointer",letterSpacing:0,":hover":{background:e.palette.ui.divider}})},activeHeader:Object(s.a)({padding:"30px"}),close:function(e){return Object(s.a)({color:e.palette.primary.contrastText,fontSize:"5px",paddingLeft:"15px",marginLeft:"auto"})},icon:Object(s.a)({cursor:"pointer"}),divider:function(e){return Object(s.a)({position:"relative",marginBottom:50,"&:after":{content:'""',width:"calc(100% - 60px)",height:"1px",position:"absolute",background:e.palette.ui.divider,bottom:-25,left:30}})},dividerHeader:Object(s.a)({paddingLeft:25,fontSize:20})},x=function(e){var t=e.theme,a=e.isAuthenticated,n=e.onLogout;return l.a.createElement("ul",{className:w.footer(t)},a&&l.a.createElement("div",{className:w.footerDiv},l.a.createElement(b.a,{to:"/account-settings"},l.a.createElement("li",{className:w.footerItem(t)},"Account")),l.a.createElement("li",{onClick:n,className:w.footerItem(t)},"Log Out")),l.a.createElement("li",{className:w.footerItem(t)},l.a.createElement("a",{href:"/terms",target:"_blank",rel:"noopener noreferrer"},"Terms of Service")),l.a.createElement("li",{className:w.footerItem(t)},l.a.createElement("a",{href:"/privacy",target:"_blank",rel:"noopener noreferrer"},"Privacy")))};function E(e){var t,a=e.theme,n=e.isAuthenticated,r=e.userName,o=e.onLogin,i=e.onRegister,c=e.onLogout,u=e.onCloseSidebar,p=e.brands,d=e.isBrandkitUser,g=j(e,["theme","isAuthenticated","userName","onLogin","onRegister","onLogout","onCloseSidebar","brands","isBrandkitUser"]),E=Object(s.b)((O(t={},w.header(a),!0),O(t,w.activeHeader,n),t)),k=p&&0!==p.length;return l.a.createElement(f.a,y({onCloseSidebar:u},g),l.a.createElement("div",{className:w.root},l.a.createElement(m.a,{className:E,justify:"start",align:"end"},l.a.createElement("span",{className:w.username(a)},r),l.a.createElement("div",{className:w.close(a)},l.a.createElement(h.a,{className:w.icon,name:"close",onClick:u}))),l.a.createElement(m.a,{className:w.menu,column:!0},n&&l.a.createElement("div",null,k&&l.a.createElement("div",{className:w.divider(a)},l.a.createElement("h4",{className:w.dividerHeader},"Brands"),p.map(function(e){var t=e.id,n=e.name,r=e.logoPackage;return l.a.createElement(b.a,{to:d&&r&&r.includes("brand-kit")?"/brandkit/".concat(t):"/brands/".concat(t),key:"sidebar-".concat(t),className:w.linkItem},l.a.createElement("p",{className:w.menuItem(a)},n))})),l.a.createElement("div",null,l.a.createElement("h4",{className:w.dividerHeader},"Logos"),l.a.createElement(b.a,{to:"/dashboard",className:w.linkItem},l.a.createElement("p",{className:w.menuItem(a)},"Saved logos")),l.a.createElement(b.a,{to:{type:v.lb,meta:{shouldResetGenerator:!0}},className:w.linkItem},l.a.createElement("p",{className:w.menuItem(a)},"Logo Generator")),!1)),!n&&l.a.createElement("div",null,l.a.createElement("p",{onClick:o,className:w.menuItem(a)},"Log in"),l.a.createElement("p",{onClick:i,className:w.menuItem(a)},"Register"))),l.a.createElement(x,{theme:a,isAuthenticated:n,onLogout:c})))}x.propTypes={isAuthenticated:p.a.bool,onLogout:p.a.func,theme:p.a.object.isRequired};var k=Object(g.b)(E);E.propTypes={isAuthenticated:p.a.bool,userName:p.a.string,onLogin:p.a.func,onRegister:p.a.func,onLogout:p.a.func,onCloseSidebar:p.a.func,brands:p.a.array,isBrandkitUser:p.a.bool,theme:p.a.object.isRequired};var N=a(77),S=a(159),_=a(110),C={onCloseSidebar:r.a,onLogin:i.b,onRegister:i.d,onLogout:o.g,requestPurchasedBrands:S.e};t.a=Object(n.connect)(function(e){return{isOpen:e.ui.isSidebarOpen,isAuthenticated:Object(N.a)(e),userName:function(e){if(!Object(N.a)(e))return"";var t=e.auth.user.display_name||e.auth.user.full_name;return e.auth.user.displayName||t}(e),brands:e.brands,isBrandkitUser:Object(_.a)(e.auth.user.id)}},C)(k)},751:function(e,t,a){"use strict";var n=a(1),r=a.n(n),o=a(11),i=a(8),c=a.n(i),l=a(746),s=a(826),u=a(25);function p(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var d=function(e){return Object(o.a)({background:e.palette.ui.background,width:"100%",minHeight:"100%",position:"absolute"})};function b(e){var t=e.theme,a=e.children,n=p(e,["theme","children"]);return r.a.createElement("div",{className:d(t)},r.a.createElement("div",null,a),r.a.createElement(s.a,n),r.a.createElement(l.a,null))}t.a=Object(u.b)(b),b.propTypes={children:c.a.node,theme:c.a.object.isRequired}},826:function(e,t,a){"use strict";var n=a(34),r=a(1),o=a.n(r),i=a(11),c=a(8),l=a.n(c),s=a(672),u=a.n(s),p=a(35),d=a(676),b=a(687),f=a(729),m=a(25),h=a(53);function g(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var v={root:Object(i.a)({position:"fixed",top:0,left:0,width:"100%",height:70,padding:"0 20px",zIndex:110,justifyContent:"space-between",flexDirection:"row",display:"flex",alignItems:"center",backdropFilter:"saturate(180%) blur(20px)",backgroundColor:"rgba(255, 255, 255, 0.85)",boxShadow:"0 1px 0 0 rgba(0,0,0,0.05)"}),horizontalExplore:Object(i.a)(g({},"@media screen and (min-width: ".concat(h.d,"px)"),{width:"100vw"})),button:function(e){return Object(i.a)({height:"36px",cursor:"pointer",border:"none",float:"left",padding:"0 15px",borderRadius:e.styles.borderRadius,":hover":{background:"#F5F6F8"}})},logo:function(e){return Object(i.a)({position:"relative",top:2,"& img":{width:e.logo.width}})},fav:function(e){return Object(i.a)({width:"0px",height:"0px",background:e.palette.common.error,borderRadius:"100%",fontSize:"0px",lineHeight:"0px",color:e.palette.common.white,textAlign:"center",position:"absolute",left:"20px",top:"0px"})},newFav:Object(i.a)({transition:"all 0.3s cubic-bezier(0.510, 0.190, 0.000, 1.570)",width:"18px",fontSize:"10px",lineHeight:"18px",height:"18px",left:"11px",top:"-5px"}),headerIcon:Object(i.a)({minWidth:50}),icon:function(e){return Object(i.a)({color:e.palette.text.primary})}};function y(e){var t,a=e.theme,n=e.onOpenSidebar,r=e.onOpenFavouriter,c=e.onBack,l=e.hasBack,s=e.hasFavourite,m=e.hasNewFavourite,h=Object(i.b)(g({},v.root,!0)),y=Object(i.b)((g(t={},v.fav(a),!0),g(t,v.newFav,Boolean(m>0)),t));return o.a.createElement("div",{className:h},o.a.createElement("div",{className:v.headerIcon},l&&o.a.createElement(p.a,{onClick:c,className:"".concat(v.button(a)," ").concat(v.backButton),justify:"start",align:"center"},o.a.createElement(d.a,{className:v.icon(a),name:"left-arrow"})),s&&o.a.createElement(p.a,{onClick:r,className:"".concat(v.button(a)," ").concat(v.favouriteButton),justify:"start",align:"center",tagName:"button"},o.a.createElement(b.a,{text:"Saveds"},o.a.createElement("img",{src:"https://cdn.logojoy.com/app/editor/ic_heart.svg",alt:"Save your logo"}),o.a.createElement("div",{className:y},m>0?m:"")))),o.a.createElement(p.a,{className:v.logo(a),align:"center",justify:"center",auto:!0},o.a.createElement(u.a,{to:"/dashboard"},o.a.createElement("img",{src:"light"===a.palette.type?a.logo.dark:a.logo.light,alt:"Navigate to dashboard. Caution: this will navigate you away from your current page"}))),o.a.createElement(f.a,{onOpenSidebar:n}))}var O=Object(m.b)(y);y.defaultProps={onBack:function(){}},y.propTypes={onOpenSidebar:l.a.func,onOpenFavouriter:l.a.func,onBack:l.a.func,hasBack:l.a.bool,hasFavourite:l.a.bool,hasNewFavourite:l.a.number,theme:l.a.object.isRequired};var j={onOpenSidebar:a(702).b};t.a=Object(n.connect)(null,j)(O)}}]);
//# sourceMappingURL=weebly-login-redirec~8311ef39.8b36cf33695b912db492.looka.js.map