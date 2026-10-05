/* Compact rows from measured chip widths; no learning state or DOM dependency. */
(function(root){
  'use strict';
  function pack(items,width,gap=4){
    if(!items.length)return [];
    if(!Number.isFinite(width)||width<=0)return [items.slice()];
    gap=Math.max(0,gap);
    const entries=items.map((item,index)=>({item,index,width:item.width}));
    const used=row=>row.reduce((sum,e)=>sum+e.width,0)+gap*Math.max(0,row.length-1);
    // Retain an ordinary wrapping candidate so packing never adds rows.
    const ordinary=[];
    for(const entry of entries){
      const row=ordinary.at(-1);
      if(row&&used(row)+gap+entry.width<=width)row.push(entry);
      else ordinary.push([entry]);
    }
    const packed=[];
    let remaining=entries.slice();
    // Pixel rounding is conservative; cap work even on very wide screens.
    const quantum=Math.max(1,(width+gap)/4096),capacity=Math.floor((width+gap)/quantum);
    while(remaining.length){
      const states=Array(capacity+1).fill(null);states[0]={index:-1};
      remaining.forEach((entry,index)=>{
        const cost=Math.ceil((entry.width+gap)/quantum);
        for(let sum=capacity-cost;sum>=0;sum--)if(states[sum]&&!states[sum+cost])states[sum+cost]={index,previous:states[sum]};
      });
      let sum=capacity;while(sum>0&&!states[sum])sum--;
      const selected=new Set();
      for(let state=states[sum];state?.index>=0;state=state.previous)selected.add(state.index);
      // An oversized chip still gets its own row instead of being dropped.
      if(!selected.size)selected.add(0);
      packed.push(remaining.filter((_,index)=>selected.has(index)));
      remaining=remaining.filter((_,index)=>!selected.has(index));
    }
    const dense=rows=>rows.sort((a,b)=>used(b)-used(a)||a[0].index-b[0].index);
    dense(ordinary);dense(packed);
    let best=ordinary;
    if(packed.length<ordinary.length)best=packed;
    else if(packed.length===ordinary.length){
      for(let index=0;index<packed.length;index++){
        const difference=used(packed[index])-used(ordinary[index]);
        if(difference){if(difference>0)best=packed;break;}
      }
    }
    return best.map(row=>row.map(entry=>entry.item));
  }
  const api={pack};
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.AndreFilterLayout=api;
})(typeof globalThis==='object'?globalThis:this);
