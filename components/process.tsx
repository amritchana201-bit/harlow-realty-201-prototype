'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { 
  MessageSquare, 
  Search, 
  Home, 
  Eye, 
  FileText, 
  Key 
} from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { cn } from '@/lib/utils'

const processSteps = [
  {
    icon: MessageSquare,
    title: 'Private Consultation',
    description: 'Understand your goals and what you want in your next home.',
  },
  {
    icon: Search,
    title: 'Tailored Search Strategy',
    description: 'Build a focused plan around budget, location, and lifestyle.',
  },
  {
    icon: Home,
    title: 'Exclusive Property Matches',
    description: 'Receive a curated selection of homes that fit your criteria.',
  },
  {
    icon: Eye,
    title: 'Guided Viewings',
    description: 'Tour the right properties with expert guidance and clarity.',
  },
  {
    icon: FileText,
    title: 'Negotiation & Offer Management',
    description: 'Handle offers strategically to secure the best possible outcome.',
  },
  {
    icon: Key,
    title: 'Closing Coordination',
    description: 'Manage the final steps smoothly from paperwork to handover.',
  },
]

function TimelineStep({ 
  step, 
  index, 
  progress,
  isLast,
}: { 
  step: typeof processSteps[0]
  index: number
  progress: number
  isLast: boolean
}) {
  const Icon = step.icon
  const stepProgress = Math.max(0, Math.min(1, (progress * processSteps.length) - index))
  const isActive = stepProgress > 0
  const isComplete = stepProgress >= 1

  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-0 relative">
      {/* Icon container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative z-10 flex-shrink-0"
      >
        <div
          className={cn(
            'w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500',
            isActive 
              ? 'bg-[#F6E9D9] shadow-lg shadow-[#F6E9D9]/20' 
              : 'bg-[#F6E9D9]/15 border border-[#F6E9D9]/30'
          )}
          style={{
            transform: isActive ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          <Icon 
            size={24} 
            className={cn(
              'transition-colors duration-500',
              isActive ? 'text-[#043222]' : 'text-[#F6E9D9]/70'
            )} 
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
        className="lg:ml-6 flex-1 pb-12 lg:pb-0"
      >
        <h3 className={cn(
          'text-lg md:text-xl font-semibold mb-2 transition-colors duration-500',
          isActive ? 'text-[#F6E9D9]' : 'text-[#F6E9D9]/70'
        )}>
          {step.title}
        </h3>
        <p className={cn(
          'text-sm md:text-base leading-relaxed transition-colors duration-500',
          isActive ? 'text-[#F6E9D9]/85' : 'text-[#F6E9D9]/50'
        )}>
          {step.description}
        </p>
      </motion.div>

      {/* Vertical connector line (mobile/tablet) */}
      {!isLast && (
        <div className="absolute left-7 md:left-8 top-16 md:top-[4.5rem] w-0.5 h-[calc(100%-4rem)] lg:hidden">
          <div className="w-full h-full bg-[#F6E9D9]/20 rounded-full overflow-hidden">
            <motion.div 
              className="w-full bg-[#F6E9D9]/60 rounded-full"
              style={{ height: `${Math.min(100, stepProgress * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.5'],
  })

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <SectionWrapper id="process" bgColor="evergreen" className="overflow-hidden">
      <div ref={sectionRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-[#F6E9D9] mb-4">
            Your Buyer Journey
          </h2>
          <p className="text-lg text-[#F6E9D9]/70 max-w-2xl mx-auto">
            From first conversation to keys in hand, here is how we guide you home.
          </p>
        </motion.div>

        {/* Timeline Container - relative position required for scroll tracking */}
        <div ref={containerRef} className="relative" style={{ position: 'relative' }}>
          {/* Mobile/Tablet: Vertical Timeline */}
          <div className="lg:hidden space-y-0">
            {processSteps.map((step, index) => (
              <motion.div key={step.title}>
                <TimelineStep
                  step={step}
                  index={index}
                  progress={isInView ? progress.get() : 0}
                  isLast={index === processSteps.length - 1}
                />
              </motion.div>
            ))}
          </div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden lg:block">
            {/* Horizontal progress line */}
            <div className="relative mb-8">
              <div className="absolute top-8 left-8 right-8 h-0.5 bg-[#F6E9D9]/20 rounded-full">
                <motion.div 
                  className="h-full bg-[#F6E9D9]/60 rounded-full origin-left"
                  style={{ scaleX: progress }}
                />
              </div>
            </div>

            {/* Steps grid */}
            <div className="grid grid-cols-6 gap-6">
              {processSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="text-center"
                  >
                    {/* Icon */}
                    <motion.div
                      className="mx-auto mb-4 w-16 h-16 rounded-2xl flex items-center justify-center bg-[#F6E9D9]/15 border border-[#F6E9D9]/30"
                      whileInView={{
                        backgroundColor: 'rgba(246, 233, 217, 1)',
                        borderColor: 'rgba(246, 233, 217, 0)',
                      }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Icon size={24} className="text-[#043222]" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-base font-semibold text-[#F6E9D9] mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#F6E9D9]/70 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
