export const image = (id: string, width = 1000, height = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=85`

export type TravelItem = { id: string; name: string; place: string; price: number; rating: number; image: string; category?: string; description?: string }

const destinationSeed: Array<[string,string,string,string,string]> = [
  ['goa','Goa','India','Sun, sea & slow days','photo-1512343879784-a960bf40e7f2'], ['bali','Bali','Indonesia','Tropical escapes','photo-1537996194471-e657df975ab4'], ['dubai','Dubai','United Arab Emirates','City lights & desert','photo-1512453979798-5ea266f8880c'], ['paris','Paris','France','Romance & culture','photo-1502602898657-3e91760cbb34'], ['singapore','Singapore','Singapore','A city in a garden','photo-1525625293386-3f8f99389edd'], ['maldives','Maldives','Maldives','Blue water, quiet mornings','photo-1514282401047-d79a71a590e8'], ['tokyo','Tokyo','Japan','Neon nights and old lanes','photo-1540959733332-eab4deabeeaf'], ['london','London','United Kingdom','Stories around every corner','photo-1513635269975-59663e0ac1ad']
]
export const destinations: Array<{id:string;name:string;country:string;tag:string;image:string}> = destinationSeed.map(([id,name,country,tag,photo]) => ({ id,name,country,tag,image:image(photo) }))

const staySeed: [string,string,string,number,number,string,string][] = [
  ['postcard-cuelim','The Postcard Cuelim','South Goa, India',18400,4.9,'photo-1566073771259-6a8506099945','Luxury'],
  ['alila-seminyak','Alila Seminyak','Bali, Indonesia',14800,4.8,'photo-1582719478250-c89cae4dc85b','Beach'],
  ['ritz-carlton','The Ritz-Carlton','Dubai, UAE',21600,4.9,'photo-1551882547-ff40c63fe5fa','Luxury'],
  ['aman-tokyo','Aman Tokyo','Tokyo, Japan',29000,4.9,'photo-1564501049412-61c2a3083791','Luxury'],
  ['capella-singapore','Capella Singapore','Singapore',24800,4.8,'photo-1542314831-068cd1dbfeeb','Nature'],
  ['le-meurice','Le Meurice','Paris, France',32000,4.7,'photo-1566073771259-6a8506099945','Culture']
]
export const stays: TravelItem[] = staySeed.map(([id,name,place,price,rating,photo,category]) => ({id,name,place,price,rating,image:image(photo),category}))

const experienceSeed: [string,string,string,number,number,string,string][] = [
  ['dudhsagar-waterfall','Dudhsagar Waterfall Trek','Goa, India',2499,4.9,'photo-1500534623283-312aade485b7','Adventure'],
  ['sunset-catamaran','Sunset Catamaran Cruise','Dubai, UAE',4200,4.8,'photo-1530789253388-582c481c54b0','Water Sports'],
  ['ubud-rice-terrace','Ubud Rice Terrace Walk','Bali, Indonesia',1850,4.9,'photo-1539367628448-4bc5c9d171c8','Nature'],
  ['old-goa-food-walk','Old Goa Food Walk','Goa, India',1800,4.7,'photo-1552566626-52f8b828add9','Food'],
  ['paris-after-dark','Paris After Dark','Paris, France',3200,4.8,'photo-1502602898657-3e91760cbb34','Culture'],
  ['desert-safari','Red Dune Desert Safari','Dubai, UAE',3900,4.8,'photo-1548013146-72479768bada','Adventure']
]
export const experiences: TravelItem[] = experienceSeed.map(([id,name,place,price,rating,photo,category]) => ({id,name,place,price,rating,image:image(photo),category}))

export const money = (value: number) => `₹${value.toLocaleString('en-IN')}`
export const findDestination = (id: string) => destinations.find((item) => item.id === id) ?? destinations[0]
export const findStay = (id: string) => stays.find((item) => item.id === id) ?? stays[0]
export const findExperience = (id: string) => experiences.find((item) => item.id === id) ?? experiences[0]

export const defaultTrips = [{ id:'goa-escape', name:'Goa Escape', dates:'12 Jun – 17 Jun', travelers:4, budget:60000, destination:'Goa, India' }, { id:'bali-reset', name:'Bali Reset', dates:'04 Aug – 10 Aug', travelers:2, budget:85000, destination:'Bali, Indonesia' }]

const destinationImages = ['photo-1526772662000-3f88f10405ff','photo-1476514525535-07fb3b4ae5f1','photo-1500534623283-312aade485b7','photo-1499856871958-5b9627545d1a','photo-1501785888041-af3ef285b470','photo-1469474968028-56623f02e42e','photo-1519681393784-d120267933ba','photo-1441974231531-c6227db76b6e','photo-1500534623283-312aade485b7','photo-1511497584788-876760111969','photo-1500530855697-b586d89ba3ee','photo-1470770841072-f978cf4d019e']
export const allDestinations = [...destinations, ...['switzerland','new-york','thailand','london','rome','istanbul','sydney','zanzibar','kerala','jaipur','rishikesh','phuket'].map((id, index) => ({ id, name:id.split('-').map((word) => word[0].toUpperCase()+word.slice(1)).join(' '), country:'Explore the world', tag:['Adventure','Beach','Luxury','Culture'][index % 4], image:image(destinationImages[index % destinationImages.length]) }))]
const stayImages = ['photo-1601918774946-25832a4be0d6','photo-1590490360182-c33d57733427','photo-1600607687920-4e2a09cf159d','photo-1578683010236-d716f9a3f461','photo-1584132967334-10e028bd69f7','photo-1596394516093-501ba68a0ba6','photo-1602002418082-a4443e081dd1','photo-1542314831-068cd1dbfeeb']
const experienceImages = ['photo-1464822759023-fed622ff2c3b','photo-1470770841072-f978cf4d019e','photo-1493246507139-91e8fad9978e','photo-1500530855697-b586d89ba3ee','photo-1469474968028-56623f02e42e','photo-1530789253388-582c481c54b0','photo-1488646953014-85cb44e25828','photo-1500534623283-312aade485b7']
export const allStays = [...stays, ...Array.from({length: 24}, (_, index) => ({ ...stays[index % stays.length], id:`stay-${index+1}`, name:`${['Aurora','Saffron','Harbor','Mosaic','Olive','Juniper'][index % 6]} House ${index+1}`, image:image(stayImages[index % stayImages.length]), price:10500 + index * 1375, rating:Number((4.5 + (index % 5) * 0.1).toFixed(1)) }))]
export const allExperiences = [...experiences, ...Array.from({length: 24}, (_, index) => ({ ...experiences[index % experiences.length], id:`experience-${index+1}`, name:`${['Sunrise','Hidden','Local','Golden','Wild','Slow'][index % 6]} ${['Walk','Escape','Adventure','Discovery'][index % 4]} ${index+1}`, image:image(experienceImages[index % experienceImages.length]), price:1200 + index * 325, rating:Number((4.4 + (index % 6) * 0.1).toFixed(1)) }))]
