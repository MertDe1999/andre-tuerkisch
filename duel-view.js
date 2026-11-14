/* Arena presentation: observes outcomes; animations never advance an exercise. */
(function(root){
  'use strict';
  const D=root.AndreDuel,art=root.AndreDuelArt;
  const make=(tag,cls,text='')=>{const n=document.createElement(tag);n.className=cls;n.textContent=text;return n;};
  function create(engine){
    const model=new D.Duel(root.localStorage),arena=make('section','sentence-duel');arena.id='sentenceDuel';arena.hidden=true;arena.setAttribute('role','group');
    const header=make('div','duel-header'),team=make('div','duel-team-label','André & Ben'),hearts=make('span','duel-hearts'),foe=make('div','duel-foe-label'),name=make('span','duel-name'),hp=make('progress','duel-health');
    hp.setAttribute('aria-label','Lebenspunkte des Gegners');team.append(hearts);foe.append(name,hp);header.append(team,foe);
    for(let i=0;i<3;i++){const h=make('span','duel-heart');h.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21S2 15 2 8a5.5 5.5 0 0 1 10-3 5.5 5.5 0 0 1 10 3c0 7-10 13-10 13Z"/></svg>';hearts.append(h);}
    const scene=make('div','duel-scene'),andre=make('div','duel-actor duel-andre'),ben=make('div','duel-actor duel-ben'),enemy=make('div','duel-actor duel-enemy'),spark=make('div','duel-spark','✦');
    scene.id='sentenceDuelScene';andre.id='duelAndre';ben.id='duelBen';enemy.id='duelEnemy';
    for(const [node,markup] of [[andre,art.andre],[ben,art.ben]]){const sprite=make('div','duel-sprite');sprite.innerHTML=markup;node.append(sprite);}
    const enemySprite=make('div','duel-sprite');enemy.append(enemySprite);scene.setAttribute('aria-hidden','true');scene.append(andre,ben,enemy,spark);
    const status=make('span','duel-status');status.id='duelStatus';arena.append(header,scene,status);
    let shown=null,lastTask=null,active=false,enemyShape='',animations=new Set();
    function stopAnimations(){for(const a of [...animations])a.cancel();animations.clear();delete arena.dataset.action;}
    function motion(node,frames,duration=350){let a;const cleanup=()=>animations.delete(a);a=root.AndreMotion.play(node,frames,{duration,slot:'duel',cleanup});if(a)animations.add(a);}
    function update(summary){
      if(!summary)return;const changed=shown?.key!==summary.key;shown=summary;if(changed)stopAnimations();
      arena.classList.toggle('is-won',summary.outcome==='won');arena.classList.toggle('is-escaped',summary.outcome==='escaped');
      arena.style.setProperty('--duel-enemy','var(--'+summary.enemy.color+')');
      arena.style.setProperty('--duel-outline',summary.enemy.color==='blue'?'var(--text)':'var(--'+summary.enemy.color+'-dark)');
      if(enemyShape!==summary.enemy.shape){enemyShape=summary.enemy.shape;enemySprite.innerHTML=art.enemy(enemyShape);}
      name.textContent=summary.enemy.name;hp.max=summary.maxHp;hp.value=summary.hp;
      for(let i=0;i<hearts.children.length;i++)hearts.children[i].classList.toggle('is-empty',i>=summary.hearts);
      hearts.setAttribute('aria-label',summary.hearts+' von 3 Herzen'+(summary.rescues?' · Ben hat geholfen':''));
      status.textContent=summary.outcome==='won'?'Geschafft!':summary.outcome==='escaped'?'Gegner zieht weiter':'';
      arena.setAttribute('aria-label','Duell mit André und Ben. '+summary.enemy.name+': '+summary.hp+' von '+summary.maxHp+' Lebenspunkten. '+summary.hearts+' von 3 Herzen. '+summary.done+' von '+summary.total+' Aufgaben.');
    }
    function mount(host){if(arena.parentElement===host)return;stopAnimations();if(host.id==='sentenceGameActive')host.insertBefore(arena,host.children[1]||null);else host.insertBefore(arena,host.children[0]||null);}
    function render(host){
      const ctx=D.capture(engine);if(!ctx){hide();return;}
      if(lastTask!==ctx.task){stopAnimations();lastTask=ctx.task;}
      mount(host);update(model.view(ctx));active=true;arena.hidden=false;arena.classList.toggle('is-paused',!!document.hidden);
    }
    function checkpoint(host){mount(host);if(shown)update(model.summary(model.state.encounters[shown.key]));active=true;arena.hidden=false;arena.classList.toggle('is-paused',!!document.hidden);}
    function hide(){active=false;stopAnimations();arena.hidden=true;arena.classList.add('is-paused');}
    function animate(cue){
      if(!cue||!active||document.hidden)return;stopAnimations();update(cue.summary);arena.dataset.action=cue.action;
      if(cue.action==='help')status.textContent='Ben hilft!';
      if(root.AndreMotion.reduced())return;
      if(['hit','assist','win'].includes(cue.action)){
        motion(andre,[{transform:'translateX(0)'},{transform:'translateX(14px) rotate(-5deg)',offset:.35},{transform:'translateX(0)'}],300);
        motion(enemy,cue.action==='win'?[{opacity:1,transform:'scale(1)'},{opacity:1,transform:'scale(1.08,.86)',offset:.3},{opacity:0,transform:'translateY(-10px) scale(.55)'}]:[{transform:'scale(1)'},{transform:'translateX(4px) scale(.88,1.07)',offset:.4},{transform:'scale(1)'}],cue.action==='win'?460:300);
        motion(spark,[{opacity:0,transform:'scale(.4) rotate(-20deg)'},{opacity:1,transform:'scale(1.2)',offset:.4},{opacity:0,transform:'scale(1.6) rotate(30deg)'}],380);
        motion(ben,[{transform:'translateY(0)'},{transform:'translateY(-5px)',offset:.45},{transform:'translateY(0)'}],360);
      }else{
        motion(enemy,[{transform:'translateX(0)'},{transform:'translateX(-12px)',offset:.35},{transform:'translateX(0)'}],280);
        motion(andre,[{opacity:1},{opacity:.5,offset:.4},{opacity:1}],240);
        if(cue.action==='help')motion(ben,[{transform:'translate(0,0)'},{transform:'translate(8px,-9px)',offset:.4},{transform:'translate(0,0)'}],440);
      }
      // Only this decorative scene shakes, never the controls or page.
      motion(scene,[{transform:'translateX(0)'},{transform:'translateX(-2px)'},{transform:'translateX(2px)'},{transform:'translateX(0)'}],160);
    }
    document.addEventListener('visibilitychange',()=>{arena.classList.toggle('is-paused',!active||!!document.hidden);if(document.hidden)stopAnimations();});
    root.addEventListener('pagehide',hide);root.addEventListener('resize',stopAnimations);
    root.matchMedia?.('(prefers-reduced-motion: reduce)').addEventListener?.('change',stopAnimations);
    return {model,arena,render,checkpoint,hide,animate,capture:()=>D.capture(engine),record:(ctx,result,options)=>model.record(ctx,result,options),get summary(){return shown;}};
  }
  root.AndreDuelView={create};
})(window);
