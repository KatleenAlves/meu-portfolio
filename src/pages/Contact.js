import React, { useState, useRef, useEffect } from 'react';
import emailjs from 'emailjs-com'; // Importa o EmailJS
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
    const form = formRef.current; // Captura o valor atual de formRef

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    });

    if (form) {
      observer.observe(form);
    }

    return () => {
      if (form) {
        observer.unobserve(form);
      }
    };
  }, []); // Sem dependências dinâmicas

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviando com EmailJS
    emailjs
      .send(
        'service_dd6na1p', // Substitua pelo seu Service ID
        'template_onl8q4w', // Substitua pelo seu Template ID
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        '36T-mqS3vm7s-yGNL' // Substitua pelo seu User ID
      )
      .then(
        () => {
          alert('Mensagem enviada com sucesso!');
          setFormData({ name: '', email: '', subject: 'Web Development Project', message: '' }); // Limpa o formulário
        },
        (error) => {
          console.error('Erro ao enviar a mensagem:', error);
          alert('Ocorreu um erro ao enviar a mensagem.');
        }
      );
  };

  return (
    <div id="contact" className="contact-section">
      <div className="contact-left">
        <h2 className="section-title">
          <span className="line1">It will be a</span>
          <span className="line2">pleasure to work with you!</span>
        </h2>
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

      <footer className="footer">
        © 2024 Katleen Maury. All rights reserved.
      </footer>
    </div>
  );
}

export default Contact;
