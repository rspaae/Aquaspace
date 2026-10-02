import { Navbar } from '@/components/navbar/Navbar'
import { Hero } from '@/components/hero/Hero'
import { About } from '@/components/about/About'
import { Collection } from '@/components/collection/Collection'
import { Services } from '@/components/services/Services'
import { Catalog } from '@/components/catalog/Catalog'
import { SelectedWorks } from '@/components/works/SelectedWorks'
import { Process } from '@/components/process/Process'
import { CTA } from '@/components/cta/CTA'
import { Footer } from '@/components/footer/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <Hero />
        <About />
        <Collection />
        <Services />
        <Catalog />
        <SelectedWorks />
        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  )
}