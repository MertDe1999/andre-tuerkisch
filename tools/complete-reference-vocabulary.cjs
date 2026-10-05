/* Required missing lexemes and irregularities in the 160 reviewed personal pairs. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),file=path.join(__dirname,'../data/interests.js'),text=fs.readFileSync(file,'utf8');
const data=JSON.parse(text.slice(text.indexOf('const data=')+11,text.indexOf(';\nif(typeof module')));
const extras=[];
const n=(tr,de,gender,plural,semantic,themes,extra={})=>extras.push({tr,de,type:'noun',semantic,themes,deGrammar:{gender,singular:de,plural},...extra});
n('penis','Penis','m','Penisse','body',['T23']);n('kafe','Café','n','Cafés','place',['T15','T05']);n('uygulama','App','f','Apps','device',['T08','T10']);n('çocuk','Kind','n','Kinder','human',['T22'],{soften:'çocuğ'});n('yürüyüş','Spaziergang','m','Spaziergänge','thing',['T03','T05']);n('buzdolabı','Kühlschrank','m','Kühlschränke','device',['T20']);n('pantolon','Hose','f','Hosen','clothing',['T06']);n('yarı','Hälfte','f','Hälften','thing',['T13']);n('metin','Text','m','Texte','problem',['T04'],{vowelLoss:'metn'});n('yer','Boden','m','Böden','place',['T17']);n('kırıntı','Krümel','m','Krümel','food',['T17']);n('kapak','Umschlag','m','Umschläge','thing',['T04'],{soften:'kapağ'});n('kahkaha','lautes Lachen','n','Gelächter','thing',['T23']);
n('Fransız Devrimi','Französische Revolution','f','Französische Revolutionen','problem',['T04'],{properName:true,possessed:true,harmonyStem:'fransız devrimi'});
n('Phineas ve Ferb','Phineas und Ferb','n','Phineas und Ferb','media',['T09'],{properName:true,harmonyStem:'ferb'});
for(const [tr,de,themes] of [['sıkıcı','langweilig',['T01']],['altın','golden',['T11']]])extras.push({tr,de,type:'adj',deGrammar:{positive:de},themes});
for(const [tr,de,themes] of [['yine','wieder',['T11']],['şimdi','jetzt',['T03']],['hâlâ','immer noch',['T17']],['siktir','verpiss dich (derb)',['T23']]])extras.push({tr,de,type:tr==='siktir'?'interjection':'adverb',themes});
const verbs=[
 ['okumak','lesen','oku','okur',['lese','liest','liest','lesen','lest','lesen'],'gelesen','haben','object',['T04']],
 ['anlatmak','erklären','anlat','anlatır',['erkläre','erklärst','erklärt','erklären','erklärt','erklären'],'erklärt','haben','problem-object',['T04']],
 ['kalmak','bleiben','kal','kalır',['bleibe','bleibst','bleibt','bleiben','bleibt','bleiben'],'geblieben','sein','simple',['T19']],
 ['toplamak','sammeln','topla','toplar',['sammle','sammelst','sammelt','sammeln','sammelt','sammeln'],'gesammelt','haben','object',['T11']],
 ['bitirmek','erledigen','bitir','bitirir',['erledige','erledigst','erledigt','erledigen','erledigt','erledigen'],'erledigt','haben','object',['T12']],
 ['çıkmak','aufbrechen','çık','çıkar',['breche auf','brichst auf','bricht auf','brechen auf','brecht auf','brechen auf'],'aufgebrochen','sein','motion',['T03']],
 ['öpüşmek','sich küssen','öpüş','öpüşür',['küsse mich','küsst dich','küsst sich','küssen uns','küsst euch','küssen sich'],'geküsst','haben','simple',['T05']],
 ['saklamak','aufbewahren','sakla','saklar',['bewahre auf','bewahrst auf','bewahrt auf','bewahren auf','bewahrt auf','bewahren auf'],'aufbewahrt','haben','object',['T20']],
 ['getirmek','mitbringen','getir','getirir',['bringe mit','bringst mit','bringt mit','bringen mit','bringt mit','bringen mit'],'mitgebracht','haben','object',['T13']],
 ['durdurmak','pausieren','durdur','durdurur',['pausiere','pausierst','pausiert','pausieren','pausiert','pausieren'],'pausiert','haben','media-object',['T08']],
 ['çekmek','machen','çek','çeker',['mache','machst','macht','machen','macht','machen'],'gemacht','haben','object',['T15']],
 ['yalamak','lecken','yala','yalar',['lecke','leckst','leckt','lecken','leckt','lecken'],'geleckt','haben','object',['T23']],
 ['demek','sagen','de','der',['sage','sagst','sagt','sagen','sagt','sagen'],'gesagt','haben','complement',['T23']],
 ['duymak','hören','duy','duyar',['höre','hörst','hört','hören','hört','hören'],'gehört','haben','object',['T23']],
];
for(const [tr,de,stem,aorist,present,participle,auxiliary,frame,themes] of verbs)extras.push({tr,de,type:'verb',stem,progressiveStem:tr==='demek'?'di':stem.replace(/[ae]$/,''),aorist,themes,deGrammar:{infinitive:de,present,participle,auxiliary,frame,...(['çıkmak','saklamak','getirmek'].includes(tr)?{separable:tr==='çıkmak'||tr==='saklamak'?'auf':'mit'}:{}),...(tr==='öpüşmek'?{reflexive:true}:{}),...(tr==='demek'?{}:{})},...(tr==='demek'?{vowelStem:'di'}:{})});
const stableID=w=>'ir'+crypto.createHash('sha1').update(w.tr+':'+w.type).digest('hex').slice(0,10);
extras.forEach(w=>{if(!data.words.some(x=>x.tr===w.tr&&x.type===w.type))data.words.push({id:stableID(w),...w,deAnswers:[w.de],interest:true});});
data.words.filter(w=>w.id.startsWith('ir')).forEach(w=>w.id=stableID(w));
for(const w of data.words){
 const names={Mısır:'Ägypten',Roma:'Rom',Asya:'Asien',SüngerBob:'SpongeBob'};if(names[w.tr]){w.de=names[w.tr];w.deAnswers=[names[w.tr]];w.deGrammar.singular=names[w.tr];}
 if(w.tr==='erkek')w.soften='erkeğ';if(w.tr==='yemek'&&w.type==='noun')w.soften='yemeğ';
 if(w.tr==='Orta Çağ'||w.tr==='Fransız Devrimi'){w.properName=true;w.harmonyStem=w.tr.toLocaleLowerCase('tr-TR');}
 if(w.tr==='Phineas und Ferb'){w.tr='Phineas ve Ferb';w.harmonyStem='ferb';}
 if(w.tr==='toplamak')w.voice={passive:'toplan'};
 if(w.tr==='yapmak')w.voice={causative:'yaptır',passive:'yapıl'};
 if(w.tr==='okumak')w.voice={passive:'okun',causative:'okut'};
 if(w.tr==='çözmek')w.voice={passive:'çözül'};
}
fs.writeFileSync(file,'/* Personal vocabulary, semantic roles and pronunciation profiles. */\n(function(root){\'use strict\';const data='+JSON.stringify(data,null,2)+';\nif(typeof module===\'object\'&&module.exports)module.exports=data;else root.AndreInterestData=data;\n})(typeof globalThis===\'object\'?globalThis:this);\n');
console.log(data.words.length+' vocabulary proposals');
