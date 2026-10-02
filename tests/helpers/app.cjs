const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '../..', 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

// Small DOM harness for the actual inline app; no third-party test dependency.
function app({reducedMotion = true, storage = new Map()} = {}){
  const animations = [];
  class Element{
    constructor(text = ''){
      this.textContent = text;
      this.dataset = {};
      this.attributes = new Map();
      this.listeners = new Map();
      this.tagName = 'DIV';
      this.children = [];
      this.style = {setProperty(){}};
      this.classes = new Set();
      this.classList = {
        contains:name => this.classes.has(name),
        add:(...names) => names.forEach(name => this.classes.add(name)),
        remove:(...names) => names.forEach(name => this.classes.delete(name)),
        toggle:(name, force) => {
          const enabled = force === undefined ? !this.classes.has(name) : force;
          if(enabled) this.classes.add(name); else this.classes.delete(name);
          return enabled;
        }
      };
    }
    set className(value){this.classes = new Set(value.split(/\s+/));}
    get className(){return [...this.classes].join(' ');}
    set innerHTML(value){this.children.forEach(child => child.parentElement = null);this.children = [];}
    appendChild(child){child.remove();child.parentElement = this;this.children.push(child);return child;}
    append(...children){children.forEach(child => this.appendChild(child));}
    focus(){document.activeElement = this;}
    closest(selector){return selector.split(',').some(part => part.trim().toUpperCase() === this.tagName) ? this : null;}
    remove(){if(this.parentElement) this.parentElement.children = this.parentElement.children.filter(child => child !== this);this.parentElement = null;}
    addEventListener(type, listener){if(!this.listeners.has(type)) this.listeners.set(type,new Set());this.listeners.get(type).add(listener);}
    removeEventListener(type, listener){this.listeners.get(type)?.delete(listener);}
    dispatchEvent(event){event.currentTarget=this;event.target ||= this;for(const listener of this.listeners.get(event.type)||[]) listener(event);}
    setAttribute(name,value){this.attributes.set(name,String(value));}
    getAttribute(name){return this.attributes.get(name) ?? null;}
    setPointerCapture(){}
    animate(keyframes, options){
      const animation = {keyframes, options, cancelled:false, cancel(){this.cancelled = true;}};
      animations.push(animation);
      return animation;
    }
  }
  const rows = html.split('\n').filter(line => line.includes('class="word-row ')).map(line => {
    const row = new Element();
    row.className = line.match(/class="(word-row [^"]+)"/)[1];
    const tr = new Element(line.match(/class="word-tr">([^<]+)</)[1]);
    const de = new Element(line.match(/class="word-de">([^<]+)</)[1]);
    row.querySelector = selector => selector === '.word-tr' ? tr : de;
    return row;
  });
  const ids = new Map();
  const el = id => {
    if(!ids.has(id)) ids.set(id, new Element());
    return ids.get(id);
  };
  const controls = [el('checkSentenceButton'), el('resetSentenceButton')];
  const documentListeners = new Map();
  const document = {
    body:new Element(), documentElement:new Element(),
    getElementById:el, createElement:tag => {const item=new Element();item.tagName=tag.toUpperCase();return item;},
    addEventListener(type,listener){if(!documentListeners.has(type)) documentListeners.set(type,new Set());documentListeners.get(type).add(listener);},
    dispatchEvent(event){for(const listener of documentListeners.get(event.type)||[]) listener(event);},
    querySelector:selector => selector === '.confetti-layer'
      ? document.body.children.find(child => child.classList.contains('confetti-layer')) || null
      : el(selector),
    querySelectorAll:selector => {
      if(selector === '#wordList .word-row') return rows;
      if(selector === '#customKeyboard .key') return el('customKeyboard').children.flatMap(row => row.children).filter(key => key.classList.contains('key'));
      if(selector.includes('#sentenceGameActive')) return [...el('answerZone').children, ...el('wordBank').children, ...controls];
      if(selector.startsWith('#answerZone .sentence-token')){
        const extra = selector.split('.sentence-token')[1];
        return el('answerZone').children.filter(child => !extra || child.classList.contains(extra.slice(1)));
      }
      return [];
    }
  };
  let now = 0, nextTimer = 0;
  const timers = new Map();
  const sandbox = {
    document, navigator:{}, console,
    localStorage:{getItem:key => storage.get(key) || null, setItem:(key,value) => storage.set(key,value)},
    setTimeout:(fn,ms) => {const id = ++nextTimer;timers.set(id,{fn,at:now + ms});return id;},
    clearTimeout:id => timers.delete(id),
    matchMedia:() => ({matches:reducedMotion}), addEventListener(){}, scrollTo(){}
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(script, sandbox);
  const run = code => vm.runInContext(code, sandbox);
  const json = code => JSON.parse(JSON.stringify(run(code)));
  const unlock = keys => run('saveUnlockProgress(Object.fromEntries(' +
    JSON.stringify(keys || rows.map(row => row.querySelector('.word-tr').textContent)) +
    '.map(word => [unlockWordKey(word), {toTurkish:true,toGerman:true}]))); refreshUnlockUI();');
  const advance = ms => {
    const until = now + ms;
    while(true){
      const next = [...timers].filter(([,timer]) => timer.at <= until).sort((a,b) => a[1].at - b[1].at)[0];
      if(!next) break;
      timers.delete(next[0]);now = next[1].at;next[1].fn();
    }
    now = until;
  };
  return {run,json,unlock,advance,el,rows,storage,document,animations,timers};
}


module.exports = {app};
