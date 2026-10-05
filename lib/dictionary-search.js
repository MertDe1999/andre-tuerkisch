/* Search input only; vocabulary and learning progress stay in their existing modules. */
(function(root){
  'use strict';
  const search=document.getElementById('search'),clear=document.getElementById('clearWordSearch');
  const keyboard=document.getElementById('searchKeyboard'),navigation=document.querySelector('.bottom-nav-wrap');
  let opened=false,language='de',quietFocus=false,previousNavInert=false,transition=null;
  keyboard.hidden=true;keyboard.inert=true;
  const value=()=>search.value||'';
  function refresh(){clear.hidden=!value();root.AndreDictionary.filter();}
  function focus(){quietFocus=true;try{search.focus({preventScroll:true});}finally{quietFocus=false;}}
  function keepFieldVisible(){
    if(!opened)return;
    const field=search.getBoundingClientRect(),top=keyboard.getBoundingClientRect().top;
    const overlap=(field.bottom??field.top+field.height)+12-top;
    if(overlap>0)root.scrollBy?.({top:overlap,behavior:'auto'});
  }
  function render(){
    renderAppKeyboard(language,{keyboard,onType:type,onCheck:()=>close({returnFocus:true}),
      checkLabel:'Fertig',onLanguage:()=>{language=language==='de'?'tr':'de';render();focus();},
      languageLabel:language==='de'?'Deutsche Tastatur. Zu Türkisch wechseln':'Türkische Tastatur. Zu Deutsch wechseln'});
    keyboard.querySelector('.check').textContent='Fertig';
  }
  function open(){
    if(quietFocus||opened||currentMainView!=='dictionary'||document.getElementById('dictionaryPanel').hidden)return;
    opened=true;keyboard.hidden=false;keyboard.inert=false;
    previousNavInert=navigation.inert;navigation.inert=true;
    document.body.classList.add('word-search-open');render();keepFieldVisible();
    transition=AndreMotion.play(keyboard,[{opacity:0,transform:'translate(-50%,18px)'},{opacity:1,transform:'translate(-50%,0)'}],{duration:160,slot:'search-keyboard'});
  }
  function close({immediate=false,returnFocus=false}={}){
    if(!opened&&keyboard.hidden)return;
    if(opened){navigation.inert=previousNavInert;document.body.classList.remove('word-search-open');}
    opened=false;keyboard.inert=true;
    if(returnFocus)focus();
    else if(document.activeElement===search||document.activeElement?.closest?.('.search-keyboard'))document.activeElement.blur?.();
    if(immediate){transition?.cancel();keyboard.hidden=true;return;}
    transition=AndreMotion.play(keyboard,[{opacity:1,transform:'translate(-50%,0)'},{opacity:0,transform:'translate(-50%,12px)'}],
      {duration:120,slot:'search-keyboard',cleanup:()=>{if(!opened)keyboard.hidden=true;}});
  }
  function type(key){
    if(!opened)return;
    const text=value(),start=search.selectionStart??text.length,end=search.selectionEnd??start;
    let from=start,to=end,insert=key;
    if(key==='BACKSPACE'){
      insert='';if(from===to)from=Array.from(text.slice(0,from)).slice(0,-1).join('').length;
    }else if(key==='DELETE'){
      insert='';if(from===to)to+=Array.from(text.slice(to))[0]?.length||0;
    }
    search.value=Array.from(text.slice(0,from)+insert+text.slice(to)).slice(0,120).join('');
    const caret=Math.min(from+insert.length,search.value.length);
    focus();search.setSelectionRange?.(caret,caret);refresh();
  }
  search.addEventListener('focus',open);search.addEventListener('click',open);search.addEventListener('input',refresh);
  clear.addEventListener('click',()=>{search.value='';search.setSelectionRange?.(0,0);refresh();});
  document.addEventListener('pointerdown',event=>{
    if(opened&&!event.target.closest?.('.word-search,.search-keyboard,.word-type-filters'))close();
  });
  document.addEventListener('keydown',event=>{
    if(event.isComposing||event.ctrlKey||event.metaKey||event.altKey)return;
    if(!opened){
      if(event.target!==search)return;
      if(event.key==='Enter'){if(!event.repeat){event.preventDefault();open();}return;}
      if(event.key==='Backspace'||event.key==='Delete'||Array.from(event.key).length===1)open();
      if(!opened)return;
    }
    if(event.key==='Escape'){event.preventDefault();close({returnFocus:true});return;}
    if(event.target!==search&&event.target.closest?.('input,textarea,select,[contenteditable="true"]'))return;
    if(['Enter',' '].includes(event.key)&&event.target.closest?.('button,[role="button"]'))return;
    if(event.key==='Enter'){event.preventDefault();if(!event.repeat)close({returnFocus:true});}
    else if(event.key==='Backspace'||event.key==='Delete'){event.preventDefault();type(event.key==='Backspace'?'BACKSPACE':'DELETE');}
    else if(Array.from(event.key).length===1){event.preventDefault();type(event.key);}
  });
  root.addEventListener('pagehide',()=>close({immediate:true}));
  root.addEventListener('resize',keepFieldVisible);
  root.AndreDictionarySearch={open,close};
  refresh();
})(window);
