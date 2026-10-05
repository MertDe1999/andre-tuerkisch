(function(root){
  'use strict';
  const list=document.getElementById('wordList');
  const filters=document.getElementById('wordTypeFilters'),buttons=new Map();
  let selectedType='';
  const make=(tag,classes,text)=>{const e=document.createElement(tag);e.className=classes;e.textContent=text;return e;};
  const typesOf=word=>word?[...new Set([word.type,...(word.otherTypes||[])])]:[];
  function filter(animate=false){
    const q=(document.getElementById('search').value||'').trim().toLocaleLowerCase('de-DE');
    for(const row of getDictionaryRows()){
      const matchesType=!selectedType||typesOf(AndreWords.byId[row.dataset.wordId]).includes(selectedType);
      const matchesSearch=!q||(!row.classList.contains('locked')&&row.dataset.search.includes(q));
      row.style.display=matchesType&&matchesSearch?'grid':'none';
    }
    for(const [type,button] of buttons)button.setAttribute('aria-pressed',String(type===selectedType));
    // Apply the filter immediately; rapid taps replace only the presentation.
    if(animate)AndreMotion.play(list,[{opacity:.5,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:160,slot:'word-filter'});
  }
  function refresh(){
    const available=new Set();
    for(const row of getDictionaryRows())if(!row.classList.contains('locked')){
      for(const type of typesOf(AndreWords.byId[row.dataset.wordId]))available.add(type);
    }
    if(!available.has(selectedType))selectedType='';
    for(const [type,button] of buttons)if(!available.has(type)){button.remove();buttons.delete(type);}
    const order=Object.keys(typeNames);
    const sorted=[...available].sort((a,b)=>(order.indexOf(a)<0?order.length:order.indexOf(a))-(order.indexOf(b)<0?order.length:order.indexOf(b))||a.localeCompare(b));
    sorted.forEach((type,index)=>{
      let button=buttons.get(type);
      if(!button){
        button=make('button','word-type-filter type-badge '+(typeNames[type]?type:'other'),'');button.type='button';button.dataset.wordType=type;
        const dot=make('span','dot','');dot.setAttribute('aria-hidden','true');
        button.append(dot,make('span','',typeNames[type]||type));
        button.addEventListener('click',()=>{selectedType=selectedType===type?'':type;filter(true);});
        buttons.set(type,button);
      }
      // Keep unchanged buttons in place, including their keyboard focus.
      if(filters.children[index]!==button)filters.insertBefore(button,filters.children[index]||null);
    });
    filters.hidden=sorted.length===0;
    filter();
  }
  function render(){
    list.replaceChildren();
    const order=new Map(Object.keys(typeNames).map((type,index)=>[type,index]));
    const words=[...AndreWords.words].sort((a,b)=>
      (order.get(a.type)??order.size)-(order.get(b.type)??order.size)
      ||a.type.localeCompare(b.type)
      ||a.tr.localeCompare(b.tr,'tr',{sensitivity:'base'})
      ||a.id.localeCompare(b.id));
    for(const w of words){
      const row=make('div','word-row '+w.type,'');row.dataset.wordId=w.id;
      row.dataset.search=[w.de,w.tr,...typesOf(w).map(t=>typeNames[t]||t),...w.deAnswers].join(' ').toLocaleLowerCase('de-DE');
      const box=make('div','','');box.append(make('div','word-de',w.de),make('div','word-tr',w.tr));
      for(const type of typesOf(w))box.append(make('span','type-badge '+type,typeNames[type]||type));
      row.append(box);if(w.note)row.append(make('div','word-note',w.note));list.append(row);
    }
    refreshUnlockUI();
  }
  root.AndreDictionary={render,refresh,filter};
  render();
})(window);
