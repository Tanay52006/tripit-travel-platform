import {NextRequest} from 'next/server'; import {db} from '@/lib/db'; import {ok,fail} from '@/lib/http'
export async function GET(req:NextRequest){try{
  const p=req.nextUrl.searchParams,q=(p.get('q')||'').toLowerCase(),dest=p.get('destination'),min=Number(p.get('minPrice')||0),max=Number(p.get('maxPrice')||Number.MAX_SAFE_INTEGER),rating=Number(p.get('rating')||0);
    const rows=await db.stay.findMany({include:{destination:true,rooms:true}});
    return ok(rows.filter(x=>(!q||`${x.name} ${x.place} ${x.category}`.toLowerCase().includes(q))&&(!dest||`${x.place} ${x.destination.name}`.toLowerCase().includes(dest.toLowerCase()))&&x.price>=min&&x.price<=max&&x.rating>=rating))
  }catch(e:any){console.error('GET /api/stays failed:',e);return fail('Unable to load stays. Make sure PostgreSQL is running and run npm run db:setup.',500)}}
