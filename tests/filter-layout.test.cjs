const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {pack}=require('../lib/filter-layout');
const {app}=require('./helpers/app.cjs');
const items=widths=>widths.map((width,id)=>({width,id}));
const used=(row,gap)=>row.reduce((sum,item)=>sum+item.width,0)+gap*Math.max(0,row.length-1);

test('packing fills holes with shorter chips and reduces three ordinary rows to two',()=>{
 const input=items([60,60,40,40]),rows=pack(input,104,4);
 assert.equal(rows.length,2);assert.deepEqual(rows.map(row=>used(row,4)),[104,104]);
 assert.deepEqual(rows.flat().map(item=>item.id),[0,2,1,3]);assert.deepEqual(input.map(item=>item.id),[0,1,2,3]);
});

test('packing puts the fullest rows first and stays deterministic for equal widths',()=>{
 const input=items([40,60,40,60,25]);const rows=pack(input,104,4);
 assert.deepEqual(rows,pack(input,104,4));const widths=rows.map(row=>used(row,4));assert.deepEqual(widths,[...widths].sort((a,b)=>b-a));
});

test('fractional widths and nonzero gaps fit without rounding overflow or extra rows',()=>{
 const input=items([60.1,36.4,60.1,36.4]);const rows=pack(input,100.5,4);
 assert.equal(rows.length,2);assert.ok(rows.every(row=>used(row,4)<=100.5));
 assert.equal(pack(items([60,40]),100,0).length,1);assert.equal(pack(items([60,40]),100,4).length,2);
});

test('empty, unmeasurable and oversized layouts keep every chip available',()=>{
 assert.deepEqual(pack([],300),[]);const input=items([300,20,40]);
 assert.deepEqual(pack(input,0),[input]);assert.deepEqual(pack(input,NaN),[input]);
 const rows=pack(input,100);assert.equal(rows.flat().length,3);assert.ok(rows.some(row=>row.length===1&&row[0]===input[0]));
});

test('varied screen widths preserve all chips, fit each row and never add rows compared with ordinary wrapping',()=>{
 let seed=173;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32;};
 for(let run=0;run<200;run++){
  const width=80+Math.floor(random()*640),gap=2+Math.floor(random()*5),input=items(Array.from({length:1+Math.floor(random()*24)},()=>20+Math.round(random()*1400)/10));
  const rows=pack(input,width,gap);let count=0,rowWidth=0;
  for(const item of input){if(!count||rowWidth+gap+item.width>width){count++;rowWidth=item.width;}else rowWidth+=gap+item.width;}
  assert.ok(rows.length<=count);assert.ok(rows.every(row=>used(row,gap)<=width||row.length===1&&row[0].width>width));
  assert.deepEqual(rows.flat().map(item=>item.id).sort((a,b)=>a-b),input.map(item=>item.id));
  assert.deepEqual(rows,pack(input,width,gap));
 }
});

function measuredApp(){
 const a=app();
 a.run('window.filterWidth=104;window.chipWidths={noun:60,verb:60,adj:40,pronoun:40};window.layoutObservers=[];window.layoutEvents={};'+
  'window.ResizeObserver=class{constructor(callback){this.callback=callback;layoutObservers.push(this)}observe(node){this.node=node}};'+
  'window.addEventListener=(name,callback)=>{layoutEvents[name]=callback};'+
  'window.getComputedStyle=node=>node.id==="wordTypeFilters"?{columnGap:"4px"}:{width:(chipWidths[node.dataset.wordType]||40)+"px"};'+
  'document.getElementById("wordTypeFilters").getBoundingClientRect=()=>({width:filterWidth});'+
  'document.fonts={ready:{then(callback){layoutEvents.fontReady=callback}},addEventListener(name,callback){layoutEvents[name]=callback}}');
 a.el('wordTypeFilters').replaceChildren();a.run(fs.readFileSync(require.resolve('../lib/dictionary'),'utf8'));a.unlock(['ev','gitmek','güzel','ben'],{grammar:false});
 return a;
}
const types=a=>a.el('wordTypeFilters').children.map(button=>button.dataset.wordType);

test('measured chip arrangement matches DOM and keyboard order while clicks keep the layout stable',()=>{
 const a=measuredApp();assert.deepEqual(types(a),['noun','adj','verb','pronoun']);
 const verb=a.el('wordTypeFilters').children.find(button=>button.dataset.wordType==='verb');verb.focus();verb.click();
 const saved=[...a.storage];assert.equal(verb.getAttribute('aria-pressed'),'true');assert.deepEqual(types(a),['noun','adj','verb','pronoun']);
 a.run('filterWidth=200;layoutEvents.resize()');assert.deepEqual(types(a),['noun','verb','adj','pronoun']);
 assert.equal(a.document.activeElement,verb);assert.equal(verb.getAttribute('aria-pressed'),'true');assert.ok(a.rows.filter(row=>row.style.display!=='none').every(row=>row.classList.contains('verb')));
 assert.deepEqual([...a.storage],saved);
});

test('observer and font changes repack once, hidden-to-visible layout recovers without an observer',()=>{
 const a=measuredApp();assert.equal(a.run('layoutObservers[0].node.id'),'wordTypeFilters');
 a.run('window.layoutMoves=0;const filterBox=document.getElementById("wordTypeFilters"),oldInsert=filterBox.insertBefore.bind(filterBox);filterBox.insertBefore=(...args)=>{layoutMoves++;return oldInsert(...args)};layoutObservers[0].callback()');
 assert.equal(a.run('layoutMoves'),0);
 a.run('filterWidth=200;layoutObservers[0].callback()');assert.deepEqual(types(a),['noun','verb','adj','pronoun']);
 a.run('filterWidth=104;layoutEvents.fontReady()');assert.deepEqual(types(a),['noun','adj','verb','pronoun']);
 a.run('chipWidths={noun:40,verb:60,adj:60,pronoun:40};layoutEvents.loadingdone()');assert.deepEqual(types(a),['noun','verb','adj','pronoun']);
 a.run('filterWidth=0;AndreDictionary.layout();filterWidth=104;chipWidths={noun:60,verb:60,adj:40,pronoun:40};showView("dictionary",null)');
 assert.deepEqual(types(a),['noun','adj','verb','pronoun']);
});
