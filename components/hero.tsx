'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center md:items-end justify-start overflow-hidden"
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
        {/* Dark gradient overlay for text readability - subtle at top, stronger at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.55) 100%)',
          }}
        />
      </div>

      {/* Content - positioned in lower-middle zone on mobile, bottom on desktop */}
      <div className="relative z-10 w-full px-5 md:px-8 lg:px-12 pt-24 pb-16 md:pb-28 lg:pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 2.5 }}
            className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-[1.15] text-left max-w-3xl lg:max-w-4xl"
          >
            Find the place you{' '}
            <br className="hidden sm:block" />
            want to call{' '}
            <span className="text-harlow-primary">Home</span>
          </motion.h1>
        </div>
      </div>
    </section>
  )
}
