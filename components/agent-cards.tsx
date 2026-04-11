'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/section-wrapper'

export function AgentCards() {
  return (
    <SectionWrapper id="agents" bgColor="black" className="pt-16 md:pt-20 pb-12 md:pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image Column - Capsule Shape */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 md:order-1"
        >
          <div className="aspect-[4/5] max-w-sm mx-auto rounded-[160px] overflow-hidden shadow-2xl border border-white/5">
            <Image
              src="/R Agent.jpg"
              alt="Chris and Sarah - Real estate agents"
              width={800}
              height={1000}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Content Column */}
        <div className="order-2 md:order-2 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#F5F5F5] mb-8 leading-tight"
          >
            Meet <span className="text-[#27e9b5]">Chris</span> and{' '}
            <span className="text-[#27e9b5]">Sarah</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-xl md:text-2xl text-[#F5F5F5]/80 leading-relaxed max-w-xl mx-auto md:mx-0"
          >
            From the <span className="text-[#27e9b5]">first hello</span> to the final move, they are here to <span className="text-[#27e9b5]">guide</span> you.
          </motion.p>
        </div>
      </div>
    </SectionWrapper>
  )
}
