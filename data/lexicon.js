/* Bilingual lexical information, independent of any particular sentence. */
(function(root){
 'use strict';
 const extra=[
  ['bir','ein / eine','determiner'],['kapı','Tür','noun'],['dün','gestern','adverb'],
  ['yarın','morgen','adverb'],['bugün','heute','adverb'],['her','jeder / jede / jedes','determiner'],
  ['gün','Tag','noun'],['gülmek','lachen','verb'],['yürümek','zu Fuß gehen','verb'],
  ['kitap','Buch','noun'],['yazmak','schreiben','verb'],['okumak','lesen','verb'],
  ['görüşmek','sich treffen','verb'],['beri','seit','postposition'],['sürece','solange','postposition'],
  ['oysa','dagegen / hingegen','conjunction'],['dolayı','wegen','postposition'],
  ['yerine','anstatt','postposition'],['bile','sogar / selbst','adverb']
 ];
 const nouns={
  ev:['n','Haus','Häuser','nach Hause','im Haus','aus dem Haus','place'],
  araba:['n','Auto','Autos','zum Auto','im Auto','vom Auto','vehicle'],
  anne:['f','Mutter','Mütter','zur Mutter','bei der Mutter','von der Mutter','human'],
  baba:['m','Vater','Väter','zum Vater','beim Vater','vom Vater','human'],
  abi:['m','Bruder','Brüder','zum Bruder','beim Bruder','vom Bruder','human'],
  abla:['f','Schwester','Schwestern','zur Schwester','bei der Schwester','von der Schwester','human'],
  ağaç:['m','Baum','Bäume','zum Baum','am Baum','vom Baum','thing'],
  yol:['m','Weg','Wege','zum Weg','auf dem Weg','vom Weg','place'],
  yarak:['m','Penis','Penisse','zum Penis','am Penis','vom Penis','body'],
  kapı:['f','Tür','Türen','zur Tür','an der Tür','von der Tür','thing'],
  gün:['m','Tag','Tage',null,null,null,'time'],
  kitap:['n','Buch','Bücher','zum Buch','im Buch','vom Buch','thing']
 };
 const verbs={
  gelmek:['gel','gel','gelir','kommen',['komme','kommst','kommt','kommen','kommt','kommen'],'gekommen','sein','motion'],
  gitmek:['git','gid','gider','gehen',['gehe','gehst','geht','gehen','geht','gehen'],'gegangen','sein','motion'],
  görmek:['gör','gör','görür','sehen',['sehe','siehst','sieht','sehen','seht','sehen'],'gesehen','haben','object'],
  sevmek:['sev','sev','sever','mögen',['mag','magst','mag','mögen','mögt','mögen'],'gemocht','haben','object'],
  istemek:['iste','ist','ister','möchten',['möchte','möchtest','möchte','möchten','möchtet','möchten'],'gewollt','haben','complement'],
  bilmek:['bil','bil','bilir','wissen',['weiß','weißt','weiß','wissen','wisst','wissen'],'gewusst','haben','complement'],
  söylemek:['söyle','söyl','söyler','sagen',['sage','sagst','sagt','sagen','sagt','sagen'],'gesagt','haben','complement'],
  sormak:['sor','sor','sorar','fragen',['frage','fragst','fragt','fragen','fragt','fragen'],'gefragt','haben','complement'],
  yıkamak:['yıka','yık','yıkar','waschen',['wasche','wäschst','wäscht','waschen','wascht','waschen'],'gewaschen','haben','object'],
  olmak:['ol','ol','olur','sein',['bin','bist','ist','sind','seid','sind'],'gewesen','sein','simple'],
  gülmek:['gül','gül','güler','lachen',['lache','lachst','lacht','lachen','lacht','lachen'],'gelacht','haben','simple'],
  yürümek:['yürü','yürü','yürür','gehen',['gehe','gehst','geht','gehen','geht','gehen'],'gegangen','sein','motion'],
  yazmak:['yaz','yaz','yazar','schreiben',['schreibe','schreibst','schreibt','schreiben','schreibt','schreiben'],'geschrieben','haben','object'],
  okumak:['oku','oku','okur','lesen',['lese','liest','liest','lesen','lest','lesen'],'gelesen','haben','object'],
  görüşmek:['görüş','görüş','görüşür','sich treffen',['treffe mich','triffst dich','trifft sich','treffen uns','trefft euch','treffen sich'],'getroffen','haben','reciprocal']
 };
 const past={gelmek:['kam','kamst','kam','kamen','kamt','kamen'],gitmek:['ging','gingst','ging','gingen','gingt','gingen'],görmek:['sah','sahst','sah','sahen','saht','sahen'],sevmek:['mochte','mochtest','mochte','mochten','mochtet','mochten'],yıkamak:['wusch','wuschest','wusch','wuschen','wuscht','wuschen'],okumak:['las','lasest','las','lasen','last','lasen'],yazmak:['schrieb','schriebst','schrieb','schrieben','schriebt','schrieben'],gülmek:['lachte','lachtest','lachte','lachten','lachtet','lachten'],yürümek:['ging','gingst','ging','gingen','gingt','gingen']};
 function enrich(words){
  extra.forEach(([tr,de,type],i)=>{if(!words.some(w=>w.tr===tr))words.push({id:'w'+String(52+i).padStart(3,'0'),tr,de,type,deAnswers:de.split(' / ')});});
  for(const w of words){
   const n=nouns[w.tr],v=verbs[w.tr];
   if(n){w.deGrammar={gender:n[0],singular:n[1],plural:n[2],to:n[3],at:n[4],from:n[5]};w.semantic=n[6];}
   if(v){w.stem=v[0];w.progressiveStem=v[1];w.aorist=v[2];w.profile={...w.profile,pattern:v[7],forms:v[4]};w.deGrammar={infinitive:v[3],present:v[4],past:past[w.tr],participle:v[5],auxiliary:v[6],frame:v[7]};}
   if(w.tr==='kitap')w.soften='kitab';
   if(w.tr==='okumak')w.voice={passive:'okun'};
   if(w.tr==='yazmak')w.voice={passive:'yazıl',causative:'yazdır'};
   if(w.tr==='gülmek')w.voice={causative:'güldür'};
   if(w.tr==='gitmek')w.vowelStem='gid';
   if(w.tr==='güzel')w.deGrammar={positive:'schön',comparative:'schöner',superlative:'schönsten'};
  }
  return words;
 }
 const api={enrich};if(typeof module==='object'&&module.exports)module.exports=api;else root.AndreLexicon=api;
})(typeof globalThis==='object'?globalThis:this);
