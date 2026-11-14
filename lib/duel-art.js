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
    <g stroke="#343238" stroke-width="2.3" stroke-linejoin="round" stroke-linecap="round">
      <path class="duel-tail" d="M87 94q25-6 17-23" stroke="#565359" stroke-width="11"/>
      <path d="M31 81q5-15 30-14 30 0 32 25l-3 7 2 4-4 14H74l-2-16H49l-2 16H31l-2-19 3-5-3-4Z" fill="#454247"/>
      <path d="m46 85 12-5 13 5-3 12-6-3-5 6-5-6-7 2Z" fill="#b69b7e" stroke="none"/>
      <path d="M32 111h15v7H31Zm42 0h14v7H74Z" fill="#c6aa8d"/>
      <path d="M33 35Q13 30 9 52l-1 17 5-3-1 9 6-3 2 7q11-2 17-20m45-24q20-5 25 17l2 18-5-3 1 10-6-4-2 7q-10-3-16-21" fill="#343237"/>
      <path d="M18 47q-6 13-2 20m84-19q5 11 2 19" stroke="#656168"/>
      <path d="M28 45q-1-13 12-17l-2-5 10 2 4-7 7 6 9-6 2 7 11-1-3 6q13 4 12 19l3 10-4 3 3 10-5-1q-2 18-28 20-26-1-31-18l-5-2 4-9-3-5Z" fill="#555258" stroke="#777078"/>
      <path d="m43 31 5 6m8-9 2 9m9-8-3 8m13-3-5 7M31 60l5-3m46 2 5 3" stroke="#8b8285" stroke-width="2"/>
      <path d="M33 46q5-9 13-5l2 7q-7-4-15 1Zm35-4q8-5 15 4l-1 3q-8-5-15-1Z" fill="#c5a17a" stroke="none"/>
      <g class="duel-eyes">
        <ellipse cx="41" cy="55" rx="7" ry="8" fill="#29272d"/><ellipse cx="75" cy="55" rx="7" ry="8" fill="#29272d"/>
        <ellipse cx="42" cy="56" rx="4.8" ry="5.5" fill="#8c6150" stroke="none"/><ellipse cx="74" cy="56" rx="4.8" ry="5.5" fill="#8c6150" stroke="none"/>
        <ellipse cx="42" cy="55" rx="3" ry="4" fill="#231f23" stroke="none"/><ellipse cx="74" cy="55" rx="3" ry="4" fill="#231f23" stroke="none"/>
        <circle cx="44" cy="52" r="1.8" fill="#fff6ee" stroke="none"/><circle cx="76" cy="52" r="1.8" fill="#fff6ee" stroke="none"/>
      </g>
      <path d="M49 63q9-7 18 0l12 4 7 10-5 1 1 7-7-1-3 7-8-2-6 5-6-5-8 2-4-6-7 1 1-7-6-2 8-11Z" fill="#cdb697" stroke="#ab947e" stroke-width="1.8"/>
      <path d="m49 61 5-7 4 4 5-5 5 10-6 7h-9Z" fill="#9e9591" stroke="none"/>
      <path d="M49 66q9-5 18 0l-2 7q-7 5-14 0Z" fill="#25242a" stroke="#25242a"/>
      <path d="m53 66 5-1" stroke="#777176" stroke-width="2"/>
      <path d="M58 75v5m-7 2q7-4 14 0" stroke="#5c4d48" stroke-width="1.8"/>
      <path d="m37 74 5 2m-5 4 5 1m32-7-5 2m6 5-5 1m-16 5 3 2m7-2-3 3" stroke="#e1ccb0" stroke-width="1.7"/>
      <path d="M36 91q22 10 43 0" stroke="#69464f" stroke-width="4"/>
      <circle cx="59" cy="97" r="4.5" fill="#a96a76" stroke="#dcc4bc" stroke-width="1.6"/>
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
