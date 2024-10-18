import React, { useEffect, useRef } from 'react';
import '../App.css';

function Facts() {
  const factsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    });

    factsRef.current.forEach(fact => observer.observe(fact));

    return () => factsRef.current.forEach(fact => observer.unobserve(fact));
  }, []);

  return (
    <div className="facts-section">
      <h2 className="section-title">Three interesting facts</h2>
      <div className="facts-container">
        <div className="fact-card" ref={el => (factsRef.current[0] = el)}>
          <h3 className="card-title">I'm a content creator in my free time.</h3>
          <p className="card-content">
            I share a little of my life as an immigrant with more
            than 90k people on social media.
          </p>
        </div>
        <div className="fact-card" ref={el => (factsRef.current[1] = el)}>
          <h3 className="card-title">Food Tech Background</h3>
          <p className="card-content">
            Trained in food technology, I have a solid foundation in food safety
            and process management.
          </p>
        </div>
        <div className="fact-card" ref={el => (factsRef.current[2] = el)}>
          <h3 className="card-title">Cybersecurity Enthusiast</h3>
          <p className="card-content">
            I am actively expanding my expertise by studying cybersecurity.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Facts;
