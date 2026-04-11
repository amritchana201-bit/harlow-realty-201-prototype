'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/section-wrapper'

export function AgentCards() {
  return (
    <SectionWrapper id="agents" bgColor="navy" className="relative -mt-32 pt-48 md:-mt-40 md:pt-56">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl font-semibold text-[#F5F5F5] mb-8"
        >
          Meet <span className="text-[#27e9b5]">Sarah</span> and Chris
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="aspect-square max-w-md mx-auto mb-8 rounded-3xl overflow-hidden shadow-lg"
        >
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
            alt="Sarah and Chris - Real estate agents"
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="text-lg text-[#F5F5F5]/70 leading-relaxed"
        >
          From the first hello to the final move, they are here to guide you.
        </motion.p>
      </div>
    </SectionWrapper>
  )
}
