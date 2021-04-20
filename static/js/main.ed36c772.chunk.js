(this["webpackJsonpreact-plugins-example"]=this["webpackJsonpreact-plugins-example"]||[]).push([[0],{11:function(e,t,n){"use strict";n.r(t);n(4);var r=n(0),i=n.n(r),a=n(2),c=n.n(a),l=i.a.createContext({}),o=function(e){var t=e.children,n=e.store,a=Object(r.useMemo)((function(){return{store:n}}),[n]);return i.a.createElement(l.Provider,{value:a},t)},u=function(){function e(){this.sections={},this.listeners=[]}var t=e.prototype;return t.subscribe=function(e){var t=this;return this.listeners.push(e),function(){t.listeners=t.listeners.filter((function(t){return t!==e}))}},t.registerPlugin=function(e,t,n,r){var i=this;void 0===r&&(r=0);var a=this.sections[e]||[];-1!==a.findIndex((function(e){return e.name===n}))?this.sections[e]=a.map((function(e){return e.name===n?{component:t,priority:r,name:n}:e})):this.sections[e]=[].concat(a,[{component:t,priority:r,name:n}]),this.listeners.forEach((function(e){return e(i.sections)}))},t.removePlugin=function(e,t){var n=this,r=this.sections[e]||[];this.sections[e]=r.filter((function(e){return e.name!==t})),this.listeners.forEach((function(e){return e(n.sections)}))},t.getPluginsForSection=function(e){var t=this.sections[e];return!t||t.length<1?[]:t.sort((function(e,t){return e.priority-t.priority})).map((function(e){return e.component}))},e}(),s=function(e){var t=e.section,n=function(e){var t=Object(r.useContext)(l).store,n=Object(r.useReducer)((function(e){return e+1}),0)[1];Object(r.useEffect)((function(){var e=t.subscribe((function(){n()}));return function(){e()}}));var a=t.getPluginsForSection(e);return Object(r.useMemo)((function(){return a.map((function(e){if(i.a.isValidElement(e))return e;var t=e;return i.a.createElement(t,null)}))}),[a])}(t);return i.a.createElement(i.a.Fragment,null,n.map((function(e,n){return i.a.createElement(i.a.Fragment,{key:t+"-"+n},e)})))},f=function(){return i.a.createElement("div",{style:{width:"calc(100% - 30px)",height:"90px",padding:"10px 15px",backgroundColor:"#95a5a6",display:"flex",alignItems:"center"}},i.a.createElement("h1",{style:{flex:10}},"Logo"),i.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",flex:1}},i.a.createElement(s,{section:"sidebar"})))},m=function(e){var t=e.children;return i.a.createElement("div",{style:{flex:1,padding:"0 15px"}},t)},d=n(1),p=new u,g=function(){return i.a.createElement("div",{style:{cursor:"pointer"},onClick:function(){return alert("Billing clicked")}},i.a.createElement("b",null,"Billing"))},h=function(){var e=Object(r.useState)(!0),t=Object(d.a)(e,2),n=t[0],a=t[1];return Object(r.useEffect)((function(){n?p.registerPlugin("sidebar",g,"billing-widget",0):p.removePlugin("sidebar","billing-widget")})),i.a.createElement("div",{style:{width:"100%"}},i.a.createElement("h2",null,"Billing section"),i.a.createElement("label",null,i.a.createElement("input",{type:"checkbox",checked:n,onChange:function(e){return a(e.target.checked)}})," ","Toggle the billing module on/off"))},b=function(e){var t=e.badgeCount;return i.a.createElement("div",{style:{position:"relative"}},i.a.createElement("b",null,"Admin"),i.a.createElement("span",{style:{backgroundColor:"red",color:"white",width:"27px",height:"25px",fontSize:"11px",fontWeight:"bold",display:"inline-flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",position:"absolute",top:"-90%",left:"90%"}},t>99?"99+":t))},E=function(){var e=Object(r.useState)(0),t=Object(d.a)(e,2),n=t[0],a=t[1];return Object(r.useEffect)((function(){p.registerPlugin("sidebar",i.a.createElement(b,{badgeCount:n}),"admin-widget",-100)})),i.a.createElement("div",{style:{width:"100%"}},i.a.createElement("h2",null,"Admin section"),i.a.createElement("p",null,"Set number of badges in the widget"),i.a.createElement("input",{type:"number",step:"1",min:"0",value:n,onChange:function(e){return a(parseInt(e.target.value,10)||0)}}))},v=function(){return i.a.createElement("div",{style:{width:"100vw",minHeight:"100vh",display:"flex",flexDirection:"column"}},i.a.createElement(f,null),i.a.createElement(m,null,i.a.createElement(h,null),i.a.createElement(E,null)))};c.a.render(i.a.createElement(r.Suspense,{fallback:"Loading..."},i.a.createElement(o,{store:p},i.a.createElement(v,null))),document.getElementById("root"))},3:function(e,t,n){e.exports=n(11)},4:function(e,t,n){}},[[3,1,2]]]);
//# sourceMappingURL=main.ed36c772.chunk.js.map