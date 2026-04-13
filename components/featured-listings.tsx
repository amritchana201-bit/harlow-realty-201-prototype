'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { ListingCard } from '@/components/ui/listing-card'
import { cn } from '@/lib/utils'
import Link from 'next/link'

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
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=450&fit=crop',
  },
  {
    address: '888 Spadina Ave, Toronto',
    price: '$1,950,000',
    beds: 2,
    baths: 2,
    sqft: '1,800',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=450&fit=crop',
  },
  {
    address: '222 Queen St W, Toronto',
    price: '$2,800,000',
    beds: 4,
    baths: 3,
    sqft: '3,100',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=450&fit=crop',
  },
  {
    address: '777 Bloor St E, Toronto',
    price: '$3,500,000',
    beds: 5,
    baths: 4,
    sqft: '4,200',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=450&fit=crop',
  },
  {
    address: '999 Yonge St, Toronto',
    price: '$4,100,000',
    beds: 6,
    baths: 5,
    sqft: '5,500',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=450&fit=crop',
  },
]

export function FeaturedListings() {
  return (
    <SectionWrapper id="properties" bgColor="black" className="pt-8 md:pt-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#F5F5F5]">
            Featured <span className="text-[#27e9b5]">Properties</span>
          </h2>
        </div>

        {/* Responsive Grid with 3:9 Visibility Logic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {listings.map((listing, index) => (
            <div 
              key={`${listing.address}-${index}`}
              className={cn(
                index >= 3 && 'hidden md:block',      // 3 on Mobile, 9 on MD+
                index >= 9 && 'hidden'                // Cap at 9 total
              )}
            >
              <ListingCard listing={listing} index={index} />
            </div>
          ))}
        </div>

        {/* Universal "Show more" Link */}
        <div className="flex justify-center mt-12 md:mt-16">
          <Link 
            href="/listings"
            className="px-10 py-3.5 rounded-full bg-[#27e9b5] text-black font-semibold hover:bg-[#27e9b5]/90 transition-all duration-300 text-sm tracking-wide shadow-[0_8px_32px_rgba(39,233,181,0.2)] inline-block"
          >
            Show more
          </Link>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
