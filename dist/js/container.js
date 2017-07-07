/*!
 * @project : svga-web-canvas
 * @version : 1.1.0
 * @author  : 
 * @update  : 2017-07-07 6:59:09 pm
 */
}},{key:"stepToPercentage",value:function(t,e){var n=parseInt(t*this._videoItem.frames);n>=this._videoItem.frames&&n>0&&(n=this._videoItem.frames-1),this.stepToFrame(n,e)}},{key:"setImage",value:function(t,e){this._dynamicImage[e]=t}},{key:"setText",value:function(t,e){var n="string"==typeof t?t:t.text,r=("object"===("undefined"==typeof t?"undefined":(0,i["default"])(t))?t.size:"14px")||"14px",a=(("object"===("undefined"==typeof t?"undefined":(0,i["default"])(t))?t.family:"")||"",("object"===("undefined"==typeof t?"undefined":(0,i["default"])(t))?t.color:"#000000")||"#000000"),o=("object"===("undefined"==typeof t?"undefined":(0,i["default"])(t))?t.offset:{x:0,y:0})||{x:0,y:0},s=l["default"].Text(n,r+" family",a);s.offset=o,this._dynamicText[e]=s}},{key:"clearDynamicObjects",value:function(){this._dynamicImage={},this._dynamicText={}}},{key:"onFinished",value:function(t){this._onFinished=t}},{key:"onFrame",value:function(t){this._onFrame=t}},{key:"onPercentage",value:function(t){this._onPercentage=t}},{key:"_onTick",value:function(){"object"===(0,i["default"])(this._videoItem)&&(new Date).getTime()>=this._nextTickTime&&(this._nextTickTime=parseInt(1e3/this._videoItem.FPS)+(new Date).getTime()-60/this._videoItem.FPS*2,this._next())}},{key:"_next",value:function(){this._currentFrame++,this._currentFrame>=this._videoItem.frames&&(this._currentFrame=0,this._loopCount++,this.loops>0&&this._loopCount>=this.loops&&(this.stopAnimation(),"function"==typeof this._onFinished&&this._onFinished())),this._update(),"function"==typeof this._onFrame&&this._onFrame(this._currentFrame),"function"==typeof this._onPercentage&&this._onPercentage(parseFloat(this._currentFrame+1)/parseFloat(this._videoItem.frames))}},{key:"_draw",value:function(){var t=this;this._drawLayer=l["default"].Container(),l["default"].setBounds(this._drawLayer,{x:0,y:0,width:this._videoItem.videoSize.width,height:this._videoItem.videoSize.height}),this._videoItem.sprites.forEach(function(e){var n=void 0;e.imageKey&&(n=t._dynamicImage[e.imageKey]||t._videoItem.images[e.imageKey]);var r=e.requestLayer(n);e.imageKey&&t._dynamicText[e.imageKey]&&(r.textLayer=t._dynamicText[e.imageKey],r.addChild(t._dynamicText[e.imageKey])),t._drawLayer.addChild(r)}),this._rootLayer.addChild(this._drawLayer),this._currentFrame=0,this._update()}},{key:"_resize",value:function(){if(void 0!==this._canvas){this._canvas.width=this._canvas.offsetWidth,this._canvas.height=this._canvas.offsetHeight;var t=this._canvas.offsetWidth/this._videoItem.videoSize.width;this._drawLayer.setTransformMatrix(l["default"].Matrix2D(t,0,0,t,0,0))}else{var e=this._rootLayer.width/this._videoItem.videoSize.width;this._drawLayer.setTransformMatrix(l["default"].Matrix2D(e,0,0,e,0,0))}}},{key:"_update",value:function(){for(var t=this._drawLayer.children instanceof Array?this._drawLayer.children:this._drawLayer.children(),e=0;e<t.length;e++){var n=t[e];"function"==typeof n.stepToFrame&&n.stepToFrame(this._currentFrame)}this._resize(),this._stage&&this._stage.update()}}]),t}()},function(t,e,n){function r(t){return t&&t.__esModule?t:{"default":t}}var a,i,o=n(92),s=r(o),u=n(3),f=r(u),c=n(4),l=r(c);t.exports=(i=a=function(){function t(e){(0,f["default"])(this,t),this._initDB(),this._createTable()}return(0,l["default"])(t,[{key:"_initDB",value:function(){t.db=openDatabase("legox","1.0","LegoX DB",5242880)}},{key:"_errorCallBack",value:function(t,e){console.error("[Svga Web Canvas DB]: ",e)}},{key:"_createTable",value:function(){t.tableAttributeString="",t.db.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS "+t.table.name+" ("+t.table.attribute+")")})}},{key:"add",value:function(e){var n=this,r=e.url,a=e.movie,i=e.images;t.db.transaction(function(e){e.executeSql("INSERT INTO "+t.table.name+" ("+t.table.attribute+") VALUES (?, ?, ?, ?)",[r,(0,s["default"])(a),(0,s["default"])(i),new Date],function(t,e){console.info("[Svga Web Canvas DB]: add success")},n._errorCallBack)})}},{key:"find",value:function(e,n){var r=this;t.db.transaction(function(a){a.executeSql("SELECT * FROM "+t.table.name+" WHERE url LIKE ?",[e],function(t,e){e.rows.length>0?n(JSON.parse(e.rows.item(0).images),JSON.parse(e.rows.item(0).movie),!1):n("","",!0)},r._errorCallBack)})}},{key:"clear",value:function(t){"string"==typeof t?this._clearByUrl(t):"number"==typeof t&&this._clearByDate(t)}},{key:"_clearByUrl",value:function(e){var n=this;t.db.transaction(function(r){r.executeSql("DELETE FROM "+t.table.name+" WHERE url LIKE ?",[e],function(t,e){console.info("[Svga Web Canvas DB]: clear success")},n._errorCallBack)})}},{key:"_clearByDate",value:function(e){var n=this,r=new Date;t.db.transaction(function(a){a.executeSql("SELECT * FROM "+t.table.name,[],function(t,a){for(var i=a.rows.length,o=0;o<i;o++){var s=a.rows.item(o),u=new Date(s.time),f=(r.getTime()-u.getTime())/864e5;f>=e&&n._clearByUrl(s.url)}},n._errorCallBack)})}}]),t}(),a.table={name:"svga",attribute:"url, movie, images, time"},i)},function(t,e,n){t.exports={"default":n(93),__esModule:!0}},function(t,e,n){var r=n(10),a=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return a.stringify.apply(a,arguments)}}]);