/* Fixed 160-step path. Names are available; morphology is still learned. */
(function(root){
 'use strict';const node=typeof module==='object'&&module.exports;
 const W=node?require('../data/words'):root.AndreWords,C=node?require('./course'):root.AndreCourse,G=node?require('./course-grammar'):root.AndreCourseGrammar,P=node?require('./course-progress'):root.AndreCourseProgress;
 const normal=s=>String(s).normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[^\p{L}\p{N}]/gu,'');
 const knownLoans=new Set(['protein','matcha','chia','video','film','drama','burger','robot','penis','park']);
 const familiar=w=>!!w.properName||(w.type==='noun'&&knownLoans.has(normal(w.tr))&&w.deAnswers.some(d=>normal(d)===normal(w.tr)));
 const auto=new Set(W.words.filter(familiar).map(w=>w.id));
 const starters=[...new Set(W.interestData.themes.map(t=>W.words.find(w=>w.type==='noun'&&w.themes?.includes(t.id)&&!w.compoundParts&&!w.derivationWord)?.id).filter(Boolean))];
 let lexicalCount=W.words.length;function knownIds(){if(lexicalCount!==W.words.length){W.words.forEach(w=>{if(familiar(w))auto.add(w.id);});lexicalCount=W.words.length;}return auto;}
 const lessons=[];
 for(let b=0;b<32;b++){
  const goals=G.core[b],words=P.packages[b].words;
  for(let part=0;part<5;part++){
   const level=b*5+part+1,target=goals.filter((id,i)=>Math.floor(i*5/Math.max(1,goals.length))===part),lexical=words.filter((id,i)=>Math.floor(i*5/Math.max(1,words.length))===part);
   const deps=new Set(target),evidence=[];
   for(const id of target){const examples=G.byId[id].examples.filter(x=>!x.task.ast).sort((a,z)=>G.required(a.task).length-G.required(z.task).length||a.task.requires.length-z.task.requires.length);const x=examples[0];if(x){evidence.push(x.task.id);x.task.requires.forEach(w=>lexical.push(w));G.required(x.task).forEach(g=>deps.add(g));}}
   if(level===1)lexical.push(...starters,W.byLemma['güzel'].id,W.byLemma['ev'].id,W.byLemma['araba'].id,W.byLemma['köpek'].id,W.byLemma['masa'].id);
   lessons.push({level,band:b+1,cefr:C.bands[b].cefr,title:target.length?[...new Set(target.map(id=>G.byId[id].label))].join(' · '):'Festigen und kombinieren',targets:target,allowed:[...deps],words:[...new Set(lexical)].filter(id=>!auto.has(id)),evidence});
  }
 }
 const at=level=>lessons[Math.min(159,Math.max(0,level-1))];
 const wordIds=level=>[...new Set(lessons.slice(0,level).flatMap(l=>l.words))];
 const api={lessons,at,wordIds,get auto(){return knownIds();},familiar,normal};if(node)module.exports=api;else root.AndreLearningPath=api;
})(typeof globalThis==='object'?globalThis:this);
