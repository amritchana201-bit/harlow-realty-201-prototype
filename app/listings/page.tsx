import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { ListingCard } from '@/components/ui/listing-card'

const placeholderListing = {
  address: '123 Lakeshore Blvd W, Toronto',
  price: '$2,450,000',
  beds: 4,
  baths: 3,
  sqft: '3,200',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=450&fit=crop',
}

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
            <ListingCard listing={placeholderListing} index={0} />
            
            {/* Supporting text in the grid to explain the placeholder nature */}
            <div className="flex flex-col justify-center p-8 rounded-2xl md:rounded-3xl border border-white/5 bg-white/[0.02]">
              <h3 className="text-[#27e9b5] text-xl font-medium mb-3">Expanding Soon</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                We are currently migrating our full property database to this new portal. Check back shortly for updated luxury inventory in Toronto, Oakville, and Mississauga.
              </p>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}
