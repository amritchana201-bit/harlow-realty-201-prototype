'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Bed, Bath } from 'lucide-react'
import { cn } from '@/lib/utils'

type Listing = {
  address: string
  price: string
  beds: number
  baths: number
  sqft: string
  image: string
}

type ListingCardProps = {
  listing: Listing
  index: number
  className?: string
}

export function ListingCard({ listing, index, className }: ListingCardProps) {
  return (
    <motion.article
      className={cn(
        'group relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/3] lg:aspect-[3/2] rounded-2xl md:rounded-3xl overflow-visible cursor-pointer',
        className
      )}
    >
      {/* Premium Desktop-Only Background Glow */}
      <div className="absolute inset-4 bg-[#27e9b5]/[0.08] blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden lg:block" />

      {/* Main Card Container with overflow hidden to clip image */}
      <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#27e9b5]/50 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_25px_rgba(39,233,181,0.25)] transition-transform duration-500 group-hover:translate-y-[-2px]">
        {/* Full-bleed background image */}
        <Image
          src={listing.image}
          alt={`Property at ${listing.address}`}
          fill
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* --- MOBILE/TABLET Gradient Overlay (< 900px) --- */}
        <div 
          className="absolute inset-0 pointer-events-none min-[900px]:hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)',
          }}
        />

        {/* --- DESKTOP Seamless Gradient Blur Background (>= 900px) --- */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] pointer-events-none hidden min-[900px]:block z-0 transition-opacity duration-500">
           {/* Darkening base layer to ensure crisp text contrast before the blur */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
           {/* The fading blur effect using mask-image */}
           <div className="absolute inset-0 backdrop-blur-xl [mask-image:linear-gradient(to_top,solid_20%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_20%,transparent_100%)]" />
        </div>

        {/* --- CONTENT CONTAINER --- */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6 min-[900px]:p-0 min-[900px]:px-6 min-[900px]:pb-6 z-10 select-none">
          {/* 
              On Mobile/Tablet, this acts as the solid glass pill.
              On Desktop, we strip the pill styling so text floats seamlessly over the gradient blur layer behind it.
          */}
          <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-xl md:rounded-2xl py-3 px-4 md:py-4 md:px-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] min-[900px]:backdrop-blur-none min-[900px]:bg-transparent min-[900px]:border-none min-[900px]:rounded-none min-[900px]:shadow-none min-[900px]:p-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
            
            {/* Price and Title */}
            <div className="mb-2 min-[900px]:mb-0 min-[900px]:group-hover:mb-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <p className="text-xl md:text-2xl min-[900px]:text-3xl font-medium text-white mb-0.5 min-[900px]:drop-shadow-md transition-all duration-500">
                {listing.price}
              </p>
              <h3 className="text-sm md:text-base min-[900px]:text-lg font-normal text-white/90 line-clamp-1 min-[900px]:drop-shadow-md transition-all duration-500">
                {listing.address}
              </h3>
            </div>

            {/* Property specs */}
            <div className="grid grid-rows-[1fr] min-[900px]:grid-rows-[0fr] min-[900px]:group-hover:grid-rows-[1fr] opacity-100 min-[900px]:opacity-0 min-[900px]:group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="overflow-hidden flex items-center gap-4 md:gap-5 text-xs md:text-sm min-[900px]:text-base text-white/70 min-[900px]:text-white/80 min-h-0">
                <span className="flex items-center gap-1.5 font-normal whitespace-nowrap min-[900px]:drop-shadow-md">
                  <Bed size={16} className="text-white/60 min-[900px]:text-white/80 shrink-0" />
                  {listing.beds} Beds
                </span>
                <span className="flex items-center gap-1.5 font-normal whitespace-nowrap min-[900px]:drop-shadow-md">
                  <Bath size={16} className="text-white/60 min-[900px]:text-white/80 shrink-0" />
                  {listing.baths} Baths
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
