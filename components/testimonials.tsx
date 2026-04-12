'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { TestimonialCard } from '@/components/ui/testimonial-card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    name: 'Jennifer & Mark Thompson',
    location: 'Oakville',
    quote:
      'Harlow Realty made our dream home a reality. Their attention to detail and market knowledge is unmatched.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'David Park',
    location: 'Toronto',
    quote:
      'Professional, responsive, and truly cared about finding the right property for my family. Highly recommend!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Lisa Chen',
    location: 'Mississauga',
    quote:
      'From our first meeting to closing day, the team at Harlow was exceptional. They exceeded every expectation.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Robert & Maria Santos',
    location: 'Burlington',
    quote:
      "We've worked with many agents over the years. None compare to the service we received from Harlow Realty.",
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Amanda Williams',
    location: 'Toronto',
    quote:
      'Sold our condo in just two weeks above asking price. The marketing strategy was brilliant.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - visibleCount)
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < maxIndex

  const goToPrev = useCallback(() => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1)
    }
  }, [canGoPrev])

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [canGoNext])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrev, goToNext])

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1
        return nextIndex > maxIndex ? 0 : nextIndex
      })
    }, 6000)
    return () => clearInterval(autoplayInterval)
  }, [maxIndex])

  return (
    <SectionWrapper id="testimonials" bgColor="black">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-10 md:mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-[#F5F5F5]">
          Client <span className="text-[#27e9b5]">Stories</span>
        </h2>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <div className="hidden md:flex absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrev}
            disabled={!canGoPrev}
            className={cn(
              'h-12 w-12 rounded-full border-white/20 bg-black/30 backdrop-blur-md shadow-md',
              'hover:bg-white/10 hover:border-[#27e9b5]/40 transition-all',
              'disabled:opacity-40 disabled:cursor-not-allowed'
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-[#27e9b5]" />
          </Button>
        </div>

        <div className="hidden md:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={!canGoNext}
            className={cn(
              'h-12 w-12 rounded-full border-white/20 bg-black/30 backdrop-blur-md shadow-md',
              'hover:bg-white/10 hover:border-[#27e9b5]/40 transition-all',
              'disabled:opacity-40 disabled:cursor-not-allowed'
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-[#27e9b5]" />
          </Button>
        </div>

        {/* Cards Container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: `calc(-${currentIndex * (100 / visibleCount)}% - ${currentIndex * 24 / visibleCount}px)`,
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="flex-shrink-0"
                style={{
                  width: `calc((100% - ${(visibleCount - 1) * 24}px) / ${visibleCount})`,
                }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrev}
            disabled={!canGoPrev}
            className={cn(
              'h-12 w-12 rounded-full border-white/20 bg-black/30 backdrop-blur-md shadow-md',
              'hover:bg-white/10 hover:border-[#27e9b5]/40 transition-all',
              'disabled:opacity-40 disabled:cursor-not-allowed'
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-[#27e9b5]" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={!canGoNext}
            className={cn(
              'h-12 w-12 rounded-full border-white/20 bg-black/30 backdrop-blur-md shadow-md',
              'hover:bg-white/10 hover:border-[#27e9b5]/40 transition-all',
              'disabled:opacity-40 disabled:cursor-not-allowed'
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-[#27e9b5]" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'w-6 bg-[#27e9b5]'
                  : 'bg-[#F5F5F5]/20 hover:bg-[#27e9b5]/40'
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
