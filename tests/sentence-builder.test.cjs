const {test} = require('node:test');
const assert = require('node:assert/strict');
const {app} = require('./helpers/app.cjs');

const example = {
  de:'Du siehst den Penis im Auto.',
  answer:['sen','arabada','yarağı','görüyon'],
  requires:['sen','araba','yarak','görmek'],
  caseBuilds:[{base:'araba',result:'arabada',suffix:'da'}, {base:'yarak',result:'yarağı',suffix:'ı',soften:true}],
  verbBuilds:[{base:'görmek',result:'görüyon',ending:'iyon'}], difficulty:4
};

function pieces(challenge){
  return challenge.answer.map(word => {
    const noun = challenge.caseBuilds?.find(build => build.result.replace(/[.]+$/,'') === word.replace(/[.]+$/,''));
    const verb = challenge.verbBuilds?.find(build => build.result.replace(/[.]+$/,'') === word.replace(/[.]+$/,''));
    return {tokenKind:'word',word, ...(noun ? {wordType:'noun',baseWord:noun.base,appliedSuffix:noun.suffix} : {}),
      ...(verb ? {wordType:'verb',baseVerb:verb.base,appliedVerbEnding:verb.ending} : {})};
  });
}

function verdict(instance, challenge, answer){
  return instance.json('evaluateSentence(' + JSON.stringify(challenge) + ',' + JSON.stringify(answer) + ')');
}

function setChallenge(instance, challenge){
  instance.run('sentenceLearning = emptySentenceLearning(); sentenceGameRunning = true; sentenceOrder = [' +
    JSON.stringify(challenge) + ']; sentenceRoundIndex = 0; sentenceAttempts = 0; renderSentenceChallenge();');
}

function solveInDom(instance, challenge){
  // Choose actual bank tokens and apply cards through the real builder functions.
  instance.run('for(const word of sentenceOrder[0].answer){' +
    'const caseBuild = sentenceOrder[0].caseBuilds?.find(b => normalizeSentencePiece(b.result) === normalizeSentencePiece(word));' +
    'const verbBuild = sentenceOrder[0].verbBuilds?.find(b => normalizeSentencePiece(b.result) === normalizeSentencePiece(word));' +
    'const base = caseBuild?.base || verbBuild?.base || normalizeSentencePiece(word);' +
    'const token = document.getElementById("wordBank").children.find(t => t.dataset.tokenKind === "word" && normalizeSentencePiece(t.dataset.word) === base);' +
    'document.getElementById("answerZone").appendChild(token);' +
    'if(caseBuild){const card = document.getElementById("wordBank").children.find(t => t.dataset.suffix === getCaseBuildSuffix(caseBuild));applySentenceCase(token,card);}' +
    'if(verbBuild){const card = document.getElementById("wordBank").children.find(t => t.dataset.ending === verbBuild.ending);applyVerbEnding(token,card);}' +
    '}');
}

test('locked vocabulary never enters tasks or distractors; empty and sparse dictionaries work', () => {
  const a = app();
  assert.equal(a.run('getAvailableSentenceChallenges().length'), 0);
  a.run('startSentenceGame()');
  assert.equal(a.el('sentenceGameActive').style.display, 'none');
  a.unlock(['ev','güzel']);
  const challenges = a.json('getAvailableSentenceChallenges()');
  assert.ok(challenges.length);
  for(const challenge of challenges){
    const descriptors = a.json('getSentenceTokenDescriptors(' + JSON.stringify(challenge) + ')');
    assert.ok(descriptors.every(item => item.kind !== 'word' || ['ev','güzel','güzelim','güzelsin'].includes(item.word)));
  }
});

test('generated tasks cover every person, all four verbs, and the requested multi-case example', () => {
  const a = app();a.unlock();
  const all = a.json('getAvailableSentenceChallenges()');
  assert.ok(all.some(item => item.de === example.de));
  for(const verb of ['gelmek','gitmek','görmek','sevmek']){
    for(const person of ['ben','sen','o','biz']){
      assert.ok(all.some(item => item.verbBuilds?.some(build => build.base === verb) && item.answer.includes(person)), verb + ':' + person);
    }
  }
  assert.ok(all.some(item => item.difficulty === 5 && item.requires.includes('güzel')));
  for(const challenge of all){
    const answer = pieces(challenge).reverse();
    assert.equal(verdict(a,challenge,answer).correct, true, challenge.de);
    if(challenge.verbBuilds?.length){
      assert.equal(verdict(a,challenge,answer.filter(piece => !['ben','sen','o','biz'].includes(piece.word.toLowerCase()))).correct, true, challenge.de);
    }
  }
});

