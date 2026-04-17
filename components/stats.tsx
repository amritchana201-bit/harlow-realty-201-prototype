'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/section-wrapper'

const stats = [
  { value: 500, suffix: '+', label: 'Properties Sold' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Support Available' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

/*
// Original React-based loop (Commented out for performance, see new implementation in StatItem)
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
*/

function StatItem({
  value,
  suffix,
  label,
  index,
  shouldAnimate,
}: {
  value: number
  suffix: string
  label: string
  index: number
  shouldAnimate: boolean
}) {
  // const count = useCountUp(value, 1500, shouldAnimate)
  
  // Framer Motion performant value tracking
  const count = useMotionValue(0)
  const roundedCount = useTransform(count, Math.round)

  useEffect(() => {
    if (shouldAnimate) {
      // Micro-delay staggered start to let layout paint first
      const timeoutId = setTimeout(() => {
        animate(count, value, {
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1] 
        })
      }, index * 100 + 150)
      
      return () => clearTimeout(timeoutId)
    }
  }, [shouldAnimate, value, count, index])

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
      <div className="relative text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-semibold mb-2">
        <span className="text-[#27e9b5]">
          <motion.span>{roundedCount}</motion.span>
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

  return (
    <SectionWrapper bgColor="black" className="overflow-hidden">
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-4">
        {stats.map((stat, index) => (
          <StatItem
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            index={index}
            shouldAnimate={isInView}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
