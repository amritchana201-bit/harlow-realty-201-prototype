'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { cn } from '@/lib/utils'

const features = [
  {
    title: 'Local Market Expertise',
    description: 'They know Toronto well, so you can make better moves.',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Results That Build Trust',
    description: 'They bring real experience that helps you move with confidence.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Guidance Through Every Step',
    description: 'They stay with you from the first talk to closing day.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
  },
]

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  // Triggers when 50% of the card is visible; re-triggers on scroll back in
  const isInView = useInView(ref, { once: false, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'group flex flex-col backdrop-blur-md border rounded-[32px] overflow-hidden transition-all duration-500',
        // Base
        'bg-white/[0.02] border-[#27e9b5]/45',
        'shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(39,233,181,0.2)]',
        // Desktop hover (pointer devices)
        'hover:bg-white/[0.04] hover:border-[#27e9b5]/65',
        'hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6),0_0_40px_rgba(39,233,181,0.3)]',
        // Mobile scroll-into-view glow (max-md = below 768px, single-column only)
        isInView && [
          'max-md:bg-white/[0.04]',
          'max-md:border-[#27e9b5]/65',
          'max-md:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6),0_0_40px_rgba(39,233,181,0.3)]',
        ]
      )}
    >
      {/* Image Header */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          className={cn(
            'object-cover transition-transform duration-700',
            'group-hover:scale-105',
            isInView && 'max-md:scale-105'
          )}
        />
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-[#030F0F]/60 to-transparent transition-opacity duration-500',
            'opacity-60 group-hover:opacity-40',
            isInView && 'max-md:opacity-40'
          )}
        />
      </div>

      {/* Card Content */}
      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <h3
          className={cn(
            'text-xl md:text-2xl font-semibold mb-4 transition-colors duration-300',
            'text-[#F5F5F5] group-hover:text-[#27e9b5]',
            isInView && 'max-md:text-[#27e9b5]'
          )}
        >
          {feature.title}
        </h3>
        <p className="text-[#F5F5F5]/60 leading-relaxed text-sm md:text-base">
          {feature.description}
        </p>

        {/* Bottom accent line — expands and glows on hover (768px+) or scroll-in (mobile < 768px) */}
        <div className="mt-auto pt-8">
          <div
            className={cn(
              'h-[2px] rounded-full transition-all duration-500',
              // Base
              'w-12 bg-[#27e9b5]/20',
              // Desktop hover
              'group-hover:w-full group-hover:bg-[#27e9b5] group-hover:shadow-[0_0_15px_rgba(39,233,181,0.5)]',
              // Mobile & tablet scroll-in
              isInView && [
                'max-md:w-full',
                'max-md:bg-[#27e9b5]',
                'max-md:shadow-[0_0_15px_rgba(39,233,181,0.5)]',
              ]
            )}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function Authority() {
  return (
    <SectionWrapper id="why-harlow" bgColor="black">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl lg:text-6xl font-semibold text-[#F5F5F5] mb-6 leading-tight"
          >
            The <span className="text-[#27e9b5]">Advantage</span> of Having the Right Team
          </motion.h2>

        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
