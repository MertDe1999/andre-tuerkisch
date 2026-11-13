(function(root){
  'use strict';
  const list=document.getElementById('wordList');
  const filters=document.getElementById('wordTypeFilters'),buttons=new Map();
  let selectedType='',layoutSignature='',speaking=null;
  const make=(tag,classes,text)=>{const e=document.createElement(tag);e.className=classes;e.textContent=text;return e;};
  const typesOf=word=>word?[...new Set([word.type,...(word.otherTypes||[])])]:[];
  function stopSpeech(){if(speaking)root.AndreSpeech?.cancel();}
  function listen(word,button,row){
    if(button.disabled||!root.isWordUnlocked(word.id)||document.hidden)return;
    if(speaking===button){stopSpeech();return;}
    stopSpeech();speaking=button;
    const old=row.querySelector('.word-audio-status');if(old)old.remove();
    const update=state=>{
      if(speaking!==button)return;
      const playing=state==='loading'||state==='playing';
      button.classList.toggle('is-playing',playing);button.setAttribute('aria-pressed',String(playing));
      button.setAttribute('aria-label',word.tr+(playing?' · Aussprache stoppen':' anhören'));
      if(!playing){speaking=null;if(state==='unavailable'){const status=make('span','word-audio-status','Audio nicht verfügbar.');status.setAttribute('role','status');row.children[0].append(status);}}
    };
    if(!root.AndreSpeech){update('unavailable');return;}
    root.AndreSpeech.play(word.tr,{lang:'tr-TR',requireVoice:false,onState:update});
  }
  function audioButton(word,row){
    const b=make('button','word-listen','');b.type='button';b.hidden=true;b.disabled=true;
    b.setAttribute('aria-label',word.tr+' anhören');b.setAttribute('aria-pressed','false');
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d','M4 9h4l5-4v14l-5-4H4Z M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14');svg.append(path);b.append(svg);
    b.addEventListener('click',()=>listen(word,b,row));return b;
  }
  function sortedTypes(types){
    const order=Object.keys(typeNames),rank=type=>order.indexOf(type)<0?order.length:order.indexOf(type);
    return [...types].sort((a,b)=>rank(a)-rank(b)||a.localeCompare(b));
  }
  function layout(){
    if(filters.hidden)return;
    const canonical=sortedTypes(buttons.keys()).map(type=>buttons.get(type));
    const width=filters.clientWidth||filters.getBoundingClientRect().width;
    const measuredGap=parseFloat(root.getComputedStyle?.(filters)?.columnGap);
    const gap=Number.isFinite(measuredGap)?measuredGap:4;
    const items=canonical.map(node=>({node,width:parseFloat(root.getComputedStyle?.(node).width)||node.offsetWidth||node.getBoundingClientRect().width}));
    const measurable=width>0&&items.every(item=>item.width>0);
    const signature=JSON.stringify([width,gap,items.map(item=>[item.node.dataset.wordType,item.width])]);
    if(measurable&&signature===layoutSignature)return;
    layoutSignature=measurable?signature:'';
    const ordered=measurable?AndreFilterLayout.pack(items,width,gap).flat().map(item=>item.node):canonical;
    const focused=document.activeElement;
    ordered.forEach((button,index)=>{if(filters.children[index]!==button)filters.insertBefore(button,filters.children[index]||null);});
    if(canonical.includes(focused)&&document.activeElement!==focused)focused.focus({preventScroll:true});
  }
  function filter(animate=false){
    const q=(document.getElementById('search').value||'').trim().toLocaleLowerCase('de-DE');
    for(const row of getDictionaryRows()){
      const matchesType=!selectedType||typesOf(AndreWords.byId[row.dataset.wordId]).includes(selectedType);
      const matchesSearch=!q||(!row.classList.contains('locked')&&row.dataset.search.includes(q));
      row.style.display=matchesType&&matchesSearch?'grid':'none';
      if(row.style.display==='none'&&row.querySelector('.word-listen')===speaking)stopSpeech();
    }
    for(const [type,button] of buttons)button.setAttribute('aria-pressed',String(type===selectedType));
    // Apply the filter immediately; rapid taps replace only the presentation.
    if(animate)AndreMotion.play(list,[{opacity:.5,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:160,slot:'word-filter'});
  }
  function refresh(){
    const available=new Set();
    for(const row of getDictionaryRows()){
      const locked=row.classList.contains('locked'),button=row.querySelector('.word-listen');
      if(button){button.hidden=locked;button.disabled=locked;if(locked&&speaking===button)stopSpeech();}
      if(!locked)for(const type of typesOf(AndreWords.byId[row.dataset.wordId]))available.add(type);
    }
    if(!available.has(selectedType))selectedType='';
    for(const [type,button] of buttons)if(!available.has(type)){button.remove();buttons.delete(type);}
    sortedTypes(available).forEach(type=>{
      let button=buttons.get(type);
      if(!button){
        button=make('button','word-type-filter type-badge '+(typeNames[type]?type:'other'),'');button.type='button';button.dataset.wordType=type;
        const dot=make('span','dot','');dot.setAttribute('aria-hidden','true');
        button.append(dot,make('span','',typeNames[type]||type));
        button.addEventListener('click',()=>{selectedType=selectedType===type?'':type;filter(true);});
        buttons.set(type,button);
        filters.append(button);
      }
    });
    filters.hidden=available.size===0;
    layout();
    filter();
  }
  function render(){
    stopSpeech();list.replaceChildren();
    const order=new Map(Object.keys(typeNames).map((type,index)=>[type,index]));
    const auto=AndreLearningPath.auto;
    const words=AndreWords.words.filter(w=>!auto.has(w.id)).sort((a,b)=>
      (order.get(a.type)??order.size)-(order.get(b.type)??order.size)
      ||a.type.localeCompare(b.type)
      ||a.tr.localeCompare(b.tr,'tr',{sensitivity:'base'})
      ||a.id.localeCompare(b.id));
    for(const w of words){
      const row=make('div','word-row '+w.type,'');row.dataset.wordId=w.id;
      row.dataset.search=[w.de,w.tr,...typesOf(w).map(t=>typeNames[t]||t),...w.deAnswers].join(' ').toLocaleLowerCase('de-DE');
      const box=make('div','','');box.append(make('div','word-de',w.de),make('div','word-tr',w.tr));
      for(const type of typesOf(w))box.append(make('span','type-badge '+type,typeNames[type]||type));
      if(w.note)box.append(make('div','word-note',w.note));row.append(box,audioButton(w,row));list.append(row);
    }
    refreshUnlockUI();
  }
  root.AndreDictionary={render,refresh,filter,layout};
  if(root.ResizeObserver)new root.ResizeObserver(layout).observe(filters);
  root.addEventListener('resize',layout);
  document.fonts?.ready.then(layout);
  document.fonts?.addEventListener('loadingdone',layout);
  render();
})(window);