test('distractors retain word types and never use greeting/polite cards for content words', () => {
  const a = app();a.unlock();
  for(let i = 0; i < 100; i++){
    const options = a.json('getSentenceTokenDescriptors(' + JSON.stringify(example) + ')');
    const words = options.filter(item => item.kind === 'word').map(item => item.word);
    assert.equal(words.filter(word => /mek$/.test(word)).length, 3);
    assert.ok(words.filter(word => ['ben','sen','o','biz'].includes(word)).length >= 3);
    assert.ok(words.filter(word => ['ev','yol','ağaç','anne','baba','abi','abla'].includes(word)).length >= 2);
    assert.ok(!words.some(word => ['merhaba','güle güle','lütfen','efendim','yo','ve'].includes(word)));
    assert.equal(new Set(words).size, words.length);
  }
});

test('suffix and ending options always contain the answer and remain algorithmic', () => {
  const a = app();a.unlock();
  for(const build of [{base:'ev',result:'eve'}, {base:'araba',result:'arabada'}, {base:'yarak',result:'yarağı',suffix:'ı',soften:true}]){
    for(let i = 0; i < 100; i++){
      const options = a.json('getSuffixOptionsForBuild(' + JSON.stringify(build) + ')');
      assert.equal(options.length,4);
      assert.equal(new Set(options.map(item => item.suffix)).size,4);
      assert.ok(options.some(item => item.suffix === (build.suffix || build.result.slice(build.base.length))));
    }
  }
  for(const ending of ['iyom','iyon','iyo','iyoz']){
    const options = a.json('getVerbEndingOptionsForBuild({base:"gelmek",ending:' + JSON.stringify(ending) + '})');
    assert.equal(options.length,3);
    assert.equal(new Set(options.map(item => item.ending)).size,3);
    assert.ok(options.some(item => item.ending === ending));
  }
});

test('feedback distinguishes verb, noun, case, ending, pronoun, missing, and extra words', () => {
  const a = app();a.unlock();
  const original = pieces(example);
  const mutations = [
    ['verb',3,{word:'gidiyon',baseVerb:'gitmek'}],
    ['noun',2,{word:'evi',baseWord:'ev'}],
    ['case',2,{word:'yarakda',appliedSuffix:'da'}],
    ['ending',3,{word:'görüyom',appliedVerbEnding:'iyom'}],
    ['pronoun',0,{word:'ben'}]
  ];
  for(const [area,index,changes] of mutations){
    const answer = original.map(piece => ({...piece}));
    Object.assign(answer[index],changes);
    assert.equal(verdict(a,example,answer).issue.area,area);
  }
  assert.equal(verdict(a,example,original.slice(0,-1)).issue.area,'missing');
  assert.equal(verdict(a,example,[...original,{tokenKind:'word',word:'ev',wordType:'noun'}]).issue.area,'extra');
  assert.equal(verdict(a,example,[...original,{tokenKind:'word',word:'sen'}]).issue.area,'extra');
  assert.equal(a.run('getSentenceErrorHint({area:"verb"},1)'), 'Noch nicht richtig');
  assert.equal(a.run('getSentenceErrorHint({area:"verb"},2)'), 'Prüfe das Verb.');
  assert.ok(a.run('getSentenceErrorHint({area:"case",caseKey:"accusative"},3)').includes('Wen oder was'));
  const nominal = {answer:['O','güzel.']};
  assert.equal(verdict(a,nominal,[{tokenKind:'word',word:'güzel'}]).correct,false);
});

