//devin87@qq.com
//build:2015/10/15 15:55:08
!function(t,e){"use strict";function i(t){switch(t){case S:return"准备中";case M:return"上传中";case C:return"已完成";case P:return"已跳过";case z:return"已取消";case O:return"已失败"}return t}function a(){var e=t.XMLHttpRequest;e&&(new e).upload&&t.FormData&&(y=!0);var i=document.createElement("input");i.type="file",b=!!i.files,E=y}function r(t,e){var i=t.lastIndexOf(e);return-1!=i?t.slice(i):""}function n(t){if(t){for(var e=t.split(","),i={},a=0,r=e.length;r>a;a++)i[e[a]]=!0;return i}}function s(t,e){t.attachEvent?t.attachEvent("onload",e):t.addEventListener("load",e,!1)}function o(t,e,i){if(e&&!(0>=e)){var a,r=Date.now();if(i>=e)return a=r-t.timeStart,a&&(t.avg_speed=Math.min(Math.round(1e3*e/a),e)),void(t.timeEnd=r);a=r-t.time,200>a||(t.speed=Math.min(Math.round(1e3*(i-t.loaded)/a),t.total),t.time=r)}}function d(t){var e=this;e.guid=t.guid||"uploader"+ ++I,e.url=t.url,e.dataType=t.dataType||"json",e.data=t.data,e.target=t.target,e.html5=y&&!!l(t.html5,!0),e.multiple=b&&e.html5&&!!l(t.multiple,!0),e.clickTrigger=E&&!!l(t.clickTrigger,!0),e.workerThread=e.html5?t.workerThread||1:1,e.workerIdle=e.workerThread,e.auto=t.auto!==!1,e.upName=t.upName||"upfile",e.allows=n(t.allows),e.disallows=n(t.disallows),e.container=t.container||document.body,t.getPos&&(e.getPos=t.getPos);var i=t.UI||{};i.init&&(e.init=i.init),i.draw&&(e.draw=i.draw),i.update&&(e.update=i.update),i.over&&(e.over=i.over),e.fns=t.on||{},e.ops=t,e.list=[],e.map={},e.index=0,e.started=!1,e._init()}var l=Q.def,u=Q.fire,c=Q.extend,p=Q.getFirst,f=Q.getLast,v=JSON.parse,h=Q.createEle,m=Q.parseHTML,g=Q.setOpacity,w=Q.getOffset,_=Q.event,x=_.add,T=_.trigger,k=_.stop,y=!1,b=!1,E=!1,I=0,L=0,N=0,S=0,M=1,C=2,P=-1,z=-2,O=-3;d.prototype={constructor:d,_init:function(){var t=this;if(!t._inited){t._inited=!0;var i=t.guid,a=t.target,r=t.container,n=h("div","upload-input "+i);if(r.appendChild(n),t.boxInput=n,!t.html5){var o="upload_iframe_"+i,d='<iframe class="u-iframe" name="'+o+'"></iframe><form class="u-form" action="" method="post" enctype="multipart/form-data" target="'+o+'"></form>',l=h("div","upload-html4 "+i,d);r.appendChild(l);var u=p(l),c=f(l);t.iframe=u,t.form=c,s(u,function(){if(0==t.workerIdle){var i;try{i=u.contentWindow.document.body.innerHTML}catch(a){}t.complete(e,C,i)}})}return t.clickTrigger?x(a,"click",function(e){t.fire("select",e)!==!1&&(t.resetInput(),T(t.inputFile,"click"))}):(x(n,"click",function(e){t.fire("select",e)===!1&&k(e)}),g(n,0),t.resetInput()),t.fire("init"),t.run("init")}},resetInput:function(){var t=this,e=t.boxInput,i=t.target,a=i.offsetWidth,r=i.offsetHeight;e.innerHTML='<input type="file" name="'+t.upName+'" style="'+(t.clickTrigger?"visibility: hidden;":"width:"+a+"px;height:"+r+"px;font-size:100px;")+'"'+(t.multiple?' multiple="multiple"':"")+">",e.style.width=a+"px",e.style.height=r+"px";var n=p(e);return x(n,"change",function(e){t.add(this),t.html5||t.resetInput()}),t.inputFile=n,t.updatePos(),t},updatePos:function(t){if(!this.clickTrigger){var e=this.getPos||w,i=this.boxInput,a=this.target,r=0==a.offsetWidth?{left:-1e4,top:-1e4}:e(a);i.style.left=r.left+"px",i.style.top=r.top+"px",t&&(i.style.zIndex=++N)}},fire:function(t,e,i){if(!i)return u(this.fns[t],this,e);var a=this.fns[t+"Async"];return a?u(a,this,e,i):void i(u(this.fns[t],this,e))},run:function(t,e){var i=this[t];return i&&u(i,this,e),this},addTask:function(t,e,i){if(t||e){var a,n;e?(a=e.name||e.fileName,n=e.size||e.fileSize):(a=r(t.value,"\\").slice(1)||t.value,n=-1);var s=this,o=r(a,".").toLowerCase(),d=s.disallows&&s.disallows[o]||s.allows&&!s.allows[o],l={id:++L,name:a,ext:o,size:n,input:t,file:e,arg:i,state:d?P:S};return d&&(l.disabled=!0),s.fire("add",l,function(t){t===!1||l.disabled||(l.index=s.list.length,s.list.push(l),s.map[l.id]=l,s.run("draw",l),s.auto&&s.start())}),l}},add:function(t){var i=this;if("INPUT"==t.tagName){var a=t.files;if(a)for(var r=0,n=a.length;n>r;r++)i.addTask(t,a[r]);else i.addTask(t)}else i.addTask(e,t)},addList:function(t){for(var e=0,i=t.length;i>e;e++)this.add(t[e])},get:function(t){return t!=e?this.map[t]:void 0},cancel:function(t){var e=this,i=e.get(t);if(i){var a=i.state;if(a!=S&&a!=M)return e;if(a==M){var r=i.xhr;if(r)return r.abort(),e;e.iframe.contentWindow.location="about:blank"}return e.complete(i,z)}},remove:function(t){var e=this.get(t);e&&(e.state==M&&this.cancel(t),e.deleted=!0,this.fire("remove",e))},start:function(){var t=this,e=t.workerIdle,i=t.list,a=t.index,r=i.length;if(t.started||(t.started=!0),0>=r||a>=r||0>=e)return t;var n=i[a];return t.index++,t.upload(n)},upload:function(t){var e=this;return t&&t.state==S?(t.url=e.url,e.workerIdle--,e.fire("upload",t,function(i){return i===!1?e.complete(t,P):void(e.html5&&t.file?e._upload_html5(t):t.input?e._upload_html4(t):e.complete(t,P))}),e):e.start()},_process_params:function(t,e){this.data&&Object.forEach(this.data,e),t.data&&Object.forEach(t.data,e)},_upload_html5:function(t){var e=this,i=new XMLHttpRequest;t.xhr=i,i.upload.addEventListener("progress",function(i){e.progress(t,i.total,i.loaded)},!1),i.addEventListener("load",function(i){e.complete(t,C,i.target.responseText)},!1),i.addEventListener("error",function(){e.complete(t,O)},!1),i.addEventListener("abort",function(){e.complete(t,z)},!1);var a=new FormData;e._process_params(t,function(t,e){a.append(t,e)}),a.append(e.upName,t.file),i.open("POST",t.url),i.setRequestHeader("X-Requested-With","XMLHttpRequest"),e.fire("send",t,function(r){return r===!1?e.complete(t,P):(i.send(a),void e._afterSend(t))})},_upload_html4:function(t){var e=this,i=e.form,a=t.input;return a._uploaded?e.complete(t,C):(a._uploaded=!0,a.name=e.upName,i.innerHTML="",i.appendChild(a),i.action=t.url,e._process_params(t,function(t,e){i.appendChild(m('<input type="hidden" name="'+t+'" value="'+e+'">'))}),void e.fire("send",t,function(a){return a===!1?e.complete(t,P):(i.submit(),void e._afterSend(t))}))},_afterSend:function(t){t.time=t.timeStart=Date.now(),t.state=M,this._lastTask=t,this.progress(t)},progress:function(t,e,i){e||(e=t.size),(!i||0>i)&&(i=0);var a=t.state||S;i>e&&(i=e),i>0&&a==S&&(t.state=a=M);var r=a==C;r&&(e=i=t.size),o(t,e,i),t.total=e,t.loaded=i,this.fire("progress",t),this.run("update",t)},_process_response:function(t,e){t.response=e,e&&"json"==this.dataType&&(t.json=v(e))},complete:function(t,i,a){var r=this;return t||1!=r.workerThread||(t=r._lastTask),t&&(i!=e&&(t.state=i),t.state==M&&(t.state=C,r.progress(t,t.size,t.size)),a!==e&&r._process_response(t,a)),i==z&&r.fire("cancel",t),r.fire("complete",t),r.run("over",t).run("update",t),r.workerIdle++,r.started&&r.start(),r}},d.extend=function(t,e){c(d.prototype,t,e)},a(),c(d,{support:{html5:y,multiple:b},READY:S,PROCESSING:M,COMPLETE:C,SKIP:P,CANCEL:z,ERROR:O,getStatusText:i}),Q.Uploader=d}(window),function(t,e){"use strict";function i(t,e){t.className+=" "+e}function a(t,e){t&&(t.innerHTML=e||"")}var r=Q.def,n=Q.getFirst,s=Q.getLast,o=Q.getNext,d=Q.createEle,l=Q.formatSize,u=Q.event,c=u.add,p=Q.Uploader;p.extend({init:function(){var t=this.ops.view;t&&i(t,this.html5?"html5":"html4")},draw:function(t){var e=this,i=e.ops,a=i.view;if(a){var o=i.button||{},l=r(o.cancel,"取消"),u=r(o.remove,"删除"),p=t.name,f='<div class="fl"><div class="u-name" title="'+p+'">'+p+'</div></div><div class="fr"><div class="fl u-size"></div><div class="fl u-speed">--/s</div><div class="fl u-progress-bar"><div class="u-progress" style="width:1%;"></div></div><div class="fl u-detail">0%</div><div class="fl u-state"></div><div class="fl u-op"><a class="u-op-cancel">'+l+'</a><a class="u-op-remove">'+u+'</a></div></div><div class="clear"></div>',v=t.id,h=d("div","u-item",f);h.taskId=v,t.box=h,a.appendChild(h);var m=s(h.childNodes[1]),g=n(m),w=s(m);c(g,"click",function(){e.cancel(v)}),c(w,"click",function(){e.remove(v),a.removeChild(h)}),e.update(t)}},update:function(t){if(t&&t.box){var i=t.total||t.size,r=t.loaded,s=t.state,d=t.box,u=d.childNodes[1],c=n(u),f=o(c),v=o(f),h=n(v),m=o(v),g=o(m);if(a(g,p.getStatusText(s)),!(0>i)){var w="";if(this.html5&&r!=e&&r>=0){var _;if(s==p.PROCESSING){var x=Math.min(100*r/i,100);_=x.toFixed(1),"100.0"==_&&(_="99.9")}else s==p.COMPLETE&&(_="100");_&&(_+="%",h.style.width=_,a(m,_)),w='<span class="u-loaded">'+l(r)+"</span> / ";var T=t.avg_speed||t.speed;a(f,l(T)+"/s")}w+='<span class="u-total">'+l(i)+"</span>",a(c,w)}}},over:function(t){t&&t.box&&i(t.box,"u-over")}})}(window);