import React, { useEffect, useRef } from 'react'
import '../App.css'

function About() {
  const titleRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (titleRef.current) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible')
            observer.unobserve(entry.target)
          }
        })
      })

      observer.observe(titleRef.current)

      return () => observer.unobserve(titleRef.current)
    }
  }, [])

  useEffect(() => {
    if (cardsRef.current) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible')
            observer.unobserve(entry.target)
          }
        })
      })

      cardsRef.current.forEach(card => observer.observe(card))

      return () => cardsRef.current.forEach(card => observer.unobserve(card))
    }
  }, [])

  return (
    <div className="about-section" id='about'>
      <h2 ref={titleRef} className="about-title">
        A bit about <span>myself...</span>
      </h2>
      <div className="cards-container">
        <div className="card" ref={el => (cardsRef.current[0] = el)}>
          <h3 className="card-title">I live in</h3>
          <p className="card-content">
            Switzerland, but I am made in Brazil since 1996.
          </p>
        </div>
        <div className="card" ref={el => (cardsRef.current[1] = el)}>
          <h3 className="card-title">I graduated in</h3>
          <p className="card-content">
            Systems Analyst and Developement by the university PUCPR - BRAZIL.
          </p>
        </div>
        <div className="card" ref={el => (cardsRef.current[2] = el)}>
          <h3 className="card-title">What I Do</h3>
          <p className="card-content">Web development and systems analysis.</p>
        </div>
      </div>
    </div>
  )
}

export default About
