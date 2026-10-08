'use client'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import {api} from '@/lib/api'

export default function Flights(){
  const [rows,setRows]=useState<any[]>([])
  const [from,setFrom]=useState('')
  const [to,setTo]=useState('')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')

  const search=async()=>{
    setLoading(true)
    setError('')
    try{
      const r=await api(`/api/flights?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
      setRows(r.data||[])
    }catch(e:any){
      setRows([])
      setError(e?.message||'Unable to load flights.')
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{search()},[])

  return <main className="min-h-screen bg-[#fbfaf7] px-5 py-14 text-[#173b3b]">
    <div className="mx-auto max-w-6xl">
      <Link href="/" className="text-sm font-semibold text-[#df7b47]">← TripIt</Link>
      <h1 className="mt-6 text-5xl font-semibold">Find a flight</h1>
      <div className="mt-8 grid gap-3 rounded-3xl bg-[#edf4f1] p-4 md:grid-cols-[1fr_1fr_auto]">
        <input value={from} onChange={e=>setFrom(e.target.value)} placeholder="From" className="rounded-2xl bg-white px-4 py-3"/>
        <input value={to} onChange={e=>setTo(e.target.value)} placeholder="To" className="rounded-2xl bg-white px-4 py-3"/>
        <button onClick={search} disabled={loading} className="rounded-2xl bg-[#df7b47] px-6 py-3 font-semibold text-white disabled:opacity-60">{loading?'Searching…':'Search'}</button>
      </div>
      {error&&<div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}<button onClick={search} className="ml-3 font-semibold underline">Try again</button></div>}
      {!loading&&!error&&!rows.length&&<div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm"><h2 className="text-xl font-semibold">No flights found</h2><p className="mt-2 text-sm text-[#66746f]">Try another route. Demo data includes Mumbai → Paris, Mumbai → Goa, Mumbai → Dubai, Delhi → Dubai and more.</p></div>}
      <div className="mt-8 space-y-3">{rows.map(x=><div key={x.id} className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm"><div><p className="font-semibold">{x.airline} · {x.flightNumber}</p><p className="mt-1 text-sm text-[#66746f]">{x.fromCity} {x.departure} → {x.toCity} {x.arrival} · {x.duration}{x.stops?` · ${x.stops} stop`: ' · Direct'}</p><p className="mt-1 text-xs text-[#7e8985]">{x.cabinClass} · Demo fare</p></div><div className="flex items-center gap-4"><strong>₹{x.price.toLocaleString('en-IN')}</strong><Link href={`/booking/flight/${x.id}`} className="rounded-full bg-[#173b3b] px-5 py-3 text-sm font-semibold text-white">Select</Link></div></div>)}</div>
    </div>
  </main>
}
