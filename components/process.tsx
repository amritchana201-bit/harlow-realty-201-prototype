'use client'

import { useRef, useState, useEffect, forwardRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useInView } from 'framer-motion'
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

const desktopSteps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'We learn what you want.',
  },
  {
    icon: Home,
    title: 'Match',
    description: 'We find homes that fit.',
  },
  {
    icon: Eye,
    title: 'Tour',
    description: 'We arrange guided viewings.',
  },
  {
    icon: Key,
    title: 'Close',
    description: 'We help you secure it.',
  },
]

const mobileSteps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'We learn what you want.',
  },
  {
    icon: Home,
    title: 'Match',
    description: 'We find homes that fit.',
  },
  {
    icon: Eye,
    title: 'Tour',
    description: 'We arrange and guide viewings.',
  },
  {
    icon: Key,
    title: 'Close',
    description: 'We help you secure it.',
  },
]

type IconPosition = {
  x: number
  y: number
  radius: number
}

const TimelineStep = forwardRef<HTMLDivElement, { 
  step: typeof desktopSteps[0]
  index: number
  isActive: boolean
}>(({ step, index, isActive }, ref) => {
  const Icon = step.icon
  const isEven = index % 2 === 0

  return (
    <div className="grid grid-cols-2 gap-4 items-center py-8">
      {/* Icon Side */}
      <div className={cn(
        "flex px-4",
        isEven ? "order-1 justify-end" : "order-2 justify-start"
      )}>
        <div 
          ref={ref}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 relative z-10",
            isActive 
              ? "bg-[#27e9b5] shadow-[0_0_30px_rgba(39,233,181,0.35)]" 
              : "bg-[#27e9b5]/10 border border-[#27e9b5]/20"
          )}
        >
          <Icon 
            size={24} 
            className={cn(
              "transition-colors duration-700",
              isActive ? "text-[#162936]" : "text-[#27e9b5]/40"
            )}
          />
        </div>
      </div>

      {/* Text Side */}
      <div className={cn(
        "flex flex-col px-4",
        isEven ? "order-2 text-left" : "order-1 text-right"
      )}>
        <h3 className={cn(
          "text-lg font-semibold mb-1 transition-colors duration-700",
          isActive ? "text-[#F5F5F5]" : "text-[#F5F5F5]/30"
        )}>
          {step.title}
        </h3>
        <p className={cn(
          "text-sm leading-relaxed transition-colors duration-700 max-w-[200px]",
          isActive ? "text-[#F5F5F5]/70" : "text-[#F5F5F5]/20"
        )}>
          {step.description}
        </p>
      </div>
    </div>
  )
})

TimelineStep.displayName = 'TimelineStep'

