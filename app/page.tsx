import React from 'react'
import Home from './components/Home/Home'
import HeroSection from './components/HeroSection/HeroSection'
import FAQ from './components/FAQ/FAQ'
import Features from './components/Features/Features'
import Contact from './components/Contact/Contact'
import About from './components/About/About'
import TestimonialList from './components/TestimonialList/TestimonialList'
// https://projectshubb.vercel.app/

const page = () => {
  return (
    <div>
      <HeroSection />
      <About />
      <Home />
      <TestimonialList />
      <Features />
      <FAQ />
      <Contact />
    </div>
  )
}

export default page