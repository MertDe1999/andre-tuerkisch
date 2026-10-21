/* Shared DE/TR keyboard. Only emits input/actions; it never changes learning progress. */
(function(root){
  'use strict';
  const layouts={
    de:['qwertzuiopü','asdfghjklöä','yxcvbnm'],
    tr:['qwertyuıopğü','asdfghjklşi','zxcvbnmöç']
  },variants={
    a:'áàâäãå',ä:'aáàâãå',c:'çćč',ç:'cćč',e:'éèêë',g:'ğ',ğ:'g',
    i:'ıíìîïİ',ı:'iíìîï',n:'ñ',o:'öóòôõ',ö:'oóòôõ',s:'şß',ş:'sß',
    u:'üúùû',ü:'uúùû',y:'ýÿ'
  },holds=new Set(),states=new Set();
  let popupId=0;
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
      button.setAttribute('aria-label',letter+(button.dataset.variants?', gedrückt halten für Buchstabenvarianten':''));
    }
    state.shiftButton.setAttribute('aria-pressed',String(state.shift));
  }
  function cancelHold(state,blockClick=true){
    if(!state?.hold)return;
    const hold=state.hold;
    if(blockClick)state.blockedClick=hold.button;
    clearTimeout(hold.timer);state.hold=null;holds.delete(state);
    hold.popup?.remove();hold.button.removeAttribute('aria-controls');
    if(hold.button.dataset.variants)hold.button.setAttribute('aria-expanded','false');
    delete hold.button.dataset.preview;updateLetters(state);
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
        if(state.disabled||state.inputLocked||keyboard.inert||keyboard.hidden)return;
        keyboard._actions.onType(state.shift?upper(text,language):text);
        if(/^\p{L}+$/u.test(text)){state.shift=false;updateLetters(state);}
      }
      function key(text,action,kind,label){
        const button=document.createElement('button');button.type='button';button.className='key '+kind;button.dataset.action=kind;
        button.textContent=text;button.setAttribute('aria-label',label||text);
        button.addEventListener('click',event=>{
          if(state.disabled||button.disabled||keyboard.inert||keyboard.hidden)return;
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
        if(variants[letter]){
          button.dataset.variants=variants[letter];button.title='Gedrückt halten oder Pfeil nach unten: Buchstabenvarianten';
          button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-expanded','false');
          function allowed(){return !state.disabled&&!state.inputLocked&&!button.disabled&&!keyboard.inert&&!keyboard.hidden;}
          function choose(hold,option){
            if(state.hold!==hold)return;
            if(!allowed()){cancelHold(state);return;}
            const text=option.dataset.variant;cancelHold(state);button.focus({preventScroll:true});tactile();send(text);
          }
          function open(hold,focus=false){
            if(state.hold!==hold)return;
            if(!allowed()){cancelHold(state);return;}
            hold.ready=true;delete button.dataset.preview;
            const popup=document.createElement('div');popup.className='keyboard-variants';popup.id='keyboard-variants-'+(++popupId);
            popup.setAttribute('role','dialog');popup.setAttribute('aria-label','Buchstabenvarianten für '+button.textContent);
            hold.popup=popup;hold.options=[];
            const base=state.shift?upper(letter,language):letter;
            const choices=[...new Set(Array.from(variants[letter],char=>state.shift?upper(char,language):char))].filter(char=>char!==base);
            choices.forEach((char,index)=>{
              const option=document.createElement('button');option.type='button';option.className='key keyboard-variant';
              option.textContent=char;option.dataset.variant=char;option.setAttribute('aria-label',char);
              option.addEventListener('click',()=>choose(hold,option));
              option.addEventListener('keydown',event=>{
                event.stopPropagation?.();
                if(event.key==='Escape'){event.preventDefault();cancelHold(state);button.focus({preventScroll:true});}
                else if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){
                  event.preventDefault();const count=hold.options.length;
                  hold.options[event.key==='Home'?0:event.key==='End'?count-1:(index+(event.key==='ArrowRight'?1:count-1))%count].focus({preventScroll:true});
                }
              });
              hold.options.push(option);popup.append(option);
            });
            const row=button.parentElement;row.append(popup);
            const anchor=button.getBoundingClientRect(),bounds=row.getBoundingClientRect(),width=popup.getBoundingClientRect().width;
            popup.style.left=Math.max(0,Math.min(anchor.left+anchor.width/2-bounds.left-width/2,bounds.width-width))+'px';
            button.setAttribute('aria-controls',popup.id);button.setAttribute('aria-expanded','true');
            if(focus)hold.options[0].focus({preventScroll:true});
          }
          function optionAt(event,hold){
            const option=document.elementFromPoint(event.clientX,event.clientY)?.closest('.keyboard-variant');
            return option?.parentElement===hold.popup?option:null;
          }
          button.addEventListener('pointerdown',event=>{
            if(!allowed()||event.isPrimary===false||(event.button!==undefined&&event.button!==0))return;
            cancelHold(state);state.blockedClick=null;
            const hold={button,x:event.clientX||0,y:event.clientY||0,pointer:event.pointerId,ready:false};state.hold=hold;holds.add(state);
            hold.timer=setTimeout(()=>open(hold),400);
            try{button.setPointerCapture(event.pointerId);}catch{}
          });
          button.addEventListener('pointermove',event=>{
            const hold=state.hold;if(hold?.button!==button||hold.pointer!==event.pointerId)return;
            if(!hold.ready){if(Math.hypot((event.clientX||0)-hold.x,(event.clientY||0)-hold.y)>10)cancelHold(state);return;}
            const selected=optionAt(event,hold);
            hold.options.forEach(option=>option.classList.toggle('is-selected',option===selected));
          });
          button.addEventListener('pointerup',event=>{
            const hold=state.hold;if(hold?.button!==button||hold.pointer!==event.pointerId)return;
            if(!hold.ready){cancelHold(state,false);return;}
            state.blockedClick=button;
            const selected=optionAt(event,hold);hold.pointer=null;
            if(!allowed()){cancelHold(state);return;}
            if(selected){choose(hold,selected);return;}
            const rect=button.getBoundingClientRect(),x=event.clientX??hold.x,y=event.clientY??hold.y;
            if(x<rect.left||x>rect.left+rect.width||y<rect.top||y>rect.top+rect.height){cancelHold(state);return;}
            // Releasing above the original letter keeps the picker open for a separate tap.
            hold.options[0].focus({preventScroll:true});
          });
          for(const name of ['pointercancel','lostpointercapture'])button.addEventListener(name,event=>{
            if(state.hold?.button===button&&state.hold.pointer===event.pointerId)cancelHold(state);
          });
          button.addEventListener('contextmenu',event=>event.preventDefault());
          button.addEventListener('keydown',event=>{
            if(event.key!=='ArrowDown'||event.isComposing||event.ctrlKey||event.metaKey||event.altKey||!allowed())return;
            event.preventDefault();event.stopPropagation?.();cancelHold(state);
            const hold={button,pointer:null,ready:false};state.hold=hold;holds.add(state);open(hold,true);
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
    state.contextKey=contextKey;state.disabled=disabled;state.inputLocked=inputLocked;
    if(disabled||inputLocked)cancelHold(state);
    keyboard.querySelectorAll('.key').forEach(button=>{
      button.disabled=disabled||(inputLocked&&button.dataset.action!=='check');
      if(button.dataset.action==='check')button.setAttribute('aria-label',checkLabel);
      if(button.dataset.action==='skip'){button.textContent=skipLabel;button.setAttribute('aria-label',skipLabel);}
      if(button.dataset.action==='language')button.setAttribute('aria-label',languageLabel);
    });updateLetters(state);
  }
  root.AndreKeyboard={render,cancel,cancelAll,configure,get preferences(){return {...preferences};}};
  root.addEventListener('blur',cancelAll);root.addEventListener('pagehide',cancelAll);
  root.addEventListener('resize',cancelAll);
  for(const name of ['pointerdown','focusin'])document.addEventListener(name,event=>{
    for(const state of [...holds]){
      const hold=state.hold;
      if(hold?.popup&&event.target!==hold.button&&event.target.closest?.('.keyboard-variants')!==hold.popup)cancelHold(state);
    }
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAll();});
})(window);
