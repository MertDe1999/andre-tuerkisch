/* Optional original synthesized tones; no downloads, tracking or autoplay. */
(function(root){
 'use strict';
 const KEY='andreSoundModeV1',names=['Ton aus','Ton an','Ton + Musik'];
 let mode=1,context=null,active=false,timer=null,step=0,started=false,held=false,feedbackSerial=0,noise=null;
 const voices=new Set();
 try{const saved=root.localStorage.getItem(KEY);if(saved!==null&&saved!==undefined&&saved!=='')mode=Math.max(0,Math.min(2,Math.floor(Number(saved)||0)));}catch{}
 function stop(){clearTimeout(timer);timer=null;for(const voice of voices)try{voice.stop();}catch{}voices.clear();}
 function ensure(){try{const Audio=root.AudioContext||root.webkitAudioContext;if(!Audio)return false;context||=new Audio();context.resume?.().catch?.(()=>{});return true;}catch{return false;}}
 function tone(frequency,delay=0,duration=.18,volume=.035){
  if(!context||document.hidden)return;try{const start=context.currentTime+delay,osc=context.createOscillator(),gain=context.createGain();osc.type='sine';osc.frequency.value=frequency;
   gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(volume,start+.015);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
   osc.connect(gain);gain.connect(context.destination);voices.add(osc);osc.onended=()=>{voices.delete(osc);osc.disconnect();gain.disconnect();};osc.start(start);osc.stop(start+duration+.03);
  }catch{}
 }
 function music(){clearTimeout(timer);timer=null;if(held||mode!==2||!active||!started||document.hidden||!context)return;
  // Quiet pentatonic notes, deliberately sparse to leave room for concentration.
  tone([261.63,329.63,392,440,392,329.63,293.66,329.63][step++%8],0,.7,.012);timer=setTimeout(music,1100);
 }
 function effect(kind){if(held||!mode||document.hidden||!ensure())return;started=true;feedbackSerial++;
  if(kind==='key')tone(680,0,.025,.014);
  else if(kind==='click')tone(520,0,.045,.018);
  else if(kind==='page')page();
  else if(kind==='retry'){tone(294,0,.09,.022);tone(247,.075,.1,.016);}
  else [392,523.25,...(kind==='level'?[659.25,783.99]:[])].forEach((f,i)=>tone(f,i*.09,.2));
  if(mode===2&&!timer)music();
 }
 function session(value){active=value;document.getElementById(value?'sentenceSoundSlot':'profileSoundSlot').append(control);if(!value)stop();else music();}
 const control=document.createElement('button');control.type='button';control.id='soundToggle';control.className='sound-toggle';
 function label(){control.replaceChildren();const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.8');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d','M4 9h4l5-4v14l-5-4H4Z '+(mode?'M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14':'M17 9l5 6m0-6-5 6'));svg.append(path);const text=document.createElement('span');text.textContent=names[mode];control.append(svg,text);control.setAttribute('aria-label',names[mode]+' · wechseln zu '+names[(mode+1)%3]);control.setAttribute('aria-pressed',String(mode>0));control.title=names[mode];}
 function page(){
  if(!context.createBuffer||!context.createBufferSource||!context.createBiquadFilter){tone(440,0,.09,.018);return;}
  try{if(!noise){noise=context.createBuffer(1,Math.ceil(context.sampleRate*.12),context.sampleRate);const data=noise.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;}
   const source=context.createBufferSource(),filter=context.createBiquadFilter(),gain=context.createGain(),now=context.currentTime;source.buffer=noise;filter.type='lowpass';filter.frequency.setValueAtTime(1800,now);filter.frequency.exponentialRampToValueAtTime(500,now+.12);gain.gain.setValueAtTime(.0001,now);gain.gain.linearRampToValueAtTime(.035,now+.015);gain.gain.exponentialRampToValueAtTime(.0001,now+.12);source.connect(filter);filter.connect(gain);gain.connect(context.destination);voices.add(source);source.onended=()=>{voices.delete(source);source.disconnect();filter.disconnect();gain.disconnect();};source.start(now);source.stop(now+.13);
  }catch{tone(440,0,.09,.018);}
 }
 function interact(target){const button=target?.closest?.('button,summary,input');if(!button||button.disabled||button.inert||button===control||button.closest('.custom-keyboard'))return;
  // Resume inside the gesture; defer only the generic click so specific feedback wins.
  if(mode&&!held&&!document.hidden)ensure();const before=feedbackSerial;
  setTimeout(()=>{if(feedbackSerial===before)effect('click');},0);
 }
 control.addEventListener('click',()=>{mode=(mode+1)%3;stop();try{root.localStorage.setItem(KEY,String(mode));}catch{}label();if(!mode)root.AndreSpeech?.cancel();root.WordTrainer?.soundChanged();if(mode&&ensure()){started=true;effect('correct');music();}});
 document.getElementById('profileSoundSlot').append(control);label();
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else music();});root.addEventListener('pagehide',()=>{active=false;stop();});
 root.AndreSound={effect,interact,session,stop,hold(value){held=!!value;if(held)stop();else music();},get mode(){return mode;}};
})(window);
