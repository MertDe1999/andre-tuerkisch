/* Arena presentation: observes outcomes; animations never advance an exercise. */
(function(root){
  'use strict';
  const D=root.AndreDuel,art=root.AndreDuelArt;
  const strikeDuration=640,impactMs=strikeDuration/2;
  const make=(tag,cls,text='')=>{const n=document.createElement(tag);n.className=cls;n.textContent=text;return n;};
  function create(engine){
    const model=new D.Duel(root.localStorage),arena=make('section','sentence-duel');arena.id='sentenceDuel';arena.hidden=true;arena.setAttribute('role','group');
    const header=make('div','duel-header'),team=make('div','duel-team-label','André & Ben'),hearts=make('span','duel-hearts'),foe=make('div','duel-foe-label'),name=make('span','duel-name'),hp=make('progress','duel-health');
    hp.setAttribute('aria-label','Lebenspunkte des Gegners');team.append(hearts);const remaining=make('span','duel-remaining');remaining.id='duelRemaining';foe.append(name,hp,remaining);header.append(team,foe);
    for(let i=0;i<3;i++){const h=make('span','duel-heart');h.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21S2 15 2 8a5.5 5.5 0 0 1 10-3 5.5 5.5 0 0 1 10 3c0 7-10 13-10 13Z"/></svg>';hearts.append(h);}
    const scene=make('div','duel-scene'),landscape=make('div','duel-landscape'),andre=make('div','duel-actor duel-andre'),ben=make('div','duel-actor duel-ben'),enemy=make('div','duel-actor duel-enemy'),spark=make('div','duel-spark','✦');
    scene.id='sentenceDuelScene';andre.id='duelAndre';ben.id='duelBen';enemy.id='duelEnemy';
    for(const [node,markup] of [[andre,art.andre],[ben,art.ben]]){const sprite=make('div','duel-sprite');sprite.innerHTML=markup;node.append(sprite);}
    const enemySprite=make('div','duel-sprite');enemy.append(enemySprite);scene.setAttribute('aria-hidden','true');scene.append(landscape,andre,ben,enemy,spark);
    const status=make('span','duel-status');status.id='duelStatus';header.insertBefore(status,foe);arena.append(header,scene);
    let shown=null,lastTask=null,active=false,enemyShape='',stageLevel=0,stageName='',animations=new Set();
    function stopAnimations(){for(const a of [...animations])a.cancel();animations.clear();delete arena.dataset.action;}
    function motion(node,frames,duration=350,delay=0){let a;const cleanup=()=>animations.delete(a);a=root.AndreMotion.play(node,frames,{duration,delay,easing:'linear',slot:'duel',cleanup});if(a)animations.add(a);}
    function update(summary){
      if(!summary)return;const changed=shown?.key!==summary.key;shown=summary;if(changed)stopAnimations();
      if(stageLevel!==summary.level){
        stageLevel=summary.level;
        const stage=root.AndreDuelStages.forLevel(stageLevel);
        stageName=stage.name;landscape.innerHTML=stage.svg;
        arena.style.setProperty('--stage-tint',stage.tint);
      }
      arena.classList.toggle('is-won',summary.outcome==='won');arena.classList.toggle('is-escaped',summary.outcome==='escaped');
      arena.style.setProperty('--duel-enemy','var(--'+summary.enemy.color+')');
      arena.style.setProperty('--duel-outline',summary.enemy.color==='blue'?'var(--text)':'var(--'+summary.enemy.color+'-dark)');
      if(enemyShape!==summary.enemy.shape){enemyShape=summary.enemy.shape;enemySprite.innerHTML=art.enemy(enemyShape);}
      remaining.textContent=summary.outcome==='active'?'Noch '+summary.hp+' Treffer':'';name.textContent=summary.enemy.name;hp.max=summary.maxHp;hp.value=summary.hp;
      for(let i=0;i<hearts.children.length;i++)hearts.children[i].classList.toggle('is-empty',i>=summary.hearts);
      hearts.setAttribute('aria-label',summary.hearts+' von 3 Herzen'+(summary.rescues?' · Ben hat geholfen':''));
      status.textContent=summary.outcome==='won'?'Geschafft!':summary.outcome==='escaped'?'Gegner zieht weiter':'';
      arena.setAttribute('aria-label','Duell mit André und Ben · '+stageName+'. '+summary.enemy.name+': '+summary.hp+' von '+summary.maxHp+' Lebenspunkten. '+summary.hearts+' von 3 Herzen. '+summary.done+' von '+summary.total+' Aufgaben.');
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
      const attacking=['hit','assist','win'].includes(cue.action);
      if(attacking){
        const dog=ben.getBoundingClientRect(),foeBox=enemy.getBoundingClientRect(),field=scene.getBoundingClientRect();
        const contact=foeBox.left+foeBox.width*.23;
        const travel=Math.max(0,contact-dog.left-dog.width*.83);
        const lift=Math.min(10,field.height*.12);
        spark.style.left=(contact-field.left)+'px';
        spark.style.bottom=(foeBox.height*.4)+'px';
        const step=(offset,fraction,jump,angle=0)=>({offset,transform:'translate('+travel*fraction+'px,'+(-lift*jump)+'px) rotate('+angle+'deg)'});
        motion(ben,[step(0,0,0),step(.12,0,.05,-6),step(.26,.35,.75,3),step(.35,.56,0),step(.47,.94,1,8),
          step(.50,1,.55,10),step(.57,.96,.25,2),step(.70,.61,.8,-5),step(.83,.34,0),step(.92,.12,.45),step(1,0,0)],strikeDuration);
        const armPose=[{opacity:0},{opacity:1,offset:.10},{opacity:1,offset:.58},{opacity:0,offset:.76},{opacity:0}];
        motion(andre.querySelector('.duel-arm-point'),armPose,strikeDuration);
        motion(andre.querySelector('.duel-arm-rest'),armPose.map(k=>({...k,opacity:1-k.opacity})),strikeDuration);
        motion(andre,[{transform:'rotate(0)'},{transform:'rotate(5deg)',offset:.18},{transform:'rotate(3deg)',offset:.54},{transform:'rotate(0)'}],strikeDuration);
        const stride=(offset,angle)=>({offset,transform:'rotate('+angle+'deg)'});
        motion(ben.querySelector('.duel-front-paw'),[stride(0,0),stride(.16,12),stride(.26,-25),stride(.35,23),stride(.47,-18),
          stride(.56,7),stride(.70,-22),stride(.83,21),stride(.92,-12),stride(1,0)],strikeDuration);
        motion(ben.querySelector('.duel-strike-paw'),[stride(0,0),stride(.16,-12),stride(.26,23),stride(.35,-18),stride(.42,12),
          stride(.50,-66),stride(.58,-28),stride(.70,20),stride(.83,-20),stride(.92,12),stride(1,0)],strikeDuration);
        const recoil=[{opacity:1,transform:'none'},{opacity:1,transform:'none',offset:.5},{opacity:1,transform:'translate(5px,-2px) scale(.91,1.05)',offset:.58}];
        recoil.push(cue.action==='win'?{opacity:0,transform:'translateY(-5px) scale(.55)'}:{opacity:1,transform:'none'});
        motion(enemy,recoil,strikeDuration);
        motion(spark,[{opacity:0,transform:'scale(.4)'},{opacity:1,transform:'scale(1.2)',offset:.25},{opacity:0,transform:'scale(1.5) rotate(25deg)'}],175,impactMs);
      }else{
        motion(enemy,[{transform:'translateX(0)'},{transform:'translateX(-12px)',offset:.35},{transform:'translateX(0)'}],280);
        motion(andre,[{opacity:1},{opacity:.5,offset:.4},{opacity:1}],240);
        if(cue.action==='help')motion(ben,[{transform:'translate(0,0)'},{transform:'translate(8px,-9px)',offset:.4},{transform:'translate(0,0)'}],440);
      }
      // Only this decorative scene shakes, never the controls or page.
      motion(scene,[{transform:'translateX(0)'},{transform:'translateX(-2px)'},{transform:'translateX(2px)'},{transform:'translateX(0)'}],125,attacking?impactMs:95);
    }
    document.addEventListener('visibilitychange',()=>{arena.classList.toggle('is-paused',!active||!!document.hidden);if(document.hidden)stopAnimations();});
    root.addEventListener('pagehide',hide);root.addEventListener('resize',stopAnimations);
    root.matchMedia?.('(prefers-reduced-motion: reduce)').addEventListener?.('change',stopAnimations);
    return {model,arena,render,checkpoint,hide,animate,capture:()=>D.capture(engine),record:(ctx,result,options)=>model.record(ctx,result,options),get summary(){return shown;}};
  }
  root.AndreDuelView={create,impactMs};
})(window);
