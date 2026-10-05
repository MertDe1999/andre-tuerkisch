/* Build a frozen first-release vocabulary path; later dictionary entries stay optional. */
const fs=require('node:fs'),path=require('node:path'),W=require('../data/words'),C=require('../lib/course');
const destination=path.join(__dirname,'../data/learning-packages.js');
if(fs.existsSync(destination)&&!process.argv.includes('--replace-path')){console.log('Frozen learning path retained. --replace-path is only for an intentional course revision.');process.exit(0);}
const original=new Set(C.bands.flatMap(b=>b.words).map(tr=>W.byLemma[tr].id));
const remaining=W.words.filter(w=>w.interest&&!original.has(w.id)),ordered=[],seen=new Set();
function add(w){if(w&&!seen.has(w.id)){seen.add(w.id);ordered.push(w.id);}}
// First encounters are the simple theme anchors, spread over small packages.
for(const theme of W.interestData.themes)for(const tr of theme.anchor.tr.replace(/[.!?]/g,'').split(' '))add(W.words.find(w=>w.tr.toLocaleLowerCase('tr-TR')===tr.toLocaleLowerCase('tr-TR')));
const buckets=W.interestData.themes.map(t=>remaining.filter(w=>w.themes?.includes(t.id)));
for(let n=0;n<Math.max(...buckets.map(a=>a.length));n++)for(const bucket of buckets)add(bucket[n]);
remaining.forEach(add);
const packages=C.bands.map(b=>[...b.words.map(tr=>W.byLemma[tr].id)]);
ordered.filter(id=>!original.has(id)).forEach((id,i)=>packages[Math.min(31,Math.floor(i/(ordered.length/32)))].push(id));
fs.writeFileSync(destination,'/* Frozen vocabulary requirements, interest release 1. */\n(function(root){const data='+JSON.stringify(packages)+';if(typeof module===\'object\'&&module.exports)module.exports=data;else root.AndreLearningPackages=data;})(typeof globalThis===\'object\'?globalThis:this);\n');
console.log(packages.flat().length+' package references; '+new Set(packages.flat()).size+' words');
