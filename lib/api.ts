export async function api<T=any>(url:string, options?:RequestInit):Promise<T>{
 const res=await fetch(url,{...options,headers:{'Content-Type':'application/json',...(options?.headers||{})},cache:'no-store'})
 const text=await res.text()
 let body:any={}
 try{body=text?JSON.parse(text):{}}catch{body={}}
 if(!res.ok){
   const message=body?.error||body?.message||`Request failed (${res.status})`
   throw new Error(message)
 }
 return body
}
