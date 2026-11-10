(function(root){
 'use strict';
 const M=root.GardenCloudModel,config=root.MATHEGARTEN_CLOUD||{};
 let adapter,client,user=null,busy=false,timer=null,state='local',detail='',starting=true;
 const key=uid=>'mathegarten-cloud-v1:'+uid;
 function status(next,message=''){state=next;detail=message;paint();}
 function paint(){
  const labels={local:'Auf diesem Gerät',setup:'Online-Speicher vorbereiten',login:'Geräte verbinden',syncing:'Wird abgeglichen …',saved:'Online gespeichert',offline:'Offline · lokal gesichert',error:'Abgleich ausstehend'};
  document.querySelectorAll('[data-cloud-status]').forEach(el=>{el.textContent=labels[state]||labels.local;el.dataset.state=state;});
  const note=document.querySelector('#cloud-note');if(note)note.textContent=detail;
 }
 function cacheRead(uid=user.id){try{return JSON.parse(localStorage.getItem(key(uid)))||null;}catch{throw Error('Der lokale Zwischenspeicher ist nicht verfügbar.');}}
 function cacheWrite(data,uid=user.id){localStorage.setItem(key(uid),JSON.stringify({...data,local:M.project(adapter.get())}));}
 function changed(){if(!client||!user)return;status(navigator.onLine?'syncing':'offline');clearTimeout(timer);timer=setTimeout(sync,1200);}
 async function sync(){
  if(!user||busy||starting)return;
  if(!navigator.onLine){status('offline');return;}
  busy=true;status('syncing');
  const account=user.id;
  try{
   const run=async()=>{
    if(user?.id!==account)return;
    adapter.refreshLocal();
    const guard=()=>{if(user?.id!==account)throw Error('Account changed');};
    const engine=new M.Engine({
     get:()=>{guard();return adapter.get();},put:s=>{guard();adapter.put(s);},cache:c=>{guard();cacheWrite(c,account);},id:()=>crypto.randomUUID(),
     read:async()=>{const {data,error}=await client.from('mathegarten_progress').select('revision,state').eq('user_id',account).maybeSingle();if(error)throw error;return data?{revision:data.revision,state:M.project(adapter.validate(data.state))}:{revision:0,state:M.empty()};},
     write:async p=>{guard();const {data,error}=await client.rpc('mathegarten_save',{expected_revision:p.revision,operation_id:p.id,payload:p.state});if(error)throw error;guard();return {...data,state:M.project(adapter.validate(data.state))};}
    },cacheRead(account));
    await engine.cycle();
   };
   if(navigator.locks)await navigator.locks.request('mathegarten-sync',run);else await run();
   if(user?.id===account)status('saved','Deine Blüten, gelösten Aufgaben und angefangene Runde sind online gesichert.');
  }catch(e){status(navigator.onLine?'error':'offline',e?.code==='PGRST205'||e?.code==='PGRST202'?'Der Online-Speicher ist noch nicht eingerichtet. Dein Stand bleibt auf diesem Gerät.':'Dein Stand bleibt auf diesem Gerät. Der Abgleich wird automatisch erneut versucht.');}
  finally{busy=false;}
 }
 function panel(){
  const esc=adapter.escape;
  let body;
  if(!client){body='<p>Dein Fortschritt wird auf diesem Gerät gespeichert. Die Verbindung zum privaten Online-Speicher wird noch eingerichtet.</p><p>Danach kannst du PC und Handy über dieselbe E-Mail-Adresse verbinden.</p>';}
  else if(user){body=`<p>Verbunden als <b>${esc(user.email)}</b>. Melde dich auf deinem anderen Gerät mit derselben E-Mail-Adresse an.</p><p>Deine Punkte, Aufgaben und die angefangene Runde werden automatisch abgeglichen. Musik und Lautstärke bleiben je Gerät einstellbar.</p><div class="cloud-status-box" data-cloud-status role="status"></div><p id="cloud-note" class="muted"></p><button class="btn primary" data-cloud-action="sync">Jetzt abgleichen</button> <button class="btn" data-cloud-action="logout">Abmelden</button>`;}
  else{body='<p>Ein Garten auf PC und Handy. Melde dich auf beiden Geräten mit derselben E-Mail-Adresse an.</p><form id="cloud-login"><label for="cloud-email"><b>Deine E-Mail-Adresse</b></label><input class="cloud-email" id="cloud-email" type="email" autocomplete="email" required placeholder="du@beispiel.de"><button class="btn primary" type="submit">Anmeldelink anfordern</button></form><p id="cloud-login-feedback" role="status"></p><p class="muted">Du bekommst einen Anmeldelink per E-Mail. Öffne ihn auf dem Gerät und in dem Browser, den du verbinden möchtest. Dein Lernstand ist nur für dein Konto zugänglich.</p><details><summary>Schon lokal gespielt?</summary><p>Dein bisheriger Stand in diesem Browser wird beim ersten Verbinden übernommen. Für eine frühere lokale HTML-Datei kannst du unter „Einstellungen & Sicherung“ einen Export erstellen und hier einlesen.</p></details>';}
  adapter.modal('Dein Garten. Auf jedem Gerät.',body);paint();
 }
 async function login(event){
  event.preventDefault();const field=document.querySelector('#cloud-email'),feedback=document.querySelector('#cloud-login-feedback'),button=event.target.querySelector('button');
  button.disabled=true;feedback.textContent='Dein Anmeldelink wird angefordert …';
  try{const {error}=await client.auth.signInWithOtp({email:field.value.trim(),options:{emailRedirectTo:config.redirect}});if(error)throw error;feedback.textContent='Schau in dein E-Mail-Postfach. Öffne den Anmeldelink auf diesem Gerät in diesem Browser.';}
  catch{feedback.textContent='Der Anmeldelink konnte gerade nicht angefordert werden. Prüfe die Adresse und versuche es etwas später erneut.';}
  finally{button.disabled=false;}
 }
 async function adopt(session){
  const next=session?.user||null;if(next?.id===user?.id)return;
  if(!next){user=null;status('login');return;}
  user=next;
  try{
   const previous=localStorage.getItem('mathegarten-account');const saved=cacheRead();
   if(previous&&previous!==user.id){localStorage.setItem('mathegarten-before-account-change',JSON.stringify(adapter.get()));adapter.put(saved?.local||M.empty());}
   else if(!previous){localStorage.setItem('mathegarten-before-cloud',JSON.stringify(adapter.get()));}
   localStorage.setItem('mathegarten-account',user.id);
   status('syncing');setTimeout(sync,0);
  }catch{status('error','Der Browser erlaubt gerade keine sichere Zwischenspeicherung. Bitte die Speicherung im Browser zulassen.');}
 }
 async function init(io){
  adapter=io;
  document.addEventListener('click',async e=>{
   const action=e.target.closest('[data-cloud-action]')?.dataset.cloudAction;
   if(action==='open')panel();
   if(action==='sync')await sync();
   if(action==='logout'){
    if(busy){adapter.toast('Der Abgleich läuft noch. Bitte einen Moment warten.');return;}
    await sync();if(state!=='saved'){adapter.toast('Bitte erst den ausstehenden Stand abgleichen oder eine Sicherung exportieren.');return;}
    const {error}=await client.auth.signOut({scope:'local'});if(error){adapter.toast('Abmelden hat gerade nicht geklappt.');return;}
    adapter.put(M.empty());adapter.home();status('login');adapter.toast('Abgemeldet. Dein Garten bleibt online gespeichert.');
   }
  });
  document.addEventListener('submit',e=>{if(e.target.id==='cloud-login')login(e);});
  window.addEventListener('online',sync);
  window.addEventListener('offline',()=>{if(user)status('offline');});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync();});
  window.addEventListener('focus',sync);
  window.addEventListener('storage',e=>{if(e.key==='mathegarten-v1')adapter.refreshLocal();});
  if(!config.url||!config.key||location.protocol==='file:'){starting=false;status(config.url?'local':'setup');return;}
  try{
   client=root.supabase.createClient(config.url,config.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true},global:{fetch:(url,options={})=>fetch(url,{...options,signal:options.signal||AbortSignal.timeout(15000)})}});
   client.auth.onAuthStateChange((_event,session)=>setTimeout(()=>adopt(session),0));
   const {data,error}=await client.auth.getSession();if(error)throw error;
   starting=false;await adopt(data.session);if(!user)status('login');
   setInterval(sync,20000);
  }catch{starting=false;client=null;status('error','Die Anmeldung ist gerade nicht erreichbar. Dein lokaler Stand bleibt erhalten.');}
 }
 root.GardenCloud={init,changed,paint,panel,sync};
})(window);
