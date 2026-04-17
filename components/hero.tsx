'use client'

import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center md:items-end justify-start overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover md:object-[center_30%]"
        >
          <source src="/GOAT.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay for text readability - subtle at top, stronger at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(3, 15, 15, 0.1) 0%, rgba(3, 15, 15, 0.3) 50%, #030F0F 100%)',
          }}
        />
      </div>

      {/* Content - positioned in lower-middle zone on mobile, bottom on desktop */}
      <div className="relative z-10 w-full max-w-full px-5 md:px-8 lg:px-12 pt-72 md:pt-24 pb-12 md:pb-16 lg:pb-20">
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
            <span className="inline-flex items-center bg-black/30 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full text-[#27e9b5] whitespace-nowrap">
              Home
            </span>
          </motion.h1>
        </div>
      </div>
    </section>
  )
}
