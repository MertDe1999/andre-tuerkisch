/* Editorial data corrections; preserves every existing public word ID. */
const fs=require('node:fs'),path=require('node:path');
const file=path.join(__dirname,'../data/interests.js'),text=fs.readFileSync(file,'utf8');
const data=JSON.parse(text.slice(text.indexOf('const data=')+11,text.indexOf(';\nif(typeof module')));
for(const w of data.words){
 if(w.type==='noun'){
  const d=w.deGrammar;
  if(['Kandidat','Nachbar','Held','Politiker','Moderator'].includes(d.singular)){d.weak=['Kandidat','Nachbar','Held'].includes(d.singular);d.oblique=d.singular==='Held'?'Helden':d.plural;}
  if(d.singular==='Außerirdischer'){d.singular='Außerirdische';d.plural='Außerirdischen';d.weak=true;d.oblique='Außerirdischen';}
  if(w.semantic==='place'){
   const article=d.gender==='m'?'dem':d.gender==='f'?'der':'dem';
   const prefix=['meydan','Noel pazarı'].includes(w.tr)?'auf ':w.properName&&['Kaufland','REWE','EDEKA','ÁRO','Burger King','Peter Pane'].includes(w.tr)?'bei ':'in ';
   d.at=prefix+(w.properName?'':article+' ')+d.singular;
   d.to=(w.properName&&['Paris','Münster','Roma','Mısır','Asya'].includes(w.tr)?'nach ':'zu ')+(w.properName?'':article+' ')+d.singular;
   d.from='aus '+(w.properName?'':article+' ')+d.singular;
  }
 }
 if(w.tr==='birlikte')w.type='adverb';
 if(w.tr==='çocuk')w.semantic='child';
 if(w.tr==='yakışmak')w.deGrammar.frame='fit-dative';
 if(w.tr==='muzlu ekmek'){w.derivedPhrase=[{tr:'muz',derivation:'with'},{tr:'ekmek'}];delete w.lexicalPhrase;}
 if(w.tr==='salak')w.deGrammar.positive='blöd';
 if(w.tr==='hafif')w.deGrammar.positive='leicht';
 if(w.tr==='acı')w.deGrammar.positive='bitter';
 if(w.tr==='şerefsiz')w.deGrammar.positive='ehrlos';
 if(w.tr==='etmek'){w.voice={passive:'edil'};}
 if(w.tr==='yemek')w.voice={passive:'yen'};
 if(w.tr==='içmek')w.voice={passive:'içil'};
 if(w.tr==='görmek')w.voice={passive:'görül'};
 if(w.tr==='hazırlamak')w.voice={passive:'hazırlan',causative:'hazırlat'};
 if(w.tr==='temizlemek')w.voice={passive:'temizlen',causative:'temizlet'};
 if(w.tr==='pişirmek')w.voice={passive:'pişiril'};
}
const extras=[
 {tr:'pembe',de:'rosa',type:'adj',deGrammar:{positive:'rosa'},themes:['T02','T21']},
 {tr:'üzüm suyu',de:'Traubensaft',type:'noun',semantic:'drink',compoundParts:['üzüm','su'],deGrammar:{gender:'m',singular:'Traubensaft',plural:'Traubensäfte'},themes:['T13']},
 {tr:'muzlu ekmek',de:'Bananenbrot',type:'noun',semantic:'food',deGrammar:{gender:'n',singular:'Bananenbrot',plural:'Bananenbrote'},themes:['T13'],lexicalPhrase:true},
 {tr:'cheesecake',de:'Käsekuchen',type:'noun',semantic:'food',deGrammar:{gender:'m',singular:'Käsekuchen',plural:'Käsekuchen'},themes:['T13']},
 {tr:'çiş',de:'Pipi',type:'noun',semantic:'thing',deGrammar:{gender:'n',singular:'Pipi',plural:'Pipi'},themes:['T23']},
];
extras.forEach((w,i)=>{if(!data.words.some(x=>x.tr===w.tr&&x.type===w.type))data.words.push({id:'ix'+String(i+1).padStart(3,'0'),...w,deAnswers:[w.de],interest:true});});
fs.writeFileSync(file,'/* Personal vocabulary, semantic roles and pronunciation profiles. */\n(function(root){\'use strict\';const data='+JSON.stringify(data,null,2)+';\nif(typeof module===\'object\'&&module.exports)module.exports=data;else root.AndreInterestData=data;\n})(typeof globalThis===\'object\'?globalThis:this);\n');
console.log(data.words.length+' proposals retained');
