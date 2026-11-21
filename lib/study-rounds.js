/* Short practice runs between course stages. Only ordinary course answers count
   towards topic coverage, grammar evidence and promotion. */
(function(root) {
  'use strict';
  const node = typeof module === 'object' && module.exports;
  const W = node ? require('../data/words') : root.AndreWords;
  const C = node ? require('./course') : root.AndreCourse;
  const T = node ? require('./turkish') : root.Turkish;
  const G = node ? require('./course-grammar') : root.AndreCourseGrammar;
  const B = node ? require('./building-blocks') : root.TurkishBlocks;
  const P = node ? require('./learning-path') : root.AndreLearningPath;
  const scenes = node ? require('../data/conversations') : root.AndreConversations;
  const day = 86400000;
  const slots = task => task.groups.flatMap(group => group.slots);
  const say = task => task.answer.charAt(0).toLocaleUpperCase('tr') + task.answer.slice(1);

  function makeTask(engine, id, parts, de, theme) {
    const level = engine.flow.level;
    return {
      id, de, primaryTheme:theme, min:level, cefr:C.bandAt(level).cefr, family:id,
      register:engine.state.standard ? 'standard' : 'colloquial',
      groups:[{id:'main', label:'Dein Satz', ordered:true, slots:parts}],
      uses:C.uses(parts, 1), skills:[], cases:[],
      requires:[...new Set(parts.map(s => s.lemma))], answer:parts.map(T.surface).join(' ')
    };
  }
  function line(engine, scene, specs, de) {
    const parts = specs.map(spec => {
      const [text, features] = Array.isArray(spec) ? spec : [spec, {}];
      const entries = W.words.filter(w => w.tr === text);
      const word = entries.find(w => features.tense ? w.type === 'verb' : w.type !== 'verb') || entries[0];
      if (!word) throw Error('Unbekanntes Dialogwort: ' + text);
      const f = {...B.baseFeatures(word.id), ...features};
      if (f.tense === 'present' && !engine.state.standard) f.register = 'colloquial';
      return {lemma:word.id, features:f};
    });
    const task=makeTask(engine, 'dialog/'+scene.title+'/'+de, parts, de, scene.theme);
    task.min=scene.level;
    task.cefr=C.bandAt(scene.level).cefr;
    return task;
  }
  function permitted(engine, task, words, grammar) {
    return task.requires.every(id => words.has(id)) && engine.canTask(task, grammar);
  }
  function dialogues(engine) {
    const words = engine.unlocked(), grammar = engine.practiceGrammar();
    const available = [];
    for (const scene of scenes.filter(s => s.level <= engine.flow.level)) {
      const branches = scene.branches.map(b => {
        const pick = line(engine,scene,[b.pick],scene.title);
        const questions = b.question.map(text => line(engine,scene,[text],scene.title));
        const answer = line(engine,scene,b.answer,b.cue), other = line(engine,scene,b.other,b.cue);
        const ask = b.ask && line(engine,scene,b.ask,b.cue);
        const question = ask && permitted(engine,ask,words,grammar) ? [ask] : questions;
        return {pick, question, answer, other, cue:b.cue};
      });
      const all = branches.flatMap(b => [b.pick,...b.question,b.answer,b.other]);
      if (all.every(t => permitted(engine,t,words,grammar))) available.push({scene,branches});
    }
    return available;
  }

  function mistake(engine, kind, id) {
    if (!id || (kind === 'words' && (!W.byId[id] || P.auto.has(id)))) return;
    const stat = engine.stat(kind,id);
    stat.errors++;
    stat.stage = 0;
    stat.errorSequence = engine.state.completed + 4;
    stat.reviewAfter = stat.errorSequence;
    stat.reviewDay = 0;
    stat.reviewStreak = 0;
  }
  function recordMistake(engine, cur, result, unknown, answer) {
    if (cur.extra || cur.attempts !== 1) return;
    const parts = slots(cur.task), issue = result.issue || {};
    if (cur.delivery?.mode === 'build' || !cur.delivery) {
      if (!unknown && issue.area === 'grammar' && issue.word) {
        const part = parts.find(s => s.lemma === issue.word && T.norm(T.surface(s)) === issue.expected);
        const ops = part ? B.plan(part) : [];
        const op = ops.find(o => o.before[issue.field] !== o.after[issue.field]) || ops.at(-1);
        if (op) return mistake(engine,'skills',G.key(op));
      }
      if (!unknown && issue.area === 'word' && !cur.tokens.some(t => t.group && t.lemma === issue.expected))
        return mistake(engine,'words',issue.expected);
    }
    if (!unknown && cur.delivery?.mode==='write') {
      const typed=G.norm(answer,'tr'), expected=parts.map(s=>G.norm(T.surface(s),'tr'));
      for (const [i,part] of parts.entries()) {
        const prefix=expected.slice(0,i).join(' '), suffix=expected.slice(i+1).join(' ');
        const forms=B.plan(part);
        for (const op of forms) {
          if (typed===[prefix,G.norm(op.from,'tr'),suffix].filter(Boolean).join(' '))
            return mistake(engine,'skills',G.key(op));
        }
        if (typed===[prefix,suffix].filter(Boolean).join(' ') && typed)
          return mistake(engine,'words',part.lemma);
      }
    }
    const diff = cur.delivery?.contrasts?.[answer];
    if (!unknown && diff) {
      if (diff.words.length === 1 && !diff.forms.length) return mistake(engine,'words',diff.words[0]);
      if (!diff.words.length && diff.forms.length === 1) return mistake(engine,'skills',diff.forms[0]);
    }
    // A whole skipped or mistyped sentence rarely identifies a single suffix.
    // Keep the actual sentence for later retrieval instead of blaming its first form.
    const slips = engine.state.sentenceSlips ||= [];
    const signature = cur.task.answer;
    const old = slips.find(s => s.task.answer === signature);
    if (old) { old.errors++; old.reviewAfter = engine.state.completed + 4; old.reviewDay = 0; old.reviewStreak = 0; }
    else slips.push({task:C.copy(cur.task), errors:1, reviewAfter:engine.state.completed+4});
    if (slips.length > 32) slips.shift();
  }
  function reviewCards(engine) {
    const state = engine.state, words = engine.unlocked(), grammar = engine.practiceGrammar();
    const prep = engine.read('andreWordPreparationV1')?.words || {};
    const time = engine.clock(), cards = [];
    function offer(kind,id,stat,errors,source) {
      if (!errors || (stat.reviewAfter || 0) > state.completed || (stat.reviewDay || 0) > time) return;
      cards.push({kind,id,errors,last:stat.lastReview ?? -1,source});
    }
    for (const id of words) {
      if (P.auto.has(id)) continue;
      const stat = state.words[id] || {}, failures = Number(prep[id]?.failures) || 0;
      offer('words',id,stat,(stat.errors || 0)+failures);
    }
    const pool = engine.available();
    for (const [id,stat] of Object.entries(state.skills)) {
      if (!stat.errors || !grammar.has(id)) continue;
      const matches = pool.filter(t => engine.requiredFor(t).includes(id));
      if (matches.length) {
        matches.sort((a,b) => Number(a.answer===stat.lastReviewSentence)-Number(b.answer===stat.lastReviewSentence) || a.answer.length-b.answer.length);
        offer('skills',id,stat,stat.errors,matches[0]);
      }
    }
    for (const slip of state.sentenceSlips || []) {
      if (slip.task.min <= C.bandAt(engine.flow.level).end && permitted(engine,slip.task,words,grammar))
        offer('sentence',slip.task.answer,slip,slip.errors,slip.task);
    }
    // Unseen due items get a turn before previously reviewed ones.
    cards.sort((a,b) => Number(a.kind==='sentence')-Number(b.kind==='sentence') || a.last-b.last || b.errors-a.errors);
    const selected = [];
    for (const card of cards) {
      const word = W.byId[card.id];
      const task = card.source || makeTask(engine,'recall/'+card.id,[{lemma:card.id,features:B.baseFeatures(card.id)}],word.de,word.themes?.[0]);
      // A vocabulary prompt asks only for a dictionary form, including an infinitive.
      if (card.kind==='words') {
        task.uses=[];
        const lesson=P.lessons.find(l=>l.words.includes(card.id));
        if (lesson) {task.min=lesson.level;task.cefr=lesson.cefr;}
      }
      if (!permitted(engine,task,words,grammar) || selected.some(c => c.task.answer === task.answer)) continue;
      selected.push({task,kind:card.kind,id:card.id});
      if (selected.length===3) break;
    }
    return selected;
  }
  function recallResult(engine, cur) {
    const {kind,id} = cur.extra.card;
    const stat = kind==='sentence' ? engine.state.sentenceSlips?.find(s => s.task.answer===id) : engine.stat(kind,id);
    if (!stat) return;
    stat.lastReview = engine.state.completed;
    stat.lastReviewSentence = cur.task.answer;
    if (cur.firstOutcome==='correct') {
      const streak = Math.min(4,(stat.reviewStreak || 0)+1);
      stat.reviewStreak = streak;
      stat.reviewDay = engine.clock()+[1,3,7,21][streak-1]*day;
      stat.reviewAfter = 0;
    } else {
      stat.reviewStreak=0;
      stat.reviewDay=0;
      stat.reviewAfter=engine.state.completed+4;
    }
  }
  function conversation(engine) {
    const options = dialogues(engine);
    if (!options.length) return null;
    const recent = engine.state.conversationHistory || [];
    // Prefer fresh conversations in the highest available band.
    const fresh = options.filter(o => !recent.slice(-3).includes(o.scene.title));
    const pool = fresh.length ? fresh : options;
    const band = Math.max(...pool.map(o => Math.floor((o.scene.level-1)/40)));
    const preferred = pool.filter(o => Math.floor((o.scene.level-1)/40)===band);
    const chosen = preferred[Math.floor(engine.random()*preferred.length)];
    engine.state.conversationHistory = [...recent,chosen.scene.title].slice(-8);
    return {kind:'dialog',title:chosen.scene.title,branches:chosen.branches,total:2};
  }
  function next(engine) {
    if (!engine.flow.automatic || !engine.wordsReady()) return null;
    const cur = engine.state.current;
    if (cur && !cur.finished) {
      if (!cur.extra) return null;
      const active=engine.state.studyRun;
      const content=active?.kind==='dialog'?active.branches.flatMap(b=>[b.pick,...b.question,b.answer,b.other]):[cur.task];
      const words=engine.unlocked(),grammar=engine.practiceGrammar();
      if (active?.key===cur.extra.key && active.level===engine.flow.level &&
          content.every(t=>permitted(engine,t,words,grammar))) return cur;
      delete engine.state.studyRun;
      engine.state.current=null;
      engine.save();
      return null;
    }
    const stage = engine.stageSummary(), free = engine.flow.finished;
    let run = engine.state.studyRun;
    if (run && run.level!==engine.flow.level) engine.state.studyRun=run=null;
    if (!run) {
      if (!cur || (free ? !cur.free || engine.state.completed%6!==0 : stage.number<2 || stage.done!==0)) return null;
      const owner = free ? engine.flow : engine.round().stage;
      const marker = free ? engine.state.completed : stage.number;
      if (owner.studyMarker===marker) return null;
      owner.studyMarker=marker;
      const number = free ? Math.floor(marker/6) : stage.number-1;
      if (number%2===0) run=conversation(engine);
      if (!run) {
        const cards=reviewCards(engine);
        if (cards.length) run={kind:'review',cards,total:cards.length};
      }
      if (!run) {engine.save();return null;}
      Object.assign(run,{key:cur.id,level:engine.flow.level});
      engine.state.studyRun=run;
    }
    const follows = cur?.extra?.key===run.key;
    const index = follows ? cur.extra.index+1 : 0;
    if (index>=run.total) {delete engine.state.studyRun;engine.save();return null;}
    const extra={key:run.key,index,total:run.total,kind:run.kind};
    let task;
    if (run.kind==='review') {
      const card=run.cards[index];
      task=card.task;
      extra.card={kind:card.kind,id:card.id};
      extra.mode=card.kind==='words'?'write':'build';
    } else {
      const branches=run.branches;
      const branch=branches.find(b=>b.pick.answer===cur?.task?.answer) || branches[0];
      task=index===0?branches[0].pick:branch.answer;
      extra.options=index===0?branches.map(b=>b.pick.answer):[branch.answer.answer,branch.other.answer];
      extra.options=B.shuffle(extra.options,engine.random);
      extra.mode='dialog';
      extra.title=run.title;
      extra.prompt=(index===0?branches.map(b=>b.pick):branch.question).map(t=>say(t)+'?').join(' ');
      extra.cue=index===0?'Wofür entscheidest du dich?':branch.cue;
      if (index) {extra.previous=say(branch.pick);extra.defaultPick=cur.firstOutcome!=='correct';}
    }
    const words=engine.unlocked(), grammar=engine.practiceGrammar();
    const content=run.kind==='dialog'?run.branches.flatMap(b=>[b.pick,...b.question,b.answer,b.other]):[task];
    if (!content.every(t=>permitted(engine,t,words,grammar))) {delete engine.state.studyRun;engine.save();return null;}
    const exercise=engine.begin(task,'older');
    exercise.extra=extra;
    exercise.practice=true;
    if (!free) engine.round().serial++;
    engine.save();
    return exercise;
  }
  function acceptBranch(engine,cur,answer) {
    if (cur.extra?.kind!=='dialog' || cur.extra.index!==0) return;
    const branch=engine.state.studyRun?.branches?.find(b=>b.pick.answer===answer);
    if (branch) {cur.task=C.copy(branch.pick);cur.taskId=cur.task.id;}
  }
  const api={dialogues,recordMistake,recallResult,reviewCards,next,acceptBranch};
  if (node) module.exports=api; else root.AndreStudyRounds=api;
})(typeof globalThis==='object'?globalThis:this);
