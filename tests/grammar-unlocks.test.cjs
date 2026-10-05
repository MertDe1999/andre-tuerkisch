const {test}=require('node:test'),assert=require('node:assert/strict');
const W=require('../data/words'),B=require('../lib/building-blocks'),C=require('../lib/curriculum'),G=require('../lib/grammar'),L=require('../lib/learning');
const {app}=require('./helpers/app.cjs');
const allWords=new Set(W.words.map(w=>w.id));
const entry=(name,text)=>G.entries.find(e=>e.label===name&&e.text===text);
function manager(){const map=new Map();const io={getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)};return {m:new G.Manager(io),map,io};}
function solve(task,known,target){
 const cur={id:1,bankSeed:17,tokens:task.groups.flatMap(g=>g.slots.map((s,i)=>({...s,id:'t'+i,features:B.baseFeatures(s.lemma),group:g.id})))};
 for(const [i,slot] of task.groups.flatMap(g=>g.slots).entries())for(const step of B.plan(slot)){
  const cards=B.availableCards(task,cur,C.skills.map(s=>s.id),op=>known.has(G.key(op))||G.key(op)===target);
  const card=cards.find(c=>c.text===step.text);assert.ok(card,step.text);assert.ok(card.operations.every(op=>known.has(G.key(op))||G.key(op)===target));assert.equal(B.apply(cur.tokens[i],card),true);
 }
 assert.equal(L.evaluate(task,cur.tokens).correct,true);return cur;
}
test('former miscellaneous words have meaningful categories and each new category has both theme colours',()=>{
 assert.equal(W.words.some(w=>w.type==='other'),false);
 for(const word of ['daha','en','sonra','önce','hemen'])assert.equal(W.byLemma[word].type,'adverb');
 for(const word of ['için','rağmen'])assert.equal(W.byLemma[word].type,'postposition');assert.equal(W.byLemma['değil'].type,'negation');
 for(const word of ['sonra','önce'])assert.deepEqual(W.byLemma[word].otherTypes,['postposition']);
 const fs=require('node:fs'),css=fs.readFileSync(require.resolve('../grammar.css'),'utf8'),html=fs.readFileSync(require.resolve('../index.html'),'utf8');
 for(const type of ['adverb','postposition','negation'])for(const suffix of ['', '-soft','-dark'])assert.equal((css.match(new RegExp('--'+type+suffix+':','g'))||[]).length,2);
 const light=[...css.split('@media')[0].matchAll(/--(?:adverb|postposition|negation):([^;]+)/g)].map(m=>m[1]);assert.equal(new Set(light).size,3);for(const color of light)assert.ok(!html.includes(color));
});
test('each case variant unlocks independently and equal spelling never grants another function',()=>{
 const {m,io}=manager(),e=entry('Dativ','-e');assert.ok(e);assert.equal(m.learn(e.id),true);
 for(const text of ['-a','-ya','-ye','-na','-ne'])assert.equal(m.unlocked().has(entry('Dativ',text).id),false,text);
 const acc=entry('Akkusativ','-i'),poss=G.entries.find(e=>e.text==='-i'&&e.group==='possession');m.learn(acc.id);assert.equal(m.unlocked().has(poss.id),false);
 const reloaded=new G.Manager(io);assert.ok(reloaded.unlocked().has(e.id));assert.equal(reloaded.unlocked().has(entry('Dativ','-a').id),false);
});
test('fresh word unlocks do not unlock grammar or leak locked endings into the regular sentence game',()=>{
 const a=app();a.unlock(undefined,{grammar:false});assert.equal(a.run('SentenceGame.engine.grammar.unlocked().size'),0);
 a.run('startSentenceGame()');assert.equal(a.run('SentenceGame.engine.state.current'),null);assert.match(a.el('#sentenceComplete h2').textContent,/Grammatik/);
 const t=C.tasks.find(t=>t.id==='object-görmek-sen-w004');a.run('SentenceGame.engine.begin(AndreCurriculum.tasks.find(t=>t.id==='+JSON.stringify(t.id)+'),"older");SentenceGame.render();');
 assert.equal(a.run('SentenceGame.allowedCards().length'),0);assert.equal(a.run('SentenceGame.engine.check().ignored'),true);assert.equal(a.run('SentenceGame.engine.state.current.attempts'),0);
});
test('translation lessons replace the old grammar word-bank exercise and separate lexical knowledge',()=>{
 const a=app();require('./helpers/progress.cjs').learnTo(a,16);
 const id=a.run('AndreCourseGrammar.entries.find(e=>e.label==="Dativ"&&e.text==="-e").id');
 a.run('openGrammarTraining('+JSON.stringify(id)+')');assert.equal(a.run('GrammarTrainer.active'),true);
 assert.equal(a.run('SentenceGame.engine.grammar.state.current.answer'),'eve');assert.equal(a.run('SentenceGame.engine.state.level'),16);
 assert.equal(a.run('SentenceGame.engine.grammar.state.unlocked['+JSON.stringify(id)+']'),undefined);
 assert.ok(a.run('AndreCourseGrammar.entries.some(e=>e.id==="use:var:existence")'));
 const loaded=app({storage:a.storage});loaded.run('openGrammarTraining()');assert.equal(loaded.run('SentenceGame.engine.grammar.state.current.entryId'),id);
});

