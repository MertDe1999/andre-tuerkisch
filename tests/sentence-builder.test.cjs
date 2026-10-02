const {test}=require('node:test'),assert=require('node:assert/strict');
const W=require('../data/words.js'),T=require('../lib/turkish.js'),C=require('../lib/curriculum.js'),L=require('../lib/learning.js');
const {app}=require('./helpers/app.cjs');
const byId=id=>C.tasks.find(t=>t.id===id);
function rng(seed=13){return ()=>((seed=(seed*16807)%2147483647)-1)/2147483646;}
function game({keys=W.words.map(w=>w.tr),saved,legacy,clock=()=>new Date(2026,9,2,12).getTime()}={}){
 const map=new Map([[L.UNLOCK,JSON.stringify(Object.fromEntries(keys.map(tr=>[tr.toLocaleLowerCase('tr-TR'),{toTurkish:true,toGerman:true}])) )]]);
 if(saved)map.set(L.KEY,JSON.stringify(saved));if(legacy)map.set(L.LEGACY,JSON.stringify(legacy));
 const storage={getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)};
 return {e:new L.Engine({storage,clock,random:rng()}),map,storage};
}
function tokens(task){return task.groups.flatMap(g=>g.slots.map((s,i)=>({...structuredClone(s),id:g.id+'-'+i,group:g.id})));}
function solve(e){const cur=e.next(),t=byId(cur.taskId);cur.tokens=tokens(t);return e.check();}
function mature(e,level){e.state.level=level;e.state.highestLevel=level;e.state.introduced=C.skills.filter(s=>s.min<=level).map(s=>s.id);}
function current(e,id,kind='current'){return e.begin(byId(id),kind);}

test('independent morphology examples cover harmony, stem changes, possession and case order',()=>{
 const samples=[['ev',{case:'dative'},'eve'],['araba',{case:'accusative'},'arabayı'],['ağaç',{case:'accusative'},'ağacı'],['ağaç',{case:'locative'},'ağaçta'],['yarak',{case:'accusative'},'yarağı'],['ev',{case:'ablative'},'evden'],['araba',{case:'genitive'},'arabanın'],['araba',{case:'instrumental'},'arabayla'],['ben',{case:'genitive'},'benim'],['sen',{case:'dative'},'sana'],['araba',{poss:'o',case:'locative'},'arabasında'],['araba',{poss:'o',case:'accusative'},'arabasını'],['araba',{poss:'ben',case:'accusative'},'arabamı'],['ev',{plural:true,poss:'biz',case:'locative'},'evlerimizde'],['ev',{plural:true,poss:'onlar'},'evleri'],['ağaç',{poss:'ben'},'ağacım']];
 for(const [lemma,features,expected] of samples)assert.equal(T.noun(lemma,features),expected);
 assert.equal(T.surface({lemma:W.byLemma.ev.id,features:{poss:'ben',case:'locative',predicatePerson:'ben'}}),'evimdeyim');
});

