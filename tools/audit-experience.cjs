/* Reproducible offline inventory and 160-level eligibility audit. No browser. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const C=require('../lib/course'),P=require('../lib/learning-path'),L=require('../lib/guided-learning'),G=require('../lib/course-grammar'),T=require('../lib/turkish'),I=require('../lib/interest-generator'),W=require('../data/words');
const root=path.join(__dirname,'..'),map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)},e=new L.Engine({storage,random:()=>.37});
const normal=s=>s.toLocaleLowerCase('tr-TR').replace(/[’']/g,'').replace(/[^\p{L}\p{N}\s]/gu,'').replace(/\s+/g,' ').trim();
const report={method:'Offline model/structural checks, not independent linguistic or device certification.',words:W.words.length,automaticNamesAndLoans:P.auto.size,references:0,levels:[],scripts:[]};
for(const band of C.bands)for(const ex of band.examples){assert.equal(normal(ex.slots.map(T.surface).join(' ')),normal(ex.tr),ex.id);report.references++;}
const personal=require('../data/interest-references'),pairs=require('../data/interest-reference-pairs.json');
const referenceText=s=>s.replace(/Switch 2/g,'Nintendo Switch 2').replace(/Galaxy S25\+/g,'Samsung Galaxy S25+').replace(/Book5/g,'Book 5').replace(/küfrederim/g,'küfür ederim').replace(/küfretmiyorum/g,'küfür etmiyorum');
for(const [i,ex] of personal.entries()){assert.equal(normal(ex.groups.flatMap(g=>g.slots).map(T.surface).join(' ')),normal(referenceText(pairs[i].tr)),ex.id);report.references++;}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');let inline=0;
report.localAssets=[...html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css|svg)(?:\?[^\"]*)?)"/g)].map(m=>m[1].split('?')[0]).filter(x=>!x.includes('://'));
for(const asset of report.localAssets)assert.ok(fs.existsSync(path.join(root,asset)),asset);
for(const [,src,body] of html.matchAll(/<script(?: src="([^"]+)")?>([\s\S]*?)<\/script>/g)){const file=src?.split('?')[0]||'inline-'+(++inline);new vm.Script(src?fs.readFileSync(path.join(root,file),'utf8'):body,{filename:file});report.scripts.push(file);}
const ids=new Set();for(const w of W.words){assert.ok(!ids.has(w.id),w.id);ids.add(w.id);assert.ok(w.tr&&w.de&&w.type,w.id);}
let previous=new Set();
for(const lesson of P.lessons){
 e.flow.level=lesson.level;e.flow.frontier=lesson.level;e.flow.round=null;e.state.current=null;e.poolKey='';e.syncProgress();
 const required=P.wordIds(lesson.level),newWords=required.filter(id=>!previous.has(id));previous=new Set(required);
 map.set(L.UNLOCK,JSON.stringify(Object.fromEntries(required.map(id=>[id,{toTurkish:true,toGerman:true}]))));
 const pool=e.available(),known=e.unlocked(),forms=e.practiceGrammar();
 assert.ok(pool.length,'Level '+lesson.level);
 for(const task of pool){assert.ok(task.requires.every(id=>known.has(id)),task.id);assert.ok(e.canTask(task,forms),task.id);}
 const themes=I.themes.map(theme=>({id:theme.id,variants:new Set(pool.filter(t=>t.primaryTheme===theme.id||t.themes?.includes(theme.id)).map(t=>t.answer)).size}));
 assert.ok(themes.every(t=>t.variants>0),'Theme coverage '+lesson.level);
 const targets=lesson.targets.map(id=>({id,label:G.byId[id].label,variants:new Set(pool.filter(t=>e.requiredFor(t).includes(id)).map(t=>t.answer)).size}));
 assert.ok(targets.every(t=>t.variants>=3),'Form coverage '+lesson.level);
 const sample=pool.find(t=>t.min>=C.bandAt(lesson.level).start)||pool[0];
 report.levels.push({level:lesson.level,cefr:lesson.cefr,section:C.bandAt(lesson.level).title,newWords:newWords.map(id=>W.byId[id].tr),cumulativeWords:required.length,targets,available:pool.length,distinctSentences:new Set(pool.map(t=>t.answer)).size,themes,sample:{tr:sample.answer,de:sample.de}});
 // Carry successful prior rules forward without pretending this is a learner test.
 for(const id of lesson.targets)e.grammar.state.unlocked[id]=true;e.grammar.save();
 if(lesson.level%40===0)console.log('Audited level '+lesson.level);
}
const output=path.join(root,'docs/level-audit-2026-11-13.json');fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
console.log('PASS: '+report.references+' authored references, '+report.scripts.length+' scripts, 160 levels, 23 themes each.');
