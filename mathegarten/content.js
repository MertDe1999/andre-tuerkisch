/* Originalaufgaben: WiederholungFuerTest1.pdf, S. 1–4. Zusatzaufgaben: eigene Varianten. */
const TOPICS = [
 {id:'binary',name:'Binärwiese',label:'Binärzahlen',icon:'sprout',color:'green',description:'Lass Nullen und Einsen aufblühen.',mechanic:'Bits schalten · Zahlen knacken',lesson:'Jede Stelle ist doppelt so viel wert wie die rechts daneben: 128, 64, 32, 16, 8, 4, 2, 1. Addiere nur die Stellen mit einer 1. Für n verschiedene Zeichen brauchst du das kleinste b mit 2ᵇ ≥ n.',example:'219 = 128 + 64 + 16 + 8 + 2 + 1 → 11011011₂. Mit 7 Bits gibt es 128 Kombinationen (0 bis 127).'},
 {id:'hex',name:'Farbenküche',label:'Hex & RGB',icon:'palette',color:'pink',description:'Mische dir die Welt in deinen Farben.',mechanic:'Verbinden · Farben entschlüsseln',lesson:'Hexadezimal hat die Ziffern 0–9 und A=10, B=11, C=12, D=13, E=14, F=15. Ein Paar XY hat den Wert X · 16 + Y. Bei #RRGGBB stehen die Paare für Rot, Grün und Blau.',example:'D1₁₆ = 13 · 16 + 1 = 209. FF₁₆ = 255 (größter Kanalwert). Viel Rot + Blau ergibt Magenta; bei additivem RGB ergibt volle Intensität aller drei Kanäle Weiß.'},
 {id:'modulo',name:'Modulo-Teich',label:'Modulo',icon:'pond',color:'blue',description:'Entdecke das Muster im Kreislauf.',mechanic:'Zyklus spielen · Reste finden',lesson:'Modulo ist der Rest beim ganzzahligen Teilen. n mod k bleibt immer zwischen 0 und k−1 (für n ≥ 0 und k > 0). Ein Zyklus mit k Plätzen beginnt hier bei Platz 0.',example:'143 = 35 · 4 + 3. Also 143 mod 4 = 3. Im Blatt ist Platz 3 „Hidden“, also der vierte Gegnertyp.'},
 {id:'statements',name:'Aussagenpost',label:'Aussagen erkennen',icon:'mail',color:'peach',description:'Jeder Satz findet sein Zuhause.',mechanic:'Ziehen & ablegen · Sortieren',lesson:'Eine Aussage kann eindeutig wahr oder falsch sein. Eine falsche Behauptung bleibt eine Aussage. Aufforderungen, Fragen und bloße Rechenterme haben keinen Wahrheitswert.',example:'„London liegt in Frankreich“ ist eine falsche Aussage. „Setz dich!“ ist eine Aufforderung. „5 − 22“ ist nur ein Term. „17 > 3“ ist eine wahre Aussage.'},
 {id:'formula',name:'Formelwerkstatt',label:'Formeln & Klammern',icon:'blocks',color:'yellow',description:'Baue aus Worten kleine Logikwelten.',mechanic:'Bausteine legen · Vergleichen',lesson:'¬ heißt NICHT, ∧ heißt UND, ∨ heißt ODER (auch beide), ⊕ heißt ENTWEDER ODER (genau eines). Reihenfolge: Klammern → NICHT → UND → ODER. Atomare Aussagen positiv formulieren; Verneinungen gehören in die Formel.',example:'A: Dieb, B: geschickt, C: Tollpatsch → A ∧ B ∧ ¬C. „Entweder A oder B, aber nicht C“ → (A ⊕ B) ∧ ¬C. Im Blatt ist ⊕ als gepunktetes Oder geschrieben.'},
 {id:'truth',name:'Logiklabor',label:'Wahrheitstafeln',icon:'flask',color:'purple',description:'Bring Zeile für Zeile Licht ins Dunkel.',mechanic:'Wahr / falsch · Tabellen puzzeln',lesson:'Bei drei Aussagen gibt es 2³ = 8 Belegungen. Rechne erst die Teilformeln aus, dann die gesamte Formel. UND ist nur wahr, wenn beide wahr sind. ODER ist wahr, sobald mindestens eine wahr ist. XOR ist nur bei verschiedenen Werten wahr.',example:'Für A=w, B=w, C=f gilt: A⊕B=f, ¬C=w. Daher (A⊕B)∧¬C=f. Verwechsle ⊕ nicht mit ∨.'}
];
const QUESTIONS=[];
function add(q){ QUESTIONS.push({original:false,...q}); }
const field=(label,answer,format='number')=>({label,answer:String(answer),format});
const input=(id,topic,title,prompt,fields,hint,explanation,original=false)=>add({id,topic,kind:'input',title,prompt,fields,hint,explanation,original});
const choice=(id,topic,title,prompt,options,correct,hint,explanation,original=false)=>add({id,topic,kind:'choice',title,prompt,options,correct,hint,explanation,original});
const bits=(id,n,original=false)=>add({id,topic:'binary',kind:'bits',title:'Schalte die richtigen Lichtchen an',prompt:`Baue die Dezimalzahl ${n} als Binärzahl.`,target:n,width:8,hint:'Beginne links: Passt der Stellenwert noch in den Rest? Dann schalte ihn an.',explanation:`${n} = ${[128,64,32,16,8,4,2,1].filter(v=>n&v).join(' + ')}. Binär: ${n.toString(2).padStart(8,'0')}.`,original});
input('o1a','binary','Wie viele Bits braucht ASCII?','Der ASCII-Code umfasst 128 verschiedene Zeichen. Wie viele Bits brauchst du mindestens?',[field('Anzahl Bits',7)],'Mit b Bits gibt es 2ᵇ verschiedene Kombinationen.','2⁶ = 64 reicht nicht. 2⁷ = 128 reicht genau: Du brauchst 7 Bits.',true);
input('o1b','binary','Eine Nachricht aus Nullen und Einsen','Wandle 001000110111₂ in eine Dezimalzahl um.',[field('Dezimalzahl',567)],'Von rechts zählen die Stellen 1, 2, 4, 8, 16, 32 …','Die Einsen stehen bei 512, 32, 16, 4, 2 und 1. Ihre Summe ist 567. Führende Nullen ändern nichts.',true);
bits('o1c',219,true);
add({id:'o2a',topic:'hex',kind:'match',title:'Was steckt in dieser Farbe?',prompt:'Verbinde die Anteile von #D11BB0 mit ihren Dezimalwerten.',pairs:[['Rot · D1','209'],['Grün · 1B','27'],['Blau · B0','176']],swatch:'#D11BB0',hint:'Linke Ziffer × 16 + rechte Ziffer. D=13 und B=11.',explanation:'D1 = 13·16+1 = 209. 1B = 1·16+11 = 27. B0 = 11·16+0 = 176.',original:true});
input('o2b','hex','Wie hell kann ein Kanal werden?','Ein RGB-Farbkanal hat zwei Hex-Stellen. Wie groß ist sein maximaler Dezimalwert?',[field('Maximaler Wert',255)],'Die größte Hex-Ziffer ist F = 15. Rechne FF aus.','FF₁₆ = 15·16+15 = 255. Es gibt 256 mögliche Werte, weil die 0 mitzählt.',true);
choice('o2c','hex','Ein Klecks Magie','Welche Beschreibung passt zu #D11BB0 bei additiver Farbmischung?',['Magenta / Violett-Pink: viel Rot und Blau, wenig Grün','Grün: viel Grün, wenig Rot und Blau','Weiß: alle drei Kanäle auf 255','Gelb: viel Rot und Grün, kaum Blau'],0,'Die Kanalwerte sind Rot 209, Grün 27 und Blau 176.','Rot und Blau dominieren, Grün ist schwach. Die Mischung ist ein Magenta-/Violett-Pink-Ton. Die Musterlösung nennt ihn Magenta.',true);
input('o2d','hex','Vom Farbrezept zum Hex-Code','Wandle rgb(99, 240, 133) in einen sechsstelligen Hex-Farbcode um.',[field('Hex-Farbcode','#63F085','hex')],'Teile jeden Kanal durch 16. Quotient = erste Ziffer, Rest = zweite Ziffer.','99 = 6·16+3 → 63. 240 = 15·16+0 → F0. 133 = 8·16+5 → 85. Zusammen: #63F085.',true);
add({id:'o3',topic:'modulo',kind:'cycle',title:'Wer erscheint als Nächstes?',prompt:'Der Gegnerzähler steht auf 143. Welcher Gegnertyp wird gespawnt?',n:143,names:['Fallen','Goat Man','Goat Man Archer','Hidden'],correct:3,hint:'Der Zähler beginnt bei 0. Berechne 143 mod 4.',explanation:'143 = 35·4 + 3. Rest 3 gehört zu Hidden, dem vierten Gegnertyp.',original:true});
const categories=['Wahre Aussage','Falsche Aussage','Aufforderung / Frage','Nur ein Term'];
function sortQ(id,text,correct,explanation,original=false){add({id,topic:'statements',kind:'sort',title:'Post für die Logik',prompt:'Ziehe die Karte ins passende Fach. Oder tippe erst die Karte und dann das Fach an.',text,options:categories,correct,hint:'Kann dieser Satz einen Wahrheitswert haben? Wenn ja: Ist er wahr oder falsch?',explanation,original});}
sortQ('o4a','London liegt in Frankreich.',1,'Das ist eine Aussage mit dem Wahrheitswert falsch. London liegt im Vereinigten Königreich. Eine falsche Aussage ist trotzdem eine Aussage.',true);
sortQ('o4b','Setz dich!',2,'Eine Aufforderung hat keinen Wahrheitswert und ist deshalb keine mathematische Aussage.',true);
sortQ('o4c','5 − 22',3,'Das ist ein Rechenterm. Er hat den Wert −17, behauptet aber nichts, das wahr oder falsch sein könnte.',true);
sortQ('o4d','17 > 3',0,'Die Behauptung hat den Wahrheitswert wahr. Deshalb ist sie eine mathematische Aussage.',true);
function formulaQ(id,prompt,legend,answer,original=false){add({id,topic:'formula',kind:'formula',title:'Bau dir eine Formel',prompt,legend,answer,hint:'Alle Buchstaben stehen für positiv formulierte Aussagen. Benutze ¬ für eine Verneinung. Klammern helfen beim Zusammenfassen.',explanation:`Eine passende Formel ist ${answer}. ${answer.includes('⊕')?'⊕ bedeutet: genau eine der beiden Aussagen ist wahr.':'∧ verlangt, dass beide Seiten wahr sind.'} Gleichbedeutende Formeln werden ebenfalls akzeptiert.`,original});}
formulaQ('o5a','Der Charakter ist Dieb, hat eine hohe Geschicklichkeit und nicht den Nachteil „Tollpatsch“.',['A: Der Charakter ist Dieb.','B: Der Charakter hat hohe Geschicklichkeit.','C: Der Charakter hat den Nachteil Tollpatsch.'],'A ∧ B ∧ ¬C',true);
formulaQ('o5b','Es gibt entweder Rotwein oder Weißwein, aber kein Bier.',['A: Es gibt Rotwein.','B: Es gibt Weißwein.','C: Es gibt Bier.'],'(A ⊕ B) ∧ ¬C',true);
function eqQ(id,left,right,equal,reason,original=false){add({id,topic:'formula',kind:'equiv',title:'Gleiche Bedeutung?',prompt:'Vergleiche die Formeln und wähle auch die passende Begründung.',left,right,equal,reasons:['Gleich: UND wird vor ODER ausgewertet.','Verschieden: ¬ gilt links nur für A, rechts für die ganze Klammer.','Verschieden: Die Klammer erzwingt ODER vor UND.','Gleich: Nach der De-Morgan-Regel.'],reason,hint:'Erst Klammern, dann NICHT, dann UND, dann ODER. Ein einziges Gegenbeispiel widerlegt Gleichwertigkeit.',explanation:reason===0?'UND bindet stärker als ODER. Beide Formeln werten zuerst A∧B und C∧D aus.':reason===1?'Gegenbeispiel A=f, B=w: ¬A∨B ist w; ¬(A∨B) ist f. Die Formeln sind nicht gleichwertig.':reason===2?'Gegenbeispiel A=w, B=f, C=f: A∨(B∧C) ist w; (A∨B)∧C ist f.':'Nach De Morgan ist die Verneinung von UND gleich einem ODER der beiden Verneinungen.',original});}
eqQ('o6a','¬A ∨ B','¬(A ∨ B)',false,1,true);
eqQ('o6b','A ∧ B ∨ C ∧ D','(A ∧ B) ∨ (C ∧ D)',true,0,true);
eqQ('o6c','A ∨ B ∧ C','(A ∨ B) ∧ C',false,2,true);
const rows=Array.from({length:8},(_,i)=>({A:!!(i&4),B:!!(i&2),C:!!(i&1)}));
function tableQ(id,cols,original=false){add({id,topic:'truth',kind:'table',title:'Licht an im Logiklabor',prompt:'Fülle die Zwischenschritte und das Ergebnis aus. Antippen wechselt zwischen wahr und falsch.',cols,rows,formula:cols.at(-1),hint:'Gehe eine Zeile nach der anderen vor. ¬ kehrt um, ∧ braucht zweimal wahr, ⊕ braucht verschiedene Werte.',explanation:`Arbeite von links nach rechts. Ergebnis für ${cols.at(-1)}: ${rows.map(r=>evaluateFormula(cols.at(-1),r)?'w':'f').join(', ')}.`,original});}
tableQ('o7a',['A ∧ B','¬A','¬A ∧ C','(A ∧ B) ∨ (¬A ∧ C)'],true);
tableQ('o7b',['A ⊕ B','¬C','(A ⊕ B) ∧ ¬C'],true);