test('independent verb examples cover standard/alltag, six persons, questions and nonfinite chains',()=>{
 const samples=[['gitmek',{tense:'present',person:'ben'},'gidiyorum'],['gitmek',{tense:'present',negative:true,person:'ben'},'gitmiyorum'],['gelmek',{tense:'present',person:'biz',question:true},'geliyor muyuz'],['gelmek',{tense:'past',person:'sen',question:true},'geldin mi'],['gitmek',{tense:'past',person:'ben'},'gittim'],['gitmek',{tense:'future',person:'ben'},'gideceğim'],['gelmek',{tense:'future',person:'biz'},'geleceğiz'],['gelmek',{tense:'future',person:'onlar',question:true},'gelecekler mi'],['sevmek',{tense:'aorist',person:'sen'},'seversin'],['gelmek',{tense:'aorist',negative:true,person:'ben'},'gelmem'],['gelmek',{tense:'aorist',negative:true,person:'biz'},'gelmeyiz'],['gelmek',{tense:'aorist',negative:true,person:'sen'},'gelmezsin'],['gitmek',{tense:'aorist',ability:true,person:'sen'},'gidebilirsin'],['gitmek',{tense:'present',ability:true,negative:true,person:'ben'},'gidemiyorum'],['gelmek',{tense:'reported',person:'ben'},'gelmişim'],['gelmek',{tense:'present',person:'ben',register:'colloquial'},'geliyom'],['gelmek',{tense:'present',person:'siz'},'geliyorsunuz'],['gitmek',{tense:'imperative',person:'siz'},'gidin'],['gitmek',{tense:'necessity',person:'ben'},'gitmeliyim'],['gelmek',{tense:'conditional',person:'sen'},'gelirsen'],['gitmek',{tense:'ip'},'gidip'],['gitmek',{tense:'ince'},'gidince'],['görmek',{tense:'arak'},'görerek'],['gelmek',{tense:'ken'},'gelirken'],['gelmek',{tense:'ma',poss:'sen',case:'dative'},'gelmene'],['görmek',{tense:'dik',poss:'sen',case:'accusative'},'gördüğünü'],['gelmek',{tense:'dik',poss:'onlar'},'geldikleri'],['gelmek',{tense:'acak',poss:'sen',case:'accusative'},'geleceğini'],['görmek',{tense:'an'},'gören'],['görmek',{voice:'passive',tense:'present',person:'o'},'görülüyor'],['yıkamak',{voice:'reflexive',tense:'present',person:'o'},'yıkanıyor'],['yıkamak',{voice:'causative',tense:'present',person:'o'},'yıkatıyor'],['görmek',{voice:'reciprocal',tense:'present',person:'onlar'},'görüşüyorlar']];
 for(const [lemma,features,expected] of samples)assert.equal(T.verb(lemma,features),expected,lemma+JSON.stringify(features));
 assert.equal(T.nominal('güzel',{question:true}),'güzel mi');assert.equal(T.nominal('güzel',{past:true}),'güzeldi');
 assert.equal(T.verb('gitmek',{tense:'optative',person:'ben'}),'gideyim');assert.equal(T.verb('gitmek',{tense:'optative',person:'biz'}),'gidelim');
 assert.throws(()=>T.verb('gitmek',{tense:'optative',person:'sen'}));
});

test('curriculum has an acyclic prerequisite graph, two families per skill and all 160 levels',()=>{
 const ids=new Set();for(const task of C.tasks){assert.ok(!ids.has(task.id));ids.add(task.id);assert.ok(task.requires.every(id=>W.byId[id]));assert.ok(task.skills.every(id=>C.bySkill[id]));assert.equal(task.answer,task.groups.map(g=>g.slots.map(T.surface).join(' ')).join(' '),task.id);}
 for(let level=1;level<=160;level++){const band=C.bandAt(level);assert.ok(C.tasks.some(t=>t.band===band.id&&t.min<=level));}
 for(const skill of C.skills){assert.ok(C.tasks.filter(t=>t.skills.includes(skill.id)).length>=2,skill.id);for(const id of C.prerequisites(skill.id))assert.ok(C.bySkill[id].min<=skill.min);}
 assert.equal(W.words.slice(0,33).length,33);assert.equal(W.cards.length,W.words.length+14);
});

test('every task accepts its authored solution but wrong morphology is rejected',()=>{
 for(const task of C.tasks){const answer=tokens(task);assert.equal(L.evaluate(task,answer).correct,true,task.id);const slot=answer.find(t=>W.byId[t.lemma].type==='verb'&&t.features.person);if(slot){slot.features.person=slot.features.person==='ben'?'sen':'ben';assert.equal(L.evaluate(task,answer).correct,false,task.id);}}
});

