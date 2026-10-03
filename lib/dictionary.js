(function(){
  'use strict';
  const list=document.getElementById('wordList');
  list.replaceChildren();
  const make=(tag,classes,text)=>{const e=document.createElement(tag);e.className=classes;e.textContent=text;return e;};
  const types=new Map(Object.keys(typeNames).map((type,index)=>[type,index]));
  const words=[...AndreWords.words].sort((a,b)=>
    (types.get(a.type)??types.size)-(types.get(b.type)??types.size)
    ||a.type.localeCompare(b.type)
    ||a.tr.localeCompare(b.tr,'tr',{sensitivity:'base'})
    ||a.id.localeCompare(b.id));
  for(const w of words){
    const row=make('div','word-row '+w.type,'');row.dataset.wordId=w.id;
    row.dataset.search=[w.de,w.tr,typeNames[w.type]||'Sonstige',...w.deAnswers].join(' ').toLocaleLowerCase('de-DE');
    const box=make('div','','');box.append(make('div','word-de',w.de),make('div','word-tr',w.tr),make('span','type-badge '+w.type,typeNames[w.type]||'Sonstige'));
    row.append(box);if(w.note)row.append(make('div','word-note',w.note));list.append(row);
  }
  refreshUnlockUI();
})();
