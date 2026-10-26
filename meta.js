/* Voltline Worlds — shared meta-game: 17 worlds, one save, one prestige currency (Charter ★). Classic script, no deps. */
(function(){
const KEY='voltline-worlds-v1';
const WORLDS=[
 {id:'voltline', num:17,name:'Voltline', tag:'EV gigafactory',       accent:'#10B981',tier:1,cost:0, file:'index.html',    status:'play',icon:'factory'},
 {id:'gridleaf', num:7, name:'Gridleaf', tag:'Wind & solar farm',    accent:'#3DBE6E',tier:2,cost:1, file:'gridleaf.html', status:'play',icon:'turbine'},
 {id:'berthwise',num:3, name:'Berthwise',tag:'Container port',       accent:'#0FA3A3',tier:2,cost:1, file:'berthwise.html',status:'play',icon:'crane'},
 {id:'railgrid', num:6, name:'Railgrid', tag:'Metro rail control',   accent:'#00A86B',tier:2,cost:1, file:'railgrid.html', status:'play',icon:'train'},
 {id:'gateflow', num:1, name:'Gateflow', tag:'Airport apron',        accent:'#FF6A1A',tier:3,cost:3, file:'',status:'soon',icon:'plane'},
 {id:'dabba',    num:5, name:'Dabba',    tag:'Cloud kitchen city',   accent:'#E8452C',tier:3,cost:3, file:'',status:'soon',icon:'scooter'},
 {id:'fieldmind',num:15,name:'Fieldmind',tag:'Smart farm',           accent:'#84CC16',tier:3,cost:3, file:'',status:'soon',icon:'silo'},
 {id:'coreline', num:8, name:'Coreline', tag:'AI data centre',       accent:'#22D3EE',tier:3,cost:3, file:'',status:'soon',icon:'rack'},
 {id:'pulseway', num:10,name:'Pulseway', tag:'Hospital campus',      accent:'#0EA5E9',tier:4,cost:8, file:'',status:'soon',icon:'cross'},
 {id:'apex',     num:11,name:'Apex',     tag:'Racing circuit',       accent:'#E10600',tier:4,cost:8, file:'',status:'soon',icon:'racecar'},
 {id:'summit',   num:13,name:'Summit',   tag:'Ski resort',           accent:'#2563EB',tier:4,cost:8, file:'',status:'soon',icon:'peak'},
 {id:'parkline', num:14,name:'Parkline', tag:'Theme park',           accent:'#F43F5E',tier:4,cost:8, file:'',status:'soon',icon:'wheel'},
 {id:'leafline', num:9, name:'Leafline', tag:'Tea estate',           accent:'#2F8F5B',tier:4,cost:8, file:'',status:'soon',icon:'terrace'},
 {id:'orbitline',num:2, name:'Orbitline',tag:'Spaceport',            accent:'#7C5CFF',tier:5,cost:20,file:'',status:'soon',icon:'rocket'},
 {id:'boundary', num:4, name:'Boundary', tag:'Cricket stadium',      accent:'#1E5EFF',tier:5,cost:20,file:'',status:'soon',icon:'stadium'},
 {id:'siren',    num:16,name:'Siren',    tag:'Emergency city',       accent:'#EF4444',tier:5,cost:20,file:'',status:'soon',icon:'tower'},
 {id:'redline',  num:12,name:'Redline',  tag:'Mars colony',          accent:'#14B8A6',tier:5,cost:20,file:'',status:'soon',icon:'dome'},
];
const TIERS={1:'Home base',2:'Regional grid',3:'National network',4:'Continental',5:'Orbital'};
let S=null;
function load(){if(S)return S;try{S=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){S=null}
  if(!S||S.v!==1)S={v:1,charter:0,spent:0,worlds:{},created:Date.now()};
  // bootstrap: Voltline is always owned; migrate its old standalone save once
  const v=world('voltline');if(!v.owned){v.owned=true;try{const old=JSON.parse(localStorage.getItem('voltline-save-v1')||'null');if(old){v.credits=old.credits||0;v.lifetime=old.lifetime||0;v.last=old.last||Date.now()}}catch(e){}}
  return S}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function world(id){load();return S.worlds[id]||(S.worlds[id]={owned:false,credits:0,lifetime:0,rate:0,last:Date.now(),charterFrom:0,maxed:0,visits:0})}
const def=id=>WORLDS.find(w=>w.id===id);
/* Charter: 1 ★ per 1M lifetime credits in a world, +2 ★ for each world where every upgrade is maxed, +1 ★ per unlocked world as a welcome grant */
function charterOf(w){return Math.floor((w.lifetime||0)/1e6)+(w.maxed?2:0)}
function report(id,data){const w=world(id);Object.assign(w,data);w.last=Date.now();const c=charterOf(w);if(c>w.charterFrom){S.charter+=c-w.charterFrom;w.charterFrom=c}save();return w}
function offline(id){const w=world(id);const away=Math.min(4*3600,(Date.now()-(w.last||Date.now()))/1000);if(away<90||!w.rate)return{gain:0,away};const gain=Math.round(away*w.rate*.6);w.credits+=gain;w.lifetime+=gain;w.last=Date.now();save();return{gain,away}}
/* idle income across every owned world the player is not currently in */
function harvestOthers(currentId){load();const out=[];for(const d of WORLDS){if(d.id===currentId||!world(d.id).owned)continue;const r=offline(d.id);if(r.gain>0)out.push({world:d,gain:r.gain})}return out}
function canUnlock(id){const d=def(id);return d&&d.status==='play'&&!world(id).owned&&S.charter>=d.cost}
function unlock(id){if(!canUnlock(id))return false;const d=def(id);S.charter-=d.cost;S.spent+=d.cost;const w=world(id);w.owned=true;w.last=Date.now();save();return true}
function nextGoal(){load();const next=WORLDS.filter(d=>!world(d.id).owned&&d.status==='play').sort((a,b)=>a.cost-b.cost)[0];return next?{world:next,need:Math.max(0,next.cost-S.charter)}:null}
const fmt=n=>n>=1e9?(n/1e9).toFixed(2)+'B':n>=1e6?(n/1e6).toFixed(2)+'M':n>=1e4?(n/1e3).toFixed(1)+'k':n>=1e3?(n/1e3).toFixed(2)+'k':Math.round(n).toString();
function ownedCount(){load();return WORLDS.filter(d=>world(d.id).owned).length}
function totalRate(){load();return WORLDS.reduce((a,d)=>a+(world(d.id).owned?(world(d.id).rate||0):0),0)}
function reset(){localStorage.removeItem(KEY);localStorage.removeItem('voltline-save-v1');S=null}
window.META={WORLDS,TIERS,load,save,world,def,report,offline,harvestOthers,canUnlock,unlock,nextGoal,fmt,ownedCount,totalRate,charterOf,reset,get charter(){load();return S.charter}};
})();