test('reset retains attempts; three cumulative mistakes reset the level and start an easier sentence', () => {
  const a = app();a.unlock();setChallenge(a,example);
  a.run('sentenceLearning.level = 5; sentenceLearning.levelCorrect = 4; checkSentence();');
  assert.equal(a.run('sentenceAttempts'),1);
  assert.equal(a.el('sentenceFeedback').textContent,'Noch nicht richtig');
  assert.equal(a.el('sentenceLevelText').textContent,'5');
  assert.equal(a.el('sentenceProgressText').textContent,'2 Leben');
  assert.equal(a.el('sentenceHeart2').classList.contains('is-lost'),true);
  assert.equal(a.el('sentenceHeart2').classList.contains('life-lost'),true);
  assert.equal(a.el('sentenceHeart1').classList.contains('is-lost'),false);
  a.run('resetSentence();checkSentence();');
  assert.equal(a.run('sentenceAttempts'),2);
  assert.ok(a.el('sentenceFeedback').textContent.includes('fehlt'));
  assert.equal(a.el('sentenceProgressText').textContent,'1 Leben');
  assert.equal(a.el('sentenceHeart1').classList.contains('life-lost'),true);
  assert.equal(a.el('sentenceHeart2').classList.contains('life-lost'),false);
  a.run('checkSentence();checkSentence();');
  assert.equal(a.run('sentenceLearning.level'),1);
  assert.equal(a.run('sentenceLearning.levelCorrect'),0);
  assert.equal(a.run('sentenceLearning.mistakes'),0);
  assert.equal(a.run('sentenceAttempts'),3);
  assert.equal(a.el('sentenceProgressText').textContent,'0 Leben');
  assert.ok([0,1,2].every(i => a.el('sentenceHeart' + i).classList.contains('is-lost')));
  a.advance(2600);
  assert.equal(a.run('sentenceAttempts'),0);
  assert.equal(a.el('sentenceProgressText').textContent,'3 Leben');
  assert.ok([0,1,2].every(i => !a.el('sentenceHeart' + i).classList.contains('is-lost')));
  assert.ok([0,1,2].every(i => !a.el('sentenceHeart' + i).classList.contains('life-lost')));
  assert.equal(a.run('getSentenceDifficulty(sentenceOrder[0])'),1);
  assert.ok(a.run('Object.values(sentenceLearning.sentences).some(stats => stats.errors === 3)'));
});

test('five correct sentences advance a level; success stays visible for the whole confetti animation', () => {
  const a = app({reducedMotion:false});a.unlock();setChallenge(a,example);solveInDom(a,example);
  a.run('sentenceLearning.levelCorrect = 4; checkSentence();');
  const built = a.el('answerZone').children.map(token => token.textContent).join(' ');
  assert.equal(built,'Sen arabada yarağı görüyon.');
  assert.equal(a.run('sentenceLearning.level'),2);
  assert.equal(a.el('sentenceLevelBadge').classList.contains('level-up'),true);
  assert.equal(a.run('sentenceLocked'),true);
  a.run('resetSentence();checkSentence();');
  const animationMs = Math.ceil(Math.max(...a.animations.map(animation =>
    animation.options.duration + animation.options.delay))) + 40;
  assert.ok(animationMs >= 2190 && animationMs <= 2500);
  assert.equal(a.animations.length,56);
  a.advance(animationMs - 1);
  assert.equal(a.el('answerZone').children.map(token => token.textContent).join(' '),built);
  a.advance(1);
  assert.equal(a.el('answerZone').children.length,0);
  assert.equal(a.run('sentenceLocked'),false);
  assert.equal(a.el('checkSentenceButton').disabled,false);
  assert.ok(a.animations.every(animation => animation.cancelled));
  assert.equal(a.document.querySelector('.confetti-layer'),null);
});

test('navigation cancels delayed success transitions and reduced motion still leaves reading time', () => {
  const a = app();a.unlock();setChallenge(a,example);solveInDom(a,example);
  a.run('checkSentence()');
  a.advance(1000);
  assert.equal(a.run('sentenceLocked'),true);
  const sequence = a.run('sentenceLearning.sequence');
  a.run('backToLearnHome()');a.advance(5000);
  assert.equal(a.run('sentenceLearning.sequence'),sequence);
  a.run('startSentenceGame()');
  assert.equal(a.run('sentenceLocked'),false);
});

test('difficult sentences get more weight, mastery reduces weight, and learning survives reload', () => {
  const a = app();a.unlock();
  a.run('sentenceLearning = emptySentenceLearning();');
  const fresh = a.run('sentenceReviewWeight(' + JSON.stringify(example) + ')');
  a.run('Object.assign(getSentenceStats(' + JSON.stringify(example) + '),{difficulty:4,errors:4,lastSeen:0});sentenceLearning.sequence = 20;');
  const difficult = a.run('sentenceReviewWeight(' + JSON.stringify(example) + ')');
  assert.ok(difficult > fresh * 3);
  a.run('Object.assign(getSentenceStats(' + JSON.stringify(example) + '),{difficulty:0,directStreak:6});');
  assert.ok(a.run('sentenceReviewWeight(' + JSON.stringify(example) + ')') < fresh);
  a.run('sentenceLearning.level = 4;sentenceLearning.mistakes = 2;saveSentenceLearning();');
  const b = app({storage:a.storage});
  assert.equal(b.run('loadSentenceLearning().level'),4);
  assert.equal(b.run('loadSentenceLearning().mistakes'),2);
  assert.equal(b.run('Object.values(loadSentenceLearning().sentences)[0].errors'),4);
  b.unlock();b.run('startSentenceGame()');
  assert.equal(b.el('sentenceLevelText').textContent,'4');
  assert.equal(b.el('sentenceProgressText').textContent,'1 Leben');
  assert.ok([1,2].every(i => b.el('sentenceHeart' + i).classList.contains('is-lost')));
  assert.ok([0,1,2].every(i => !b.el('sentenceHeart' + i).classList.contains('life-lost')));
});

