import Image from 'next/image'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

type Testimonial = {
  name: string
  location: string
  quote: string
  rating?: number
  image?: string
}

type TestimonialCardProps = {
  testimonial: Testimonial
  className?: string
}

function StarRating({ rating = 5 }: { rating?: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          size={16}
          className="fill-amber-400 text-amber-400"
        />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star size={16} className="text-[#F5F5F5]/20" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star size={16} className="fill-amber-400 text-amber-400" />
          </div>
        </div>
      )}
      {Array.from({ length: 5 - Math.ceil(rating) }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={16}
          className="text-[#F5F5F5]/20"
        />
      ))}
    </div>
  )
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        'bg-[#1a3040] rounded-2xl shadow-md p-6 md:p-8 h-full flex flex-col',
        'border border-white/10',
        className
      )}
    >
      {/* Star Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating || 5} />
      </div>

      {/* Quote */}
      <blockquote className="flex-1 mb-6">
        <p className="text-base md:text-lg text-[#F5F5F5]/85 leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      {/* Footer with profile image */}
      <footer className="flex items-center gap-3 flex-shrink-0">
        {/* Profile Image */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#27e9b5]/10 flex-shrink-0">
          {testimonial.image ? (
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#27e9b5] text-sm font-medium">
              {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
          )}
        </div>

        {/* Name and Location */}
        <div>
          <p className="font-semibold text-[#F5F5F5] text-sm">
            {testimonial.name}
          </p>
          <p className="text-xs text-[#F5F5F5]/60">{testimonial.location}</p>
        </div>
      </footer>
    </article>
  )
}
