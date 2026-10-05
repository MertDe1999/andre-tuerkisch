/* Compile the personal reference collection to explicit lexical IDs and features. */
const fs=require('node:fs'),path=require('node:path'),W=require('../data/words'),T=require('../lib/turkish'),I=require('../lib/interest-generator'),C=require('../lib/course');
const pairs=require('../data/interest-reference-pairs.json'),forms=new Map();
function add(w,f={},nominal=false){try{const slot={lemma:w.id,features:f,...(nominal?{nominal:true}:{})},text=T.norm(w.compoundParts||w.derivedPhrase||w.derivationWord?I.phrase(w,f).slots.map(T.surface).join(' '):T.surface(slot));if(!forms.has(text))forms.set(text,[]);forms.get(text).push(slot);}catch{}}
const cases=['bare','dative','locative','accusative','ablative','genitive','instrumental'];
for(const w of W.words){if(w.type!=='verb'){
 add(w);if(['noun','pronoun'].includes(w.type))for(const c of cases){add(w,{case:c});if(w.type==='noun')for(const plural of [false,true])for(const poss of [null,...T.people])add(w,{...(plural?{plural}:{}),...(poss?{poss}:{}),...(c!=='bare'?{case:c}:{})});}
 if(w.type==='noun')for(const derivation of ['with','without','while'])add(w,{derivation});
 if(['adj','existential','negation'].includes(w.type))for(const person of T.people)for(const past of [false,true])for(const question of [false,true])add(w,{person,...(past?{past}:{}),...(question?{question}:{})},true);
 if(w.type==='noun')for(const c of ['bare','locative'])for(const person of T.people)add(w,{...(c!=='bare'?{case:c}:{}),predicatePerson:person});
}else for(const voice of [null,...Object.keys(w.voice||{})]){
 const base=voice?{voice}:{};for(const tense of ['infinitive','an','ip','ince','arak','madan','ken'])add(w,{...base,tense});
 for(const tense of ['ma','dik','acak'])for(const negative of [false,true])for(const poss of [null,...T.people])for(const c of cases)add(w,{...base,tense,...(negative?{negative}:{}),...(poss?{poss}:{}),...(c!=='bare'?{case:c}:{})});
 for(const tense of ['present','past','future','reported','aorist','necessity','conditional','imperative','optative'])for(const person of T.people)for(const negative of [false,true])for(const question of [false,true])for(const ability of [false,true]){
  const f={...base,tense,person,...(negative?{negative}:{}),...(question?{question}:{}),...(ability?{ability}:{})};add(w,f);if(tense==='present')add(w,{...f,register:'colloquial'});
  if(!question&&!ability&&!voice&&['present','future','aorist','reported'].includes(tense))for(const compound of ['past','reported'])add(w,{...f,compound});
 }
}}
const normalize=s=>T.norm(s.replace(/[«»]/g,'').replace(/Switch 2/g,'Nintendo Switch 2').replace(/Galaxy S25\+/g,'Samsung Galaxy S25+').replace(/Book5/g,'Book 5').replace(/küfrederim/g,'küfür ederim').replace(/küfretmiyorum/g,'küfür etmiyorum'));
const missing=[],tasks=[];
for(const pair of pairs){const tokens=normalize(pair.tr).split(/\s+/),slots=[];let failed=false;
 for(let index=0;index<tokens.length;index++){
  let candidates=[],length=0;for(let n=Math.min(7,tokens.length-index);n>0;n--){const text=tokens.slice(index,index+n).join(' ');if(forms.has(text)){candidates=forms.get(text);length=n;break;}}
  if(!length){missing.push({level:pair.level,token:tokens[index]});failed=true;continue;}
  const text=tokens.slice(index,index+length).join(' ');
  // Explicit semantic decisions for homographs in this authored collection.
  if(text==='ben')candidates=candidates.filter(s=>W.byId[s.lemma].type===([17].includes(pair.level)?'noun':'pronoun'));
  if(/^ben[']/.test(text))candidates=candidates.filter(s=>W.byId[s.lemma].properName);
  if(text==='erkeğin'&&[133,134].includes(pair.level))candidates=candidates.filter(s=>s.features.case==='genitive'&&!s.features.poss);
  if(text==='gözlerini'&&pair.level===143)candidates=candidates.filter(s=>s.features.poss==='sen'&&s.features.plural&&s.features.case==='accusative');
  if(text==='gözleri'&&[34,134].includes(pair.level))candidates=candidates.filter(s=>s.features.poss==='o'&&s.features.plural);
  if(text==='saçları'&&pair.level===133)candidates=candidates.filter(s=>s.features.poss==='o'&&s.features.plural);
  if(text==='telefonunu')candidates=candidates.filter(s=>s.features.poss==='sen'&&s.features.case==='accusative');
  if(text==='yemek')candidates=candidates.filter(s=>W.byId[s.lemma].type===([19,47,51,84,93,121,124,125,129,137,154,158].includes(pair.level)?'noun':'verb'));
  if(text==='yıkanıyor')candidates=candidates.filter(s=>s.features.voice===(pair.level===109?'reflexive':'passive'));
  const previous=tokens.slice(0,index).join(' '),poss=/senin/.test(previous)?'sen':/benim/.test(previous)?'ben':/andré'nin|mert'in/.test(previous)?'o':null;
  if(poss&&candidates.some(s=>s.features.poss===poss)&&candidates.some(s=>['ma','dik','acak'].includes(s.features.tense)))candidates=candidates.filter(s=>s.features.poss===poss);
  if(/^(kitabını|denklemi|çikolatayı|penisi|arabayı|telefonunu|keki|suşiyi|metni|yemeği)$/.test(text))candidates=candidates.filter(s=>s.features.case==='accusative');
  candidates=[...candidates].sort((a,b)=>Object.keys(a.features).length-Object.keys(b.features).length);
  if(!candidates[0]){missing.push({level:pair.level,token:text,ambiguity:true});failed=true;}else slots.push(candidates[0]);index+=length-1;
 }
 if(failed)continue;
 const extra=slots.map(s=>s.lemma),extraUses=[];const expanded=slots.flatMap(s=>{const w=W.byId[s.lemma];if(w.compoundParts||w.derivedPhrase||w.derivationWord){const p=I.phrase(w,s.features);extraUses.push(...p.uses);return p.slots;}return [s];});
 const section=Math.ceil(pair.level/5),band=C.bands[section-1],answer=expanded.map(T.surface).join(' ');
 if(T.norm(answer)!==normalize(pair.tr))throw Error(pair.level+' rendering mismatch: '+answer);
 tasks.push({id:'personal:'+pair.level,source:'personal:'+pair.level,min:pair.level,band:band.id,cefr:band.cefr,register:pair.level>=81?'standard':'colloquial',verbRegister:pair.level>=81?'standard':'colloquial',groups:[{id:'main',label:'Dein Satz',ordered:true,slots:expanded}],de:pair.de,answer,requires:[...new Set([...extra,...expanded.map(s=>s.lemma)])],uses:[...new Set([...C.uses(expanded,section),...extraUses])],skills:[band.id],family:'personal:'+pair.level,ast:{family:'reference',level:pair.level},themes:[...new Set(extra.flatMap(id=>W.byId[id].themes||[]))],cases:[...new Set(expanded.filter(s=>W.byId[s.lemma].type==='noun').map(s=>s.features.case||'bare'))]});
}
if(missing.length){console.log(JSON.stringify(missing,null,2));console.log(tasks.length+' / 160 parsed');process.exitCode=1;}
else{fs.writeFileSync(path.join(__dirname,'../data/interest-references.js'),'/* Compiled personal references; words and every form remain separately gated. */\n(function(root){const data='+JSON.stringify(tasks)+';if(typeof module===\'object\'&&module.exports)module.exports=data;else root.AndreInterestReferences=data;})(typeof globalThis===\'object\'?globalThis:this);\n');console.log(tasks.length+' personal references compiled');}
