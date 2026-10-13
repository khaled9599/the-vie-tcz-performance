import {ACCOUNT,BASE,isVie,period} from './model.mjs';
// Runtime data is supplied separately from source/builds and always labelled a snapshot.
export function snapshotSource(raw,p){
 if(!raw)return null;
 try{
  const s=JSON.parse(raw);period(s.start,s.end);
  if(s.account!==ACCOUNT||s.currency!=='EGP'||!Number.isFinite(Date.parse(s.refreshedAt))||!Array.isArray(s.campaigns)||s.campaigns.length>100||!Array.isArray(s.rows)||s.rows.length>20000)return null;
  if(p.start<s.start||p.end>s.end)return null;
  const map=new Map();
  for(const c of s.campaigns){if(!/^\d+$/.test(c.id)||!isVie(c.name)||typeof c.lead!=='boolean'||map.has(c.id))return null;map.set(c.id,{id:c.id,name:c.name,lead:c.lead,values:{spend:0,impressions:0,clicks:0,leads:0}})}
  const days=[],seen=new Set();
  for(const r of s.rows){if(!Array.isArray(r)||r.length!==6||!map.has(r[1])||r[0]<s.start||r[0]>s.end||seen.has(r[0]+':'+r[1]))return null;period(r[0],r[0]);seen.add(r[0]+':'+r[1]);if(r.slice(2).some((v,i)=>typeof v!=='number'||!Number.isFinite(v)||v<0||(i>0&&!Number.isInteger(v))))return null;
   if(r[0]<p.start||r[0]>p.end)continue;
   const values=Object.fromEntries(BASE.map((k,i)=>[k,r[i+2]]));const c=map.get(r[1]);for(const k of BASE)c.values[k]+=values[k];days.push({date:r[0],campaign:r[1],...values});
  }
  return {status:'ready',sourceMode:'snapshot',currency:'EGP',refreshedAt:s.refreshedAt,coverage:{start:s.start,end:s.end},campaigns:[...map.values()],days};
 }catch{return null;}
}