test('difficulty varies and people remain balanced across a longer session', () => {
  const a = app();a.unlock();
  const result = a.json('sentenceLearning = emptySentenceLearning();sentenceLearning.level = 5;' +
    'const selected = Array.from({length:600},() => selectSentenceChallenge());' +
    '({difficulties:[...new Set(selected.map(getSentenceDifficulty))], people:sentenceLearning.people, verbs:sentenceLearning.verbs})');
  assert.ok(result.difficulties.includes(5));
  assert.ok(result.difficulties.some(value => value < 5));
  const counts = ['ben','sen','o','biz'].map(person => result.people[person]);
  assert.ok(counts.every(count => count > 50));
  assert.ok(Math.max(...counts) - Math.min(...counts) <= 8, JSON.stringify(counts));
  for(const verb of ['gelmek','gitmek','görmek','sevmek']) assert.ok(result.verbs[verb] > 0,verb);
});

test('future unlocked verbs participate without guessing German irregular forms', () => {
  const a = app();a.unlock();
  const row = a.rows.find(row => row.querySelector('.word-tr').textContent === 'gelmek');
  row.querySelector('.word-tr').textContent = 'öğrenmek';
  row.querySelector('.word-de').textContent = 'lernen';
  a.unlock();
  assert.ok(a.json('generateSentenceChallenges()').some(item => item.de === 'Lernen ist schön.'));
  row.dataset.sentenceForms = 'lerne|lernst|lernt|lernen';
  assert.ok(a.json('generateSentenceChallenges()').some(item => item.de === 'Du lernst.' && item.answer.includes('öğreniyon')));
});

test('vowel harmony and noun softening follow the chosen word, not the source suffix card', () => {
  const a = app();a.unlock();setChallenge(a,example);
  assert.equal(a.run('makeSentenceCaseBuild("ağaç","accusative").result'),'ağacı');
  assert.equal(a.run('makeSentenceCaseBuild("ağaç","dative").result'),'ağaca');
  assert.equal(a.run('buildColloquialPresent("görmek","iyoz")'),'görüyoz');
  assert.equal(a.run('buildColloquialPresent("sevmek","iyom")'),'seviyom');
  assert.equal(a.run('buildColloquialPresent("gitmek","iyon")'),'gidiyon');
  assert.equal(a.run('buildColloquialPresent("oynamak","iyom")'),'oynuyom');
  assert.equal(a.run('buildColloquialPresent("okumak","iyo")'),'okuyo');
  a.run('const nounToken = createSentenceToken({kind:"word",word:"yarak"},0);' +
    'const borrowedCard = createSentenceToken({kind:"suffix",suffix:"ı",targetBase:"araba",soften:false},1);' +
    'applySentenceCase(nounToken,borrowedCard);');
  assert.equal(a.run('nounToken.dataset.word'),'yarağı');
});

test('correct answers keep the cumulative mistake counter until the third error', () => {
  const a = app();a.unlock();setChallenge(a,example);
  a.run('sentenceLearning.level = 4;checkSentence();checkSentence();');
  solveInDom(a,example);a.run('checkSentence()');a.advance(2000);
  assert.equal(a.run('sentenceLearning.mistakes'),2);
  assert.equal(a.run('sentenceAttempts'),0);
  a.run('checkSentence()');
  assert.equal(a.run('sentenceLearning.level'),1);
  assert.ok(a.el('sentenceFeedback').textContent.endsWith('Noch nicht richtig'));
});

test('touch taps apply separate cards; tapping an inflected word removes its ending before its stem', () => {
  const a = app();a.unlock();setChallenge(a,example);
  const tap = token => {
    const event = {button:0,currentTarget:token,clientX:10,clientY:10,pointerId:1};
    a.run('beginSentencePointerDrag')(event);
    a.run('endSentencePointerDrag')(event);
  };
  const find = predicate => a.el('wordBank').children.find(predicate);
  const noun = find(token => token.dataset.word === 'yarak');
  tap(noun);
  tap(find(token => token.dataset.suffix === 'ı' && token.dataset.targetBase === 'yarak'));
  assert.equal(noun.dataset.word,'yarağı');
  assert.equal(noun.classList.contains('word-type-noun'),true);
  tap(noun);
  assert.equal(noun.dataset.word,'yarak');
  assert.equal(noun.parentElement,a.el('answerZone'));
  tap(noun);
  assert.equal(noun.parentElement,a.el('wordBank'));
  const verb = find(token => token.dataset.word === 'görmek');
  tap(verb);tap(find(token => token.dataset.ending === 'iyon'));
  assert.equal(verb.dataset.word,'görüyon');
  assert.equal(verb.classList.contains('word-type-verb'),true);
  tap(verb);assert.equal(verb.dataset.word,'görmek');
  assert.equal(verb.parentElement,a.el('answerZone'));
});

