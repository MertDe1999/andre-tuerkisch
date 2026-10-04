/* Rebuild structured reference slots; failures require an explicit author decision. */
const fs=require('node:fs'),path=require('node:path');
const W=require('../data/words'),T=require('../lib/turkish');
const sections=require('../data/reference-pairs.json'),forms=new Map();
function add(w,f={},nominal=false){try{
 const slot={lemma:w.id,features:f,...(nominal?{nominal:true}:{})},text=T.norm(T.surface(slot));
 if(!forms.has(text))forms.set(text,[]);forms.get(text).push(slot);
}catch{}}
const cases=['bare','dative','locative','accusative','ablative','genitive','instrumental'];
for(const w of W.words){
 if(w.type!=='verb'){
  add(w);
  if(['noun','pronoun'].includes(w.type))for(const c of cases){
   add(w,{case:c});
   if(w.type==='noun')for(const plural of [false,true])for(const poss of [null,...T.people])add(w,{...(plural?{plural}:{}),...(poss?{poss}:{}),...(c!=='bare'?{case:c}:{})});
  }
  if(['adj','existential','negation'].includes(w.type))for(const person of T.people)for(const past of [false,true])for(const question of [false,true])add(w,{person,...(past?{past}:{}),...(question?{question}:{})},true);
  if(w.type==='noun')for(const c of ['bare','locative'])for(const person of T.people)add(w,{...(c!=='bare'?{case:c}:{}),predicatePerson:person});
 }else for(const voice of [null,...Object.keys(w.voice||{})]){
  const base=voice?{voice}:{};
  for(const tense of ['infinitive','an','ip','ince','arak','madan','ken'])add(w,{...base,tense});
  for(const tense of ['ma','dik','acak'])for(const negative of [false,true])for(const poss of [null,...T.people])for(const c of cases)add(w,{...base,tense,...(negative?{negative}:{}),...(poss?{poss}:{}),...(c!=='bare'?{case:c}:{})});
  for(const tense of ['present','past','future','reported','aorist','necessity','conditional','imperative','optative'])for(const person of T.people)for(const negative of [false,true])for(const question of [false,true])for(const ability of [false,true]){
   const f={...base,tense,person,...(negative?{negative}:{}),...(question?{question}:{}),...(ability?{ability}:{})};add(w,f);
   if(tense==='present')add(w,{...f,register:'colloquial'});
   if(!question&&!ability&&!voice&&['present','future','aorist','reported'].includes(tense))for(const compound of ['past','reported'])add(w,{...f,compound});
  }
 }
}
function choose(token,example,index,tokens,section){
 let candidates=forms.get(token)||[];
 if(!candidates.length)throw new Error('Unbekannte Referenzform '+example.id+': '+token);
 if(token==='evin')candidates=candidates.filter(s=>tokens[index+1]==='kapısı'?s.features.case==='genitive':s.features.poss==='sen');
 if(['evi','kitabı'].includes(token))candidates=candidates.filter(s=>s.features.case==='accusative'&&!s.features.poss);
 if(token==='gelmem')candidates=candidates.filter(s=>section<=11?s.features.tense==='aorist':s.features.tense==='ma');
 if(token==='geldik')candidates=candidates.filter(s=>s.features.tense==='past'&&s.features.person==='biz');
 if(/^(gelecek|geleceğim|gelmeyecek|gidecek)$/.test(token))candidates=candidates.filter(s=>s.features.tense==='future');
 if(token==='yıkanıyor')candidates=candidates.filter(s=>s.features.voice===(tokens[0]==='anne'?'reflexive':'passive'));
 if(token==='görüşüyor')candidates=candidates.filter(s=>W.byId[s.lemma].tr==='görüşmek');
 if(['geldiğini','geleceğini'].includes(token))candidates=candidates.filter(s=>s.features.poss===(tokens.some(x=>x==='senin')?'sen':'o'));
 candidates.sort((a,b)=>Object.keys(a.features).length-Object.keys(b.features).length);
 const result=candidates[0];if(!result)throw new Error('Mehrdeutigkeit '+example.id+': '+token);return result;
}
for(const section of sections)for(const ex of section.examples){
 const tokens=T.norm(ex.tr).split(/\s+/),slots=[];
 for(let i=0;i<tokens.length;i++){
  let token=tokens[i];
  if(/^m[ıiuü]/.test(tokens[i+1]||'')&&forms.has(token+' '+tokens[i+1]))token+=' '+tokens[++i];
  slots.push(choose(token,ex,i,tokens,Math.ceil(section.start/5)));
 }
 ex.slots=slots;
 const rendered=slots.map(T.surface).join(' ');
 if(T.norm(rendered)!==T.norm(ex.tr))throw new Error(ex.id+' '+rendered);
}
const destination=path.join(__dirname,'../data/course-data.js');
fs.writeFileSync(destination,'/* Authored bilingual reference structures. Rebuild with tools/build-course.cjs. */\n(function(root){const data='+JSON.stringify(sections,null,2)+';if(typeof module==="object"&&module.exports)module.exports=data;else root.AndreCourseData=data;})(typeof globalThis==="object"?globalThis:this);\n');
console.log(sections.length+' Abschnitte, '+sections.flatMap(s=>s.examples).length+' Referenzen kompiliert.');
