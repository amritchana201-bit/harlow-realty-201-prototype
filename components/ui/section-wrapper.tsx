import { cn } from '@/lib/utils'
import { type ElementType, type ComponentPropsWithoutRef } from 'react'

type SectionWrapperProps<T extends ElementType = 'section'> = {
  as?: T
  id?: string
  children: React.ReactNode
  className?: string
  containerClassName?: string
  fullWidth?: boolean
  bgColor?: 'navy' | 'navyLight' | 'none' | 'black' | 'white'
} & Omit<
  ComponentPropsWithoutRef<T>,
  'as' | 'id' | 'children' | 'className'
>

export function SectionWrapper<T extends ElementType = 'section'>({
  as,
  id,
  children,
  className,
  containerClassName,
  fullWidth = false,
  bgColor = 'none',
  ...props
}: SectionWrapperProps<T>) {
  const Component = as || 'section'

  const bgColorClass = {
    navy: 'bg-[#030F0F]',
    navyLight: 'bg-[#030F0F]',
    black: 'bg-[#030F0F]',
    white: 'bg-white',
    none: '',
  }[bgColor]

  return (
    <Component
      id={id}
      className={cn('py-14 md:py-28 border-b border-[#27e9b5]/10', bgColorClass, className)}
      {...props}
    >
      <div
        className={cn(
          'px-6 md:px-8 lg:px-12',
          !fullWidth && 'max-w-7xl mx-auto',
          containerClassName
        )}
      >
        {children}
      </div>
    </Component>
  )
}
