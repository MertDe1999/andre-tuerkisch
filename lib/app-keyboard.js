/* Shared DE/TR keyboard. Only emits input/actions; it never changes learning progress. */
(function(root){
  'use strict';
  const layouts={
    de:['qwertzuiopü','asdfghjklöä','yxcvbnm'],
    tr:['qwertyuıopğü','asdfghjklşi','zxcvbnmöç']
  },holds=new Set(),states=new Set();
  let preferences={preview:false,haptics:false};try{preferences={...preferences,...JSON.parse(root.localStorage.getItem('andreKeyboardPreferencesV1')||'{}')};}catch{}
  function configure(values){preferences={...preferences,...values};try{root.localStorage.setItem('andreKeyboardPreferencesV1',JSON.stringify(preferences));}catch{}return preferences;}
  function tactile(){if(preferences.haptics)try{root.navigator?.vibrate?.(7);}catch{}}
  const names={de:'Deutsch',tr:'Türkisch'},ns='http://www.w3.org/2000/svg';
  function icon(kind){
    const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 24 24');
    svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');svg.classList.add('key-icon');
    svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width',kind==='check'?'3.5':'1.7');
    svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');
    const path=document.createElementNS(ns,'path');
    path.setAttribute('d',kind==='shift'?'M12 3 3 12h5v8h8v-8h5Z':kind==='delete'?'M9 5h11v14H9L2 12Zm3 4 6 6m0-6-6 6':'m5 12 4 5L19 6');svg.append(path);return svg;
  }
  function upper(letter,language){return letter==='ß'?'ẞ':letter.toLocaleUpperCase(language);}
  function updateLetters(state){
    for(const button of state.letters){
      const letter=state.shift?upper(button.dataset.letter,state.language):button.dataset.letter;
      button.textContent=letter;
      button.setAttribute('aria-label',letter+(state.language==='de'&&button.dataset.letter==='s'?', gedrückt halten für '+(state.shift?'ẞ':'ß'):''));
    }
    state.shiftButton.setAttribute('aria-pressed',String(state.shift));
  }
  function cancelHold(state,blockClick=true){
    if(!state?.hold)return;
    if(blockClick)state.blockedClick=state.hold.button;
    clearTimeout(state.hold.timer);state.hold=null;holds.delete(state);updateLetters(state);
  }
  function cancel(keyboard){const state=keyboard?._appKeys;if(!state)return;keyboard.querySelectorAll('.key').forEach(b=>delete b.dataset.preview);cancelHold(state);state.shift=false;updateLetters(state);}
  function cancelAll(){for(const state of [...holds])cancelHold(state);for(const s of states)s.keyboard.querySelectorAll('.key').forEach(b=>delete b.dataset.preview);}
  function render(language,{keyboard,onType,onCheck,onSkip,onLanguage,skipLabel='Keine Ahnung',checkLabel='Antwort prüfen',languageLabel='Tastatursprache wechseln',disabled=false,inputLocked=false,reset=false,contextKey}={}){
    language=language==='tr'?'tr':'de';
    if(reset)keyboard.dataset.symbols='false';
    keyboard._actions={onType,onCheck,onSkip,onLanguage};
    keyboard._renderOptions={keyboard,onType,onCheck,onSkip,onLanguage,skipLabel,checkLabel,languageLabel,disabled,inputLocked,contextKey};const symbols=keyboard.dataset.symbols==='true';const layout=language+':'+Boolean(onSkip)+':'+Boolean(onLanguage)+':'+symbols;
    let state=keyboard._appKeys;
    if(state?.layout!==layout){
      cancel(keyboard);if(state)states.delete(state);keyboard.replaceChildren();
      state={layout,language,keyboard,shift:false,letters:[],hold:null,blockedClick:null};keyboard._appKeys=state;states.add(state);
      keyboard.dataset.layout=layout;keyboard.setAttribute('lang',language);
      function send(text){
        if(state.disabled||keyboard.inert)return;
        keyboard._actions.onType(state.shift?upper(text,language):text);
        if(/^\p{L}+$/u.test(text)){state.shift=false;updateLetters(state);}
      }
      function key(text,action,kind,label){
        const button=document.createElement('button');button.type='button';button.className='key '+kind;button.dataset.action=kind;
        button.textContent=text;button.setAttribute('aria-label',label||text);
        button.addEventListener('click',event=>{
          if(state.disabled||button.disabled||keyboard.inert)return;
          if(state.blockedClick===button&&event.detail!==0){state.blockedClick=null;return;}
          cancelHold(state);
          tactile();action();
        });return button;
      }
      function row(nodes,kind){const row=document.createElement('div');row.className='keyboard-row '+kind;row.append(...nodes);keyboard.append(row);}
      function spacer(){const span=document.createElement('span');span.className='keyboard-spacer';span.setAttribute('aria-hidden','true');return span;}
      function letterKey(letter){
        const button=key(letter,()=>send(letter),'letter',letter);button.dataset.letter=letter;state.letters.push(button);
        button.addEventListener('pointerdown',()=>{if(!preferences.preview||state.disabled||keyboard.inert)return;button.dataset.preview=state.shift?upper(letter,language):letter;});
        for(const name of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(name,()=>delete button.dataset.preview);
        if(language==='de'&&letter==='s'){
          button.addEventListener('pointerdown',event=>{
            if(state.disabled||button.disabled||keyboard.inert||event.isPrimary===false||(event.button!==undefined&&event.button!==0))return;
            cancelHold(state);state.blockedClick=null;
            const hold={button,x:event.clientX||0,y:event.clientY||0,pointer:event.pointerId,ready:false};state.hold=hold;holds.add(state);
            hold.timer=setTimeout(()=>{
              if(state.hold!==hold)return;
              if(state.disabled||button.disabled||keyboard.inert){cancelHold(state);return;}
              hold.ready=true;button.textContent=state.shift?'ẞ':'ß';if(preferences.preview)button.dataset.preview=button.textContent;
            },400);
            try{button.setPointerCapture(event.pointerId);}catch{}
          });
          button.addEventListener('pointermove',event=>{
            const hold=state.hold;if(hold?.button===button&&hold.pointer===event.pointerId&&Math.hypot((event.clientX||0)-hold.x,(event.clientY||0)-hold.y)>10)cancelHold(state);
          });
          button.addEventListener('pointerup',event=>{
            const hold=state.hold;if(hold?.button!==button||hold.pointer!==event.pointerId)return;
            const ready=hold.ready;cancelHold(state,false);
            if(ready&&!state.disabled&&!button.disabled&&!keyboard.inert){state.blockedClick=button;send('ß');}
          });
          for(const name of ['pointercancel','lostpointercapture'])button.addEventListener(name,event=>{
            if(state.hold?.button===button&&state.hold.pointer===event.pointerId)cancelHold(state);
          });
        }
        return button;
      }
      const action=onSkip?key(skipLabel,()=>keyboard._actions.onSkip(),'skip',skipLabel):onLanguage?key(names[language==='de'?'tr':'de'],()=>keyboard._actions.onLanguage(),'language',languageLabel):spacer();
      if(onSkip||onLanguage)action.classList.add('utility');
      const check=key('',()=>keyboard._actions.onCheck(),'check',checkLabel);check.append(icon('check'));
      row([action,check],'actions');
      row(Array.from('1234567890',digit=>key(digit,()=>send(digit),'number',digit)),'numbers');
      const rows=(symbols?['.,?!:;'+String.fromCharCode(39,34)+'()','+-=*/%&@#_','[]{}<>~']:layouts[language]).map(letters=>Array.from(letters,letterKey));
      row(rows[0],'letters');row(rows[1],'letters');
      state.shiftButton=key('',()=>{cancelHold(state);state.shift=!state.shift;updateLetters(state);},'shift','Großschreibung für den nächsten Buchstaben');state.shiftButton.append(icon('shift'));
      const remove=key('',()=>keyboard._actions.onType('BACKSPACE'),'delete','Zeichen löschen');remove.append(icon('delete'));
      remove.addEventListener('pointerdown',event=>{
        if(state.disabled||remove.disabled||keyboard.inert||event.isPrimary===false||(event.button!==undefined&&event.button!==0))return;
        cancelHold(state);state.blockedClick=null;
        const hold={button:remove,x:event.clientX||0,y:event.clientY||0,pointer:event.pointerId};state.hold=hold;holds.add(state);
        try{remove.setPointerCapture(event.pointerId);}catch{}
        function erase(){
          if(state.hold!==hold)return;
          if(state.disabled||remove.disabled||keyboard.inert){cancelHold(state);return;}
          keyboard._actions.onType('BACKSPACE');
          // Input can synchronously reset or close this keyboard.
          if(state.hold===hold)hold.timer=setTimeout(erase,70);
        }
        keyboard._actions.onType('BACKSPACE');
        if(state.hold===hold)hold.timer=setTimeout(erase,350);
      });
      remove.addEventListener('pointermove',event=>{
        const hold=state.hold;
        if(hold?.button===remove&&hold.pointer===event.pointerId&&Math.hypot((event.clientX||0)-hold.x,(event.clientY||0)-hold.y)>10)cancelHold(state);
      });
      for(const name of ['pointerup','pointercancel','lostpointercapture'])remove.addEventListener(name,event=>{
        const hold=state.hold;if(hold?.button===remove&&hold.pointer===event.pointerId)cancelHold(state);
      });
      row(language==='de'&&!symbols?[state.shiftButton,spacer(),...rows[2],spacer(),remove]:[state.shiftButton,...rows[2],remove],'letters last-letters');
      const space=key(names[language],()=>send(' '),'space','Leertaste · '+names[language]);
      const mode=key(symbols?'ABC':'?123',()=>{cancel(keyboard);keyboard.dataset.symbols=String(!symbols);render(language,keyboard._renderOptions);},'symbols',symbols?'Buchstaben':'Satzzeichen');mode.classList.add('utility');row([mode,space],'controls');
    }
    if(reset||state.contextKey!==contextKey){cancel(keyboard);keyboard.querySelectorAll('.key').forEach(b=>delete b.dataset.preview);}
    state.contextKey=contextKey;state.disabled=disabled;
    if(disabled)cancelHold(state);
    keyboard.querySelectorAll('.key').forEach(button=>{
      button.disabled=disabled||(inputLocked&&button.dataset.action!=='check');
      if(button.dataset.action==='check')button.setAttribute('aria-label',checkLabel);
      if(button.dataset.action==='skip'){button.textContent=skipLabel;button.setAttribute('aria-label',skipLabel);}
      if(button.dataset.action==='language')button.setAttribute('aria-label',languageLabel);
    });updateLetters(state);
  }
  root.AndreKeyboard={render,cancel,cancelAll,configure,get preferences(){return {...preferences};}};
  root.addEventListener('blur',cancelAll);root.addEventListener('pagehide',cancelAll);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAll();});
})(window);
