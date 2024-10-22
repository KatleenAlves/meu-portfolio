import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import linkedin from '../images/social.png';
import github from '../images/github.png';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Web Development Project',
    message: '',
  });

  const formRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    });

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/send', formData);
      alert('Mensagem enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar a mensagem', error);
      alert('Ocorreu um erro ao enviar a mensagem.');
    }
  };

  return (
    <div id="contact" className="contact-section"> {/* Aqui está o id="contact" */}
      <div className="contact-left">
        <h2 className="section-title">
          <span className="line1">It will be a</span>
          <span className="line2">pleasure to work with you!</span>
        </h2>
        <div className="social-icons">
          <p>My Social Networks</p>
          <a href="https://www.linkedin.com/in/katleen-maury-7418b3128/" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="LinkedIn" />
          </a>
          <a href="https://github.com/KatleenAlves" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="GitHub" />
          </a>
        </div>
      </div>
      
      <div ref={formRef} className="contact-right fade-in">
        <h3 className="contact-title">Contact Me</h3>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            className="input-field"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            className="input-field"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            name="subject"
            className="input-field"
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="Web Development Project">Web Development Project</option>
            <option value="App Development Project">App Development Project</option>
            <option value="Freelance">Freelance Work</option>
            <option value="Job Offer">Job Offer</option>
          </select>
          <textarea
            name="message"
            className="input-field textarea"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="contact-submit-btn">
            Send
          </button>
        </form>
      </div>
      {/*<footer className="footer">
        © 2024 Katleen Maury. All rights reserved.
      </footer>*/}
    </div>
  );
}

export default Contact;
