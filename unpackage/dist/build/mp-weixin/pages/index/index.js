(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"33b6":function(n,i,t){},"42d4":function(n,i,t){"use strict";t.r(i);var e=t("7127"),a=t("d82c");for(var s in a)"default"!==s&&function(n){t.d(i,n,(function(){return a[n]}))}(s);t("ef5d");var o,c=t("f0c5"),l=Object(c["a"])(a["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],o);i["default"]=l.exports},7127:function(n,i,t){"use strict";t.d(i,"b",(function(){return a})),t.d(i,"c",(function(){return s})),t.d(i,"a",(function(){return e}));var e={nTransition:function(){return t.e("components/n-transition/n-transition").then(t.bind(null,"4e3d"))}},a=function(){var n=this,i=n.$createElement;n._self._c},s=[]},ae97:function(n,i,t){"use strict";(function(n){function e(n){return c(n)||o(n)||s(n)||a()}function a(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(n,i){if(n){if("string"===typeof n)return l(n,i);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?l(n,i):void 0}}function o(n){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(n))return Array.from(n)}function c(n){if(Array.isArray(n))return l(n)}function l(n,i){(null==i||i>n.length)&&(i=n.length);for(var t=0,e=new Array(i);t<i;t++)e[t]=n[t];return e}function r(n,i,t){return i in n?Object.defineProperty(n,i,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[i]=t,n}Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var u=function(){t.e("components/n-transition/n-transition").then(function(){return resolve(t("4e3d"))}.bind(null,t)).catch(t.oe)},m={components:{nTransition:u},data:function(){var n;return n={scrollTop:200,recharge:0,old:{scrollTop:0},goodsItemActive:null},r(n,"recharge",0),r(n,"number",0),r(n,"isShowFillImage",!1),r(n,"BGUrl","https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/bg.jpg"),r(n,"logo","https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/logo.png"),r(n,"avatarList",["https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/avatar1.png","https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/avatar2.png","https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/avatar3.png"]),r(n,"tips","https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/tips.png"),r(n,"inputValue",""),r(n,"chatList",[{id:1,tableNumber:"799",userIcon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/index/user.png",text:"真好听你撒范德萨",type:0},{id:2,tableNumber:"799",userIcon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/index/user.png",text:"系统消息",goodsIcon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol5.png",goodsNumber:15,type:1}]),r(n,"bottomList",[{id:1,icon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol1.png",name:"四叶草",price:60},{id:2,icon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol2.png",name:"四叶草",price:123},{id:3,icon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol3.png",name:"四叶草",price:76},{id:6,icon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol4.png",name:"四叶草",price:79},{id:4,icon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol5.png",name:"四叶草",price:80},{id:5,icon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol6.png",name:"四叶草",price:123},{id:7,icon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol7.png",name:"四叶草",price:45},{id:8,icon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol8.png",name:"四叶草",price:79},{id:9,icon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol7.png",name:"四叶草",price:45},{id:10,icon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol8.png",name:"四叶草",price:79}]),n},onLoad:function(n){setTimeout((function(){console.log("start pulldown")}),1e3),this.getClientHight()},onPullDownRefresh:function(){console.log("refresh"),setTimeout((function(){n.navigateTo({url:"/pages/camera/index"})}),1e3)},methods:{handleGive:function(){var i=this;this.chatList=[].concat(e(this.chatList),[{id:this.chatList.length+1,tableNumber:"799",userIcon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/index/user.png",text:"内容由系统发出",goodsIcon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/static/images/alcohol5.png",goodsNumber:this.number,type:1}]),this.number=0,this.$refs["pop"].hide(),this.$nextTick((function(){var t=n.createSelectorQuery().in(i);t.select("#content").boundingClientRect((function(n){i.scrollTop=n.height})).exec(),i.isShowFillImage=!0,setTimeout((function(){i.isShowFillImage=!1}),4e3)}))},handleConut:function(){this.number++},handleGoodsItem:function(n){this.goodsItemActive=n.id,this.recharge=n.price,this.number=1},getClientHight:function(){n.getSystemInfo({success:function(n){console.log(n.screenHeight)}})},upper:function(n){},lower:function(n){},scroll:function(n){this.old.scrollTop=n.detail.scrollTop},handleFocus:function(n){},getChat:function(n){this.inputValue=n.target.value},handleSubmit:function(){var i=this;this.chatList=[].concat(e(this.chatList),[{id:this.chatList.length+1,tableNumber:"799",userIcon:"https://lilian007.oss-cn-shanghai.aliyuncs.com/mbm/MBMimg/pages/index/user.png",text:this.inputValue,type:0}]),this.inputValue="",this.$nextTick((function(){var t=n.createSelectorQuery().in(i);t.select("#content").boundingClientRect((function(n){i.scrollTop=n.height})).exec()}))},handleGoods:function(){this.$refs["pop"].show()},handleGoUsers:function(){n.navigateTo({url:"/pages/users/index"})}}};i.default=m}).call(this,t("543d")["default"])},bf10:function(n,i,t){"use strict";(function(n){t("6981");e(t("66fd"));var i=e(t("42d4"));function e(n){return n&&n.__esModule?n:{default:n}}n(i.default)}).call(this,t("543d")["createPage"])},d82c:function(n,i,t){"use strict";t.r(i);var e=t("ae97"),a=t.n(e);for(var s in e)"default"!==s&&function(n){t.d(i,n,(function(){return e[n]}))}(s);i["default"]=a.a},ef5d:function(n,i,t){"use strict";var e=t("33b6"),a=t.n(e);a.a}},[["bf10","common/runtime","common/vendor"]]]);