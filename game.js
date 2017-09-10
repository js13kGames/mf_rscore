
var _=(function(){var tau=Math.PI*2,log=true;return{r:function(l,h){l=l||1;if(h===undefined){return Math.random()*l;}
return this.r(h-l)+l;},m:function(x,m){return(x%m+m)%m;},pi:Math.PI,tau:tau,as:tau,an:function(n){return this.m(n,this.as);},asd:function(f,t){if(this.anh(f-t)<0){return 1;}
return-1;},anh:function(n){var h=this.as/2;return this.m(n+h,this.as)-h;},ad:function(a,b){var h=this.as/2,diff=this.anh(a-b);if(diff>h){diff=diff-this.as;}
return Math.abs(diff);},l:function(m){console.log(m);},lo:function(m,r){if(log){log=false;this.l(m);}
if(r){log=true;}},d:function(a,b,c,d){var e=a-c,f=b-d;return Math.sqrt(e*e+f*f);},b:function(a,b){return!(((a.y+a.h)<(b.y))||(a.y>(b.y+b.h))||((a.x+a.w)<b.x)||(a.x>(b.x+b.w)));},g:function(id){return document.getElementById(id);},c:function(obj){var n={};for(var prop in obj){if(typeof prop!='object'){n[prop]=obj[prop];}}
return n;}};}
());
var kc=(function(){var keys=[],lt=new Date(),rate=60;window.addEventListener('keydown',function(e){keys[e.keyCode]=true;});window.addEventListener('keyup',function(e){keys[e.keyCode]=false;});return{keys:keys,s:function(k,cb){var n=new Date(),r=[];if(n-lt>=rate){lt=n;k.forEach(function(c,i){var d=c.charCodeAt(0,1);if(keys[d]){r[i]=(keys[d]);}});}
cb(r);},};}
());
var C=(function(){var canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');canvas.width=320;canvas.height=240;document.body.appendChild(canvas);return{canvas:canvas,cls:function(style){ctx.fillStyle=style||'#000000';ctx.fillRect(0,0,canvas.width,canvas.height);},hiDraw:function(draw){draw.call(this,ctx,canvas)},drawGrid:function(offX,offY,w,h,pw,ph){w=w||8;h=h||8;pw=pw||32;ph=ph||32;offX=offX||0;offY=offY||0;ctx.strokeStyle='rgba(255,255,255,.2)';ctx.lineWidth=3;var y=-ph*2,x;while(y<h*ph){x=-pw*2;while(x<w*pw){ctx.strokeRect(x+offX,y+offY,pw,ph);x+=pw;}
y+=ph;}},drawInfo:function(messArray,x,y,dy,font,style){x=x||10;y=y||10;dy=dy||15;font=font||'15px courier';style=style||'#ffffff';ctx.fillStyle=style;ctx.font=font;messArray.forEach(function(mess,i){ctx.fillText(mess,x,y+dy*i);});},dBX:function(obj){ctx.fillStyle=obj.f;ctx.strokeStyle=obj.s;ctx.lineWidth=obj.i;ctx.save();ctx.translate(obj.x+obj.hw,obj.y+obj.hh);ctx.rotate(obj.a);ctx.fillRect(-obj.hw,-obj.hh,obj.w,obj.h);ctx.strokeRect(-obj.hw,-obj.hh,obj.w,obj.h);ctx.restore();}};}
());C.cls();
var vp={w:320,h:240,makeVPRel:function(obj){return{x:obj.x-this.x,y:obj.y-this.y,w:obj.w,h:obj.h};}};
var Unit=(function(){var ct=0;return function(obj){var s=this;obj=obj||{};s.id=obj.id||ct+'_'+new Date().getTime();ct+=1;if(ct>1000){ct=0;}
s.x=obj.x===undefined?-16:obj.x;s.y=obj.y===undefined?-16:obj.y;s.w=obj.w||32;s.h=obj.h||32;s.hw=16;s.hh=16;s.a=obj.a||0;s.delta=1;s.maxHP=obj.maxHP||20;s.hp=s.maxHP;s.faction=obj.faction||'n';s.s='#ffffff';s.f='#000000';s.i=3;};}
());Unit.prototype.step=function(){var s=this;s.a=_.an(s.a);s.x+=Math.cos(s.a)*s.delta;s.y+=Math.sin(s.a)*s.delta;};var Shot=function(obj){var s=this;Unit.call(s,obj);s.delta=6;s.life=100;s.dam=1;s.maxHP=50;s.hp=s.maxHP;s.w=8;s.h=8;s.x-=s.w/2;s.y-=s.h/2;s.fromShip=obj.fromShip||{};};Shot.prototype=new Unit();var Ship=function(obj){var s=this;Unit.call(s,obj);s.delta=obj.delta===undefined?3:obj.delta;s.shots=obj.shots||false;s.lastFire=new Date();s.fireRate=obj.fireRate||100;s.target=false;s.dtt=0;s.aDir=0;s.adt=0;s.toTarget=0;s.turnPer=0;s.maxTurn=Math.PI/180*obj.mt||1;s.aDelta=0;s.ai_script=obj.ai_script||function(){};};var p=Ship.prototype=new Unit();p.findTarget=function(eShips){this.target=false;if(eShips.units.length>0){this.target=eShips.units[Math.floor(_.r(eShips.units.length))]}};p.updateTarget=function(){var toTarget,s=this;if(s.target){s.toTarget=Math.atan2(s.target.y-s.y,s.target.x-s.x);s.dtt=_.d(s.x+s.w,s.y,s.target.x,s.target.y);s.adt=_.ad(s.a,s.toTarget);s.turnPer=s.adt/Math.PI;s.aDelta=s.turnPer*s.maxTurn;s.aDir=_.asd(s.a,s.toTarget);}};p.followTarget=function(rev){var s=this;rev=rev||false;s.a+=s.aDelta*(rev?s.aDir*-1:s.aDir);};p.shoot=function(){var now=new Date(),s=this;if(now-s.lastFire>=s.fireRate){this.shots.add(new Shot({x:s.x+s.w/2,y:s.y+s.h/2,a:s.a,fromShip:s}));s.lastFire=now;}};var UnitCollection=function(obj){obj=obj||{};this.units=obj.units||[];this.max=10;};p=UnitCollection.prototype;p.collidesWith=function(unit){var i=this.units.length;while(i--){if(_.b(this.units[i],unit)){return this.units[i];}}
return false;};p.purgeDead=function(){var i=this.units.length;while(i--){if(this.units[i].hp<=0){this.units.splice(i,1);}}};p.add=function(unit){unit=unit||new Unit();if(this.units.length<this.max){this.units.push(unit);}};var ShotCollection=function(obj){obj=obj||{};UnitCollection.call(this,obj);this.max=50;};p=ShotCollection.prototype=new UnitCollection();p.step=function(fe){var i=this.units.length,sh;fe=fe||function(){};while(i--){sh=this.units[i];sh.step();sh.hp-=1;if(sh.hp<0){sh.hp=0;}
fe(sh);}
this.purgeDead();};var ShipCollection=function(obj){var s=this;obj=obj||{};UnitCollection.call(s,obj);s.faction=obj.faction||'n';s.ai=obj.ai||false;s.enemys=obj.enemys||{units:[],max:0};s.shots=new ShotCollection();};p=ShipCollection.prototype=new UnitCollection();p.addShip=function(obj){obj=obj||{}
obj.faction=this.faction;obj.shots=this.shots;this.add(new Ship(obj));};p.update=function(obj){var s=this;if(s.ai){s.units.forEach(function(ship){ship.ai_script.call(s,ship);ship.step();});}
s.shots.step(function(sh){var es=s.enemys,i=es.units.length,e;if(i>0){while(i--){e=es.units[i];if(_.b(sh,e)){sh.hp=0;e.hp-=sh.dam;if(e.hp<=0){sh.fromShip.target=false;}}}}});s.purgeDead();};
var swai_smug=function(v){var s=this;v.delta=1;if(!v.target){v.findTarget(s.enemys);}
if(v.target){v.updateTarget();v.followTarget(true);if(v.dtt>500){v.delta=.1;}else{v.delta=(500-v.dtt)/500*2;}}};
var swai_stumpy=function(v){var s=this;v.delta=3;if(!v.target){v.findTarget(s.enemys);}
if(v.target){v.updateTarget();v.followTarget();if(v.dtt<50){v.delta=v.dtt/50*3;if(v.dtt<50){v.delta=0;}}
v.shoot();}};
var rs=(function(){var x=0,y=0;var distTick=function(obj){var roll,d=this.d,r,per;d.d=_.d(0,0,obj.x+obj.w/2,obj.y+obj.w/2);d.hellPer=(d.d-d.safeDist)/d.hellDist;if(d.hellPer<0){d.hellPer=0;}
if(d.hellPer>1){d.hellPer=1;}
d.spawnRate=Math.floor(10000-9000*d.hellPer);if(new Date()-d.lastSpawn>=d.spawnRate){roll=_.r();if(roll<d.hellPer){r=_.r(obj.a-.5,obj.a+.5);this.es.addShip({x:Math.cos(r)*500+obj.x,y:Math.sin(r)*500+obj.y,delta:Math.floor(3.5*d.hellPer+.5),fireRate:1000,mt:1+9*d.hellPer,ai_script:swai_stumpy});}
this.d.lastSpawn=new Date();}},eCheck=function(){rs.es.units.forEach(function(e){if(rs.d.hellPer===0){e.hp=0;}
if(e.dtt>1250){e.hp=0;}});},NPS=function(){rs.ps.addShip({delta:0,a:Math.PI*1.5,});};api={d:{safeDist:1000,hellDist:3000,spawnRate:10000,lastSpawn:new Date()},ps:{},es:{},cp:{},init:function(){_.l('rw-core: init...');vp.w=640;vp.h=480;C.canvas.width=640;C.canvas.height=480;C.cls();this.d.hellDist=10000;this.ps=new ShipCollection({faction:'p',max:1});NPS();this.es=new ShipCollection({faction:'e',ai:true,max:5});this.ps.enemys=this.es;this.es.enemys=this.ps;},tick:function(){var obj=this.ps.units[0];if(obj===undefined){_.l('player dead');NPS();}else{distTick.call(this,obj);vp.x=obj.x-vp.w/2;vp.y=obj.y-vp.h/2;kc.s(['W','S','A','D','L'],function(keys){if(keys[0]){obj.delta+=.1;}
if(keys[1]){obj.delta-=.1;}
if(keys[2]){_.l(obj.maxTurn);obj.a+=Math.PI/20;}
if(keys[3]){obj.a-=Math.PI/20;}
if(keys[4]){obj.shoot();}
if(obj.delta>3){obj.delta=3;}
if(obj.delta<0){obj.delta=0;}});obj.step();if(kc.keys[49]){this.ps.ai=true;}
if(kc.keys[50]){this.ps.ai=false;}
eCheck();this.ps.update();this.es.update();}}};return api;}
());
var rscore_canvas=function(){var x,obj,y,w,h;C.cls('rgba('+Math.floor(255*rs.d.hellPer)+',0,0,1)');C.hiDraw(function(ctx){var pw=640/8,ph=480/8;C.drawGrid(pw-vp.x%pw,ph-vp.y%ph,8,8,pw,ph);rs.ps.units.forEach(function(ship){var obj=_.c(ship),pos=vp.makeVPRel(obj);obj.x=pos.x;obj.y=pos.y;obj.f='#00af88';C.dBX(obj);});rs.es.units.forEach(function(ship){var obj=_.c(ship),pos=vp.makeVPRel(obj);obj.x=pos.x;obj.y=pos.y;obj.s='#000000';obj.f='#af0000';C.dBX(obj);});});C.hiDraw(function(ctx){rs.ps.shots.units.forEach(function(sh){var obj=vp.makeVPRel(sh);ctx.fillStyle='#00afff';ctx.fillRect(obj.x,obj.y,obj.w,obj.h);});rs.es.shots.units.forEach(function(sh){var obj=vp.makeVPRel(sh);ctx.fillStyle='#ffffff';ctx.fillRect(obj.x,obj.y,obj.w,obj.h);});ctx.fillStyle='#afafaf';ctx.fillRect(220,10,200,20);ctx.fillStyle='#ff0000';ctx.fillRect(220,10,rs.d.hellPer*200,20);ctx.fillStyle='#ffffff';ctx.textBaseline='top';ctx.textAlign='center';ctx.fillText('Hell',320,10);var obj=rs.ps.units[0];if(obj===undefined){obj={}}
ctx.textAlign='left';C.drawInfo(['e count: '+rs.es.units.length],10,100);});};
loop=function(){requestAnimationFrame(loop);rs.tick();rscore_canvas();};rs.init();loop();