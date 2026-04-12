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
        'group relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/2] rounded-2xl md:rounded-3xl overflow-visible cursor-pointer',
        className
      )}
    >
      {/* Premium Desktop-Only Background Glow */}
      <div className="absolute inset-4 bg-[#27e9b5]/[0.08] blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden lg:block" />

      {/* Main Card Container with overflow hidden to clip image */}
      <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg transition-transform duration-500 group-hover:translate-y-[-2px]">
        {/* Full-bleed background image */}
        <Image
          src={listing.image}
          alt={`Property at ${listing.address}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Gradient overlay for text readability */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)',
          }}
        />

        {/* Bottom glass overlay with property info */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
          <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-xl md:rounded-2xl py-3 px-4 md:py-4 md:px-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            {/* Price and Title */}
            <div className="mb-2">
              <p className="text-xl md:text-2xl font-medium text-white mb-0.5">
                {listing.price}
              </p>
              <h3 className="text-sm md:text-base font-normal text-white/90 line-clamp-1">
                {listing.address}
              </h3>
            </div>

            {/* Property specs */}
            <div className="flex items-center gap-4 md:gap-5 text-xs md:text-sm text-white/70">
              <span className="flex items-center gap-1.5 font-normal">
                <Bed size={14} className="text-white/60" />
                {listing.beds} Beds
              </span>
              <span className="flex items-center gap-1.5 font-normal">
                <Bath size={14} className="text-white/60" />
                {listing.baths} Baths
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
