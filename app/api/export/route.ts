import {period,compose,csv} from '@/lib/model.mjs';
import {reply,state,assertAccount,rateLimit} from '@/lib/server';
import {liveSource} from '@/lib/source';
export const dynamic='force-dynamic';
export async function GET(request:Request){try{await rateLimit(request);const u=new URL(request.url);assertAccount(u);const p=period(u.searchParams.get('start'),u.searchParams.get('end'));const source=await liveSource(p);if(source.status!=='ready')return reply({error:'Live reporting is not connected.'},503);const s=await state(p);const report=compose(source,s.published,p,u.searchParams.get('campaign')||'all');return new Response(csv(report),{headers:{'Content-Type':'text/csv;charset=utf-8','Content-Disposition':`attachment; filename="the-vie-${p.start}-${p.end}.csv"`,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});}catch{return reply({error:'Export is unavailable.'},400);}}
