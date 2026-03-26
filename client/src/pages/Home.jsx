import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Pricing from '../components/Pricing'
import Faq from '../components/Faq'
import CTA from '../components/CTA'

const Home = () => {
  return (
    <>
        <Hero />
        <Features />
        <Pricing />
        <Faq />
        <CTA />
    </>
  )
}

export default Home