// Stabile Zusatzaufgaben-IDs ermöglichen gezieltes Wiederholen und zuverlässigen Import.
for(const n of [5,9,18,27,42,65,85,127,128,150,173,200,231,255]) bits('b'+n,n);
for(const n of [13,26,47,73,90,129,170,204,341,682,1023]) input('d'+n,'binary','Die Lichtchen lesen',`Wandle ${n.toString(2).padStart(n>255?12:8,'0')}₂ ins Dezimalsystem um.`,[field('Dezimalzahl',n)],'Addiere die Stellenwerte der Einsen.',`Die eingeschalteten Stellen ergeben ${n}.`);
for(const n of [8,16,26,64,129,256,500,1024]) input('ascii'+n,'binary','Platz für Zeichen',`Ein Code soll ${n} verschiedene Zeichen darstellen. Wie viele Bits brauchst du mindestens?`,[field('Anzahl Bits',Math.ceil(Math.log2(n)))],'Suche die kleinste Zweierpotenz, die mindestens so groß wie die Zeichenzahl ist.',`${Math.ceil(Math.log2(n))} Bits bieten ${2**Math.ceil(Math.log2(n))} Kombinationen. Ein Bit weniger reicht nicht.`);
for(const [i,rgb] of [[99,240,133],[184,215,192],[240,180,200],[160,192,224],[255,128,0],[16,32,64],[202,254,186],[0,255,170]].entries()){
 const hex='#'+rgb.map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase();
 input('rgb'+i,'hex','Ein neues Farbrezept',`Wandle rgb(${rgb.join(', ')}) in Hex um.`,[field('Hex-Farbcode',hex,'hex')],'Pro Kanal: Zahl durch 16 teilen und Quotient sowie Rest als Hex-Ziffer schreiben.',rgb.map((x,j)=>`${x} = ${Math.floor(x/16)}·16+${x%16} → ${hex.slice(1+j*2,3+j*2)}`).join('. ')+'. Zusammen: '+hex+'.');
 add({id:'hex'+i,topic:'hex',kind:'match',title:'Farbtöpfe verbinden',prompt:`Verbinde die Hex-Anteile von ${hex} mit ihren Dezimalwerten.`,pairs:rgb.map((x,j)=>[`${['Rot','Grün','Blau'][j]} · ${hex.slice(1+j*2,3+j*2)}`,String(x)]),swatch:hex,hint:'Jedes Hex-Paar bedeutet: linke Ziffer × 16 + rechte Ziffer.',explanation:`${hex} entspricht rgb(${rgb.join(', ')}).`});
}
choice('colorwhite','hex','Licht mischen','Was ergibt rgb(255, 255, 255) bei additiver Farbmischung?',['Weiß','Schwarz','Magenta','Gelb'],0,'Alle Lichtkanäle leuchten maximal.','Alle drei Lichtfarben zusammen auf voller Intensität ergeben Weiß.');
choice('colorblack','hex','Licht aus','Welche Farbe ist #000000?',['Weiß','Schwarz','Rot','Blau'],1,'Kein Kanal strahlt Licht ab.','Alle RGB-Kanäle stehen auf 0. Die Farbe ist Schwarz.');
for(const [i,n] of [14,23,36,57,81,100,142,144,199,257].entries()){
 const k=i%2?4:5,names=k===4?['Frosch','Seerose','Libelle','Ente']:['Frosch','Seerose','Libelle','Ente','Schnecke'];
 add({id:'cycle'+n,topic:'modulo',kind:'cycle',title:'Besuch am Teich',prompt:`Der Zähler steht auf ${n}. Wer ist an der Reihe? Der Zyklus beginnt bei 0.`,n,names,correct:n%k,hint:`Berechne ${n} mod ${k}. Der Rest ist die Platznummer.`,explanation:`${n} = ${Math.floor(n/k)}·${k}+${n%k}. Rest ${n%k} → ${names[n%k]}.`});
}
for(const [n,k] of [[17,5],[25,6],[40,8],[99,7],[143,4],[128,3]]) input('mod'+n,'modulo','Was bleibt übrig?',`Berechne ${n} mod ${k}.`,[field('Rest',n%k)],'Finde das größte Vielfache des Teilers, das noch hineinpasst.',`${n} = ${Math.floor(n/k)}·${k}+${n%k}. Der Rest ist ${n%k}.`);
[['8 ist eine gerade Zahl.',0,'8 ist durch 2 teilbar. Die Behauptung ist wahr.'],['9 < 4',1,'9 ist nicht kleiner als 4. Die Behauptung ist falsch, bleibt aber eine Aussage.'],['Mach das Licht an!',2,'Eine Aufforderung hat keinen Wahrheitswert.'],['12 · 4',3,'Ein Term hat einen Zahlenwert, aber keinen Wahrheitswert.'],['Wie spät ist es?',2,'Eine Frage ist keine Behauptung und hat keinen Wahrheitswert.'],['2 + 3 = 5',0,'Die Gleichung ist wahr und deshalb eine wahre Aussage.'],['7 ist durch 2 teilbar.',1,'Die Behauptung ist falsch, aber eindeutig beurteilbar.'],['(8 + 2) : 5',3,'Ein Rechenterm ohne Behauptung.'],['0 = 1',1,'Eine falsche Gleichung ist eine falsche Aussage.'],['Jede Binärziffer ist 0 oder 1.',0,'Das ist eine wahre, eindeutig beurteilbare Behauptung.']].forEach((v,i)=>sortQ('sort'+i,...v));
formulaQ('form1','Du hast einen Schlüssel und die Tür ist nicht verriegelt.',['A: Du hast einen Schlüssel.','B: Die Tür ist verriegelt.'],'A ∧ ¬B');
formulaQ('form2','Du wählst entweder Tee oder Kakao, aber keine Limonade.',['A: Du wählst Tee.','B: Du wählst Kakao.','C: Du wählst Limonade.'],'(A ⊕ B) ∧ ¬C');
formulaQ('form3','Die Lampe leuchtet, wenn A und B gemeinsam wahr sind oder C wahr ist. Baue nur diese Bedingung.',['A: Schalter A ist an.','B: Schalter B ist an.','C: Schalter C ist an.'],'(A ∧ B) ∨ C');
formulaQ('form4','Du hast eine Karte oder einen Kompass (auch beides ist erlaubt), und es regnet nicht.',['A: Du hast eine Karte.','B: Du hast einen Kompass.','C: Es regnet.'],'(A ∨ B) ∧ ¬C');
formulaQ('form5','Weder A noch B ist wahr.',['A: Die rote Lampe leuchtet.','B: Die blaue Lampe leuchtet.'],'¬A ∧ ¬B');
eqQ('eqdemorgan','¬(A ∧ B)','¬A ∨ ¬B',true,3);
choice('positive','formula','Positiv formulieren','Du sollst „nicht tollpatschig“ ausdrücken. Welche Definition und Formel sind sauber?',['C: hat den Nachteil Tollpatsch. Formel: ¬C','C: ist nicht tollpatschig. Formel: ¬C','C: hat den Nachteil Tollpatsch. Formel: C'],0,'Definiere C ohne Verneinung. Setze das NICHT erst in die Formel.','C wird positiv definiert. ¬C verneint dann, dass der Nachteil vorhanden ist.');
tableQ('table1',['A ∨ B','¬C','(A ∨ B) ∧ ¬C']);
tableQ('table2',['¬A','B ∧ C','¬A ∨ (B ∧ C)']);
tableQ('table3',['A ∧ B','¬(A ∧ B)']);
for(let i=0;i<8;i++){
 const r=rows[i];
 choice('xor'+i,'truth','XOR unter der Lupe',`A=${r.A?'w':'f'}, B=${r.B?'w':'f'}, C=${r.C?'w':'f'}. Welchen Wert hat (A ⊕ B) ∧ ¬C?`,['wahr','falsch'],evaluateFormula('(A ⊕ B) ∧ ¬C',r)?0:1,'XOR ist nur bei verschiedenen Wahrheitswerten wahr. Danach mit ¬C verknüpfen.',`A⊕B = ${r.A!==r.B?'w':'f'}, ¬C = ${!r.C?'w':'f'}. Ergebnis: ${evaluateFormula('(A ⊕ B) ∧ ¬C',r)?'wahr':'falsch'}.`);
}

