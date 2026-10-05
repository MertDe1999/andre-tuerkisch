/* Learning level is derived only from word and grammar unlocks. */
(function(root){
 'use strict';const node=typeof module==='object'&&module.exports;
 const W=node?require('../data/words'):root.AndreWords,C=node?require('./course'):root.AndreCourse,G=node?require('./course-grammar'):root.AndreCourseGrammar;
 const vocabulary=node?require('../data/learning-packages'):root.AndreLearningPackages;
 // Freeze the original course requirements. Later vocabulary extends practice.
 const packages=C.bands.map((band,index)=>({index,words:[...(vocabulary[index]||[])],grammar:[...G.core[index]]}));
 function calculate(words,grammar){
  let section=32,level=160,done=0,total=0,completed=0;
  for(const p of packages){
   const learnedWords=p.words.filter(id=>words.has(id)).length,learnedGrammar=p.grammar.filter(id=>grammar.has(id)).length;
   done=learnedWords+learnedGrammar;total=p.words.length+p.grammar.length;
   if(done<total){section=p.index+1;level=p.index*5+1+Math.min(4,Math.floor(5*done/total));break;}
   completed++;
  }
  return {level,section,completed,done,total,cefr:C.bandAt(level).cefr,standard:level>=81};
 }
 const api={packages,calculate};if(node)module.exports=api;else root.AndreCourseProgress=api;
})(typeof globalThis==='object'?globalThis:this);
