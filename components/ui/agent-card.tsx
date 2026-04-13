'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

type Agent = {
  name: string
  title: string
  photo: string
  phone: string
  email: string
}

type AgentCardProps = {
  agent: Agent
  index: number
  className?: string
}

export function AgentCard({ agent, index, className }: AgentCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden',
        'border border-[#27e9b5]/20 hover:border-[#27e9b5]/60',
        className
      )}
      style={{
        boxShadow: 'var(--agent-card-shadow, 0 4px 6px -1px rgb(0 0 0 / 0.1))',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.setProperty(
          '--agent-card-shadow',
          '0 20px 40px -12px rgba(0, 0, 0, 0.4), 0 0 25px rgba(39, 233, 181, 0.25)'
        )
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.setProperty(
          '--agent-card-shadow',
          '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        )
      }}
    >
      {/* Photo */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={agent.photo}
          alt={`${agent.name}, ${agent.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-harlow-black mb-1">
          {agent.name}
        </h3>
        <p className="text-sm text-harlow-primary-darker font-medium mb-4">
          {agent.title}
        </p>

        <div className="flex flex-col gap-2">
          <a
            href={`tel:${agent.phone.replace(/[^0-9]/g, '')}`}
            className="flex items-center gap-3 text-sm text-harlow-black/70 hover:text-harlow-primary-darker transition-colors"
          >
            <Phone size={16} className="text-harlow-primary" />
            {agent.phone}
          </a>
          <a
            href={`mailto:${agent.email}`}
            className="flex items-center gap-3 text-sm text-harlow-black/70 hover:text-harlow-primary-darker transition-colors"
          >
            <Mail size={16} className="text-harlow-primary" />
            {agent.email}
          </a>
        </div>
      </div>
    </motion.article>
  )
}
