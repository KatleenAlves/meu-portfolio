import React, { useEffect, useRef } from 'react';
import '../App.css';

function About() {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const title = titleRef.current;

    if (title) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(title);

      return () => observer.disconnect();
    }
  }, []); // Sem dependências dinâmicas

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean); // Garante que apenas elementos válidos sejam observados

    if (cards.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
          }
        });
      });

      cards.forEach((card) => observer.observe(card));

      return () => observer.disconnect();
    }
  }, []); // Sem dependências dinâmicas

  return (
    <div className="about-section" id="about">
      <h2 ref={titleRef} className="about-title">
        A bit about <span>myself...</span>
      </h2>
      <div className="cards-container">
        <div className="card" ref={(el) => (cardsRef.current[0] = el)}>
          <h3 className="card-title">I live in</h3>
          <p className="card-content">
            Switzerland, but I am made in Brazil since 1996.
          </p>
        </div>
        <div className="card" ref={(el) => (cardsRef.current[1] = el)}>
          <h3 className="card-title">I graduated in</h3>
          <p className="card-content">
            Systems Analyst and Development by the university PUCPR - BRAZIL.
          </p>
        </div>
        <div className="card" ref={(el) => (cardsRef.current[2] = el)}>
          <h3 className="card-title">What I Do</h3>
          <p className="card-content">Web development and systems analysis.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
