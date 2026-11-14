/* Original small vector characters; scalable, no remote assets. */
(function(root){
  'use strict';
  const wrap=body=>'<svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">'+body+'</svg>';
  const andre=wrap(`
    <ellipse cx="61" cy="123" rx="31" ry="5" fill="#352b4020"/>
    <g stroke="#544152" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M47 92 43 117h14l5-22 5 22h14L74 91" fill="#555273"/>
      <path d="M43 114h14v8H38q-2-5 5-8Zm24 0h14l5 8H67Z" fill="#f9f1e9"/>
      <path d="m43 64-9 25q-2 8 4 9 4 0 5-5l6-16M76 64l10 16 8-4q6-2 7 3 1 4-4 6l-12 6q-4 1-7-5l-5-10" fill="#edbd99"/>
      <path d="M47 59h25l7 33q-16 8-35 0Z" fill="#b7a6e4"/>
      <path d="M51 60q9 14 18 0M49 60l-3 13m26-13 4 13" stroke="#f0e4ff" stroke-width="4"/>
      <path d="M54 49v12q7 9 13 0V48" fill="#edbd99"/>
      <circle cx="39" cy="38" r="5" fill="#edbd99"/><circle cx="81" cy="38" r="5" fill="#edbd99"/>
      <path d="M40 29q0-20 20-20t20 20v15q-3 15-20 15T40 44Z" fill="#f2c7a7"/>
      <path d="M43 31q-10 0-9-10-5-9 4-14 3-8 11-5 7-7 14-2 11-4 16 5 10 2 8 12 6 10-6 15l-3-10q-8 3-12-4-8 8-13 1-2 9-10 7Z" fill="#695043"/>
      <path d="M43 12q-6 5 0 9m10-15q-6 4-2 8m12-9q-5 4-1 8m11-3q-4 4 1 8" stroke="#8b6b53"/>
      <g class="duel-eyes"><ellipse cx="51" cy="37" rx="3.7" ry="4.6" fill="#77a570"/><ellipse cx="70" cy="37" rx="3.7" ry="4.6" fill="#77a570"/><path d="M51 36v2m19-2v2" stroke="#3d463b"/></g>
      <path d="M56 48q5 5 10-1" stroke="#9c665d"/>
      <path d="M44 45h3m28 0h3" stroke="#e89a91" stroke-width="3"/>
    </g>`);
  const ben=wrap(`
    <ellipse cx="60" cy="120" rx="38" ry="6" fill="#352b4020"/>
    <g stroke="#67534a" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
      <path class="duel-tail" d="M87 94q28-8 16-27" stroke="#aa7b58" stroke-width="12"/>
      <path d="M32 81q3-15 30-14 32 0 31 27l-4 22H76l-2-15H49l-1 15H32Z" fill="#c59a72"/>
      <path d="M45 84q10-8 22 0v19H46Z" fill="#f7e3c8" stroke="none"/>
      <path d="M32 41q-22 0-22 26 1 14 12 10l14-19m43-17q22-5 25 20 3 15-9 15L80 59" fill="#9a6c4c"/>
      <path d="M29 49q0-24 28-24 30 0 32 28l-3 21q-4 17-29 17-24 0-29-18Z" fill="#c59a72"/>
      <path d="M51 28h12l5 39H48Z" fill="#f7e3c8" stroke="none"/>
      <g class="duel-eyes" fill="#4a3b35"><ellipse cx="41" cy="56" rx="3" ry="4"/><ellipse cx="76" cy="56" rx="3" ry="4"/></g>
      <ellipse cx="58" cy="70" rx="19" ry="12" fill="#f7e3c8"/>
      <path d="M51 64q7-5 14 0l-6 7Z" fill="#4a3b35"/><path d="M58 71v4m-7 0q7 7 14-1"/>
      <path d="M56 79h8v7q-4 6-8 0Z" fill="#e7a3a3"/>
      <path d="M34 88q24 12 46 0" stroke="#a999d8" stroke-width="5"/>
      <circle cx="59" cy="94" r="5" fill="#f0d68d"/>
    </g>`);
  const faces='<g class="duel-eyes" fill="#514150"><ellipse cx="46" cy="62" rx="3" ry="5"/><ellipse cx="75" cy="62" rx="3" ry="5"/></g><path d="M55 77q7 6 12-1" stroke="#514150" stroke-width="2.6" stroke-linecap="round"/><path d="M35 73h5m41 0h5" stroke="#eaa4ae" stroke-width="4" stroke-linecap="round"/>';
  function enemy(shape){
    const bodies={
      blob:'<path d="M26 106q-16-11-10-32 4-12 9-17-4-31 26-38 32-10 43 19 5 15 11 29 12 25-5 38-9 10-24 1-20 13-33 0-10 10-17 0Z"/><path d="M53 24q-9-19 7-20 4 9-1 18m1-7q17-17 25-4-8 14-24 13" fill="var(--verb-dark)" stroke="none"/>',
      pudding:'<path d="m31 39-13 60q-2 15 40 16 42 0 44-15L88 39Z"/><ellipse cx="59" cy="37" rx="29" ry="10" fill="var(--noun-dark)"/><path d="M34 39q7 1 8 14 5 8 10-2l3-8q9 13 15 1" fill="var(--noun-dark)" stroke="none"/><path d="M49 27q-2-12 13-17 18 11 8 19" fill="#fff4db"/>',
      ink:'<path d="M22 90Q4 75 21 62L49 19q13-16 25 1l26 44q18 18-2 29l-4 14-15-4-7 12-15-9-15 8-8-13-16 2Z"/><path d="m53 28 9-10" stroke="#fff9" stroke-width="5"/>',
      ghost:'<path d="M23 60q0-40 37-40 37 0 37 40l6 49-18-7-13 13-13-9-17 9-8-14-17 8Z"/><path d="M38 34q12-10 21-9" stroke="#fff9" stroke-width="5"/>'
    };
    return wrap('<ellipse cx="60" cy="120" rx="40" ry="6" fill="#352b4020"/><g fill="var(--duel-enemy)" stroke="var(--duel-outline)" stroke-width="2.5" stroke-linejoin="round">'+(bodies[shape]||bodies.blob)+'</g>'+faces);
  }
  root.AndreDuelArt={andre,ben,enemy};
})(window);