test('unlock changes invalidate the task cache and corrupt storage does not prevent play', () => {
  const a = app();a.unlock(['ev','güzel']);
  assert.ok(!a.json('getAvailableSentenceChallenges()').some(item => item.requires.includes('sevmek')));
  a.unlock(['ev','güzel','sevmek','ben']);
  assert.ok(a.json('getAvailableSentenceChallenges()').some(item => item.requires.includes('sevmek')));
  a.storage.set('andreTurkishSentenceLearningV1','{broken');
  assert.equal(a.run('loadSentenceLearning().level'),1);
  a.storage.set('andreTurkishSentenceLearningV1',JSON.stringify({level:-5,mistakes:100,levelCorrect:99}));
  assert.equal(a.run('loadSentenceLearning().level'),1);
  assert.equal(a.run('loadSentenceLearning().mistakes'),2);
  assert.equal(a.run('loadSentenceLearning().levelCorrect'),4);
});

test('confetti launches from both lower corners and rises into the center before a smooth slow fall', () => {
  const a = app();
  const create = a.run('createConfettiParticle');
  const state = a.run('getConfettiParticleState');
  const keyframes = a.run('getConfettiKeyframes');
  let seed = 123456;
  const random = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
  for(const viewport of [{width:390,height:844},{width:1366,height:768}]){
    for(let i = 0; i < 72; i++){
      const p = create(viewport,i,random);
      const start = state(p,0);
      const apex = state(p,p.apexTime);
      assert.equal(p.fromLeft,i % 2 === 0);
      assert.ok(start.y >= viewport.height * .9 && start.y <= viewport.height);
      assert.ok(p.fromLeft ? start.x < viewport.width * .1 : start.x > viewport.width * .9);
      assert.ok(apex.x > viewport.width * .18 && apex.x < viewport.width * .82);
      assert.ok(apex.y > viewport.height * .18 && apex.y < viewport.height * .56);
      assert.ok(state(p,.1).y < start.y);
      assert.ok(state(p,2.1).y > apex.y);
      // The apex has no vertical jump or change of velocity.
      const before = state(p,p.apexTime - .0001);
      const after = state(p,p.apexTime + .0001);
      assert.ok(Math.abs((after.y - before.y) / .0002) < .1);
      const fallSpeed = (state(p,2.15).y - state(p,2.05).y) / .1;
      assert.ok(fallSpeed > 0 && fallSpeed < viewport.height * .2);
      const frames = keyframes(p);
      assert.equal(frames[0].offset,0);
      assert.equal(frames.at(-1).offset,1);
      assert.equal(frames[0].opacity,0);
      assert.equal(frames.at(-1).opacity,0);
      assert.ok(frames.every(frame => frame.opacity >= 0 && frame.opacity <= 1 && !/NaN|Infinity/.test(frame.transform)));
    }
  }
});

test('restarting or leaving a celebration cancels native animations and removes its overlay', () => {
  const a = app({reducedMotion:false});
  const firstDuration = a.run('celebrateCorrectAnswer()');
  assert.ok(firstDuration < 2501);
  assert.equal(a.animations.length,56);
  const old = [...a.animations];
  a.run('celebrateCorrectAnswer()');
  assert.ok(old.every(animation => animation.cancelled));
  assert.ok(a.animations.slice(56).every(animation => !animation.cancelled));
  assert.equal(a.document.body.children.length,1);
  a.run('stopSentenceGame()');
  assert.ok(a.animations.every(animation => animation.cancelled));
  assert.equal(a.document.body.children.length,0);
  a.advance(5000);
  assert.equal(a.run('confettiCelebration'),null);
  const reduced = app();
  assert.equal(reduced.run('celebrateCorrectAnswer()'),420);
  assert.equal(reduced.animations.length,0);
  const unsupported = app({reducedMotion:false});
  unsupported.run('document.documentElement.animate = undefined;');
  assert.equal(unsupported.run('celebrateCorrectAnswer()'),420);
});