// Kleiner Parser statt eval: ausschließlich die zugelassenen Logikzeichen.
function evaluateFormula(source,env){
 const s=source.replace(/\s/g,''); let p=0;
 function atom(){if(s[p]==='¬'){p++;return !atom();} if(s[p]==='('){p++;const v=or();if(s[p++]!==')')throw Error('Klammer fehlt');return v;} const c=s[p++];if(!'ABCD'.includes(c||'!'))throw Error('Baustein erwartet');return !!env[c];}
 function and(){let v=atom();while(s[p]==='∧'){p++;const b=atom();v=v&&b;}return v;}
 function xor(){let v=and();while(s[p]==='⊕'){p++;v=v!==and();}return v;}
 function or(){let v=xor();while(s[p]==='∨'){p++;const b=xor();v=v||b;}return v;}
 const out=or();if(p!==s.length)throw Error('Unvollständige Formel');return out;
}
function equivalent(a,b){try{for(let i=0;i<16;i++){const r={A:!!(i&8),B:!!(i&4),C:!!(i&2),D:!!(i&1)};if(evaluateFormula(a,r)!==evaluateFormula(b,r))return false;}return true;}catch{return false;}}
function normalizeAnswer(s,type){s=String(s).trim().replace(/\s/g,'');if(type==='hex')return s.replace(/^#/,'').toUpperCase();if(type==='number')return /^\d+$/.test(s)?String(Number(s)):s;return s;}
function checkAnswer(q,a){
 if(q.kind==='input')return q.fields.every((f,i)=>normalizeAnswer(a[i]??'',f.format)===normalizeAnswer(f.answer,f.format));
 if(q.kind==='bits')return a===q.target;
 if(['choice','sort','cycle'].includes(q.kind))return a===q.correct;
 if(q.kind==='match')return q.pairs.every((_,i)=>a[i]===i);
 if(q.kind==='formula')return equivalent(a,q.answer);
 if(q.kind==='equiv')return a.equal===q.equal&&a.reason===q.reason;
 if(q.kind==='table')return q.rows.every((r,i)=>q.cols.every((c,j)=>a[i]?.[j]===evaluateFormula(c,r)));
 return false;
}
if(typeof module!=='undefined')module.exports={TOPICS,QUESTIONS,evaluateFormula,equivalent,checkAnswer,normalizeAnswer};
