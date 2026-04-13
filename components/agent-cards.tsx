'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/section-wrapper'

export function AgentCards() {
  return (
    <SectionWrapper id="agents" bgColor="black" className="pt-16 md:pt-20 pb-12 md:pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image Column */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 md:order-1"
        >
          {/* Mobile/tablet headline above image */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block md:hidden text-4xl font-semibold text-[#F5F5F5] mb-5 leading-tight text-center"
          >
            Meet <span className="text-[#27e9b5]">Chris</span> and{' '}
            <span className="text-[#27e9b5]">Sarah</span>
          </motion.h2>

          <div className="aspect-[3/2] max-w-sm mx-auto rounded-[20px] md:aspect-[4/3] md:max-w-none md:rounded-[24px] overflow-hidden shadow-2xl border border-white/5">
            <Image
              src="/Real estate agents in front of a house.png"
              alt="Chris and Sarah - Real estate agents"
              width={800}
              height={1000}
              className="w-full h-full object-cover object-center"
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
            className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-semibold text-[#F5F5F5] mb-5 md:mb-8 leading-tight"
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
