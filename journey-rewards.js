/* Cosmetic points: completion never changes course data. */
(function(root){
 'use strict';const live=new Set(),dots=new Set();let generation=0,held=null;
 const bar=()=>document.getElementById('profileLevelBar'),fill=()=>document.getElementById('profileLevelFill');
 function cancel(){generation++;for(const a of [...live])a.cancel();live.clear();for(const dot of dots)dot.remove();dots.clear();held=null;root.updateProfileLevel?.();}
 function paint(percent){if(!held)fill().style.width=percent+'%';else held.target=percent;}
 function capture(){return {width:fill().style.width,stage:document.getElementById('profileLevelStage').textContent};}
 function victory(cue,before){
  if(cue?.action!=='win'||document.hidden)return;
  cancel();if(root.AndreMotion.reduced())return;
  const token=generation,from=document.getElementById('duelEnemy').getBoundingClientRect(),to=bar().getBoundingClientRect(),target=fill().style.width;
  if(!from.width||!to.width)return;
  if(before?.stage===document.getElementById('profileLevelStage').textContent&&parseFloat(target)>=parseFloat(before.width||'0')){held={target:parseFloat(target)};fill().style.width=before.width;}
  const amount=Math.max(2,Math.min(6,cue.summary.maxHp));let impacts=0,total=0,launching=true;
  for(let i=0;i<amount;i++){
   const dot=document.createElement('span');dot.className='journey-point';dot.setAttribute('aria-hidden','true');
   const x=from.left+from.width/2,y=from.top+from.height/2;Object.assign(dot.style,{left:x+'px',top:y+'px'});document.body.append(dot);dots.add(dot);
   const dx=to.left+to.width*(.3+.4*i/amount)-x,dy=to.top+to.height/2-y;
   let a,arrived=false;const cleanup=()=>{dot.remove();dots.delete(dot);live.delete(a);if(!launching&&!dots.size&&held&&token===generation){held=null;root.updateProfileLevel();}};a=root.AndreMotion.play(dot,[{opacity:0,transform:'translate(0,0) scale(.4)'},{opacity:1,transform:'translate('+((i-(amount-1)/2)*11)+'px,12px) scale(1)',offset:.22},{opacity:1,transform:'translate('+(dx*.65)+'px,'+(dy-30)+'px)',offset:.72},{opacity:0,transform:'translate('+dx+'px,'+dy+'px) scale(.55)'}],{duration:620+i*45,cleanup,slot:'reward'});
   if(!a)continue;live.add(a);total++;const finish=a.onfinish;
   a.onfinish=()=>{if(arrived)return;arrived=true;if(token===generation&&!document.hidden){impacts++;if(held){const begin=parseFloat(before.width||'0');fill().style.width=(begin+(held.target-begin)*impacts/total)+'%';}
     let impact;impact=root.AndreMotion.play(bar(),[{transform:'translateX(0) scale(1)'},{transform:'translateX(-1px) scale(1.025)',offset:.35},{transform:'translateX(1px) scale(1.01)',offset:.65},{transform:'translateX(0) scale(1)'}],{duration:180,slot:'reward-impact',cleanup:()=>live.delete(impact)});if(impact)live.add(impact);
     if(impacts===total){held=null;root.updateProfileLevel();}
    }finish?.();};
  }
  launching=false;if(!total){held=null;root.updateProfileLevel();}
 }
 root.addEventListener('resize',cancel);root.addEventListener('pagehide',cancel);document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});root.matchMedia?.('(prefers-reduced-motion: reduce)').addEventListener?.('change',cancel);
 root.AndreJourneyRewards={paint,capture,victory,cancel};
})(window);
