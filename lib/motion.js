/* Presentation only: learning state and input never wait for an animation. */
(function(root){
  'use strict';
  const active=new Set(),perNode=new WeakMap();
  const ease='cubic-bezier(.2,.8,.2,1)';
  const reduced=()=>root.matchMedia?.('(prefers-reduced-motion: reduce)').matches===true;
  function play(node,frames,{duration=220,cleanup=()=>{},slot='motion'}={}){
    if(!node){cleanup();return null;}
    const slots=perNode.get(node)||new Map();perNode.set(node,slots);slots.get(slot)?.stop();
    if(reduced()||typeof node.animate!=='function'){cleanup();return null;}
    let animation,done=false;
    const record={stop(){if(done)return;animation?.cancel();finish();}};
    function finish(){if(done)return;done=true;active.delete(record);if(slots.get(slot)===record)slots.delete(slot);cleanup();}
    try{animation=node.animate(frames,{duration,easing:ease,fill:'none'});}catch{finish();return null;}
    active.add(record);slots.set(slot,record);animation.onfinish=finish;animation.oncancel=finish;
    return animation;
  }
  function cancel(){for(const entry of [...active])entry.stop();clearSwipe();}
  function enter(node,direction=1){return play(node,[{opacity:0,transform:'translateY('+direction*8+'px)'},{opacity:1,transform:'translateY(0)'}]);}
  function feedback(node,correct){return play(node,correct?
    [{transform:'scale(1)',opacity:1},{transform:'scale(1.015)',opacity:.85},{transform:'scale(1)',opacity:1}]:
    [{transform:'translateX(0)'},{transform:'translateX(-3px)'},{transform:'translateX(3px)'},{transform:'translateX(0)'}],{duration:correct?260:200,slot:'feedback'});}
  function write(node,text,{placeholder='Antwort tippen …',animate=true}={}){
    const value=String(text||''),previous=node.dataset.motionText||'';
    node.dataset.motionText=value;
    if(!value){node.textContent=placeholder;return;}
    const extra=value.startsWith(previous)?value.slice(previous.length):'';
    if(!animate||!extra||reduced()){node.textContent=value;return;}
    if(!previous||node.textContent!==previous)node.textContent=previous;
    const span=document.createElement('span');span.className='answer-letter';span.textContent=extra;node.append(span);
    play(span,[{opacity:.35,transform:'translateY(3px)'},{opacity:1,transform:'translateY(0)'}],{duration:140,slot:'letter'});
  }
  function rect(node){return node?.getBoundingClientRect?.();}
  function snapshot(node){
    if(reduced()||!node?.cloneNode||node.hidden)return null;
    const box=rect(node);if(!box?.width||!box.height)return null;
    const clone=node.cloneNode(true),originals=[node,...node.querySelectorAll('*')],copies=[clone,...clone.querySelectorAll('*')];
    // Freeze a small outgoing component so removing IDs cannot change its style.
    const props=['display','flexDirection','alignItems','justifyContent','gap','gridTemplateColumns','gridAutoRows','padding','margin','color','backgroundColor','border','borderRadius','boxShadow','font','lineHeight','textAlign','minHeight','overflow'];
    for(let i=0;i<copies.length;i++){
      const copy=copies[i],style=root.getComputedStyle?.(originals[i]);
      copy.removeAttribute('id');copy.removeAttribute('onclick');copy.removeAttribute('onkeydown');copy.removeAttribute('tabindex');
      if(style)for(const prop of props)copy.style[prop]=style[prop];
    }
    clone.classList.add('motion-snapshot');clone.setAttribute('aria-hidden','true');clone.inert=true;
    Object.assign(clone.style,{position:'fixed',left:box.left+'px',top:box.top+'px',width:box.width+'px',height:box.height+'px',margin:'0',pointerEvents:'none',zIndex:'21000'});
    document.body.append(clone);return clone;
  }
  function change(node,update){const old=snapshot(node);try{update();}catch(error){old?.remove();throw error;}if(old)play(old,[{opacity:1},{opacity:0}],{duration:160,cleanup:()=>old.remove()});enter(node);}
  function depart(node){const old=snapshot(node);if(old)play(old,[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-8px)'}],{duration:180,cleanup:()=>old.remove()});}
  function captureCards(nodes){
    const result=new Map();if(reduced())return result;
    for(const node of nodes){const key=node.dataset.modernToken||node.dataset.turkishBlock;if(!key)continue;
      const list=result.get(key)||[];list.push({box:rect(node),node});result.set(key,list);
    }return result;
  }
  function cards(before,nodes){
    if(reduced())return;
    for(const node of nodes){const key=node.dataset.modernToken||node.dataset.turkishBlock,old=before.get(key)?.shift();if(!old?.box){if(before.size)enter(node);continue;}
      const box=rect(node),dx=old.box.left-box.left,dy=old.box.top-box.top;
      if(Math.abs(dx)+Math.abs(dy)>.5)play(node,[{transform:'translate('+dx+'px,'+dy+'px)'},{transform:'translate(0,0)'}]);
      else if(old.node.textContent!==node.textContent)feedback(node,true);
    }
  }
  function land(ghost,target,home,{hideTarget=false}={}){
    if(!ghost)return;const from=rect(ghost),to=rect(target)||home;
    if(!from||!to){ghost.remove();return;}
    Object.assign(ghost.style,{left:from.left+'px',top:from.top+'px',transform:'none'});
    const visibility=target?.style.visibility||'';
    if(hideTarget&&target)target.style.visibility='hidden';
    play(ghost,[{transform:'translate(0,0)',opacity:1},{transform:'translate('+(to.left-from.left)+'px,'+(to.top-from.top)+'px) scale(.98)',opacity:0}],{duration:180,cleanup:()=>{ghost.remove();if(hideTarget&&target)target.style.visibility=visibility;}});
  }
  function navigation(previous,next,{direction=1,swipe=null,previousBox=null}={}){
    if(reduced()||!next)return;
    if(previous&&previous!==next){
      const parent=previousBox?.parent||rect(previous.parentElement),box=previousBox?.box||rect(previous);
      if(box&&parent){
        previous.classList.add('motion-leaving');previous.inert=true;
        Object.assign(previous.style,{top:(box.top-parent.top)+'px',left:(box.left-parent.left)+'px',width:box.width+'px'});
        play(previous,[{opacity:1,transform:'translateX('+(swipe?.dx||0)+'px)'},{opacity:swipe?1:0,transform:'translateX('+(swipe?-direction*swipe.width:-direction*16)+'px)'}],
          {cleanup:()=>{previous.classList.remove('motion-leaving');previous.inert=false;previous.style.top='';previous.style.left='';previous.style.width='';}});
      }
    }
    play(next,[{opacity:swipe?1:0,transform:'translateX('+(swipe?direction*swipe.width+swipe.dx:direction*16)+'px)'},{opacity:1,transform:'translateX(0)'}]);
  }
  let swipeState=null;
  function clearSwipe(){
    if(!swipeState)return;const {current,target,nav}=swipeState;
    current.style.transform='';target.style.transform='';target.style.top='';target.style.left='';target.style.width='';target.classList.remove('motion-swipe-preview');target.inert=false;
    if(nav){nav.style.transition='';nav.classList.remove('motion-following');nav.style.setProperty('--nav-index',swipeState.index);}
    swipeState=null;
  }
  function follow(current,target,dx,index,nav){
    if(!current||!target||reduced())return;
    if(swipeState?.target!==target){clearSwipe();for(const entry of [...active])entry.stop();
      const box=rect(current),parent=rect(current.parentElement);if(!box||!parent)return;
      swipeState={current,target,nav,index,width:box.width,dx:0};target.classList.add('motion-swipe-preview');target.inert=true;
      Object.assign(target.style,{top:(box.top-parent.top)+'px',left:(box.left-parent.left)+'px',width:box.width+'px'});
      nav?.classList.add('motion-following');
    }
    swipeState.dx=dx;const direction=dx<0?1:-1;
    current.style.transform='translateX('+dx+'px)';target.style.transform='translateX('+(direction*swipeState.width+dx)+'px)';
    nav?.style.setProperty('--nav-index',index-dx/swipeState.width);
  }
  function finishSwipe(commit=false){
    const state=swipeState;if(!state)return null;clearSwipe();
    if(!commit){play(state.current,[{transform:'translateX('+state.dx+'px)'},{transform:'translateX(0)'}]);return null;}
    return {dx:state.dx,width:state.width};
  }
  root.AndreMotion={reduced,play,cancel,enter,feedback,write,snapshot,change,depart,captureCards,cards,land,navigation,follow,finishSwipe};
  root.addEventListener('resize',cancel);root.addEventListener('pagehide',cancel);
  root.matchMedia?.('(prefers-reduced-motion: reduce)').addEventListener?.('change',cancel);
})(window);
