'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-end justify-start overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Beautiful modern home exterior with landscaped garden"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Refined Overlay - darker at bottom for text contrast, lighter at top */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0.65) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-8 lg:px-12 pb-20 md:pb-28 lg:pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 2.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-harlow-black leading-[1.1] text-left max-w-4xl text-balance"
          >
            Find the place you want to call{' '}
            <span className="text-harlow-primary-darker">Home</span>
          </motion.h1>
        </div>
      </div>
    </section>
  )
}
