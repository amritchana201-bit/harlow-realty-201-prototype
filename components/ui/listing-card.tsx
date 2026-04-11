'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Bed, Bath, Square } from 'lucide-react'
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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      whileHover={{ y: -4 }}
      className={cn(
        'group relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer',
        'shadow-lg hover:shadow-2xl transition-shadow duration-500',
        className
      )}
    >
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
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Bottom glass overlay with property info */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
        <div className="backdrop-blur-xl bg-white/15 border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-5">
          {/* Price and Title */}
          <div className="mb-3">
            <p className="text-xl md:text-2xl font-semibold text-white mb-1">
              {listing.price}
            </p>
            <h3 className="text-sm md:text-base font-medium text-white/90 line-clamp-1">
              {listing.address}
            </h3>
          </div>

          {/* Property specs */}
          <div className="flex items-center gap-4 md:gap-5 text-xs md:text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <Bed size={14} className="text-white/70" />
              {listing.beds} Beds
            </span>
            <span className="flex items-center gap-1.5">
              <Bath size={14} className="text-white/70" />
              {listing.baths} Baths
            </span>
            <span className="flex items-center gap-1.5">
              <Square size={14} className="text-white/70" />
              {listing.sqft} sqft
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