export function Process() {
  const mobileContainerRef = useRef<HTMLDivElement>(null)
  const desktopContainerRef = useRef<HTMLDivElement>(null)
  
  const mobileIconRefs = useRef<(HTMLDivElement | null)[]>([])
  const desktopIconRefs = useRef<(HTMLDivElement | null)[]>([])
  
  const [mobilePositions, setMobilePositions] = useState<IconPosition[]>([])
  const [desktopPositions, setDesktopPositions] = useState<IconPosition[]>([])
  
  const [activeIndex, setActiveIndex] = useState(0)
  
  const isDesktopInView = useInView(desktopContainerRef, { 
    once: true, 
    amount: 0.5 
  })

  const { scrollYProgress } = useScroll({
    target: mobileContainerRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const rawIndex = Math.floor(latest * mobileSteps.length)
    const index = Math.max(0, Math.min(mobileSteps.length - 1, rawIndex))
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  })

  const updatePositions = () => {
    // Measure Mobile
    if (mobileContainerRef.current) {
      const containerRect = mobileContainerRef.current.getBoundingClientRect()
      const pos = mobileIconRefs.current.map((iconEl) => {
        if (!iconEl) return null
        const rect = iconEl.getBoundingClientRect()
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
          radius: rect.width / 2
        }
      }).filter((p): p is IconPosition => p !== null)
      setMobilePositions(pos)
    }

    // Measure Desktop
    if (desktopContainerRef.current) {
      const containerRect = desktopContainerRef.current.getBoundingClientRect()
      const pos = desktopIconRefs.current.map((iconEl) => {
        if (!iconEl) return null
        const rect = iconEl.getBoundingClientRect()
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
          radius: rect.width / 2
        }
      }).filter((p): p is IconPosition => p !== null)
      setDesktopPositions(pos)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      updatePositions()
    }, 50)
    
    const observer = new ResizeObserver(updatePositions)
    if (mobileContainerRef.current) observer.observe(mobileContainerRef.current)
    if (desktopContainerRef.current) observer.observe(desktopContainerRef.current)
    
    window.addEventListener('resize', updatePositions)
    return () => {
      clearTimeout(timer)
      observer.disconnect()
      window.removeEventListener('resize', updatePositions)
    }
  }, [])

  return (
    <SectionWrapper id="process" bgColor="black" className="overflow-hidden">
      <div>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-[#F5F5F5] mb-4">
            Your Buyer <span className="text-[#27e9b5]">Journey</span>
          </h2>
          <p className="text-lg text-[#F5F5F5]/70 max-w-2xl mx-auto px-4">
            From first conversation to keys in hand, here is how we guide you home.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Mobile/Tablet: Zig-Zag with Measured Connector */}
          <div ref={mobileContainerRef} className="md:hidden relative">
            {mobilePositions.length > 0 && (
              <div className="absolute inset-0 pointer-events-none z-0">
                <svg className="w-full h-full overflow-visible">
                  {mobilePositions.map((pos, i) => {
                    if (i === mobilePositions.length - 1) return null
                    const nextPos = mobilePositions[i + 1]
                    const startX = pos.x
                    const startY = pos.y + pos.radius
                    const endX = nextPos.x
                    const endY = nextPos.y - nextPos.radius
                    const midY = (startY + endY) / 2
                    return (
                      <path
                        key={`path-m-${i}`}
                        d={`M ${startX},${startY} C ${startX},${midY} ${endX},${midY} ${endX},${endY}`}
                        fill="none"
                        stroke="rgba(39, 233, 181, 0.22)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )
                  })}
                </svg>
              </div>
            )}

            <div className="relative z-10">
              {mobileSteps.map((step, index) => (
                <TimelineStep
                  key={step.title}
                  ref={(el) => (mobileIconRefs.current[index] = el)}
                  step={step}
                  index={index}
                  isActive={index === activeIndex}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Horizontal Timeline (Restored) */}
          <div className="hidden md:block">
            <div ref={desktopContainerRef} className="relative flex flex-row items-start justify-between gap-0 px-8">
              
              {/* Connector SVG — drawn between icons */}
              {desktopPositions.length > 0 && (
                <div className="absolute inset-0 pointer-events-none z-0">
                  <svg className="w-full h-full overflow-visible">
                    {desktopPositions.map((pos, i) => {
                      if (i === desktopPositions.length - 1) return null
                      const nextPos = desktopPositions[i + 1]
                      const startX = pos.x + pos.radius
                      const endX = nextPos.x - nextPos.radius
                      const midX = (startX + endX) / 2
                      const segmentDuration = 0.8
                      const baseDelay = 0.4

                      return (
                        <motion.path
                          key={`path-d-${i}`}
                          d={`M ${startX},${pos.y} C ${midX},${pos.y} ${midX},${nextPos.y} ${endX},${nextPos.y}`}
                          fill="none"
                          stroke="rgba(39, 233, 181, 0.25)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: isDesktopInView ? 1 : 0 }}
                          transition={{ 
                            duration: segmentDuration, 
                            delay: baseDelay + i * segmentDuration,
                            ease: "easeInOut" 
                          }}
                        />
                      )
                    })}
                  </svg>
                </div>
              )}

              {desktopSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center flex-1 px-4"
                  >

                    {/* Icon circle */}
                    <motion.div
                      ref={(el) => (desktopIconRefs.current[index] = el)}
                      initial={{ backgroundColor: "rgba(39, 233, 181, 0.05)", borderColor: "rgba(39, 233, 181, 0.15)" }}
                      animate={isDesktopInView ? { 
                        backgroundColor: "rgba(39, 233, 181, 0.22)",
                        borderColor: "rgba(39, 233, 181, 0.6)",
                        boxShadow: "0 0 15px rgba(39, 233, 181, 0.4), 0 0 40px rgba(39, 233, 181, 0.2)"
                      } : {}}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.4 + index * 0.8 // Mathematically synced with line arrival
                      }}
                      className="w-16 h-16 rounded-full flex items-center justify-center border mb-5 relative z-10"
                    >
                      <motion.div
                        initial={{ opacity: 0.25 }}
                        animate={isDesktopInView ? { opacity: 1 } : { opacity: 0.25 }}
                        transition={{ duration: 0.8, delay: 0.4 + index * 0.8 }}
                      >
                        <Icon size={22} className="text-[#27e9b5]" />
                      </motion.div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-sm font-semibold text-[#F5F5F5] mb-2 tracking-wide uppercase leading-tight">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#F5F5F5]/50 leading-relaxed max-w-[140px]">
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
