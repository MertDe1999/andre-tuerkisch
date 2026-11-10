/* Conflict-safe progress merging. No credentials or browser APIs in this module. */
(function(root){
 'use strict';
 const copy=x=>JSON.parse(JSON.stringify(x));
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const empty=()=>({version:1,points:0,records:{},days:{},session:null});
 const project=s=>copy({version:1,points:s.points||0,records:s.records||{},days:s.days||{},session:s.session||null});
 function merge(base,local,remote){
  local=project(local);remote=project(remote);const out=copy(remote),initial=!base;base=base?project(base):empty();
  const count=(b,l,r)=>initial?Math.max(l||0,r||0):(r||0)+Math.max(0,(l||0)-(b||0));
  out.points=count(base.points,local.points,remote.points);
  for(const id of new Set([...Object.keys(local.records),...Object.keys(remote.records)])){
   const b=base.records[id]||{},l=local.records[id]||{},r=remote.records[id]||{};
   const changed=!same(b,l),latest=initial?((l.last||'')>(r.last||'')||(l.last===r.last&&(l.tries||0)>(r.tries||0))?l:r):changed?l:r;
   out.records[id]={tries:count(b.tries,l.tries,r.tries),clean:count(b.clean,l.clean,r.clean),missed:latest.missed===true,last:latest.last||'',streak:latest.streak||0};
  }
  for(const d of new Set([...Object.keys(local.days),...Object.keys(remote.days)])){
   const b=base.days[d]||{},l=local.days[d]||{},r=remote.days[d]||{};
   out.days[d]={solved:count(b.solved,l.solved,r.solved),correct:count(b.correct,l.correct,r.correct)};
  }
  out.session=initial?(remote.session||local.session):(!same(base.session,local.session)?local.session:remote.session);
  return out;
 }
 /* Persist an operation before sending. Retry the same id after an uncertain network outcome. */
 class Engine{
  constructor(io,cache){this.io=io;this.cache=cache||{base:null,revision:0,pending:null};}
  persist(){this.io.cache(copy(this.cache));}
  async cycle(){
   for(let attempt=0;attempt<5;attempt++){
    if(!this.cache.pending){
     const remote=await this.io.read();
     const local=project(this.io.get()),merged=merge(this.cache.base,local,remote.state);
     this.cache.base=remote.state;this.cache.revision=remote.revision;
     this.io.put(merged);this.persist();
     if(same(merged,project(remote.state)))return;
     this.cache.pending={id:this.io.id(),revision:remote.revision,state:merged,local:merged};this.persist();
    }
    const p=this.cache.pending,result=await this.io.write(p);
    if(!result.applied){
     p.state=merge(this.cache.base,p.local,result.state);p.local=p.state;p.revision=result.revision;p.id=this.io.id();
     // Fold only the submitted snapshot into the new base; preserve edits made during the request.
     this.io.put(merge(this.cache.base,this.io.get(),result.state));
     this.cache.base=result.state;this.cache.revision=result.revision;this.persist();
     continue;
    }
    const current=project(this.io.get());
    this.io.put(merge(p.local,current,result.state));
    this.cache.base=result.state;this.cache.revision=result.revision;this.cache.pending=null;this.persist();
    if(same(project(this.io.get()),project(result.state)))return;
   }
   throw Error('Bitte den Abgleich gleich wiederholen.');
  }
 }
 const api={copy,same,empty,project,merge,Engine};
 if(typeof module!=='undefined')module.exports=api;else root.GardenCloudModel=api;
})(typeof window!=='undefined'?window:globalThis);
