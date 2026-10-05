/* Turkish morphology for the vocabulary supported by this game. */
(function(root){
  'use strict';
  const W = typeof module === 'object' && module.exports ? require('../data/words.js') : root.AndreWords;
  const norm = text => String(text || '').normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[.!?,;:]+/g,'').trim();
  const vowel = text => /[aeıioöuü]$/.test(text);
  const last = text => norm(text).match(/[aeıioöuü]/g)?.at(-1) || 'e';
  const A = text => /[eiöü]/.test(last(text)) ? 'e' : 'a';
  const I = text => ({a:'ı',ı:'ı',e:'i',i:'i',o:'u',u:'u',ö:'ü',ü:'ü'})[last(text)];
  const D = text => /[çfhkpsşt]$/.test(text) ? 't' : 'd';
  const word = lemma => W.byId[lemma] || W.byLemma[norm(lemma)];
  const people = ['ben','sen','o','biz','siz','onlar'];
  const pindex = person => Math.max(0, people.indexOf(person || 'o'));
  function possess(stem, person){
    const p = pindex(person);
    if(stem==='su')return ['suyum','suyun','suyu','suyumuz','suyunuz','suları'][p];
    if(p===0) return stem+(vowel(stem)?'':I(stem))+'m';
    if(p===1) return stem+(vowel(stem)?'':I(stem))+'n';
    if(p===2) return stem+(vowel(stem)?'s':'')+I(stem);
    if(p===3) return stem+(vowel(stem)?'':I(stem))+'m'+I(stem)+'z';
    if(p===4) return stem+(vowel(stem)?'':I(stem))+'n'+I(stem)+'z';
    return stem+'l'+A(stem)+'r'+I(stem+'l'+A(stem)+'r');
  }
  function decline(stem, key='bare', possessed=false){
    if(key==='bare') return stem;
    const n = possessed ? 'n' : '';
    if(key==='locative') return stem+n+D(stem)+A(stem);
    if(key==='ablative') return stem+n+D(stem)+A(stem)+'n';
    if(key==='dative') return stem+(possessed?'n':vowel(stem)?'y':'')+A(stem);
    if(key==='accusative') return stem+(possessed?'n':vowel(stem)?'y':'')+I(stem);
    if(key==='genitive') return stem+(vowel(stem)?'n':'')+I(stem)+'n';
    if(key==='instrumental') return stem+(vowel(stem)?'y':'')+'l'+A(stem);
    throw new Error('Unknown case: '+key);
  }
  function noun(lemma, f={}){
    const entry=word(lemma);let stem=entry?.tr || norm(lemma);
    if(f.derivation==='with')stem+='l'+I(stem);
    if(f.derivation==='without')stem+='s'+I(stem)+'z';
    if(f.derivation==='while')stem+=(vowel(stem)?'y':'')+'ken';
    if(entry?.properName&&!f.derivation){
      const phonetic=entry.harmonyStem||entry.tr.toLocaleLowerCase('tr-TR');
      let formed=phonetic;
      if(f.plural)formed+='l'+A(formed)+'r';if(f.poss)formed=possess(formed,f.poss);
      formed=decline(formed,f.case,f.poss==='o'||f.poss==='onlar'||entry.possessed===true);
      const suffix=formed.slice(phonetic.length);return entry.tr+(suffix?(entry.apostrophe===false||f.plural?'':"'")+suffix:'');
    }
    const irregular = {ben:{genitive:'benim',dative:'bana',accusative:'beni',instrumental:'benimle'},sen:{genitive:'senin',dative:'sana',accusative:'seni',instrumental:'seninle'},o:{genitive:'onun',dative:'ona',accusative:'onu',locative:'onda',ablative:'ondan',instrumental:'onunla'},biz:{genitive:'bizim',instrumental:'bizimle'},siz:{genitive:'sizin',instrumental:'sizinle'},onlar:{genitive:'onların',instrumental:'onlarla'}};
    if(entry?.type==='pronoun'&&!f.plural && !f.poss && irregular[stem]?.[f.case]) return irregular[stem][f.case];
    if(f.plural && f.poss!=='onlar') stem+='l'+A(stem)+'r';
    const firstVowel = f.poss ? !vowel(stem) && !['onlar'].includes(f.poss) : ['accusative','dative','genitive'].includes(f.case);
    if(!f.plural&&!f.derivation && entry?.soften && firstVowel) stem=entry.soften;
    if(!f.plural&&!f.derivation && entry?.vowelLoss && firstVowel)stem=entry.vowelLoss;
    if(f.poss) stem=possess(stem,f.poss);
    return decline(stem,f.case, f.poss==='o'||f.poss==='onlar');
  }
  function personSuffix(stem, person, short=false){
    const p=pindex(person);
    if(short) return ['m','n','','k','n'+I(stem)+'z','l'+A(stem)+'r'][p];
    return [(vowel(stem)?'y':'')+I(stem)+'m','s'+I(stem)+'n','',(vowel(stem)?'y':'')+I(stem)+'z','s'+I(stem)+'n'+I(stem)+'z','l'+A(stem)+'r'][p];
  }
  function nominal(lemma, f={}){
    let stem=word(lemma)?.tr || norm(lemma);
    const person=f.person || 'o';
    if(f.past){stem+=(vowel(stem)?'y':'')+D(stem)+I(stem);stem+=personSuffix(stem,person,true);}
    else if(f.question) return stem+' m'+I(stem)+personSuffix('m'+I(stem),person);
    else if(f.person) stem+=personSuffix(stem,person);
    return f.question ? stem+' m'+I(stem) : stem;
  }
  function verbalStem(entry, f, beforeVowel=false){
    const plain=f.voice ? entry?.voice?.[f.voice] : entry?.stem;
    if(!plain) throw new Error('Unsupported verb or voice: '+entry?.tr+' '+(f.voice||''));
    return beforeVowel && !f.voice ? (entry.vowelStem || (entry.tr==='gitmek'?'gid':plain)) : plain;
  }
  function verb(lemma, f={}){
    const entry=word(lemma);
    let stem=verbalStem(entry,f);
    const person=f.person || 'o', p=pindex(person);
    const tense=f.tense || 'infinitive';
    if(f.compound){
      const finite=verb(lemma,{...f,compound:null,person:'o',question:false,register:'standard'});
      const ending=f.compound==='reported'?'m'+I(finite)+'ş':D(finite)+I(finite);
      const combined=finite+(vowel(finite)?'y':'')+ending;
      const result=combined+personSuffix(combined,person,f.compound==='past');
      return f.question?result+' m'+I(result):result;
    }
    if(f.ability){stem=verbalStem(entry,f,true)+(vowel(stem)?'y':'')+A(stem)+(f.negative?'m'+A(stem):'bil');}
    else if(f.negative) stem+='m'+A(stem);
    const softStem = () => !f.negative && !f.ability ? verbalStem(entry,f,true) : stem;
    if(['ma','dik','acak','an','infinitive','ip','ince','arak','madan','ken'].includes(tense)){
      if(tense==='infinitive') return stem+'m'+A(stem)+'k';
      if(tense==='ma') stem+='m'+A(stem);
      if(tense==='dik') stem+=D(stem)+I(stem)+'k';
      if(tense==='acak') stem=softStem()+(vowel(stem)?'y':'')+A(stem)+'c'+A(stem)+'k';
      if(tense==='an') return softStem()+(vowel(stem)?'y':'')+A(stem)+'n';
      if(tense==='ip') return softStem()+(vowel(stem)?'y':'')+I(stem)+'p';
      if(tense==='ince') return softStem()+(vowel(stem)?'y':'')+I(stem)+'nc'+A(stem+I(stem));
      if(tense==='arak') return softStem()+(vowel(stem)?'y':'')+A(stem)+'r'+A(stem)+'k';
      if(tense==='madan') return verbalStem(entry,f)+'m'+A(stem)+'d'+A(stem)+'n';
      if(tense==='ken') return verb(lemma,{...f,tense:'aorist',person:'o',question:false})+'ken';
      if(f.poss){if(['dik','acak'].includes(tense)&&stem.endsWith('k')&&f.poss!=='onlar') stem=stem.slice(0,-1)+'ğ';stem=possess(stem,f.poss);}
      return decline(stem,f.case,f.poss==='o'||f.poss==='onlar');
    }
    let short=false;
    if(tense==='present'){
      if(f.negative) stem=stem.slice(0,-1)+I(stem.slice(0,-1))+'yor';
      else if(!f.ability && !f.voice){
        const progressive=entry.progressiveStem || verbalStem(entry,f,true);
        stem=vowel(progressive)?progressive+'yor':progressive+I(progressive)+'yor';
      }
      else stem=stem.replace(/[aeıioöuü]$/,'')+I(stem)+'yor';
    }else if(tense==='past'){stem+=D(stem)+I(stem);short=true;}
    else if(tense==='reported') stem+='m'+I(stem)+'ş';
    else if(tense==='future') stem=softStem()+(vowel(stem)?'y':'')+A(stem)+'c'+A(stem)+'k';
    else if(tense==='aorist'){
      if(f.negative){
        if(f.question || ![0,3].includes(p)) stem+='z';
        else return stem+(p===0?'m':'y'+I(stem)+'z');
      }else if(f.ability || f.voice) stem+=(vowel(stem)?'r':I(stem)+'r');
      else stem=entry.aorist;
    }else if(tense==='necessity') stem+='m'+A(stem)+'l'+I(stem+'m'+A(stem));
    else if(tense==='conditional'){stem=verb(lemma,{...f,tense:'aorist',person:'o',question:false});stem+='s'+A(stem);short=true;}
    else if(tense==='imperative'){
      if(p===0||p===3)throw new Error('Use an optative for ich/wir requests');
      if(p===4)stem=softStem();
      return stem+(['', '', 's'+I(stem)+'n','',''+(vowel(stem)?'y':'')+I(stem)+'n','s'+I(stem)+'nl'+A(stem)+'r'][p]);
    }else if(tense==='optative'){
      if(![0,3].includes(p))throw new Error('This curriculum uses optatives only for ich/wir');
      return softStem()+(vowel(stem)?'y':'')+A(stem)+(p===0?'y'+I(stem)+'m':'l'+I(stem)+'m');
    }
    else throw new Error('Unknown tense: '+tense);
    if(!stem) throw new Error('Missing aorist metadata');
    if(tense==='present' && f.register==='colloquial' && p<4){
      const result=stem.slice(0,-1)+['m','n','','z'][p];
      return f.question ? result+' m'+I(result) : result;
    }
    if(f.question && !short){
      if(p===5) return stem+personSuffix(stem,person)+' m'+I(stem+personSuffix(stem,person));
      const particle='m'+I(stem);
      return stem+' '+particle+personSuffix(particle,person);
    }
    if(tense==='future' && [0,3].includes(p)) stem=stem.slice(0,-1)+'ğ';
    const result=stem+personSuffix(stem,person,short);
    return f.question ? result+' m'+I(result) : result;
  }
  function surface(slot){
    if(slot.literal) return slot.literal;
    const entry=word(slot.lemma);
    if(!entry) throw new Error('Unknown lemma '+slot.lemma);
    if(slot.features?.predicatePerson) return nominal(noun(entry.id,slot.features),{person:slot.features.predicatePerson});
    return entry.type==='verb'?verb(entry.id,slot.features):slot.nominal?nominal(entry.id,slot.features):noun(entry.id,slot.features);
  }
  const api={norm,A,I,D,vowel,noun,verb,nominal,surface,word,people};
  if(typeof module==='object' && module.exports) module.exports=api;else root.Turkish=api;
})(typeof globalThis==='object'?globalThis:this);
