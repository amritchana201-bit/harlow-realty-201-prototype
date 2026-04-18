import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { ListingCard } from '@/components/ui/listing-card'

const listings = [
  {
    address: '123 Lakeshore Blvd W, Toronto',
    price: '$2,450,000',
    beds: 4,
    baths: 3,
    sqft: '3,200',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=450&fit=crop',
  },
  {
    address: '456 King Street E, Toronto',
    price: '$1,875,000',
    beds: 3,
    baths: 2,
    sqft: '2,100',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=450&fit=crop',
  },
  {
    address: '789 Trafalgar Rd, Oakville',
    price: '$3,200,000',
    beds: 5,
    baths: 4,
    sqft: '4,500',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=450&fit=crop',
  },
  {
    address: '321 Dundas St W, Mississauga',
    price: '$1,650,000',
    beds: 4,
    baths: 3,
    sqft: '2,800',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=450&fit=crop',
  },
  {
    address: '555 Bay Street, Toronto',
    price: '$2,100,000',
    beds: 3,
    baths: 2,
    sqft: '2,400',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=450&fit=crop',
  },
  {
    address: '888 Spadina Ave, Toronto',
    price: '$1,950,000',
    beds: 2,
    baths: 2,
    sqft: '1,800',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=450&fit=crop',
  },
  {
    address: '222 Queen St W, Toronto',
    price: '$2,800,000',
    beds: 4,
    baths: 3,
    sqft: '3,100',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=450&fit=crop',
  },
]

export const metadata = {
  title: 'All Listings | Harlow Realty',
  description: 'Explore our full portfolio of premium properties across Toronto and the GTA.',
}

export default function ListingsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen">
        <SectionWrapper bgColor="black" className="pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="max-w-3xl mb-12 md:mb-20">
            <h1 className="text-4xl md:text-6xl font-semibold text-[#F5F5F5] mb-6 tracking-tight">
              Our <span className="text-[#27e9b5]">Inventory</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
              Explore our curated selection of ultra-premium properties. This page serves as a complete showcase of Harlow Realty's exclusive listings and full property portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing, index) => (
              <ListingCard key={index} listing={listing} index={index} />
            ))}
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}