test('all 160-level prerequisites can be learned through available exercises using only unlocked words',()=>{
 const {m}=manager();let count=0;
 for(const level of [80,160]){let exercise;while((exercise=m.next(allWords,level))){assert.ok(count++<G.entries.length);assert.ok(exercise.task.requires.every(id=>allWords.has(id)));solve(exercise.task,m.unlocked(),exercise.entryId);assert.equal(m.learn(exercise.entryId),true);}}
 for(const t of C.tasks)for(const level of [t.min,Math.max(81,t.min)])assert.ok(G.canTask(C.forLevel(t,level),m.unlocked()),t.id+' '+level);
 assert.ok(C.skills.every(s=>m.unlocked().has('rule:'+s.id)));
 const single=manager().m,exercise=single.exercise(entry('Dativ','-e').id,new Set([W.byLemma.ev.id]),1);assert.ok(exercise);assert.equal(single.exercise(entry('Dativ','-ya').id,new Set([W.byLemma.ev.id]),1),null);
 assert.ok(single.exercise('infinitive:-mek',new Set([W.byLemma.gitmek.id]),1));assert.equal(single.exercise('infinitive:-mak',new Set([W.byLemma.gitmek.id]),1),null);
});
test('locked variants and alternative operations stay absent even when another operation has the same text',()=>{
 const t=C.forLevel(C.tasks.find(t=>t.id==='object-görmek-sen-w004'),16),cur={id:5,bankSeed:5,tokens:t.groups.flatMap(g=>g.slots).map((s,i)=>({...s,id:'t'+i,features:B.baseFeatures(s.lemma)}))};
 const known=new Set(G.required(t));const cards=B.cards(t,cur,C.skills.map(s=>s.id),op=>known.has(G.key(op)));
 assert.ok(cards.length);for(const card of cards)assert.ok(card.operations.every(op=>known.has(G.key(op))));
 assert.equal(cards.some(c=>c.text==='-yi'),false);
});
test('grammar save failure does not grant a variant; corrupt storage and unknown ids do not unlock anything',()=>{
 const {m,map,io}=manager();map.set(G.KEY,'{broken');assert.equal(new G.Manager(io).unlocked().size,0);
 io.setItem=()=>{throw Error('full');};assert.equal(m.learn(entry('Dativ','-e').id),false);assert.equal(m.unlocked().size,0);assert.ok(m.error);
 assert.equal(G.clean({version:1,unlocked:{constructor:true,'fake':true}}).unlocked.constructor,undefined);
});
test('old level and rated task wait for grammar without automatically granting it or discarding the task',()=>{
 const {io,map}=manager();map.set(L.UNLOCK,JSON.stringify(Object.fromEntries(W.words.map(w=>[w.tr,{toTurkish:true,toGerman:true}]))));
 const e=new L.Engine({storage:io}),t=C.tasks.find(t=>t.id==='object-görmek-sen-w004');e.state.level=99;e.state.introduced=C.skills.map(s=>s.id);e.begin(t,'current');e.state.current.rated=true;e.state.current.attempts=1;e.save();
 const reopened=new L.Engine({storage:io});assert.equal(reopened.next(),null);assert.equal(reopened.state.current.taskId,t.id);assert.equal(reopened.state.level,99);assert.equal(reopened.grammar.unlocked().size,0);
 for(const id of G.required(C.forLevel(t,99)))reopened.grammar.learn(id);
 assert.equal(reopened.next().taskId,t.id);assert.equal(reopened.next().rated,true);assert.equal(reopened.next().attempts,1);
 const copy=new L.Engine({storage:manager().io});copy.import(reopened.snapshot());assert.deepEqual([...copy.grammar.unlocked()].sort(),[...reopened.grammar.unlocked()].sort());assert.equal(copy.state.level,99);
});
