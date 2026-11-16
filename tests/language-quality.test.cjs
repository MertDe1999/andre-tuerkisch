const test=require('node:test'),assert=require('node:assert/strict');
const W=require('../data/words'),T=require('../lib/turkish'),I=require('../lib/interest-generator'),G=require('../lib/course-grammar');
const lex=(tr,type)=>I.lex(tr,type),person=tr=>lex(tr,'pronoun');
const event=(verb,features={},actor='ben')=>({actor:person(actor),verb:lex(verb,'verb'),features:{tense:'present',...features}});

test('catalogued noun stems soften before a vowel but retain consonants before locative and plural endings',()=>{
 const cases=[['kulaklık','kulaklığı'],['pirinç','pirinci'],['olasılık','olasılığı'],['imparatorluk','imparatorluğu'],['mutfak','mutfağı'],['çorap','çorabı'],['tavuk','tavuğu'],['sarımsak','sarımsağı'],['şarap','şarabı']];
 for(const [lemma,answer] of cases)assert.equal(T.noun(lemma,{case:'accusative'}),answer);
 assert.equal(T.noun('kulaklık',{case:'locative'}),'kulaklıkta');
 assert.equal(T.noun('kulaklık',{plural:true,case:'accusative'}),'kulaklıkları');
 assert.equal(T.noun('kulaklık',{poss:'ben'}),'kulaklığım');
 assert.equal(T.noun('sepet',{case:'accusative'}),'sepeti');
 assert.equal(T.noun('süt',{case:'accusative'}),'sütü');
});

test('taste and nominal past questions use the actual Turkish stems and question order',()=>{
 assert.equal(T.verb('tatmak',{tense:'present',person:'ben'}),'tadıyorum');
 assert.equal(T.verb('tatmak',{tense:'present',person:'sen',register:'colloquial'}),'tadıyon');
 assert.equal(T.verb('tatmak',{tense:'past',person:'ben'}),'tattım');
 assert.equal(T.verb('tatmak',{tense:'present',person:'ben',negative:true}),'tatmıyorum');
 assert.equal(T.nominal('güzel',{past:true,question:true,person:'sen'}),'güzel miydin');
 assert.equal(T.surface({lemma:W.byLemma.ev.id,features:{case:'locative',predicatePerson:'ben',past:true,question:true}}),'evde miydim');
 assert.equal(T.nominal('hasta',{past:true,question:true,person:'biz'}),'hasta mıydık');
});

test('German lexical person forms are not guessed from truncated verb stems',()=>{
 for(const [verb,actor,expected] of [['açmak','sen','du öffnest'],['açmak','o','er öffnet'],['hesaplamak','sen','du berechnest'],['hesaplamak','o','er berechnet'],['taşımak','sen','du trägst'],['taşımak','o','er trägt'],['giymek','o','er trägt'],['giymek','siz','ihr tragt']])assert.equal(I.deClause(event(verb,{},actor)),expected);
});

test('German reflexive pronouns precede negation and stay out of the infinitive',()=>{
 assert.equal(I.deClause(event('dinlenmek',{negative:true})),'ich ruhe mich nicht aus');
 assert.equal(I.deClause(event('dinlenmek',{negative:true}),{subordinate:true}),'ich mich nicht ausruhe');
 assert.equal(I.deClause(event('dinlenmek',{tense:'future',negative:true})),'ich werde mich nicht ausruhen');
 assert.equal(I.deClause(event('dinlenmek',{ability:true})),'ich kann mich ausruhen');
 assert.equal(I.deClause(event('dinlenmek',{tense:'past'})),'ich habe mich ausgeruht');
 assert.equal(I.deClause(event('buluşmak',{tense:'future'},'sen')),'du wirst dich treffen');
 assert.equal(I.deClause(event('görüşmek',{tense:'past'},'biz')),'wir haben uns getroffen');
});

