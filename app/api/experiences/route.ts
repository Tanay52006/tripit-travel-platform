import {NextRequest} from 'next/server'; import {db} from '@/lib/db'; import {ok,fail} from '@/lib/http'
export async function GET(req:NextRequest){try{
  const p=req.nextUrl.searchParams,q=(p.get('q')||'').toLowerCase();
    const rows=await db.experience.findMany({include:{destination:true},orderBy:{rating:'desc'}});
    return ok(rows.filter(x=>!q||`${x.name} ${x.place} ${x.category} ${x.destination.name}`.toLowerCase().includes(q)))
  }catch(e:any){console.error('GET /api/experiences failed:',e);return fail('Unable to load experiences. Make sure PostgreSQL is running and run npm run db:setup.',500)}}
