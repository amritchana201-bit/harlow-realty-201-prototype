'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/section-wrapper'

const stats = [
  { value: 500, suffix: '+', label: 'Properties Sold' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Support Available' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

function useCountUp(
  end: number,
  duration: number = 1500,
  shouldStart: boolean = false
) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, shouldStart])

  return count
}

function StatItem({
  value,
  suffix,
  label,
  index,
  shouldAnimate,
  glowActive,
}: {
  value: number
  suffix: string
  label: string
  index: number
  shouldAnimate: boolean
  glowActive: boolean
}) {
  const count = useCountUp(value, 1500, shouldAnimate)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      className="relative p-6 lg:p-5 text-center group"
    >
      {/* Ambient glow behind each stat — pulses on scroll-in across all devices */}
      <div
        className={`absolute inset-0 blur-[60px] rounded-full transition-colors duration-700 ${
          glowActive ? 'bg-[#27e9b5]/[0.12]' : 'bg-[#27e9b5]/[0.03] group-hover:bg-[#27e9b5]/[0.06]'
        }`}
      />

      <div
        className={`relative text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-semibold mb-2 transition-all duration-700 ${
          glowActive ? 'drop-shadow-[0_0_14px_rgba(39,233,181,0.75)]' : ''
        }`}
      >
        <span className="text-[#27e9b5]">
          {shouldAnimate ? count : 0}
          {suffix}
        </span>
      </div>
      <p className="text-white/90 text-[10px] sm:text-xs md:text-sm lg:text-xs xl:text-sm font-medium uppercase tracking-wider">{label}</p>
    </motion.div>
  )
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isCurrentlyInView = useInView(ref, { once: false, amount: 0.3 })
  const [glowActive, setGlowActive] = useState(false)

  useEffect(() => {
    if (!isCurrentlyInView) return
    setGlowActive(true)
    const timer = setTimeout(() => setGlowActive(false), 3000)
    return () => clearTimeout(timer)
  }, [isCurrentlyInView])

  return (
    <SectionWrapper ref={ref} bgColor="black">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-4">
        {stats.map((stat, index) => (
          <StatItem
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            index={index}
            shouldAnimate={isInView}
            glowActive={glowActive}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
