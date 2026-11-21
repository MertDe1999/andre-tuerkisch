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
  const wordsBySpelling=new Map();
  for(const word of W.words){
    if(!wordsBySpelling.has(word.tr)) wordsBySpelling.set(word.tr,[]);
    wordsBySpelling.get(word.tr).push(word);
  }

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
      const entries = wordsBySpelling.get(text) || [];
      const word = entries.find(w => features.tense ? w.type === 'verb' : w.type !== 'verb') || entries[0];
      if (!word) throw Error('Unbekanntes Dialogwort: ' + text);
      const f = {...B.baseFeatures(word.id), ...features};
      if (f.tense === 'present' && !engine.state.standard) f.register = 'colloquial';
      const part={lemma:word.id,features:f};
      if (word.type!=='verb' && (f.question || f.past || f.person)) part.nominal=true;
      return part;
    });
    const task=makeTask(engine, 'dialog/'+scene.title+'/'+de, parts, de, scene.theme);
    task.min=scene.level;
    task.cefr=C.bandAt(scene.level).cefr;
    return task;
  }
  function permitted(engine, task, words, grammar) {
    return task.requires.every(id => words.has(id)) && engine.canTask(task, grammar);
  }
  function continuation(engine,scene,allowed) {
    if (engine.flow.level<81) return null;
    const {question,routes}=scene.continuation;
    const make=specs=>line(engine,scene,specs,scene.title);
    const choices=routes.map(r=>({
      pick:make([r.pick]), question:make(r.question), answer:line(engine,scene,r.answer,r.cue)
    }));
    const fork={question:make(question),choices};
    return forkContent(fork).every(allowed)?fork:null;
  }
  function forkContent(fork) {
    return [fork.question,...fork.choices.flatMap(c=>[c.pick,c.question,c.answer])];
  }
  function dialogues(engine) {
    const words = engine.unlocked(), grammar = engine.practiceGrammar();
    const available = [];
    for (const scene of scenes.filter(s => s.level <= engine.flow.level)) {
      const allowed = task => permitted(engine,task,words,grammar);
      const opener = scene.opening && engine.flow.level>=81 ? line(engine,scene,scene.opening.question,scene.title) : null;
      const branches = scene.branches.map((b,i) => {
        const reaction = specs => {
          if (!specs || engine.flow.level<81) return null;
          const text=line(engine,scene,specs,scene.title);
          return allowed(text)?text:null;
        };
        const pick = line(engine,scene,[b.pick],scene.title);
        const questions = b.question.map(text => line(engine,scene,[text],scene.title));
        const answer = line(engine,scene,b.answer,b.cue), other = line(engine,scene,b.other,b.cue);
        const ask = b.ask && line(engine,scene,b.ask,b.cue);
        const question = ask && permitted(engine,ask,words,grammar) ? [ask] : questions;
        const variants = [ {question,answer,other,cue:b.cue,reaction:reaction(b.reaction)} ];
        for (const v of b.followups || []) {
          const q=v.question.map(text=>line(engine,scene,[text],v.cue));
          const yes=line(engine,scene,v.answer,v.cue), no=line(engine,scene,v.other,v.cue);
          if ([...q,yes,no].every(allowed)) variants.push({question:q,answer:yes,other:no,cue:v.cue,reaction:reaction(v.reaction)});
        }
        const replies=[];
        if (opener && allowed(opener)) {
          for (const specs of scene.opening.replies[i]) {
            // An explicit subject is optional in these first-person verb phrases.
            const withSubject=specs.some(s=>Array.isArray(s) && s[1].person==='ben');
            for (const version of withSubject?[specs,['ben',...specs]]:[specs]) {
              const reply=line(engine,scene,version,scene.opening.cue);
              if (allowed(reply)) replies.push(reply);
            }
          }
        }
        return {pick, ...variants[0], variants, replies};
      });
      const all = branches.flatMap(b => [b.pick,...b.question,b.answer,b.other]);
      if (all.every(allowed)) available.push({scene,branches,opener:branches.every(b=>b.replies.length)?opener:null,
        fork:continuation(engine,scene,allowed)});
    }
    const richerThemes=new Set(available.filter(o=>!o.scene.starter).map(o=>o.scene.theme));
    return available.filter(o=>!o.scene.starter||!richerThemes.has(o.scene.theme));
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
      if (kind==='words') stat.errors=(stat.errors||0)+1;
      stat.reviewStreak=0;
      stat.reviewDay=0;
      stat.reviewAfter=engine.state.completed+4;
    }
  }
  // Course writing and dictionary-form recall share the same spelling record.
  function recordSpelling(engine,cur,answer) {
    const written=' '+G.norm(answer,'tr')+' ';
    const practiced=new Set(slots(cur.task).filter(s=>written.includes(' '+G.norm(T.surface(s),'tr')+' ')).map(s=>s.lemma));
    for (const id of practiced) if (!P.auto.has(id)) {
      const stat=engine.stat('words',id);
      if (stat.lastSpellingTask===cur.id) continue;
      stat.spellings=Math.min(2,(stat.spellings||0)+1);
      stat.lastSpellingTask=cur.id;
      stat.lastSpellingAt=engine.state.completed;
    }
  }
  function writingSpaced(engine) {
    return !Number.isInteger(engine.state.lastWritingTask) || engine.state.started-engine.state.lastWritingTask>=2;
  }
  function spellingCard(engine) {
    if (!writingSpaced(engine)) return null;
    const state=engine.state, now=engine.clock();
    const due=[...engine.unlocked()].filter(id=>{
      const s=state.words[id] || {};
      return !P.auto.has(id) && (s.spellings||0)<2 && (s.lastSpellingAt===undefined || state.completed-s.lastSpellingAt>=10) &&
        (s.reviewAfter||0)<=state.completed && (s.reviewDay||0)<=now;
    }).sort((a,b)=>(state.words[a]?.spellings||0)-(state.words[b]?.spellings||0));
    if (!due.length) return null;
    const id=due[0], w=W.byId[id], task=makeTask(engine,'recall/'+id,[{lemma:id,features:B.baseFeatures(id)}],w.de,w.themes?.[0]);
    task.uses=[];
    task.cefr=P.lessons.find(l=>l.words.includes(id))?.cefr||task.cefr;
    return {task,kind:'words',id};
  }
  function conversation(engine) {
    const options = dialogues(engine);
    if (!options.length) return null;
    const recent = engine.state.conversationHistory || [];
    const state=engine.state;
    let visited=Array.isArray(state.chatThemes)?state.chatThemes:[];
    let pool=options.filter(o=>!visited.includes(o.scene.theme));
    if (!pool.length) {
      const last=visited.at(-1);
      visited=[];
      pool=options.filter(o=>o.scene.theme!==last);
      if (!pool.length) pool=options;
    }
    const sinceWrite=Number.isInteger(state.chatsSinceWrite)?state.chatsSinceWrite:2;
    const written=engine.flow.level>=81 && sinceWrite>=2 && writingSpaced(engine)
      ? pool.filter(o=>o.opener) : [];
    if (written.length) pool=written;
    const topics=[...new Set(pool.map(o=>o.scene.theme))];
    const theme=topics[Math.floor(engine.random()*topics.length)];
    const themed=pool.filter(o=>o.scene.theme===theme);
    const oldest=Math.min(...themed.map(o=>recent.lastIndexOf(o.scene.title)));
    const candidates=themed.filter(o=>recent.lastIndexOf(o.scene.title)===oldest);
    const chosen=candidates[Math.floor(engine.random()*candidates.length)];
    state.chatThemes=[...visited,theme];
    state.conversationHistory=[...recent.filter(title=>title!==chosen.scene.title),chosen.scene.title].slice(-scenes.length);
    state.chatsSinceWrite=written.length?0:Math.min(2,sinceWrite+1);
    return {kind:'dialog',title:chosen.scene.title,branches:chosen.branches,fork:chosen.fork,total:chosen.fork?4:2,
      opening:written.length?{task:chosen.opener,cue:chosen.scene.opening.cue}:null};
  }
  function next(engine) {
    if (!engine.flow.automatic || !engine.wordsReady()) return null;
    const cur = engine.state.current;
    if (cur && !cur.finished) {
      if (!cur.extra) return null;
      const active=engine.state.studyRun;
      const content=active?.kind==='dialog'?chatContent(active):[cur.task];
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
        if (number%4===3) {
          const spelling=spellingCard(engine);
          if (spelling && !cards.some(c=>c.id===spelling.id)) {
            cards.unshift(spelling);
            cards.splice(3);
          }
        }
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
      extra.mode='build';
      if (card.kind==='words') {
        if (writingSpaced(engine)) extra.mode='write';
        else {
          const word=W.byId[card.id], known=engine.unlocked();
          const meanings=w=>w.deAnswers.map(a=>G.norm(a,'de').replace(/^(der|die|das) /,''));
          const target=new Set(meanings(word));
          const others=W.words.filter(w=>w.type===word.type && w.tr!==word.tr && known.has(w.id) && !meanings(w).some(x=>target.has(x)));
          if (others.length) {
            extra.mode='dialog';
            extra.options=B.shuffle([word.tr,...new Set(B.shuffle(others,engine.random).map(w=>w.tr))].slice(0,4),engine.random);
          }
        }
      }
    } else if (index>=2 && run.fork) {
      const {question,choices}=run.fork;
      extra.title=run.title;
      extra.previous=cur.delivery?.sentText;
      if (index===2) {
        task=choices[0].pick;
        extra.mode='dialog';
        extra.options=B.shuffle(choices.map(c=>c.pick.answer),engine.random);
        extra.prompt=(extra.previous && cur.extra.reaction?cur.extra.reaction+'. ':'')+say(question)+'?';
        extra.cue='Du entscheidest.';
      } else {
        const choice=choices[cur.extra.branchIndex] || choices[0];
        task=choice.answer;
        extra.mode='build';
        extra.prompt=(extra.previous?'':say(choice.pick)+'. ')+say(choice.question)+'?';
        extra.cue=task.de;
      }
    } else {
      const branches=run.branches;
      const branch=branches[cur?.extra?.branchIndex] || branches.find(b=>b.pick.answer===cur?.task?.answer) || branches[0];
      if (index && branch.variants?.length>1) {
        const usage=engine.state.chatDetails ||= {};
        const key=run.title+'|'+branch.pick.answer, count=usage[key]||0;
        Object.assign(branch,branch.variants[count%branch.variants.length]);
        usage[key]=count+1;
      }
      task=index===0?branches[0].pick:branch.answer;
      extra.options=index===0?branches.map(b=>b.pick.answer):[branch.answer.answer,branch.other.answer];
      extra.options=B.shuffle(extra.options,engine.random);
      extra.mode='dialog';
      extra.title=run.title;
      extra.prompt=(index===0?branches.map(b=>b.pick):branch.question).map(t=>say(t)+'?').join(' ');
      extra.cue=index===0?'Wofür entscheidest du dich?':branch.cue;
      if (!index && run.opening) {
        extra.mode='write';
        extra.openReply=true;
        extra.prompt=say(run.opening.task)+'?';
        extra.cue=run.opening.cue;
        extra.options=[];
      }
      if (index) {
        extra.previous=cur.extra.sentReply || say(branch.pick);
        extra.defaultPick=cur.extra.branchIndex===undefined && cur.firstOutcome!=='correct';
        if (run.fork && branch.reaction) extra.reaction=say(branch.reaction);
      }
    }
    const words=engine.unlocked(), grammar=engine.practiceGrammar();
    const content=run.kind==='dialog'?chatContent(run):[task];
    if (!content.every(t=>permitted(engine,t,words,grammar))) {delete engine.state.studyRun;engine.save();return null;}
    const exercise=engine.begin(task,'older');
    exercise.extra=extra;
    exercise.practice=true;
    if (!free) engine.round().serial++;
    engine.save();
    return exercise;
  }
  function chatContent(run) {
    const content=run.branches.flatMap(b=>[b.pick,...b.question,b.answer,b.other,...(b.replies||[]),
      ...(b.variants||[]).flatMap(v=>[...v.question,v.answer,v.other,...(v.reaction?[v.reaction]:[])])]);
    if (run.opening) content.push(run.opening.task);
    if (run.fork) content.push(...forkContent(run.fork));
    return content;
  }
  function showPicks(engine) {
    const cur=engine.state.current, run=engine.state.studyRun;
    if (!cur?.extra?.openReply || cur.finished || run?.key!==cur.extra.key) return false;
    cur.assisted=true;
    cur.extra.openReply=false;
    cur.extra.mode='dialog';
    cur.extra.options=B.shuffle(run.branches.map(b=>b.pick.answer),engine.random);
    cur.extra.cue='Wofür entscheidest du dich?';
    cur.draft='';
    delete cur.delivery;
    engine.save();
    return true;
  }
  function acceptBranch(engine,cur,answer) {
    if (cur.extra?.kind!=='dialog') return;
    const run=engine.state.studyRun;
    const branches=cur.extra.index===0?run?.branches:cur.extra.index===2?run?.fork?.choices:null;
    if (!branches) return;
    const typed=cur.extra.openReply;
    const input=G.norm(String(answer||'').replace(/[’‘]/g,"'"),'tr');
    for (const [i,b] of branches.entries()) {
      const reply=[b.pick,...(typed?b.replies||[]:[])].find(t=>G.norm(t.answer,'tr')===input);
      if (!reply) continue;
      cur.task=C.copy(reply);
      cur.taskId=cur.task.id;
      cur.extra.branchIndex=i;
      cur.extra.sentReply=String(answer).trim().slice(0,500);
      return true;
    }
    return false;
  }
  const api={dialogues,recordMistake,recallResult,reviewCards,next,acceptBranch,showPicks,recordSpelling,writingSpaced};
  if (node) module.exports=api; else root.AndreStudyRounds=api;
})(typeof globalThis==='object'?globalThis:this);
