const {test}=require('node:test'),assert=require('node:assert/strict');
const {edit}=require('../lib/answer-editor');
const {app}=require('./helpers/app.cjs');

test('Delete removes the next full character and keeps the caret in place',()=>{
 const cur={draft:'a😀ş',caret:1};edit(cur,'DELETE');assert.deepEqual(cur,{draft:'aş',caret:1});
 edit(cur,'BACKSPACE');assert.deepEqual(cur,{draft:'ş',caret:0});
 edit(cur,'DELETE');assert.deepEqual(cur,{draft:'',caret:0});
 edit(cur,'DELETE');assert.deepEqual(cur,{draft:'',caret:0});
 cur.draft='ışık';cur.caret=4;edit(cur,'DELETE');assert.deepEqual(cur,{draft:'ışık',caret:4});
});

test('a finished empty answer cannot reactivate its old editable state when tapped',()=>{
 const a=app(),node=a.el('editorAnswer'),cur={draft:'',caret:0};let saved=0;node._saveCaret=()=>saved++;
 a.run('AndreAnswerEditor.draw')(node,cur);assert.ok(node.querySelector('.answer-caret'));
 a.run('AndreAnswerEditor.draw')(node,cur,{editable:false});node.click();
 assert.equal(node.querySelector('.answer-caret'),null);assert.equal(saved,0);assert.equal(node.textContent,'Antwort tippen …');
});
