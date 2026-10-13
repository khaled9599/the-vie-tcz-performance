import {period,compose} from '@/lib/model.mjs';
import {reply,state,assertAccount,rateLimit} from '@/lib/server';
import {liveSource} from '@/lib/source';
export const dynamic='force-dynamic';
export async function GET(request:Request){try{await rateLimit(request);const url=new URL(request.url);assertAccount(url);const p=period(url.searchParams.get('start'),url.searchParams.get('end'));const source=await liveSource(p);const s=await state(p);return reply(compose(source,s.published,p,url.searchParams.get('campaign')||'all'));}catch(e:any){return reply({error:e.message==='RATE_LIMIT'?'Too many requests. Try again shortly.':'The report could not be loaded.'},e.message==='RATE_LIMIT'?429:400);}}
