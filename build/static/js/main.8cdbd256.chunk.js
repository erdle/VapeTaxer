(this.webpackJsonpstarter=this.webpackJsonpstarter||[]).push([[0],{133:function(e){e.exports=JSON.parse('[{"ID":1,"fname":"Rob","lname":"Eberhardt","username":"robeberhardt","password":"thx1138","email":"rob.eberhardt@gmail.com","position":"Marketing manager","Image":"https://cacdc.org/wp-content/uploads/2016/08/KHowell-Headshot-810x648-275x275.jpg"},{"ID":2,"fname":"Rob","lname":"Eberhardt","username":"robeberhardt","password":"thx1138","email":"rob.eberhardt@gmail.com","position":"Marketing manager","Image":"https://cacdc.org/wp-content/uploads/2016/08/KHowell-Headshot-810x648-275x275.jpg"},{"ID":3,"fname":"Rob","lname":"Eberhardt","username":"robeberhardt","password":"thx1138","email":"rob.eberhardt@gmail.com","position":"Marketing manager","Image":"https://cacdc.org/wp-content/uploads/2016/08/KHowell-Headshot-810x648-275x275.jpg"},{"ID":4,"fname":"Rob","lname":"Eberhardt","username":"robeberhardt","password":"thx1138","email":"rob.eberhardt@gmail.com","position":"Marketing manager","Image":"https://cacdc.org/wp-content/uploads/2016/08/KHowell-Headshot-810x648-275x275.jpg"},{"ID":5,"fname":"Rob","lname":"Eberhardt","username":"robeberhardt","password":"thx1138","email":"rob.eberhardt@gmail.com","position":"Marketing manager","Image":"https://cacdc.org/wp-content/uploads/2016/08/KHowell-Headshot-810x648-275x275.jpg"},{"ID":6,"fname":"Rob","lname":"Eberhardt","username":"robeberhardt","password":"thx1138","email":"rob.eberhardt@gmail.com","position":"Marketing manager","Image":"https://cacdc.org/wp-content/uploads/2016/08/KHowell-Headshot-810x648-275x275.jpg"}]')},152:function(e,a,t){},218:function(e,a,t){e.exports=t(311)},223:function(e,a,t){},224:function(e,a,t){e.exports=t.p+"static/media/logo.5d5d9eef.svg"},311:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),o=t(17),c=t.n(o),l=(t(223),t(11)),i=(t(224),t(9),t(46)),m=t(81),s=(t(152),t(142)),u=t(312),d=t(395),p=t(199),h=(Object(u.a)((function(e){return{root:{display:"flex",flexDirection:"column",alignItems:"center",minHeight:"fit-content"},name:{fontSize:"20px"},avatar:{width:60,height:60}}})),t(388)),b=t(362),g=t(363);t(364);var f=t(370),E=t(368),v=t(382),S=t(369),w=t(390),j=t(365),x=t(371),O=t(386),y=t(131),C=t.n(y),k=t(366),D=t(367),I=function(e){if(!e.ok)throw Error(e.statusText);return e};function N(){return r.a.createElement(p.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(j.a,{color:"inherit",href:"https://qwerty.com/"},"QWERTY")," ",(new Date).getFullYear(),".")}var T=Object(k.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}));function A(){var e=T(),a=Object(n.useState)(""),t=Object(l.a)(a,2),o=t[0],c=t[1],i=Object(n.useState)(""),m=Object(l.a)(i,2),s=m[0],u=m[1];return r.a.createElement(D.a,{component:"main",maxWidth:"xs"},r.a.createElement(E.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(d.a,{className:e.avatar},r.a.createElement(C.a,null)),r.a.createElement(p.a,{component:"h1",variant:"h5"},"Sign in"),r.a.createElement("form",{className:e.form,onSubmit:function(e){e.preventDefault(),function(e,a){fetch("/api/user/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:a})}).then(I).then((function(e){return e.json()}))}(o,s)}},r.a.createElement(v.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",value:o,onChange:function(e){return c(e.target.value)},autoComplete:"email",autoFocus:!0}),r.a.createElement(v.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",value:s,onChange:function(e){return u(e.target.value)}}),r.a.createElement(S.a,{control:r.a.createElement(w.a,{value:"remember",color:"primary"}),label:"Remember me"}),r.a.createElement(f.a,{type:"submit",fullWidth:!0,disabled:!(o.length>0&&s.length>0),variant:"contained",color:"primary",className:e.submit},"Sign In"),r.a.createElement(x.a,{container:!0},r.a.createElement(x.a,{item:!0,xs:!0},r.a.createElement(j.a,{href:"#",variant:"body2"},"Forgot password?")),r.a.createElement(x.a,{item:!0},r.a.createElement(j.a,{href:"#",variant:"body2"},"Don't have an account? Sign Up"))))),r.a.createElement(O.a,{mt:8},r.a.createElement(N,null)))}t(194),Object(k.a)((function(e){return{button:{margin:e.spacing(1)}}}));t(372),t(375),t(108),t(391),t(377),t(378),t(385),t(393),t(397),t(133);var R=t(383),H=t(392),W=t(389),B=t(198),F=t(48),L=t(33),q=function(){var e=Object(n.useState)(!1),a=Object(l.a)(e,2),t=a[0],o=a[1],c=Object(n.useState)(""),i=Object(l.a)(c,2),m=i[0],s=i[1],u=Object(n.useState)(""),d=Object(l.a)(u,2),p=d[0],h=d[1];return r.a.createElement("div",null,r.a.createElement(R.a,null,r.a.createElement(H.a,null,r.a.createElement(H.a.Section,{oneThird:!0},r.a.createElement(W.a,{title:"Some cool stuff coming soon"},r.a.createElement(W.a.Section,null,t?"Generating report...":r.a.createElement("div",null,r.a.createElement(B.a,{size:"large"},"Press button for generating CA report"),r.a.createElement(F.a,null,r.a.createElement(L.a,{primary:!0,onClick:function(){o(!0);var e=new Date("04-01-2021").toISOString(),a=new Date("04-30-2021").toISOString();fetch("/api/reporting/".concat(e,"/").concat(a,"/CA")).then((function(e){return e.blob()})).then((function(e){var a=window.URL.createObjectURL(e);s(a),o(!1)}))}},"April report"),r.a.createElement(L.a,{primary:!0,onClick:function(){o(!0);var e=new Date("03-27-2021").toISOString(),a=new Date("03-31-2021").toISOString();fetch("/api/reporting/".concat(e,"/").concat(a,"/CA")).then((function(e){return e.blob()})).then((function(e){var a=window.URL.createObjectURL(e);h(a),o(!1)}))}},"March report")),r.a.createElement("div",null,m&&r.a.createElement("div",null,r.a.createElement("a",{target:"_blank",href:m,download:"april_CA"},"Download april_CA.pdf")),p&&r.a.createElement("div",null,r.a.createElement("a",{target:"_blank",href:p,download:"march_CA"},"Download march_CA.pdf"))))))),r.a.createElement(H.a.Section,{oneThird:!0}))))};function M(){var e=Object(m.i)();return r.a.createElement(m.d,null,r.a.createElement(m.b,{exact:!0,path:"".concat(e.path,"/"),component:q}))}var P=t(103),U=t(161),K=Object(k.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)}}}));function _(){var e=K(),a=Object(n.useState)(),t=Object(l.a)(a,2),o=(t[0],t[1]),c=Object(n.useReducer)((function(e,a){return Object(U.a)(Object(U.a)({},e),a)}),{firstName:"",lastName:"",email:"",phoneNumber:"",password:""}),i=Object(l.a)(c,2),m=i[0],s=i[1];var u=function(e){var a=e.target.name,t=e.target.value;s(Object(P.a)({},a,t))};return r.a.createElement(D.a,{component:"main",maxWidth:"xs"},r.a.createElement(E.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(d.a,{className:e.avatar},r.a.createElement(C.a,null)),r.a.createElement(p.a,{component:"h1",variant:"h5"},"Sign up"),r.a.createElement("form",{className:e.form,onSubmit:function(e){var a;e.preventDefault(),(a=m,fetch("/api/user/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then(I).then((function(e){return e.json()}))).catch((function(e){return o(e.toString())}))}},r.a.createElement(x.a,{container:!0,spacing:2},r.a.createElement(x.a,{item:!0,xs:12,sm:6},r.a.createElement(v.a,{autoComplete:"fname",name:"firstName",variant:"outlined",required:!0,fullWidth:!0,value:m.firstName,onChange:u,label:"First Name",autoFocus:!0})),r.a.createElement(x.a,{item:!0,xs:12,sm:6},r.a.createElement(v.a,{variant:"outlined",required:!0,fullWidth:!0,value:m.lastName,onChange:u,label:"Last Name",name:"lastName",autoComplete:"lname"})),r.a.createElement(x.a,{item:!0,xs:12},r.a.createElement(v.a,{variant:"outlined",required:!0,fullWidth:!0,value:m.email,onChange:u,label:"Email Address",name:"email",autoComplete:"email"})),r.a.createElement(x.a,{item:!0,xs:12},r.a.createElement(v.a,{variant:"outlined",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",value:m.password,onChange:u,autoComplete:"current-password"}))),r.a.createElement(f.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit},"Sign Up"),r.a.createElement(x.a,{container:!0,justify:"flex-end"},r.a.createElement(x.a,{item:!0},r.a.createElement(j.a,{href:"#",variant:"body2"},"Already have an account? Sign in"))))),r.a.createElement(O.a,{mt:5},r.a.createElement(N,null)))}var J=t(384),z=t(387),Y=t(381),G=t(379),Q=t(380);t(180);function Z(){Object(m.i)();var e=Object(n.useState)(""),a=Object(l.a)(e,2),t=a[0],o=a[1],c=Object(m.g)(),i=Object(n.useCallback)((function(e){return o(e)}),[]),s=r.a.createElement(J.a.SearchField,{placeholder:"Search",value:t,onChange:i}),u=r.a.createElement(J.a,{searchField:s}),d=r.a.createElement(h.a,{location:"/"},r.a.createElement(h.a.Section,{items:[{label:"Back to Shopify",icon:G.a}]}),r.a.createElement(h.a.Section,{separator:!0,title:"Prodify",items:[{onClick:function(){c.push("/dashboard/")},label:"Dashboard",icon:b.a},{onClick:function(){c.push("/dashboard/States")},label:"States",icon:b.a},{onClick:function(){c.push("/dashboard/Taxes")},label:"Taxes",icon:b.a},{onClick:function(){c.push("/dashboard/TaxRates")},label:"TaxRates",icon:b.a},{onClick:function(){c.push("/dashboard/Settings")},label:"Settings",icon:g.a}],action:{icon:Q.a,accessibilityLabel:"Contact support"}}));return r.a.createElement("div",{style:{height:"250px"}},r.a.createElement(z.a,{theme:{colors:{topBar:{background:"#fff",margin:"10px 10px"}},logo:{width:37,topBarSource:"/logo.svg",url:"https://vapejuicedepot.com",accessibilityLabel:"ENDS taxer",contextualSaveBarSource:"/logo.svg"}},i18n:{Polaris:{Frame:{skipToContent:"Skip to content"},ContextualSaveBar:{save:"Save",discard:"Discard"},DropZone:{FileUpload:{actionTitleImage:"Add media",actionHintImage:"or drop files to upload"}},TopBar:{SearchField:{clearButtonLabel:"Clear",search:"Search"}}}}},r.a.createElement(Y.a,{topBar:u,navigation:d},r.a.createElement(H.a.Section,null,r.a.createElement(M,null)))))}function $(e){var a=e.isAuthenticated,t=e.children,n=Object(s.a)(e,["isAuthenticated","children"]);return r.a.createElement(m.b,Object.assign({},n,{render:function(e){e.location;return a?t:r.a.createElement(m.a,{to:"/login"})}}))}function V(e){var a=Object(n.useState)(!1),t=Object(l.a)(a,2),o=(t[0],t[1]),c=Object(n.useState)(!1),s=Object(l.a)(c,2),u=(s[0],s[1]),d=Object(n.useState)(null),p=Object(l.a)(d,2);p[0],p[1];return Object(n.useEffect)((function(){fetch("/api/user/hi").then(I).then((function(e){return e.json()})).then((function(e){return o(e)})).catch((function(e){return u(e.toString())}))}),[]),r.a.createElement(i.a,null,r.a.createElement(m.d,null,r.a.createElement(m.b,{path:"/login",component:A}),r.a.createElement(m.b,{path:"/signup",component:_}),r.a.createElement($,{isAuthenticated:!0,path:"/dashboard"},r.a.createElement(Z,null)),r.a.createElement(m.b,{path:"/",component:A},r.a.createElement(m.a,{to:"/dashboard"}))))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[218,1,2]]]);
//# sourceMappingURL=main.8cdbd256.chunk.js.map