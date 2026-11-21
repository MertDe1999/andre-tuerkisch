/* A small scenic atlas. The location, lighting and props belong to the course
   level, so coming back to a saved encounter also brings back its scenery. */
(function(root){
  'use strict';
  const motifs={
    willow:'<path d="M27 12v49" stroke-width="4"/><path d="M4 39Q1 10 25 3q25-3 28 36l-7-9-3 13-8-16-5 12-6-17-7 16-3-10Z"/>',
    bench:'<path d="M4 31h46v8H4zM3 43h49v5H3zm5 5v10m39-10v10" stroke-width="3"/>',
    bridge:'<path d="M0 31h55v24h-7a9 9 0 0 0-18 0h-6a9 9 0 0 0-18 0H0z"/><path d="M0 24h55M4 24v7m12-7v7m13-7v7m13-7v7m10-7v7" fill="none" stroke-width="2"/>',
    tower:'<path d="M26 0h2l2 19 5 15-2 3 12 22H31q-4-17-8 0H10l12-22-3-3 5-15z"/><path d="M17 42h21M21 29h12" fill="none" stroke-width="2"/>',
    awning:'<path d="M5 26h45l5 12H0zM5 40v17h43V40" stroke-width="2"/><path d="M9 26 6 38m15-12-1 12m14-12 2 12m9-12 4 12" stroke="var(--stage-light)" stroke-width="3"/>',
    cup:'<path d="M9 37h31v8q-1 12-16 12T9 45zM40 39h5q10 5-5 12M4 59h46"/><path d="M19 31q-6-5 0-11m10 10q5-6 0-12" fill="none" stroke-width="2"/>',
    cabinet:'<path d="M12 7h32l2 19-7 8 7 10-2 15H8l2-15 5-9-6-6Z"/><path d="M17 14h20v13H17z" fill="var(--stage-light)"/><path d="M14 41h24" stroke="var(--stage-light)" stroke-width="2"/>',
    flags:'<path d="M0 12q25 12 54 0" fill="none" stroke-width="2"/><path d="m6 15 7 2-3 9zm18 4h8l-4 10zm18-3 9-3-3 11z"/>',
    chalkboard:'<path d="M0 13h54v34H0zM8 47v11m38-11v11" stroke-width="3"/><path d="m8 36 7-15 9 15zm23-12h12m-12 9h9" fill="none" stroke="var(--stage-light)" stroke-width="2"/>',
    books:'<path d="M4 37h8v20H4zm11-6h9v26h-9zm13 4 8-2 7 22-8 2zM1 59h48"/>',
    pine:'<path d="M27 1 12 24h6L5 41h9L7 50h18v10h4V50h19l-8-9h10L37 24h5z"/>',
    stall:'<path d="M0 33 27 14l27 19-5 4H6zM7 40h39v17H7z"/><path d="M12 37v10h28V37" fill="var(--stage-light)"/>',
    rail:'<path d="M3 57V12l36-8 5 5-35 8v40zM8 23h41" /><path d="M35 21v8m-5 0h12v10H30z" stroke-width="2"/>',
    plant:'<path d="M20 47h19l-3 12H23zM29 48V20q-15-16-17-5-1 9 17 14 4-22 17-21 4 14-16 22-8-1-13-7" stroke-width="2"/>',
    shelf:'<path d="M2 20h49v3H2zm0 18h49v3H2zM5 57V19m42 38V19" stroke-width="2"/><path d="M9 11h7v8H9zm12 2h10v6H21zm14-5h7v11h-7zM9 29h8v8H9zm14-4h5v12h-5zm12 3h7v9h-7z"/>',
    lane:'<path d="M0 45h55m-55 9h55" stroke-width="2" stroke-dasharray="6 3"/><path d="M21 44V21q0-7 5-7m8 30V21q0-7 5-7m-18 12h13m-13 7h13" fill="none" stroke-width="3"/>',
    weight:'<path d="M7 29h7v17H7zm8-5h7v27h-7zm7 11h12v5H22zm12-11h7v27h-7zm8 5h7v17h-7z"/>',
    lamp:'<path d="M25 59V17h3v42zM17 17 20 5h14l5 12z"/><path d="M21 9h12v5H21z" fill="var(--stage-light)"/>',
    sofa:'<path d="M6 34q0-10 10-10h24q10 0 10 10v5H6zm-4 3q4-5 10 1v6h32v-6q6-6 10 0v16H2zM7 54v5m42-5v5" stroke-width="2"/>',
    pot:'<path d="M10 38h36v9q0 9-9 9H19q-9 0-9-9zm-7 2h8m33 0h8M8 35q18-15 39 0zM25 26v-4h6v4" stroke-width="3"/>'
  };
  const places=[
    ['Am Aasee','water','willow','bridge','bench'],
    ['Koop-Arcade','room','cabinet','flags','cabinet'],
    ['Pariser Bäckerei','street','awning','cup','awning'],
    ['Mit Ben im Park','park','willow','bench','pine'],
    ['Im Schwimmbad','water','lane','flags','lane'],
    ['Bei ÁRO in Münster','room','plant','cup','shelf'],
    ['Andrés Klassenzimmer','room','books','chalkboard','plant'],
    ['An der Seine','water','bridge','tower','lamp'],
    ['Im Fitnessstudio','room','weight','shelf','weight'],
    ['Am Bahnsteig','street','rail','bench','rail'],
    ['Beim Burger-Date','room','plant','awning','sofa'],
    ['Einkauf am Wochenende','street','shelf','awning','shelf'],
    ['Münsters Weihnachtsmarkt','park','stall','pine','stall'],
    ['Küche bei Mama','room','shelf','pot','plant'],
    ['Auf dem Serien-Sofa','room','lamp','sofa','books'],
    ['Am Stadthafen','water','rail','bridge','lamp']
  ];
  const lights=['#f2ba9e','#98cbc6','#adc5ee','#e3b4ca','#eac485','#9fbace','#93c7a3','#b6aedc','#e4a99f','#8baaca'];
  const horizons={
    water:'<path d="M0 69q47-15 92-5t91 1 96-4 81 3v27H0z"/><path d="M0 78q68-4 124 0t117 0 119 0" fill="none" stroke="var(--stage-light)" stroke-width="2"/>',
    park:'<path d="M0 68q47-34 102-12t102 4 94-13 62 12v35H0z"/>',
    room:'<path d="M32 15h63v39H32zm121 0h63v39h-63zm121 0h57v39h-57z" fill="var(--stage-light)"/><path d="M63 15v39m122-39v39m119-39v39M0 69h360" fill="none" stroke="currentColor" stroke-width="2"/>',
    street:'<path d="M0 68V45h29V31h25v24h23V37h33v19h42V29h19v20h38V35h28v14h36V24h18v25h33V33h20v24h16v30H0z"/>'
  };
  function forLevel(level){
    const n=Math.max(0,Math.min(159,(Math.trunc(level)||1)-1)), visit=Math.floor(n/places.length);
    const [name,setting,...props]=places[n%places.length];
    const phase=(visit+n%places.length)%lights.length;
    const offsets=[22+(visit*7)%29,145+(visit*11)%36,276+(visit*5)%23];
    const propsSvg=props.map((prop,i)=>{
      const x=offsets[i], y=15+(visit+i*3)%8;
      return '<g transform="translate('+x+' '+y+')" opacity="'+(i===1?'.72':'.9')+'">'+motifs[prop]+'</g>';
    }).join('');
    const ambience=setting==='room'?'<path d="M0 4q90 18 180 0t180 0" fill="none" stroke="currentColor"/>'+
      [0,1,2,3,4].map(i=>'<circle cx="'+(26+i*70+visit)+'" cy="'+(9+i%2*3)+'" r="2.3"/>').join(''):
      '<circle cx="'+(48+phase*27)+'" cy="'+(17+phase%3*3)+'" r="8"/><path d="M220 25q8-7 12-1 6-9 13-3" fill="none" stroke="currentColor" stroke-width="2"/>';
    const svg='<svg viewBox="0 0 360 96" preserveAspectRatio="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">'+
      '<g fill="var(--stage-far)">'+horizons[setting]+'</g><g class="duel-glimmer" color="var(--stage-light)" fill="currentColor">'+ambience+'</g>'+
      '<g fill="var(--stage-prop)" stroke="var(--stage-prop)" stroke-linecap="round" stroke-linejoin="round">'+propsSvg+'</g>'+
      '<path d="M0 85Q90 80 180 85t180 0v11H0z" fill="var(--stage-ground)"/><path d="M0 86q94-5 180 0t180 0" fill="none" stroke="var(--stage-light)" opacity=".55"/></svg>';
    return {name,tint:lights[phase],svg};
  }
  root.AndreDuelStages={forLevel};
})(typeof globalThis==='object'?globalThis:this);
