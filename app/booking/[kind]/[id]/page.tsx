import BookingFlow from '@/components/booking/booking-flow'
export default async function Page({params}:{params:Promise<{kind:string,id:string}>}){const p=await params;return <main className="min-h-screen bg-[#fbfaf7] text-[#173b3b]"><BookingFlow kind={p.kind} id={p.id}/></main>}
