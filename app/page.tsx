import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { AgentCards } from '@/components/agent-cards'
import { Stats } from '@/components/stats'
import { FeaturedListings } from '@/components/featured-listings'
import { Process } from '@/components/process'
import { Testimonials } from '@/components/testimonials'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AgentCards />
        <Stats />
        <FeaturedListings />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
