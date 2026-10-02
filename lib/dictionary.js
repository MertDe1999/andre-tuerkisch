(function(){
  'use strict';
  const list=document.getElementById('wordList');
  list.replaceChildren();
  const make=(tag,classes,text)=>{const e=document.createElement(tag);e.className=classes;e.textContent=text;return e;};
  for(const w of AndreWords.words){
    const row=make('div','word-row '+w.type,'');row.dataset.wordId=w.id;
    row.dataset.search=[w.de,w.tr,typeNames[w.type]||'Sonstige',...w.deAnswers].join(' ').toLocaleLowerCase('de-DE');
    const box=make('div','','');box.append(make('div','word-de',w.de),make('div','word-tr',w.tr),make('span','type-badge '+w.type,typeNames[w.type]||'Sonstige'));
    row.append(box);if(w.note)row.append(make('div','word-note',w.note));list.append(row);
  }
  refreshUnlockUI();
})();
