/* Shared language-aware speech output, with explicit completion and safe cancellation. */
(function(root){
 'use strict';let generation=0,timer=null,waiting=null,finish=null;
 function cancel(){generation++;clearTimeout(timer);timer=null;const synth=root.speechSynthesis;if(waiting)synth?.removeEventListener?.('voiceschanged',waiting);waiting=null;try{synth?.cancel();}catch{}root.AndreSound?.hold(false);const done=finish;finish=null;done?.('cancelled');}
 function play(text,{onState=()=>{},rate=.88,lang='tr-TR',requireVoice=true}={}){
  cancel();const token=generation,synth=root.speechSynthesis,Utterance=root.SpeechSynthesisUtterance;let settled=false,launched=false;
  const end=status=>{if(settled||token!==generation)return;settled=true;clearTimeout(timer);if(waiting)synth?.removeEventListener?.('voiceschanged',waiting);waiting=null;finish=null;root.AndreSound?.hold(false);onState(status);};
  finish=status=>{settled=true;onState(status);};
  if(!synth||!Utterance){end('unavailable');return;}
  root.AndreSound?.hold(true);onState('loading');
  const start=()=>{if(settled||launched||token!==generation)return;let voice;try{voice=synth.getVoices().find(v=>v.lang?.toLowerCase().replace('_','-').startsWith(lang.slice(0,2).toLowerCase()));}catch{end('unavailable');return;}
   if(!voice&&requireVoice)return;
   launched=true;if(waiting)synth.removeEventListener?.('voiceschanged',waiting);waiting=null;clearTimeout(timer);
   try{const u=new Utterance(text);u.lang=lang;if(voice)u.voice=voice;u.rate=rate;u.onstart=()=>{if(!settled&&token===generation)onState('playing');};u.onend=()=>end('ended');u.onerror=()=>end('unavailable');
    timer=setTimeout(()=>{if(token!==generation||settled)return;end('unavailable');try{synth.cancel();}catch{}},Math.max(15000,text.length*220));synth.speak(u);
   }catch{end('unavailable');}
  };
  waiting=start;synth.addEventListener?.('voiceschanged',waiting);timer=setTimeout(()=>end('unavailable'),1800);start();
 }
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});root.addEventListener('pagehide',cancel);
 root.AndreSpeech={play,cancel};
})(window);