test('simple order and optional pronouns remain tolerant; structured groups retain references',()=>{
 const simple=byId('present-gelmek-ben');assert.equal(L.evaluate(simple,tokens(simple).reverse()).correct,true);assert.equal(L.evaluate(simple,tokens(simple).filter(t=>W.byId[t.lemma].type!=='pronoun')).correct,true);
 const advanced=byId('relative-dik-araba-sen');const wrong=tokens(advanced);[wrong[0],wrong[1]]=[wrong[1],wrong[0]];assert.equal(L.evaluate(advanced,wrong).correct,false);
 const temporal=byId('ken-gelmek-sen'),mixed=tokens(temporal);const actor=mixed.find(t=>t.group==='time'&&W.byId[t.lemma].type==='pronoun');actor.group='main';assert.equal(L.evaluate(temporal,mixed).correct,false);
});

test('empty and sparse vocabularies cannot leak roots or grant unavailable introductions',()=>{
 const {e}=game({keys:[]});assert.equal(e.next(),null);const partial=game({keys:['ev','güzel']}).e;
 for(let i=0;i<12;i++){const cur=partial.next();assert.ok(cur);const task=byId(cur.taskId);assert.deepEqual([...new Set(cur.tokens.map(t=>W.byId[t.lemma].tr))].sort(),['ev','güzel']);assert.ok(task.requires.every(id=>partial.unlocked().has(id)));cur.tokens=tokens(task);partial.check();}
 assert.ok(partial.state.level<=5);assert.ok(!partial.state.introduced.includes('nominalNegative'));assert.ok(partial.missingWords().some(w=>w.tr==='değil'));
});

test('single first-attempt rating survives corrections, duplicate checks, restart and reload',()=>{
 const {e,storage}=game();mature(e,16);const cur=current(e,'object-görmek-sen-w004');
 assert.equal(e.check().delta,-1);assert.equal(e.state.level,15);e.check();assert.equal(e.state.level,15);
 const reload=new L.Engine({storage});assert.equal(reload.next().rated,true);assert.equal(reload.next().taskId,cur.taskId);
 reload.state.current.tokens=tokens(byId(cur.taskId));const solved=reload.check();assert.equal(solved.correct,true);assert.equal(solved.delta,0);assert.equal(reload.state.level,15);assert.deepEqual(reload.check(),{ignored:true});
 assert.ok(reload.state.introduced.includes('accusative'));
});

test('unaided current success rises one; introduction, older task, targeted task and hint stay neutral',()=>{
 for(const kind of ['intro','older','targeted','current']){
  const {e}=game();mature(e,16);const cur=current(e,'object-görmek-sen-w004',kind);cur.tokens=tokens(byId(cur.taskId));assert.equal(e.check().delta,kind==='current'?1:0);
 }
 const {e}=game();mature(e,16);const cur=current(e,'object-görmek-sen-w004');e.hint();cur.tokens=tokens(byId(cur.taskId));assert.equal(e.check().delta,0);assert.equal(e.state.level,16);assert.equal(e.stat('skills','accusative').families.length,0);
});

test('new bands require two different unaided families; repeated one template cannot pass',()=>{
 const {e}=game();mature(e,5);for(let i=0;i<3;i++){const cur=current(e,'nominal-w003');cur.tokens=tokens(byId(cur.taskId));e.check();}
 assert.equal(e.state.level,5);assert.equal(e.stat('skills','bare').families.length,1);assert.equal(e.bandReady(C.bandAt(5)),false);
});

