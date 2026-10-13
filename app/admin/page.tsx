import {requireOwner} from '@/lib/server';
import {chatGPTSignInPath,getChatGPTUser} from '../chatgpt-auth';
import Admin from '@/components/admin';
export const dynamic='force-dynamic';
export default async function Page(){const user=await getChatGPTUser();if(!user)return <main className="auth"><img src="/assets/tcz-lockup.svg" alt="The Creative Zone"/><p className="eyebrow">OWNER ACCESS</p><h1>Your reporting<br/>control room.</h1><p>Sign in with your authorized ChatGPT account to manage The Vie.</p><a className="button primary" href={chatGPTSignInPath('/admin')} target="_top">Sign in with ChatGPT ↗</a><a href="/">Back to dashboard</a></main>;try{await requireOwner();}catch{return <main className="auth"><h1>Owner access required.</h1><p>This account cannot access administration.</p><a href="/">Back to dashboard</a></main>}return <Admin/>}
