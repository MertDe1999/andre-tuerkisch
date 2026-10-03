/* Concrete Turkish word stems and affixes. No translated grammar controls. */
(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const W=node?require('../data/words.js'):root.AndreWords;
  const T=node?require('./turkish.js'):root.Turkish;
  const baseFeatures=lemma=>W.byId[lemma].type==='verb'?{tense:'imperative',person:'sen'}:{};
  const surface=token=>token.form||T.surface(token);
  const canonical=(token,features=token.features)=>T.surface({...token,features,form:undefined});
  function difference(before,after){
    if(after===before)return null;
    if(after.startsWith(before)){
      const tail=after.slice(before.length);
      return {text:tail.startsWith(' ')?tail.trim():'-'+tail,stem:before,join:tail.startsWith(' ')?' ':'',replacement:false};
    }
    let common=0;while(common<before.length&&before[common]===after[common])common++;
    // Stem softening (git -> gid, ağaç -> ağac) and vowel loss (yıka -> yık).
    if(common>=before.length-1&&after.length>before.length){
      const length=T.vowel(before)?before.length-1:before.length;
      return {text:'-'+after.slice(length),stem:after.slice(0,length),join:'',replacement:false};
    }
    // Irregular pronouns are concrete Turkish forms, e.g. ben -> bana.
    return {text:after,stem:'',join:'',replacement:true};
  }
  function plan(slot){
    const type=W.byId[slot.lemma].type,f=slot.features||{},steps=[];
    let before=baseFeatures(slot.lemma);
    const add=(stage,patch,replace=false)=>{
      const after=replace?{...patch}:{...before,...patch};
      const from=canonical(slot,before),to=canonical(slot,after),delta=difference(from,to);
      if(delta)steps.push({...delta,stage,type,lemma:slot.lemma,before:{...before},after,replace,from,to});
      before=after;
    };
    if(type==='verb'){
      if(['ma','dik','acak'].includes(f.tense)){
        const first=Object.fromEntries(Object.entries(f).filter(([key])=>!['poss','case'].includes(key)));
        add('verb',first,true);
        if(f.poss)add('poss',{poss:f.poss});
        if(f.case&&f.case!=='bare')add('case',{case:f.case});
      }else add('verb',f,true);
    }else{
      if(f.plural)add('plural',{plural:true});
      if(f.poss)add('poss',{poss:f.poss});
      if(f.case&&f.case!=='bare')add('case',{case:f.case});
      // Copula/person and a question particle belong together where required.
      const pred=Object.fromEntries(Object.entries(f).filter(([key])=>['predicatePerson','person','past','question'].includes(key)));
      if(Object.keys(pred).length)add('predicate',pred);
    }
    return steps;
  }
  const rng=seed=>()=>((seed=(seed*16807)%2147483647)-1)/2147483646;
  function shuffle(values,random){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function distance(a,b){
    let row=Array.from({length:b.length+1},(_,i)=>i);
    for(let i=0;i<a.length;i++){const next=[i+1];for(let j=0;j<b.length;j++)next.push(Math.min(next[j]+1,row[j+1]+1,row[j]+(a[i]===b[j]?0:1)));row=next;}
    return row[b.length];
  }
  const similar=(a,b)=>distance(a,b)/Math.max(a.length,b.length,1);
  function cards(task,current,introduced=[]){
    const slots=task.groups.flatMap(g=>g.slots),required=slots.flatMap(plan),rules=new Set(introduced),pool=[];
    const bankWords=[...current.tokens].sort((a,b)=>a.lemma.localeCompare(b.lemma)||a.id.localeCompare(b.id));
    const people=rules.has('otherPeople')?T.people:T.people.slice(0,4);
    for(const slot of slots){
      const f=slot.features,type=W.byId[slot.lemma].type;
      const variant=patch=>{try{pool.push(...plan({...slot,features:{...f,...patch}}));}catch{}};
      for(const token of bankWords)if(W.byId[token.lemma].type===type){
        try{pool.push(...plan({...slot,lemma:token.lemma}));}catch{}
      }
      if(type==='verb'&&f.person)for(const person of people)variant({person});
      if(f.poss)for(const poss of people)variant({poss});
      if(f.predicatePerson)for(const predicatePerson of people)variant({predicatePerson});
      if(f.case)for(const name of ['accusative','dative','locative','ablative','genitive','instrumental'])if(rules.has(name))variant({case:name});
      if(type==='verb')for(const tense of ['present','past','future','reported','aorist'])if(rules.has(tense))variant({tense});
      if(type==='verb'&&task.register==='colloquial')variant({register:'standard'});
    }
    // Generate complete allomorphs through morphology: changing just the last
    // vowel would invent invalid pieces such as -sıniz or -lari.
    for(const step of required){
      if(step.replacement||step.stage==='verb')continue;
      for(const stem of ['a','e','u','ü','ak','ek','uk','ük']){
        const morph=f=>step.stage==='predicate'
          ?T.nominal(T.noun(stem,f),{person:f.predicatePerson||f.person,past:f.past,question:f.question})
          :T.noun(stem,f);
        const delta=difference(morph(step.before),morph(step.after));
        if(delta&&!delta.replacement)pool.push({...step,text:delta.text,join:delta.join});
      }
    }
    const requiredTexts=new Set(required.map(s=>s.text));
    const candidates=pool.filter(s=>!requiredTexts.has(s.text)&&required.some(r=>r.stage===s.stage&&r.type===s.type&&similar(r.text,s.text)<=.6));
    const random=rng(current.bankSeed||current.id||1),extras=[],seen=new Set(requiredTexts);
    for(const step of shuffle(candidates,random))if(!seen.has(step.text)){
      extras.push(step);seen.add(step.text);if(extras.length>=3)break;
    }
    const byText=new Map();
    for(const step of [...required,...extras]){
      if(!byText.has(step.text))byText.set(step.text,{text:step.text,operations:[]});
      byText.get(step.text).operations.push(step);
    }
    return shuffle([...byText.values()],rng((current.bankSeed||current.id||1)+37));
  }
  function fits(token,card){return card.operations.some(op=>op.type===W.byId[token.lemma].type);}
  function apply(token,card){
    const operations=card.operations.filter(op=>op.type===W.byId[token.lemma].type);
    if(!operations.length)return false;
    const op=operations.find(op=>op.from===surface(token))||operations.find(op=>op.lemma===token.lemma)||operations[0];
    token.attachments||=[];
    const previous=token.attachments.findIndex(part=>part.stage===op.stage);
    if(previous>=0){const saved=token.attachments[previous];token.features={...saved.features};token.form=saved.form;token.attachments.splice(previous);}
    const before={stage:op.stage,features:{...token.features},form:token.form||null};
    const next=op.replace?{...op.after}:{...token.features,...Object.fromEntries(Object.entries(op.after).filter(([key,value])=>op.before[key]!==value))};
    const from=canonical(token),to=canonical(token,next),delta=difference(from,to);
    if(!delta)return false;
    const actual=surface(token);
    if(op.replacement)token.form=card.text;
    else if(delta.text===card.text&&actual===from)token.form=to;
    else{
      // Wrong allomorphs stay wrong: attaching -yi does not silently become -yı.
      let stem=actual;
      if(actual===from&&!delta.replacement)stem=delta.stem;
      token.form=stem+(op.join||'')+card.text.replace(/^-/,'');
    }
    token.features=next;token.attachments.push(before);return true;
  }
  function undo(token){
    const saved=token.attachments?.pop();
    if(saved){token.features={...saved.features};token.form=saved.form;return true;}
    // Resume existing V2 states without discarding words, rating or learning history.
    const steps=plan(token),last=steps.at(-1);
    if(last){token.features={...last.before};delete token.form;return true;}
    return false;
  }
  const api={baseFeatures,surface,plan,cards,fits,apply,undo,shuffle,similar};
  if(node)module.exports=api;else root.TurkishBlocks=api;
})(typeof globalThis==='object'?globalThis:this);
