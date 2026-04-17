'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/section-wrapper'

export function AgentCards() {
  return (
    <SectionWrapper id="agents" bgColor="black" className="pt-16 md:pt-20 pb-12 md:pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image Column */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 md:order-1"
        >
          <div className="agent-image-desktop relative aspect-[3/4] max-w-sm mx-auto rounded-[24px] md:aspect-[4/5] md:max-w-none overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="/Real estate agents in front of a house.png"
              alt="Chris and Sarah - Real estate agents"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Gradient fade — grows naturally out of the image */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Content Column */}
        <div className="order-2 md:order-2 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-semibold text-[#F5F5F5] mb-5 md:mb-8 leading-tight"
          >
            Meet <span className="text-[#27e9b5]">Sarah</span> and{' '}
            <span className="text-[#27e9b5]">Chris</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-sm md:text-base text-[#F5F5F5] leading-relaxed max-w-xl mx-auto md:mx-0"
          >
            From the <span className="text-[#27e9b5]">first hello</span> to the final move, they are here to <span className="text-[#27e9b5]">guide</span> you.
          </motion.p>

          {/* Mobile/tablet button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="block md:hidden mt-8"
          >
            <a
              href="#contact"
              className="inline-flex items-center px-7 py-3.5 bg-[#27e9b5] hover:bg-[#1fd4a4] text-[#162936] font-semibold text-sm rounded-xl shadow-[0_0_20px_rgba(39,233,181,0.25)] hover:shadow-[0_0_30px_rgba(39,233,181,0.4)] transition-all duration-300"
            >
              Book a Consultation
            </a>
          </motion.div>

          {/* Desktop button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="hidden md:block mt-10"
          >
            <a
              href="#contact"
              className="inline-flex items-center px-7 py-3.5 bg-[#27e9b5] hover:bg-[#1fd4a4] text-[#162936] font-semibold text-sm rounded-xl shadow-[0_0_20px_rgba(39,233,181,0.25)] hover:shadow-[0_0_30px_rgba(39,233,181,0.4)] transition-all duration-300"
            >
              Book a Consultation
            </a>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
