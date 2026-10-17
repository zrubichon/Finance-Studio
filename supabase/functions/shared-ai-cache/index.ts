// Only the FinanceStudio backend knows the dedicated cache token. The service
// credential stays in Supabase's runtime; this endpoint cannot access user tables.
const base=Deno.env.get('SUPABASE_URL')!;
const secret=(()=>{try{return JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS')||'{}').default||Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;}catch{return Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;}})();
async function db(path:string,method='GET',body?:unknown){const r=await fetch(`${base}/rest/v1/${path}`,{method,headers:{apikey:secret,...(secret.startsWith('sb_secret_')?{}:{Authorization:`Bearer ${secret}`}),'Content-Type':'application/json',Prefer:'return=representation'},...(body===undefined?{}:{body:JSON.stringify(body)})});if(!r.ok)throw Error(`Cache database ${r.status}`);return r.status===204?null:r.json();}
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
Deno.serve(async req=>{
 if(req.method!=='POST')return json({error:'Method not allowed'},405);
 const token=req.headers.get('x-financestudio-cache-token')||'';if(!/^[a-f0-9]{64}$/.test(token))return json({error:'Unauthorized'},401);
 try{
 const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token)))).map(n=>n.toString(16).padStart(2,'0')).join('');
 const config=await db('shared_ai_backend_config?select=token_sha256&id=eq.true');
 const expected=config?.[0]?.token_sha256||'';let mismatch=hash.length^expected.length;for(let i=0;i<hash.length;i++)mismatch|=hash.charCodeAt(i)^(expected.charCodeAt(i)||0);if(mismatch)return json({error:'Unauthorized'},401);
 const raw=await req.text();if(raw.length>180000)return json({error:'Too large'},413);const body=JSON.parse(raw);
 if(!/^[a-f0-9]{64}$/.test(body.key)||!['study','news'].includes(body.scope))return json({error:'Invalid cache identity'},400);
 if(body.action==='claim')return json(await db('rpc/claim_shared_ai_card','POST',{p_key:body.key,p_scope:body.scope}));
 if(!/^[a-f0-9-]{36}$/.test(body.lease||''))return json({error:'Invalid lease'},400);
 const where=`cache_key=eq.${body.key}&scope=eq.${body.scope}&lease_id=eq.${body.lease}&status=eq.pending`;
 if(body.action==='complete'){
  if(!body.payload||typeof body.payload!=='object'||Array.isArray(body.payload)||typeof body.payload.answer!=='string'||!body.payload.answer.trim())return json({error:'Incomplete answer'},400);
  const rows=await db(`shared_ai_cards?${where}`,'PATCH',{status:'ready',payload:body.payload,updated_at:new Date().toISOString()});return json({saved:rows.length===1});
 }
 if(body.action==='release'){await db(`shared_ai_cards?${where}`,'DELETE');return json({released:true});}
 return json({error:'Unknown action'},400);
 }catch{return json({error:'Cache unavailable'},503);}
});
