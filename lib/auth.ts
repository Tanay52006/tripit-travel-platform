import { cookies } from 'next/headers'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { db } from './db'

const COOKIE='tripit_session'
const secret=()=>process.env.AUTH_SECRET || 'tripit-local-development-secret-change-me'
const sign=(id:string)=>crypto.createHmac('sha256',secret()).update(id).digest('hex')
export async function hashPassword(password:string){return bcrypt.hash(password,12)}
export async function verifyPassword(password:string,hash:string){return bcrypt.compare(password,hash)}
export async function createSession(userId:string){
  const value=`${userId}.${sign(userId)}`
  const jar=await cookies()
  jar.set(COOKIE,value,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:60*60*24*30})
}
export async function clearSession(){(await cookies()).delete(COOKIE)}
export async function getCurrentUser(){
  const value=(await cookies()).get(COOKIE)?.value
  if(!value) return null
  const [id,signature]=value.split('.')
  if(!id || !signature) return null
  const expected=sign(id)
  if(signature.length!==expected.length || !crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected))) return null
  return db.user.findUnique({where:{id},include:{profile:true,preferences:true}})
}
export async function requireUser(){const u=await getCurrentUser(); if(!u) throw new Error('UNAUTHORIZED'); return u}