test('word errors and grammar errors receive distinct diagnoses and short review deadlines',()=>{
 const {e}=game();mature(e,16);let cur=current(e,'object-görmek-sen-w004');cur.tokens=tokens(byId(cur.taskId));cur.tokens.find(t=>t.lemma===W.byLemma.araba.id).lemma=W.byLemma.ev.id;
 let verdict=e.check();assert.equal(verdict.issue.area,'word');assert.equal(e.stat('words',W.byLemma.araba.id).errors,1);assert.ok(e.stat('words',W.byLemma.araba.id).errorSequence>=4&&e.stat('words',W.byLemma.araba.id).errorSequence<=6);
 cur=current(e,'object-görmek-sen-w004');cur.tokens=tokens(byId(cur.taskId));cur.tokens.find(t=>t.lemma===W.byLemma.araba.id).features.case='dative';verdict=e.check();assert.equal(verdict.issue.area,'grammar');assert.equal(verdict.issue.field,'case');assert.equal(e.stat('skills','accusative').errors,1);
 const combined=C.tasks.find(t=>t.skills.includes('objectLocation')&&t.groups.flatMap(g=>g.slots).some(s=>s.features.case==='locative'));cur=e.begin(combined,'current');cur.tokens=tokens(combined);cur.tokens.find(t=>t.features.case==='locative').features.case='dative';assert.equal(e.check().issue.skill,'locative');
});

test('spaced retrieval advances only when due and at most once per local day; help never extends',()=>{
 let now=new Date(2026,9,2,12).getTime();const {e}=game({clock:()=>now});const id='bare';e.success('skills',id,'nominal-w003',true);let stat=e.stat('skills',id);
 assert.equal(stat.stage,0);assert.equal(stat.dueSequence,10);e.state.completed=10;e.success('skills',id,'nominal-w004',true);assert.equal(stat.stage,1);const due=stat.dueAt;
 e.success('skills',id,'nominal-w001',true);assert.equal(stat.stage,1);now=due;e.success('skills',id,'nominal-w003',false);assert.equal(stat.stage,1);e.success('skills',id,'nominal-w003',true);assert.equal(stat.stage,2);
 const before=stat.stage;stat.dueAt=now;e.success('skills',id,'nominal-w004',true);assert.equal(stat.stage,before);
 now+=86400000;e.success('skills',id,'nominal-w004',true);assert.equal(stat.stage,before+1);
});

test('20-task blocks cover all eligible cases, keep remediation bounded and exclude introductions',()=>{
 const {e}=game();mature(e,160);for(const s of C.skills)e.state.skills[s.id]={...L.empty().skills,correct:5,errors:1,families:[],stage:0,dueAt:1,dueSequence:0,errorSequence:0,lastSeen:0,lastAdvanceDay:''};
 for(let i=0;i<40;i++)solve(e);
 assert.ok(e.state.lastBlock);const block=e.state.lastBlock;
 const goals=new Set(block.flatMap(x=>byId(x.taskId).cases));for(const c of ['bare','accusative','dative','locative','ablative','genitive'])assert.ok(goals.has(c),c);
 const counts={};for(const item of block)if(item.kind==='targeted')counts[item.target]=(counts[item.target]||0)+1;
 assert.ok(Object.values(counts).every(n=>n<=6));assert.ok(block.every(item=>item.kind!=='intro'));
});

test('a complete simulated journey reaches 160 and continues without exceeding it',()=>{
 const {e}=game();let reached=false;for(let i=0;i<900;i++){const result=solve(e);assert.equal(result.correct,true);if(e.state.level===160){reached=true;break;}}
 assert.equal(reached,true);assert.equal(e.state.introduced.length,C.skills.length);for(let i=0;i<40;i++)solve(e);assert.equal(e.state.level,160);
});

test('migration preserves old storage and punctuation-bearing unlocks; new curriculum starts at 1',()=>{
 const {e,map}=game({legacy:{level:100,levelCorrect:4,mistakes:2}});assert.equal(e.state.level,1);assert.equal(e.state.legacy.level,100);assert.equal(JSON.parse(map.get(L.LEGACY)).level,100);
 const backup=JSON.parse(e.snapshot());assert.equal(backup.unlocks['çok yaşa!'].toTurkish,true);assert.equal(backup.unlocks['sen de gör!'].toGerman,true);
});

