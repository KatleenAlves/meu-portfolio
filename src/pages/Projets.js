import React, { useEffect, useRef } from 'react';
import '../App.css';
import project1 from '../images/project1.png';
import project2 from '../images/project2.png';
import project3 from '../images/project3.png';
import project4 from '../images/project4.png';

function Projects() {
  const projectsRef = useRef([]);

  useEffect(() => {
    const validProjects = projectsRef.current.filter(Boolean); // Filtrar elementos válidos

    if (validProjects.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
          }
        });
      });

      validProjects.forEach((project) => observer.observe(project));

      return () => observer.disconnect(); // Desconectar o observer ao desmontar o componente
    }
  }, []); // Sem dependências dinâmicas

  return (
    <div className="projects-section section" id="portfolio">
      {/* Título do portfólio */}
      <h2 className="section-title">Here are a few of my projects!</h2>

      <div className="projects-grid">
        <a
          href="https://katleenalves.github.io/Habits-Tracker-Application/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="project-item" ref={(el) => (projectsRef.current[0] = el)}>
            <img src={project1} alt="Project 1" />
            <h3>Habbits Tracker</h3>
          </div>
        </a>

        <a
          href="https://github.com/KatleenAlves"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="project-item" ref={(el) => (projectsRef.current[1] = el)}>
            <img src={project2} alt="Project 2" />
            <h3>GitHub</h3>
          </div>
        </a>

        <a
          href="https://katleenalves.github.io/doctorcare/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="project-item" ref={(el) => (projectsRef.current[2] = el)}>
            <img src={project3} alt="Project 3" />
            <h3>Site Web</h3>
          </div>
        </a>

        <a
          href="https://linkprojeto4.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="project-item" ref={(el) => (projectsRef.current[3] = el)}>
            <img src={project4} alt="Project 4" />
            <h3>Web App</h3>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Projects;
