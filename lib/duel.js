/* Cosmetic encounter state. Never writes to the learning engine. */
(function(root){
  'use strict';
  const KEY='andreDuelV1',ENEMIES=[
    {name:'Matcha-Blob',color:'verb',shape:'blob'},
    {name:'Protein-Pudding',color:'noun',shape:'pudding'},
    {name:'Tintenflummi',color:'lavender',shape:'ink'},
    {name:'Sofa-Geist',color:'blue',shape:'ghost'}
  ];
  const count=n=>Number.isSafeInteger(n)&&n>=0?n:0;
  const hash=s=>Array.from(s).reduce((n,c)=>(Math.imul(n,31)+c.codePointAt(0))>>>0,0);
  function capture(engine){
    const c=engine.state.current;if(!c)return null;
    const r=engine.flow.round,stage=r?.stage||{start:0,number:1},items=r?.items?.filter(x=>!x.practice)||[];
    const mode=c.free||c.practice?'practice':c.kind==='intro'?'intro':'course';
    const base=Math.max(0,engine.state.started-(r?.serial||0));
    return {task:c.id,mode,level:c.roundLevel||engine.flow.level,first:c.attempts===0,finished:!!c.finished,
      key:mode==='practice'?'practice:'+c.roundLevel+':'+(c.roundTheme||engine.state.selectedTheme||'mixed'):mode+':'+c.roundLevel+':'+base+':'+(mode==='intro'?0:stage.start),
      number:mode==='intro'?1:stage.number,total:mode==='intro'?2:mode==='practice'?6:stage.start<46?Math.min(6,46-stage.start):6,
      done:mode==='intro'?(r?.intro||0):mode==='practice'?0:Math.max(0,items.length-stage.start),extra:stage.start>=46};
  }
  class Duel{
    constructor(storage){
      this.storage=storage;this.state={version:1,encounters:{},practice:{},last:null};this.storageError='';
      try{const s=JSON.parse(storage?.getItem(KEY));if(s?.version===1&&s.encounters&&typeof s.encounters==='object'&&!Array.isArray(s.encounters)){
        for(const [key,v] of Object.entries(s.encounters).slice(-40)){
          if(!v||!['course','intro','practice'].includes(v.mode)||!Number.isInteger(v.total)||v.total<1||v.total>6||!v.events||typeof v.events!=='object'||Array.isArray(v.events))continue;
          const events={};for(const [id,e] of Object.entries(v.events).slice(-64))if(e&&/^\d+$/.test(id))events[id]={wrong:e.wrong===true,done:e.done===true,hit:e.hit===true};
          this.state.encounters[key]={key,mode:v.mode,level:Math.max(1,Math.min(160,count(v.level)||1)),number:count(v.number)||1,total:v.total,baseDone:Math.min(v.total,count(v.baseDone)),maxHp:Math.max(1,Math.min(v.total,count(v.maxHp)||v.total)),extra:!!v.extra,events};
        }
        if(s.practice&&typeof s.practice==='object')for(const [k,v] of Object.entries(s.practice).slice(-32))if(typeof v==='string'&&this.state.encounters[v])this.state.practice[k]=v;
        if(s.last&&this.state.encounters[s.last.key])this.state.last={key:s.last.key,task:count(s.last.task)};
      }}catch{}
    }
    save(){try{this.storage?.setItem(KEY,JSON.stringify(this.state));this.storageError='';}catch{this.storageError='Duell wird gerade nicht gespeichert.';}}
    prepare(ctx){
      if(!ctx)return null;
      if(ctx.finished&&this.state.last?.task===ctx.task&&this.state.encounters[this.state.last.key])return this.state.encounters[this.state.last.key];
      let key=ctx.key;
      if(ctx.mode==='practice'){
        const old=this.state.encounters[this.state.practice[key]];
        if(old&&(this.summary(old).done<old.total||old.events[ctx.task]))key=old.key;
        else{const base=key;key=base+':'+ctx.task;this.state.practice[base]=key;}
      }
      let encounter=this.state.encounters[key];
      if(!encounter){
        const baseDone=Math.min(ctx.total,ctx.done);
        encounter=this.state.encounters[key]={key,mode:ctx.mode,level:ctx.level,number:ctx.number,total:ctx.total,extra:ctx.extra,baseDone,maxHp:Math.max(1,ctx.total-baseDone),events:{}};
        const keys=Object.keys(this.state.encounters);for(const old of keys.slice(0,-40))delete this.state.encounters[old];
        for(const [k,v] of Object.entries(this.state.practice))if(!this.state.encounters[v])delete this.state.practice[k];
        this.save();
      }
      return encounter;
    }
    record(ctx,result,{unknown=false}={}){
      if(!ctx||result.ignored)return null;
      const e=this.prepare(ctx),event=e.events[ctx.task]||={wrong:false,done:false,hit:false};let action=null;
      if(ctx.first&&!result.correct&&!event.wrong){event.wrong=true;action='hurt';}
      if((result.correct||unknown)&&!event.done){event.done=true;event.hit=!!result.correct;if(result.correct)action=result.direct?'hit':'assist';}
      this.state.last={task:ctx.task,key:e.key};const summary=this.summary(e);
      if(action==='hurt'&&summary.errors%3===0)action='help';
      if(summary.outcome==='won'&&event.hit&&action)action='win';
      // Finishing a skipped sentence never manufactures a hit or a learning reward.
      this.save();return action?{action,summary}:null;
    }
    summary(e){
      if(!e)return null;const events=Object.values(e.events),errors=events.filter(x=>x.wrong).length,hits=events.filter(x=>x.hit).length;
      const done=Math.min(e.total,e.baseDone+events.filter(x=>x.done).length),hp=Math.max(0,e.maxHp-hits);
      return {...e,done,hp,errors,hearts:3-errors%3,rescues:Math.floor(errors/3),enemy:ENEMIES[hash(e.key)%ENEMIES.length],outcome:hp===0?'won':done>=e.total?'escaped':'active'};
    }
    view(ctx){return this.summary(this.prepare(ctx));}
  }
  const api={KEY,Duel,capture,ENEMIES};if(typeof module==='object'&&module.exports)module.exports=api;else root.AndreDuel=api;
})(typeof globalThis==='object'?globalThis:this);