test('purpose clauses build separable and multiword zu-infinitives without duplicating sich',()=>{
 for(const [verb,expected] of [['dinlenmek','Ich gehe, um mich auszuruhen.'],['gezmek','Ich gehe, um spazieren zu gehen.'],['buluşmak','Ich gehe, um mich zu treffen.']]){
  const task=I.build({family:'purpose',first:event(verb),second:event('gitmek'),theme:'T05',section:17});
  assert.equal(task.de,expected);
 }
});

test('ability keeps the same past or future time in both languages',()=>{
 let tree=event('gelmek',{tense:'past',ability:true});
 assert.equal(I.deClause(tree),'ich konnte kommen');assert.equal(I.trClause(tree).slots.map(T.surface).join(' '),'ben gelebildim');
 tree=event('gelmek',{tense:'future',ability:true});
 assert.equal(I.deClause(tree),'ich werde kommen können');assert.equal(I.trClause(tree).slots.map(T.surface).join(' '),'ben gelebileceğim');
 assert.equal(I.deClause(event('gelmek',{tense:'reported'})),'ich bin offenbar gekommen');
});

test('compound clauses cannot keep a Turkish question that their German translation omits',()=>{
 const first=event('gelmek',{question:true}),second=event('gitmek',{question:true},'sen');
 const compound=I.build({family:'because',first,second,theme:'T05',section:17});
 assert.equal(compound.de,'Ich komme, denn du gehst.');assert.equal(compound.answer,'ben geliyorum çünkü sen gidiyorsun');
 assert.equal(first.features.question,true);assert.equal(second.features.question,true);
 const question=I.build({first,theme:'T05',section:17});assert.equal(question.de,'Komme ich?');assert.equal(question.answer,'ben geliyor muyum');
});

test('generated calls select Turkish dative while retaining German accusative',()=>{
 const calls=I.generate({section:32,seed:912,perTheme:8}).filter(t=>t.groups[0].slots.some(s=>s.lemma===lex('telefon etmek','verb').id));
 assert.ok(calls.length>0);
 for(const task of calls){const slots=task.groups[0].slots,index=slots.findIndex(s=>s.lemma===lex('telefon etmek','verb').id);assert.equal(slots[index-1].features.case,'dative');}
 assert.equal(lex('fotoğraf çekmek','verb').deGrammar.frame,'simple','taking a photo is not incorrectly turned into X-i fotoğraf çekmek');
});

test('generated object roles reject concrete nonsense such as washing a percentage or sharing a person',()=>{
 const tasks=I.generate({section:32,seed:912,perTheme:30}),covered=new Set();
 for(const task of tasks)for(const node of [task.ast?.first,task.ast?.second]){
  if(!node?.object)continue;const verb=W.byId[node.verb],object=W.byId[node.object];
  if(['yıkamak','temizlemek'].includes(verb.tr)){covered.add('wash');assert.ok(!['yüzde','olasılık','imparatorluk'].includes(object.tr));assert.notEqual(object.semantic,'human');}
  if(verb.tr==='paylaşmak'){covered.add('share');assert.ok(!['human','animal','fiction'].includes(object.semantic));}
  if(verb.tr==='ödemek'){covered.add('pay');assert.equal(object.tr,'fiyat');}
  if(verb.tr==='hesaplamak'){covered.add('calculate');assert.ok(['fiyat','indirim','kalori','yüzde','alan','olasılık','kesir'].includes(object.tr));}
 }
 assert.ok(covered.has('wash'));assert.ok(covered.has('share'));assert.ok(covered.has('calculate'));
});

test('typographic apostrophes do not turn correct Turkish answers into mistakes',()=>{
 assert.equal(G.norm('Mert’in kitabı.','tr'),G.norm("Mert'in kitabı",'tr'));
 assert.ok(G.alternatives("Mert'in kitabı",'tr').includes(G.norm('Mert’in kitabı','tr')));
 assert.notEqual(G.norm('sık','tr'),G.norm('sik','tr'),'Turkish dotted and dotless i remain different');
});
