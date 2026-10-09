/* Code-point editing without opening the device keyboard. */
(function(root){
 'use strict';
 function edit(cur,key,limit=500){const chars=Array.from(cur.draft||'');let position=Number.isInteger(cur.caret)?Math.min(chars.length,Math.max(0,cur.caret)):chars.length;
  if(key==='ArrowLeft')position=Math.max(0,position-1);else if(key==='ArrowRight')position=Math.min(chars.length,position+1);else if(key==='Home')position=0;else if(key==='End')position=chars.length;
  else if(key==='BACKSPACE'){if(position)chars.splice(--position,1);}else{const incoming=Array.from(key).slice(0,Math.max(0,limit-chars.length));chars.splice(position,0,...incoming);position+=incoming.length;}
  cur.draft=chars.join('');cur.caret=position;return cur.draft;
 }
 function draw(node,cur,{animate=false,editable=true}={}){const chars=Array.from(cur.draft||''),position=Number.isInteger(cur.caret)?Math.min(chars.length,Math.max(0,cur.caret)):chars.length;
  node.replaceChildren();node.classList.toggle('empty',!chars.length);node.setAttribute('aria-label','Antwort: '+(cur.draft||'leer'));
  if(!chars.length){node.textContent='Antwort tippen …';if(!editable)return;}
  for(let i=0;i<=chars.length;i++){if(editable&&i===position){const caret=document.createElement('span');caret.className='answer-caret';caret.setAttribute('aria-hidden','true');node.append(caret);}
   if(i===chars.length)break;const glyph=document.createElement('span');glyph.className='answer-glyph';glyph.textContent=chars[i];glyph.dataset.answerIndex=i;
   if(editable)glyph.addEventListener('click',event=>{event.stopPropagation?.();const box=glyph.getBoundingClientRect();cur.caret=i+Number((event.clientX??box.left+box.width)>box.left+box.width/2);draw(node,cur,{editable});node._saveCaret?.();node.focus({preventScroll:true});});node.append(glyph);
   if(animate&&editable&&i===position-1)root.AndreMotion?.play(glyph,[{opacity:.35,transform:'translateY(2px)'},{opacity:1,transform:'translateY(0)'}],{duration:100,slot:'letter'});
  }
  node._answerCur=cur;node._answerEditable=editable;if(!node._answerBound){node._answerBound=true;node.addEventListener('click',()=>{if(!node._answerEditable)return;node._answerCur.caret=Array.from(node._answerCur.draft||'').length;draw(node,node._answerCur);node._saveCaret?.();});}
 }
 const api={edit,draw};if(typeof module==='object'&&module.exports)module.exports=api;else root.AndreAnswerEditor=api;
})(typeof globalThis==='object'?globalThis:this);
