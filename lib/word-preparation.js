(function(root){
 'use strict';const node=typeof module==='object'&&module.exports,W=node?require('../data/words'):root.AndreWords,P=node?require('./learning-path'):root.AndreLearningPath;
 const KEY='andreWordPreparationV1',norm=(s,lang='tr')=>String(s||'').normalize('NFC').toLocaleLowerCase(lang==='tr'?'tr-TR':'de-DE').replace(/[.!?,;:’']/g,'').replace(/\s+/g,' ').trim();
 class Preparation{
  constructor(storage){this.storage=storage;let saved;try{saved=JSON.parse(storage.getItem(KEY));}catch{}this.state=saved?.version===1&&saved.words&&typeof saved.words==='object'?saved:{version:1,words:{},current:null,sequence:0};}
  save(){try{this.storage.setItem(KEY,JSON.stringify(this.state));this.storageError='';return true;}catch{this.storageError='Der Browser konnte diese Wortaufgabe nicht speichern.';return false;}}
  progress(id){return this.state.words[id]||={spoken:false,choice:false,tr:false,de:false,due:0,failures:0};}
  phase(ids){if(ids.some(id=>!this.progress(id).spoken))return 'spoken';if(ids.some(id=>!this.progress(id).choice))return 'choice';return 'typing';}
  next(ids,learned){ids=ids.filter(id=>!learned.has(id)&&!P.auto.has(id));if(!ids.length){this.state.current=null;this.save();return null;}
   const phase=this.phase(ids),old=this.state.current;if(old&&ids.includes(old.id)&&old.phase===phase&&!old.done)return old;
   let pool=ids.filter(id=>phase==='typing'?!(this.progress(id).tr&&this.progress(id).de):!this.progress(id)[phase==='spoken'?'spoken':'choice']);
   const previous=old?.id,other=pool.filter(id=>id!==previous&&this.progress(id).due<=this.state.sequence);if(other.length)pool=other;
   pool.sort((a,b)=>this.progress(a).due-this.progress(b).due);const id=pool[0]||ids[0],p=this.progress(id),direction=phase==='typing'?(p.tr?'de':'tr'):null;
   this.state.current={id,phase,direction,draft:'',attempts:0,reveal:false,done:false,assisted:false};this.save();return this.state.current;
  }
  spoken(text,{manual=false}={}){const cur=this.state.current;if(!cur||cur.phase!=='spoken'||cur.done)return {ignored:true};const w=W.byId[cur.id];
   const candidate=norm(text),target=norm(w.tr),exact=candidate===target;
   // Recognition checks words, never demands a rolled r or a native accent.
   const knownOther=W.words.some(x=>x.id!==w.id&&norm(x.tr)===candidate);
   const simplify=s=>s.replace(/ğ/g,'').replace(/r/g,'');
   const tolerated=!knownOther&&candidate.length>1&&simplify(candidate)===simplify(target);
   const correct=manual||exact||tolerated;
   if(correct){this.progress(cur.id).spoken=true;this.progress(cur.id).speechMode=manual?'self-check':'recognition';cur.done=true;}else{cur.assisted=true;cur.done=true;this.progress(cur.id).due=this.state.sequence+3;}
   this.state.sequence++;this.save();return {correct};
  }
  choose(id){const cur=this.state.current;if(!cur||cur.phase!=='choice'||cur.done)return {ignored:true};const correct=id===cur.id;if(correct&&!cur.assisted){this.progress(cur.id).choice=true;cur.done=true;}else{cur.assisted=true;cur.done=true;this.progress(cur.id).due=this.state.sequence+3;}this.state.sequence++;this.save();return {correct};}
  type(answer){const cur=this.state.current;if(!cur||cur.phase!=='typing'||cur.done||cur.reveal)return {ignored:true};const w=W.byId[cur.id],answers=cur.direction==='tr'?[w.tr]:w.deAnswers;
   const input=norm(answer,cur.direction).replace(cur.direction==='de'?/^(der|die|das) /:/^$/,'');const correct=answers.some(a=>norm(a,cur.direction)===input);cur.attempts++;
   if(correct&&!cur.assisted){this.progress(cur.id)[cur.direction]=true;cur.done=true;}else if(correct){cur.done=true;}else if(cur.attempts>=2){cur.reveal=true;cur.assisted=true;}this.save();return {correct,reveal:cur.reveal,complete:this.progress(cur.id).tr&&this.progress(cur.id).de};
  }
  skip(){const cur=this.state.current;if(!cur||cur.done||cur.reveal)return;cur.assisted=true;this.progress(cur.id).due=this.state.sequence+3;if(cur.phase==='typing')cur.reveal=true;else cur.done=true;this.state.sequence++;this.save();}
  choices(ids,visualKey){const cur=this.state.current,w=W.byId[cur.id],pools=[...ids,...W.words.filter(x=>P.auto.has(x.id)).map(x=>x.id)];
   const all=[...new Set(pools)].map(id=>W.byId[id]).filter(x=>x&&x.id!==w.id&&norm(x.tr)!==norm(w.tr)&&visualKey(x)!==visualKey(w));
   const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};const same=shuffle(all.filter(x=>x.type===w.type)),other=shuffle(all.filter(x=>x.type!==w.type)),selected=[],seen=new Set([norm(w.tr)]);for(const x of [...same,...other])if(!seen.has(norm(x.tr))){selected.push(x);seen.add(norm(x.tr));if(selected.length===3)break;}const options=[w,...selected];
   for(let i=options.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[options[i],options[j]]=[options[j],options[i]];}return options;
  }
 }
 const api={KEY,Preparation,norm};if(node)module.exports=api;else root.AndreWordPreparation=api;
})(typeof globalThis==='object'?globalThis:this);
