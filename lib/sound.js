/* Optional original synthesized tones; no downloads, tracking or autoplay. */
(function(root){
 'use strict';
 const KEY='andreSoundModeV1',names=['Ton aus','Klänge','Klänge und Musik'];
 let mode=0,context=null,active=false,timer=null,step=0,started=false;
 const voices=new Set();
 try{mode=Math.max(0,Math.min(2,Math.floor(Number(root.localStorage.getItem(KEY))||0)));}catch{}
 function stop(){clearTimeout(timer);timer=null;for(const voice of voices)try{voice.stop();}catch{}voices.clear();}
 function ensure(){try{const Audio=root.AudioContext||root.webkitAudioContext;if(!Audio)return false;context||=new Audio();context.resume?.().catch?.(()=>{});return true;}catch{return false;}}
 function tone(frequency,delay=0,duration=.18,volume=.035){
  if(!context||document.hidden)return;try{const start=context.currentTime+delay,osc=context.createOscillator(),gain=context.createGain();osc.type='sine';osc.frequency.value=frequency;
   gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(volume,start+.015);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
   osc.connect(gain);gain.connect(context.destination);voices.add(osc);osc.onended=()=>{voices.delete(osc);osc.disconnect();gain.disconnect();};osc.start(start);osc.stop(start+duration+.03);
  }catch{}
 }
 function music(){clearTimeout(timer);timer=null;if(mode!==2||!active||!started||document.hidden||!context)return;
  // Quiet pentatonic notes, deliberately sparse to leave room for concentration.
  tone([261.63,329.63,392,440,392,329.63,293.66,329.63][step++%8],0,.7,.012);timer=setTimeout(music,1100);
 }
 function effect(kind){if(!mode||document.hidden||!ensure())return;started=true;
  if(kind==='retry')tone(261.63,0,.12,.018);
  else [392,523.25,...(kind==='level'?[659.25,783.99]:[])].forEach((f,i)=>tone(f,i*.09,.2));
  if(mode===2&&!timer)music();
 }
 function session(value){active=value;document.getElementById(value?'sentenceSoundSlot':'profileSoundSlot').append(control);if(!value)stop();else music();}
 const control=document.createElement('button');control.type='button';control.id='soundToggle';control.className='sound-toggle';
 function label(){control.textContent=mode?'♫':'♪';control.setAttribute('aria-label',names[mode]+' · wechseln');control.setAttribute('aria-pressed',String(mode>0));control.title=names[mode];}
 control.addEventListener('click',()=>{mode=(mode+1)%3;stop();try{root.localStorage.setItem(KEY,String(mode));}catch{}label();if(mode&&ensure()){started=true;effect('correct');music();}});
 document.getElementById('profileSoundSlot').append(control);label();
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else music();});root.addEventListener('pagehide',()=>{active=false;stop();});
 root.AndreSound={effect,session,stop,get mode(){return mode;}};
})(window);
