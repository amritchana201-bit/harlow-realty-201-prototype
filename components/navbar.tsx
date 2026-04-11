'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#properties', label: 'Properties' },
  { href: '#agents', label: 'Agents' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 2 }}
        className={cn(
          'fixed top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 md:top-6 md:left-6 md:right-6 z-50 transition-all duration-300',
          'backdrop-blur-2xl border border-white/15 rounded-2xl md:rounded-3xl',
          'shadow-[0_4px_24px_rgba(0,0,0,0.2)]',
          isScrolled
            ? 'bg-[#162936]/90 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
            : 'bg-[#162936]/70'
        )}
      >
        <nav className="flex items-center justify-between px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 max-w-7xl mx-auto">
          <a
            href="#home"
            className="text-xl md:text-2xl font-semibold text-[#F5F5F5] tracking-tight"
          >
            <span className="text-[#F5F5F5]">Harlow</span>{' '}
            <span className="text-[#27e9b5]">Realty</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-[#F5F5F5]/80 hover:text-[#27e9b5] transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#F5F5F5]/80 hover:text-[#27e9b5] transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop - blurred and dimmed for focus */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[55] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Panel - matching header pill width and glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[4.5rem] sm:top-20 left-3 right-3 sm:left-4 sm:right-4 z-[60] md:hidden"
            >
              <nav className="backdrop-blur-2xl bg-[#162936]/95 border border-white/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-4 sm:p-5">
                <ul className="flex flex-col gap-0.5">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={handleLinkClick}
                        className="block py-3.5 px-4 text-base font-medium text-[#F5F5F5]/90 hover:text-[#27e9b5] hover:bg-white/10 rounded-xl transition-all duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
