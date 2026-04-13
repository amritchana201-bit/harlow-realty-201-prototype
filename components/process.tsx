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
  isMobileInView: boolean
}>(({ step, index, isActive, isMobileInView }, ref) => {
  const Icon = step.icon
  const isEven = index % 2 === 0
  
  const activationDelay = index * 0.8 // 0.8s per segment


  return (
    <div className="grid grid-cols-2 gap-4 items-center py-8">
      {/* Icon Side */}
      <div className={cn(
        "flex px-4",
        isEven ? "order-1 justify-end" : "order-2 justify-start"
      )}>
        <motion.div 
          ref={ref}
          initial={{ 
            backgroundColor: "rgba(39, 233, 181, 0.1)", 
            borderColor: "rgba(39, 233, 181, 0.2)",
            boxShadow: "0 0 0px rgba(39, 233, 181, 0)"
          }}
          animate={isMobileInView ? {
            backgroundColor: "#27e9b5",
            borderColor: "#27e9b5",
            boxShadow: "0 0 30px rgba(39, 233, 181, 0.35)",
          } : {}}
          transition={{ 
            duration: index === 0 ? 0.3 : 0.1, 
            delay: activationDelay, 
            ease: "linear" 
          }}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center relative z-10 border transition-none"
          )}
        >
          <motion.div
            initial={{ color: "rgba(39, 233, 181, 0.4)" }}
            animate={isMobileInView ? { color: "#162936" } : {}}
            transition={{ 
              duration: index === 0 ? 0.3 : 0.1, 
              delay: activationDelay, 
              ease: "linear" 
            }}
          >
            <Icon size={24} />
          </motion.div>
        </motion.div>
      </div>

      {/* Text Side */}
      <div className={cn(
        "flex flex-col px-4",
        isEven ? "order-2 text-left" : "order-1 text-right"
      )}>
        <motion.h3 
          initial={{ color: "rgba(245, 245, 245, 0.3)" }}
          animate={isMobileInView ? { color: "#F5F5F5" } : {}}
          transition={{ duration: index === 0 ? 0.3 : 0.1, delay: activationDelay, ease: "linear" }}
          className="text-lg font-semibold mb-1"
        >
          {step.title}
        </motion.h3>
        <motion.p 
          initial={{ color: "rgba(245, 245, 245, 0.2)" }}
          animate={isMobileInView ? { color: "rgba(245, 245, 245, 0.7)" } : {}}
          transition={{ duration: index === 0 ? 0.3 : 0.1, delay: activationDelay, ease: "linear" }}
          className="text-sm leading-relaxed max-w-[200px]"
        >
          {step.description}
        </motion.p>
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

  const isMobileInView = useInView(mobileContainerRef, { 
    once: true, 
    amount: 0.2 
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

  // Re-measure after desktop entry animations settle (last step: delay 0.3s + duration 0.5s = 0.8s)
  useEffect(() => {
    if (!isDesktopInView) return
    const timer = setTimeout(updatePositions, 900)
    return () => clearTimeout(timer)
  }, [isDesktopInView])

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
                    const startY = pos.y
                    const endX = nextPos.x
                    const endY = nextPos.y
                    const midY = (startY + endY) / 2
                    
                    const segmentDuration = 0.8
                    const baseDelay = 0

                    return (
                      <g key={`path-group-m-${i}`}>
                        {/* Static Background Track */}
                        <path
                          d={`M ${startX},${startY} C ${startX},${midY} ${endX},${midY} ${endX},${endY}`}
                          fill="none"
                          stroke="rgba(39, 233, 181, 0.1)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Traveling Glowing Path */}
                        <motion.path
                          d={`M ${startX},${startY} C ${startX},${midY} ${endX},${midY} ${endX},${endY}`}
                          fill="none"
                          stroke="#27e9b5"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ 
                            pathLength: isMobileInView ? 1 : 0
                          }}
                          transition={{ 
                            duration: segmentDuration, 
                            delay: baseDelay + i * segmentDuration,
                            ease: "linear" 
                          }}
                          style={{
                            filter: "drop-shadow(0 0 3px rgba(39, 233, 181, 0.6)) drop-shadow(0 0 8px rgba(39, 233, 181, 0.3))"
                          }}
                        />
                      </g>
                    )
                  })}
                </svg>
              </div>
            )}

            <div className="relative z-10">
              {mobileSteps.map((step, index) => (
                <TimelineStep
                  key={step.title}
                  ref={(el) => { mobileIconRefs.current[index] = el }}
                  step={step}
                  index={index}
                  isActive={index === activeIndex}
                  isMobileInView={isMobileInView}
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
                      const segmentDuration = 0.8
                      const baseDelay = 0

                      return (
                        <g key={`path-group-d-${i}`}>
                          {/* Traveling Glowing Path */}
                          <motion.path
                            key={`path-d-${i}`}
                            d={`M ${pos.x + pos.radius},${pos.y} L ${nextPos.x - nextPos.radius},${nextPos.y}`}
                            fill="none"
                            stroke="#27e9b5"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: isDesktopInView ? 1 : 0 }}
                            transition={{ 
                              duration: segmentDuration, 
                              delay: baseDelay + i * segmentDuration,
                              ease: "linear" 
                            }}
                            style={{
                              filter: "drop-shadow(0 0 3px rgba(39, 233, 181, 0.6)) drop-shadow(0 0 8px rgba(39, 233, 181, 0.3))"
                            }}
                          />
                        </g>
                      )
                    })}
                  </svg>
                </div>
              )}

              {desktopSteps.map((step, index) => {
                const Icon = step.icon
                const activationDelay = index * 0.8
                return (
                  <div
                    key={step.title}
                    className="flex flex-col items-center text-center flex-1 px-4"
                  >

                    {/* Icon circle */}
                    <motion.div
                      ref={(el) => { desktopIconRefs.current[index] = el }}
                      initial={{
                        backgroundColor: "rgba(39, 233, 181, 0.05)",
                        borderColor: "rgba(39, 233, 181, 0.15)",
                        boxShadow: "0 0 0px rgba(39, 233, 181, 0)"
                      }}
                      animate={isDesktopInView ? {
                        backgroundColor: "#27e9b5",
                        borderColor: "#27e9b5",
                        boxShadow: "0 0 30px rgba(39, 233, 181, 0.35)"
                      } : {}}
                      transition={{
                        duration: 0.25,
                        delay: activationDelay,
                        ease: "linear"
                      }}
                      className="w-16 h-16 rounded-full flex items-center justify-center border mb-5 relative z-10"
                    >
                      <motion.div
                        initial={{ color: "rgba(39, 233, 181, 0.4)" }}
                        animate={isDesktopInView ? { color: "#162936" } : {}}
                        transition={{ duration: 0.25, delay: activationDelay, ease: "linear" }}
                      >
                        <Icon size={22} />
                      </motion.div>
                    </motion.div>

                    {/* Title */}
                    <motion.h3 
                      initial={{ color: "rgba(245, 245, 245, 0.3)" }}
                      animate={isDesktopInView ? { color: "#F5F5F5" } : {}}
                      transition={{ duration: index === 0 ? 0.3 : 0.1, delay: activationDelay, ease: "linear" }}
                      className="text-sm font-semibold mb-2 tracking-wide uppercase leading-tight"
                    >
                      {step.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p 
                      initial={{ color: "rgba(245, 245, 245, 0.2)" }}
                      animate={isDesktopInView ? { color: "rgba(245, 245, 245, 0.5)" } : {}}
                      transition={{ duration: index === 0 ? 0.3 : 0.1, delay: activationDelay, ease: "linear" }}
                      className="text-xs leading-relaxed max-w-[140px]"
                    >
                      {step.description}
                    </motion.p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
