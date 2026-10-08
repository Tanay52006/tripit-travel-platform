import {db} from '@/lib/db'; import {ok,fail} from '@/lib/http';
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const x=await db.destination.findUnique({where:{id},include:{stays:true,experiences:true,restaurants:true,reviews:{include:{user:{select:{name:true}}}}}});return x?ok(x):fail('Destination not found',404)}
