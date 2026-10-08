import {NextRequest} from 'next/server'
import {db} from '@/lib/db'
import {ok,fail} from '@/lib/http'

export async function GET(req:NextRequest){
  try{
    const p=req.nextUrl.searchParams
    const from=(p.get('from')||'').trim().toLowerCase()
    const to=(p.get('to')||'').trim().toLowerCase()
    const rows=await db.flight.findMany({orderBy:{price:'asc'}})
    const filtered=rows.filter(x=>
      (!from||x.fromCity.toLowerCase().includes(from)) &&
      (!to||x.toCity.toLowerCase().includes(to))
    )
    return ok(filtered)
  }catch(e:any){
    console.error('GET /api/flights failed:',e)
    return fail('Unable to load flights. Make sure PostgreSQL is running and the database has been seeded.',500)
  }
}
