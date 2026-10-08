import { NextResponse } from 'next/server'
export const ok=(data:any,status=200)=>NextResponse.json({success:true,data},{status})
export const fail=(error:string,status=400)=>NextResponse.json({success:false,error},{status})
export function statusFor(e:any){if(e?.message==='UNAUTHORIZED')return 401; if(e?.code==='P2002')return 409; if(e?.code==='P2025')return 404; return 500}
