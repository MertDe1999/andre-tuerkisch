const test=require('node:test'),assert=require('node:assert/strict');
const W=require('../data/words'),T=require('../lib/turkish'),B=require('../lib/building-blocks'),C=require('../lib/course'),G=require('../lib/course-grammar'),I=require('../lib/interest-generator'),P=require('../lib/course-progress'),L=require('../lib/course-learning');
const named=tr=>W.words.find(w=>w.tr===tr&&w.properName),verb=tr=>I.lex(tr,'verb');
function engine(){const map=new Map(),storage={getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)};return {e:new L.Engine({storage,random:()=>.3}),map,storage};}
const unlock=(map,words)=>map.set(L.UNLOCK,JSON.stringify(Object.fromEntries([...words].map(id=>[id,{toTurkish:true,toGerman:true}]))));
test('names and homographs keep separate meanings, directions, and old lexical IDs',()=>{
 assert.equal(W.words.length,new Set(W.words.map(w=>w.id)).size);assert.ok(W.words.length>500);
 assert.equal(W.byLemma.ev.id,'w003');assert.equal(T.noun(W.byLemma.ben.id,{case:'dative'}),'bana');assert.equal(T.noun(named('Ben').id,{case:'dative'}),"Ben'e");assert.equal(T.noun(named('Mert').id,{case:'genitive'}),"Mert'in");
 const {e,map}=engine();unlock(map,new Set([W.byLemma.ben.id]));assert.ok(e.unlocked().has(W.byLemma.ben.id));assert.ok(!e.unlocked().has(named('Ben').id));
 map.set(L.UNLOCK,JSON.stringify({ben:{toTurkish:true,toGerman:true}}));assert.ok(!e.unlocked().has(named('Ben').id));
 assert.equal(W.bySurface.yemek.length,2);assert.equal(T.noun('su',{poss:'o'}),'suyu');assert.equal(T.noun('sen',{case:'instrumental'}),'seninle');
});
test('all 160 personal references are structured, and their required cards compose the intended answer',()=>{
 assert.equal(I.references.length,160);
 for(const [i,t] of I.references.entries()){assert.equal(t.min,i+1);assert.ok(t.requires.every(id=>W.byId[id]));const out=[];for(const s of t.groups[0].slots){const token={lemma:s.lemma,features:B.baseFeatures(s.lemma),nominal:s.nominal};for(const op of B.plan(s))assert.ok(B.apply(token,{text:op.text,operations:[op]}),t.id);out.push(B.surface(token));}assert.equal(out.join(' '),t.answer);}
 const eyes=I.references[142].groups[0].slots.find(s=>W.byId[s.lemma].tr==='göz');assert.equal(eyes.features.poss,'sen');assert.equal(eyes.features.plural,true);
 assert.equal(I.references[16].groups[0].slots[0].lemma,named('Ben').id);
});
test('every one of 160 levels offers three fresh eligible trees from each of 23 themes',()=>{
 const words=new Set(W.words.map(w=>w.id));let count=0;
 for(let level=1;level<=160;level++){
  const section=Math.ceil(level/5),tasks=I.generate({words,section,standard:level>=81,seed:level*113,perTheme:3});assert.equal(tasks.length,69,'level '+level);
  for(const theme of I.themes)assert.equal(tasks.filter(t=>t.primaryTheme===theme.id).length,3,'level '+level+' '+theme.id);
  const known=new Set();for(const task of tasks){assert.ok(task.requires.every(id=>words.has(id)));G.register(task);G.required(task).forEach(id=>known.add(id));}
  for(const task of tasks){assert.ok(G.canTask(task,known));for(const slot of task.groups[0].slots){const token={lemma:slot.lemma,features:B.baseFeatures(slot.lemma),nominal:slot.nominal};for(const op of B.plan(slot))B.apply(token,{text:op.text,operations:[op]});assert.equal(B.surface(token),T.surface(slot),task.id);}count++;}
 }
 assert.equal(count,11040);
});
test('both languages share people, tense and compound structure rather than independent phrase guesses',()=>{
 const mert=named('Mert'),andre=named('André'),sushi=I.lex('suşi','noun'),park=I.lex('park','noun'),go=verb('gitmek'),eat=verb('yemek');
 const event={actor:mert,verb:eat,object:sushi,objectCase:'accusative',place:park,placeCase:'locative',features:{tense:'present',register:'colloquial'}};
 let task=I.build({first:event,theme:'T05',section:5,standard:false});assert.equal(task.answer,'Mert parkta suşiyi yiyo');assert.equal(task.de,'Mert isst das Sushi im Park.');
 const relative=I.build({family:'relative-subject',first:{actor:mert,verb:go,features:{tense:'future'}},adjective:I.lex('komik','adj'),theme:'T05',section:32});assert.equal(relative.answer,'giden Mert komik');assert.equal(relative.de,'Mert, der geht, ist lustig.');
 task=I.build({family:'purpose',first:event,second:{actor:andre,verb:go,features:{tense:'present'}},theme:'T05',section:17});assert.equal(task.answer,'parkta suşiyi yemek için André gidiyor');assert.equal(task.de,'André geht, um das Sushi im Park zu essen.');
 const smoothie=I.phrase(I.lex('üzüm suyu','noun'),{case:'instrumental'});assert.equal(smoothie.slots.map(T.surface).join(' '),'üzüm suyuyla');
 const bread=I.phrase(I.lex('muzlu ekmek','noun'));assert.equal(bread.slots.map(T.surface).join(' '),'muzlu ekmek');assert.equal(B.plan(bread.slots[0])[0].text,'-lu');
});
test('new future dictionary entries extend practice without moving any completed course requirement',()=>{
 const before=JSON.stringify(P.packages),all=new Set(W.words.map(w=>w.id));const grammar=new Set(P.packages.flatMap(p=>p.grammar));assert.equal(P.calculate(all,grammar).level,160);
 const w=W.register({id:'future-interest',tr:'otobüs',de:'Bus',type:'noun',semantic:'device',themes:['T15'],deGrammar:{gender:'m',singular:'Bus',plural:'Busse'}});all.add(w.id);
 assert.equal(JSON.stringify(P.packages),before);assert.equal(P.calculate(all,grammar).level,160);
 assert.ok(I.generate({words:all,section:5,seed:4,theme:'T15',perTheme:80}).some(t=>t.requires.includes(w.id)));
});
test('regular practice cannot use unknown grammar, themes rotate and unfinished tasks survive switching',()=>{
 const {e,map,storage}=engine(),words=new Set(W.words.map(w=>w.id));unlock(map,words);e.grammar.state.unlocked=Object.fromEntries(G.entries.map(x=>[x.id,true]));e.refreshPool();e.grammar.state.unlocked=Object.fromEntries(G.entries.map(x=>[x.id,true]));
 const seen=new Set(),answers=new Set();for(let i=0;i<23;i++){const cur=e.next();assert.ok(cur);seen.add(cur.task.primaryTheme);answers.add(cur.task.answer);cur.tokens=cur.task.groups.flatMap(g=>g.slots.map((s,i)=>({...C.copy(s),id:'t'+i,group:g.id})));assert.equal(e.check().delta,0);e.grammar.state.unlocked=Object.fromEntries(G.entries.map(x=>[x.id,true]));}assert.equal(seen.size,23);assert.equal(answers.size,23);assert.equal(e.state.level,160);
 e.selectTheme('T05');const current=e.next();assert.ok(current.task.themes.includes('T05'));e.selectTheme('T07');e.next();e.selectTheme('T05');assert.deepEqual(e.next(),current);
 e.save();assert.deepEqual(new L.Engine({storage}).task(),current.task);
 const gated=engine();unlock(gated.map,new Set(I.references[78].requires));gated.e.begin(I.references[78]);assert.equal(gated.e.check().needsGrammar,true);assert.equal(gated.e.available().length,0);
});
test('B2 recombines clauses, relatives, temporal links and verb roles in multiple seeded batches',()=>{
 const tasks=[...I.generate({section:32,seed:34,perTheme:30}),...I.generate({section:32,seed:121,perTheme:30})],families=new Set(tasks.map(t=>t.family));
 for(const family of ['condition-relative','relative-object','relative-subject','report','concession','since','aslong','instead','reason'])assert.ok(families.has(family),family);
 assert.ok(tasks.some(t=>t.groups[0].slots.some(s=>s.features.voice==='passive')));assert.ok(tasks.some(t=>t.groups[0].slots.some(s=>s.features.compound==='past')));
 assert.ok(tasks.some(t=>t.answer!==I.generate({section:32,seed:999,perTheme:3}).find(x=>x.primaryTheme===t.primaryTheme)?.answer));
});