test('export/import resumes first outcome and repairs corrupt state without executing values',()=>{
 const {e}=game();mature(e,16);e.begin(byId('object-görmek-sen-w004'),'current');e.check();const copy=game({keys:[]}).e;copy.import(e.snapshot());assert.equal(copy.state.current.rated,true);assert.equal(copy.state.level,15);assert.equal(copy.unlocked().size,W.words.length);
 assert.throws(()=>copy.import('{"format":"wrong"}'));const corrupt=JSON.parse(e.snapshot());corrupt.learning.current.tokens=[];corrupt.learning.skills.constructor={errors:999};copy.import(JSON.stringify(corrupt));assert.ok(copy.next().tokens.length>=3);assert.equal(copy.next().rated,true);assert.equal(Object.hasOwn(copy.state.skills,'constructor'),false);
});

test('storage failures are visible, failed import rolls back, and sentence reset keeps word unlocks',()=>{
 const {e,map}=game();const initial=map.get(L.UNLOCK);e.reset();assert.equal(map.get(L.UNLOCK),initial);
 e.storage.setItem=()=>{throw Error('full');};assert.equal(e.save(),false);assert.ok(e.storageError);assert.throws(()=>e.import(e.snapshot()),/nicht vollständig/);assert.equal(map.get(L.UNLOCK),initial);
});

test('invalid persisted JSON is archived before replacement; failed archive prevents data loss',()=>{
 const {map,storage}=game();map.set(L.KEY,'{damaged');const e=new L.Engine({storage});assert.equal(e.state.level,1);e.save();assert.equal(map.get(L.KEY+'DamagedBackup'),'{damaged');
 map.set(L.KEY,'{second-damage');const other=new L.Engine({storage});storage.setItem=()=>{throw Error('full');};assert.equal(other.save(),false);assert.equal(map.get(L.KEY),'{second-damage');
});

test('immediate correction keeps the later error review and corrected scoring feedback is neutral',()=>{
 const {e}=game();e.begin(byId('object-görmek-sen-w004'),'current');e.error({area:'grammar',skill:'accusative'});const deadline=e.stat('skills','accusative').errorSequence;e.success('skills','accusative','example',false);assert.equal(e.stat('skills','accusative').errorSequence,deadline);
 const a=app();a.unlock();a.run('startSentenceGame();SentenceGame.engine.state.level=16;SentenceGame.engine.state.introduced=AndreCurriculum.skills.map(s=>s.id);SentenceGame.engine.begin(AndreCurriculum.tasks.find(t=>t.id==="object-görmek-sen-w004"),"current");SentenceGame.render();checkSentence();');
 assert.match(a.el('sentenceModeLabel').textContent,/Bereits gewertet/);a.run('SentenceGame.engine.state.current.tokens=AndreCurriculum.tasks.find(t=>t.id==="object-görmek-sen-w004").groups.flatMap(g=>g.slots.map((s,i)=>({...s,id:"test"+i,group:g.id})));checkSentence();');
 assert.equal(a.run('SentenceGame.engine.state.level'),15);assert.match(a.el('sentenceFeedback').textContent,/ohne zusätzliche Leveländerung/);assert.equal(a.el('grammarBank').hidden,true);
});

test('reset and restoration require explicit in-app confirmation and retain a fallback',()=>{
 const a=app();a.unlock();a.run('SentenceGame.engine.state.level=42;SentenceGame.engine.save();');
 const click=text=>{const button=a.el('learnHome').querySelectorAll('button').find(b=>b.textContent===text);assert.ok(button,text);button.click();};
 click('Satzbau zurücksetzen');assert.equal(a.run('SentenceGame.engine.state.level'),42);click('Abbrechen');assert.equal(a.run('SentenceGame.engine.state.level'),42);
 click('Satzbau zurücksetzen');click('Satzbau jetzt zurücksetzen');assert.equal(a.run('SentenceGame.engine.state.level'),1);assert.equal(a.run('SentenceGame.engine.unlocked().size'),51);
 click('Letzte Rückfallsicherung wiederherstellen');assert.equal(a.run('SentenceGame.engine.state.level'),1);click('Lernstand jetzt wiederherstellen');assert.equal(a.run('SentenceGame.engine.state.level'),42);
 const {e}=game();e.state.level=42;e.storage.setItem=()=>{throw Error('full');};assert.equal(e.reset(),false);assert.equal(e.state.level,42);
});

