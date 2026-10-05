const P=require('../../lib/course-progress'),L=require('../../lib/course-learning'),G=require('../../lib/course-grammar');
function learningState(level){
 const words=new Set(),grammar=new Set(),section=Math.ceil(level/5),fraction=(level-1)%5;
 for(const p of P.packages.slice(0,level===160?32:section-1)){p.words.forEach(id=>words.add(id));p.grammar.forEach(id=>grammar.add(id));}
 if(level!==160){const p=P.packages[section-1],items=[...p.grammar.map(id=>['grammar',id]),...p.words.map(id=>['words',id])],n=Math.ceil(fraction*items.length/5);for(const [kind,id] of items.slice(0,n))(kind==='grammar'?grammar:words).add(id);}
 return {words,grammar};
}
function learnTo(a,level){const s=learningState(level);a.storage.set(L.UNLOCK,JSON.stringify(Object.fromEntries([...s.words].map(id=>[id,{toTurkish:true,toGerman:true}]))));a.run('SentenceGame.engine.grammar.state.unlocked='+JSON.stringify(Object.fromEntries([...s.grammar].map(id=>[id,true])))+';SentenceGame.engine.grammar.save();updateProfileLevel()');return s;}
module.exports={learningState,learnTo};
