const {app}=require('./app.cjs');
function study({word='ev',direction='tr',...options}={}){const a=app(options);a.run('openLearnMode("typing");');const id=a.run('AndreWords.byLemma['+JSON.stringify(word)+'].id');a.run('for(const w of SentenceGame.engine.missingWords()){const p=WordTrainer.model.progress(w.id);p.spoken=true;p.choice=true;}WordTrainer.model.state.current={id:'+JSON.stringify(id)+',phase:"typing",direction:'+JSON.stringify(direction)+',draft:"",attempts:0,reveal:false,done:false,assisted:false};WordTrainer.next()');return a;}
const type=(a,text)=>{for(const char of text)a.run('WordTrainer.type('+JSON.stringify(char)+')');};
module.exports={study,type};