test('browser adapter composes words by keyboard clicks and cancels old transitions on navigation',()=>{
 const a=app();a.unlock(['ev','güzel']);a.run('startSentenceGame()');for(const word of [...a.el('wordBank').children])word.click();a.run('checkSentence()');assert.equal(a.run('SentenceGame.engine.state.current.finished'),true);assert.equal(a.run('SentenceGame.engine.state.level'),1);assert.ok(a.timers.size);a.run('backToLearnHome()');a.advance(5000);assert.equal(a.timers.size,0);
});

test('browser adapter builds suffix chains and the actual full curriculum through its controls',()=>{
 const a=app();a.unlock();a.run('startSentenceGame()');
 for(const task of C.tasks){
  a.run('SentenceGame.engine.state.introduced=AndreCurriculum.skills.map(s=>s.id);SentenceGame.engine.begin(AndreCurriculum.tasks.find(t=>t.id==='+JSON.stringify(task.id)+'),"older");SentenceGame.render();');
  const cur=a.json('SentenceGame.engine.state.current');
  for(const group of task.groups)for(const slot of group.slots){
   const available=cur.tokens.find(t=>t.lemma===slot.lemma&&!t.consumed);available.consumed=true;
   a.run('SentenceGame.moveToken('+JSON.stringify(available.id)+','+JSON.stringify(group.id)+');');
   for(const [field,value] of Object.entries(slot.features)){
    assert.ok(a.json('SentenceGame.allowedCards()').some(card=>card.field===field&&card.value===value),task.id+' missing '+field+':'+value);
    a.run('SentenceGame.apply('+JSON.stringify({field,value})+','+JSON.stringify(available.id)+');');
   }
  }
  a.run('checkSentence()');assert.equal(a.run('SentenceGame.engine.state.current.finished'),true,task.id);a.advance(1500);
 }
});

test('pointer cancellation does not move a modern token and selected-word focus survives inflection',()=>{
 const a=app();a.unlock();a.run('startSentenceGame()');const token=a.el('wordBank').children[0];token.dispatchEvent({type:'pointerdown',button:0,clientX:0,clientY:0,pointerId:1});token.dispatchEvent({type:'pointermove',clientX:30,clientY:20});token.dispatchEvent({type:'pointercancel'});assert.equal(token.parentElement,a.el('wordBank'));
 a.run('SentenceGame.engine.state.introduced=AndreCurriculum.skills.map(s=>s.id);SentenceGame.engine.begin(AndreCurriculum.tasks.find(t=>t.id==="object-görmek-sen-w004"),"older");SentenceGame.render();');
 const id=a.json('SentenceGame.engine.state.current.tokens').find(t=>t.lemma===W.byLemma.araba.id).id;a.run('SentenceGame.moveToken('+JSON.stringify(id)+',"main");SentenceGame.apply({field:"case",value:"accusative"},'+JSON.stringify(id)+');');assert.equal(a.document.activeElement,a.el('sentenceToken-'+id));assert.equal(a.document.activeElement.textContent,'arabayı');
});

test('confetti retains reduced-motion behavior and terminates after the celebration',()=>{
 const reduced=app();assert.equal(reduced.run('celebrateCorrectAnswer()'),420);assert.equal(reduced.animations.length,0);
 const a=app({reducedMotion:false});const duration=a.run('celebrateCorrectAnswer()');assert.ok(duration>0);assert.ok(a.animations.length);a.advance(duration+100);assert.ok(a.animations.every(x=>x.cancelled));assert.equal(a.run('confettiCelebration'),null);
});
