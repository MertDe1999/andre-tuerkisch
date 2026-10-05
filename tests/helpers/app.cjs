const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'../..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
function app({reducedMotion=true,storage=new Map(),bankHeight=250}={}){
 const animations=[],ids=new Map(),listeners=new Map();let document;
 const match=(element,selector)=>{
   selector=selector.trim();
   if(selector==='*')return true;
   if(selector.startsWith('#'))return element.id===selector.slice(1);
   if(selector.startsWith('.'))return element.classList.contains(selector.slice(1));
   if(selector.startsWith('[data-'))return Object.hasOwn(element.dataset,selector.slice(6,-1).replace(/-([a-z])/g,(_,c)=>c.toUpperCase()));
   return element.tagName===selector.toUpperCase();
 };
 class Element{
  constructor(text=''){this._text=text;this.dataset={};this.attributes=new Map();this.listeners=new Map();this.tagName='DIV';this.children=[];this.style={setProperty(){}};this.classes=new Set();this.classList={contains:n=>this.classes.has(n),add:(...n)=>n.forEach(x=>this.classes.add(x)),remove:(...n)=>n.forEach(x=>this.classes.delete(x)),toggle:(n,force)=>{const on=force===undefined?!this.classes.has(n):force;if(on)this.classes.add(n);else this.classes.delete(n);return on;}};}
  set id(value){this._id=value;ids.set(value,this);}get id(){return this._id;}
  set textContent(value){this._text=String(value);this.children?.forEach(c=>c.parentElement=null);this.children=[];}get textContent(){return this._text+this.children.map(c=>c.textContent).join('');}
  set className(value){this.classes=new Set(value.split(/\s+/));}get className(){return [...this.classes].join(' ');}
  set innerHTML(value){this.replaceChildren();this._text='';}
  replaceChildren(...children){this.children.forEach(c=>c.parentElement=null);this.children=[];this._text='';this.append(...children);}
  appendChild(child){child.remove();child.parentElement=this;this.children.push(child);return child;}
  insertBefore(child,reference){if(child===reference)return child;if(!reference)return this.appendChild(child);if(reference.parentElement!==this)throw Error('Reference is not a child');child.remove();child.parentElement=this;this.children.splice(this.children.indexOf(reference),0,child);return child;}
  append(...children){children.forEach(child=>this.appendChild(child));}
  focus(){document.activeElement=this;}
  blur(){if(document.activeElement===this)document.activeElement=document.body;}
  setSelectionRange(start,end){this.selectionStart=start;this.selectionEnd=end;}
  closest(selector){for(let e=this;e;e=e.parentElement)if(selector.split(',').some(s=>match(e,s)))return e;return null;}
  querySelectorAll(selector){return this.children.flatMap(c=>[...(match(c,selector)?[c]:[]),...c.querySelectorAll(selector)]);}
  querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
  remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(c=>c!==this);this.parentElement=null;}
  addEventListener(type,listener){if(!this.listeners.has(type))this.listeners.set(type,new Set());this.listeners.get(type).add(listener);}
  removeEventListener(type,listener){this.listeners.get(type)?.delete(listener);}
  dispatchEvent(event){event.currentTarget=this;event.target||=this;for(const f of this.listeners.get(event.type)||[])f(event);}
  click(){this.dispatchEvent({type:'click',detail:0});}
  setAttribute(name,value){this.attributes.set(name,String(value));}getAttribute(name){return this.attributes.get(name)??null;}
  removeAttribute(name){this.attributes.delete(name);if(name==='id')this._id=undefined;}
  cloneNode(deep=false){const copy=new Element(this._text);copy.tagName=this.tagName;copy._id=this._id;copy.className=this.className;copy.dataset={...this.dataset};copy.attributes=new Map(this.attributes);copy.hidden=this.hidden;if(deep)for(const child of this.children)copy.append(child.cloneNode(true));return copy;}
  setPointerCapture(){}
  releasePointerCapture(){}
  getBoundingClientRect(){return {left:0,top:0,width:90,height:this.id==='wordBank'?bankHeight:40};}
  animate(keyframes,options){const a={target:this,keyframes,options,cancelled:false,cancel(){this.cancelled=true;}};animations.push(a);return a;}
 }
 const el=id=>{if(!ids.has(id)){const e=new Element();e.id=id;}return ids.get(id);};
 el('sentenceBankArea').append(el('wordBank'));
 document={body:new Element(),documentElement:new Element(),getElementById:el,createElement:tag=>{const e=new Element();e.tagName=tag.toUpperCase();return e;},
   addEventListener(type,f){if(!listeners.has(type))listeners.set(type,new Set());listeners.get(type).add(f);},dispatchEvent(event){for(const f of listeners.get(event.type)||[])f(event);},
   elementFromPoint:()=>document.pointerTarget||null,
   querySelector(selector){if(selector==='.confetti-layer')return this.body.querySelector(selector);return el(selector);},
   querySelectorAll(selector){
    if(selector==='#wordList .word-row')return el('wordList').children;
    if(selector==='#customKeyboard .key')return el('customKeyboard').querySelectorAll('.key');
    return [];
   }
 };
 let now=0,nextTimer=0;const timers=new Map();
 const sandbox={document,navigator:{},console,Blob,URL,confirm:()=>false,
 localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)},
 setTimeout:(fn,ms)=>{const id=++nextTimer;timers.set(id,{fn,at:now+ms});return id;},clearTimeout:id=>timers.delete(id),
 matchMedia:query=>({matches:query.includes('prefers-reduced-motion')?reducedMotion:false}),addEventListener(){},scrollTo(){}};
 sandbox.window=sandbox;vm.createContext(sandbox);
 for(const [,src,inline] of html.matchAll(/<script(?: src="([^"]+)")?>([\s\S]*?)<\/script>/g))vm.runInContext(src?fs.readFileSync(path.join(root,src.split('?')[0]),'utf8'):inline,sandbox,{filename:src||'index.html'});
 const run=code=>vm.runInContext(code,sandbox),json=code=>JSON.parse(JSON.stringify(run(code)));
 // Existing curriculum/gesture fixtures assume all grammar is already learned.
 // New unlock tests pass grammar:false to exercise a fresh real learner.
 const unlock=(keys,{grammar=true}={})=>run('saveUnlockProgress(Object.fromEntries('+JSON.stringify(keys||el('wordList').children.map(row=>row.querySelector('.word-tr').textContent))+'.map(word=>[unlockWordKey(word),{toTurkish:true,toGerman:true}])));'+(grammar?'SentenceGame.engine.grammar.state.unlocked=Object.fromEntries([...AndreGrammar.entries,...AndreCourseGrammar.entries].map(e=>[e.id,true]));SentenceGame.engine.grammar.save();':'')+'refreshUnlockUI();');
 const advance=ms=>{const until=now+ms;while(true){const next=[...timers].filter(([,t])=>t.at<=until).sort((a,b)=>a[1].at-b[1].at)[0];if(!next)break;timers.delete(next[0]);now=next[1].at;next[1].fn();}now=until;};
 return {run,json,unlock,advance,el,get rows(){return el('wordList').children;},storage,document,animations,timers};
}
module.exports={app};
