/* One course, several input formats. All rating remains in the course engine. */
(function(root){
 'use strict';const node=typeof module==='object'&&module.exports,C=node?require('./course'):root.AndreCourse,G=node?require('./course-grammar'):root.AndreCourseGrammar,I=node?require('./interest-generator'):root.AndreInterestGenerator;
 const names={build:'Satzbau',listen:'Hören',dialog:'Dialog',write:'Schreiben'};
 const norm=(s,lang)=>G.norm(String(s||'').replace(/[’‘]/g,"'"),lang);
 const aliases=(s,lang)=>G.alternatives(String(s||'').replace(/[’‘]/g,"'"),lang);
 const same=(a,b,lang)=>aliases(a,lang).some(x=>aliases(b,lang).includes(x));
 const lemmas=t=>t.groups.flatMap(g=>g.slots.map(s=>s.lemma));
 const frame=t=>JSON.stringify(t.groups.map(g=>g.slots.map(s=>s.features||{})));
 const cached=new WeakMap();function info(t){if(!cached.has(t))cached.set(t,{tr:aliases(t.answer,'tr'),de:[t.de,...(t.deAlternatives||[])].flatMap(s=>aliases(s,'de')),lemmas:lemmas(t),frame:frame(t)});return cached.get(t);}
 function choices(engine,cur,lang){
  const target=cur.task,key=lang==='de'?'de':'answer',meta=info(target),accepted=new Set(meta.de),tr=new Set(meta.tr),words=meta.lemmas,structure=meta.frame;
  const seen=new Set(meta[lang]),answers=[target[key]],selected=[target];
  const ranked=engine.available().filter(t=>!info(t).tr.some(x=>tr.has(x))&&!info(t).de.some(x=>accepted.has(x)))
   .map(t=>({t,score:(info(t).frame===structure?30:0)+info(t).lemmas.filter(id=>words.includes(id)).length*6-(Math.abs(info(t).lemmas.length-words.length)*5)+(t.cefr===target.cefr?5:0)})).sort((a,b)=>b.score-a.score);
  for(const {t} of ranked){const variants=info(t)[lang];if(variants.some(x=>seen.has(x)))continue;answers.push(t[key]);selected.push(t);variants.forEach(x=>seen.add(x));if(answers.length===4)break;}
  if(cur.delivery)cur.delivery.access={words:[...new Set(selected.flatMap(t=>t.requires))],grammar:[...new Set(selected.flatMap(t=>engine.requiredFor(t)))]};
  // Stable per task, independent of re-rendering and reload.
  let seed=(cur.id*7919+cur.roundLevel*31)>>>0;for(let i=answers.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[answers[i],answers[j]]=[answers[j],answers[i]];}
  return answers;
 }
 function mixed(engine){
  // Preserve the active answer when retiring an old selected theme.
  engine.state.selectedTheme=null;engine.state.themePractice=false;engine.flow.automatic=true;
  if(!engine.flow.finished){const r=engine.round();if(!r.themeOrder){r.themeOrder=I.themes.map(t=>t.id);for(let i=r.themeOrder.length-1;i>0;i--){const j=Math.floor(engine.random()*(i+1));[r.themeOrder[i],r.themeOrder[j]]=[r.themeOrder[j],r.themeOrder[i]];}}}engine.save();
 }
 function prepare(engine){
  const cur=engine.state.current;if(!cur)return null;
  if(cur.delivery?.version===1&&names[cur.delivery.mode]&&Array.isArray(cur.delivery.options)&&cur.delivery.options.length<=4&&cur.delivery.options.every(x=>typeof x==='string')&&(!['listen','dialog'].includes(cur.delivery.mode)||cur.delivery.options.includes(cur.direction==='de'?cur.task.de:cur.task.answer))&&(cur.direction==='de')===(cur.delivery.mode==='listen')){
   const d=cur.delivery;d.heard=d.heard===true;d.text=d.text===true;
   if(d.mode==='listen'||d.mode==='dialog'){const words=engine.unlocked(),grammar=engine.practiceGrammar();if(!Array.isArray(d.access?.words)||!Array.isArray(d.access?.grammar)||!d.access.words.every(id=>words.has(id))||!d.access.grammar.every(id=>grammar.has(id))){d.options=choices(engine,cur,cur.direction==='de'?'de':'tr');if(!d.options.includes(cur.draft))cur.draft='';engine.save();}if(d.options.length===1)cur.assisted=true;}return d;
  }
  let mode='build';
  if(cur.direction==='de')mode='listen';
  else if(cur.kind!=='intro'&&!cur.tokens.some(t=>t.group)){
   const turn=Math.max(0,Number(engine.state.deliveryTurn)||0);mode=['build','dialog','write'][turn%3];engine.state.deliveryTurn=turn+1;
  }
  const d=cur.delivery={version:1,mode,heard:false,text:false,options:[],recorded:false};
  if(cur.direction==='de'){
   if(cur.draft){cur.previousGermanDraft=cur.draft;cur.draft='';}
   d.options=choices(engine,cur,'de');
  }else if(mode==='dialog')d.options=choices(engine,cur,'tr');
  if(d.options.length===1)cur.assisted=true;
  engine.save();return d;
 }
 function check(engine,{unknown=false,answer}={}){
  const cur=engine.state.current,d=prepare(engine);if(!cur||cur.finished)return {ignored:true};
  if(d.mode==='listen'&&!d.heard&&!d.text&&!unknown)return {ignored:true};
  if(cur.direction==='tr'&&d.mode!=='build'){
   const correct=!unknown&&aliases(cur.task.answer,'tr').includes(norm(answer??cur.draft,'tr'));
   cur.tokens=correct?cur.task.groups.flatMap(g=>g.slots.map((s,i)=>({...C.copy(s),id:'answer-'+g.id+'-'+i,group:g.id}))):[];
  }
  const result=engine.check({unknown,answer:answer??cur.draft});
  if(!result.ignored&&cur.finished&&!d.recorded){d.recorded=true;const key=d.mode==='listen'&&d.text?'read':d.mode;
   const stat=(engine.state.deliveryStats||={})[key]||=( {done:0,direct:0} );stat.done++;if(cur.firstOutcome==='correct')stat.direct++;engine.save();
  }
  return result;
 }
 function progress(engine){
  const level=engine?.flow.level||1,band=C.bandAt(level),bands=C.bands.filter(x=>x.cefr===band.cefr),start=bands[0].start,end=bands.at(-1).end;
  let fraction=0;const r=engine?.flow.round;
  if(r?.level===level){const items=r.items.filter(x=>!x.practice),coverage=new Set(items.map(x=>x.theme+'|'+x.direction)).size/46;
   const req=engine.requirements(),forms=req.length?req.reduce((sum,id)=>sum+Math.min(3,r.counts[id]?.tr?.length||0)+Math.min(3,r.counts[id]?.de?.length||0),0)/(req.length*6):coverage;
   const accuracy=items.length?Math.min(1,items.filter(x=>x.direct).length/items.length/.8):0;
   fraction=Math.min(.99,.04*Math.min(1,(r.intro||0)/2)+.96*(coverage*.7+forms*.3)*accuracy);
  }
  const complete=engine?.flow.finished===true;return {level,cefr:band.cefr,start,end,fraction,complete,percent:complete?100:Math.min(100,(level-start+fraction)/(end-start+1)*100)};
 }
 const api={names,choices,mixed,prepare,check,progress};if(node)module.exports=api;else root.AndreLessonDelivery=api;
})(typeof globalThis==='object'?globalThis:this);
