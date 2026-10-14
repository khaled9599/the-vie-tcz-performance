import React from 'react';
import {createRoot} from 'react-dom/client';
import Dashboard from '../../components/dashboard';
import Admin from '../../components/admin';
import Editor from '../../components/site-editor';
import {compose,csv,emptyConfig} from '../../lib/model.mjs';
import {snapshotSource} from '../../lib/snapshot.mjs';
import './style.css';
const nativeFetch=window.fetch.bind(window);
window.fetch=async(input:any,init?:RequestInit)=>{
 const url=new URL(typeof input==='string'?input:input.url,location.href);
 if(url.origin!==location.origin||!url.pathname.startsWith('/api/'))return nativeFetch(input,init);
 const response=await nativeFetch('/api.php?route='+encodeURIComponent(url.pathname.slice(5))+'&'+url.searchParams,init);
 if(!response.ok)return response;
 const data=await response.json();
 if(url.pathname==='/api/report'||url.pathname==='/api/admin'&&(!init?.method||init.method==='GET')){
  const p={start:url.searchParams.get('start'),end:url.searchParams.get('end')};
  const source=snapshotSource(JSON.stringify(data.snapshot),p)||{status:'unconnected',currency:'EGP',refreshedAt:null,campaigns:[],days:[]};
  const result=url.pathname==='/api/report'?compose(source,data.config||emptyConfig(),p,url.searchParams.get('campaign')||'all'):{state:data.state,source,preview:compose(source,data.state.draft,p),history:data.history};
  return new Response(JSON.stringify(result),{status:200,headers:{'Content-Type':'application/json'}});
 }
 return new Response(JSON.stringify(data),{status:response.status,headers:{'Content-Type':'application/json'}});
};
// Export exactly the same projection used on screen; do not derive another dataset.
document.addEventListener('click',async e=>{const a=(e.target as Element).closest('a.export') as HTMLAnchorElement;if(!a||!a.href.includes('/api/export'))return;e.preventDefault();try{const u=new URL(a.href);const r=await fetch('/api/report?'+u.searchParams);if(!r.ok)throw Error('Export unavailable');const report=await r.json();if(report.status!=='ready')throw Error('No verified report for this period');const blob=new Blob([csv(report)],{type:'text/csv;charset=utf-8'}),href=URL.createObjectURL(blob),link=document.createElement('a');link.href=href;link.download='the-vie-report.csv';link.click();URL.revokeObjectURL(href);}catch(err:any){alert(err.message)}});
const page=location.pathname.replace(/\/$/,'');
createRoot(document.getElementById('root')!).render(page==='/editor'?<Editor/>:page==='/admin'?<Admin/>:<Dashboard/>);
