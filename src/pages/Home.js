import React, { useState, useEffect } from 'react';
import '../App.css';
import minhaImagem from '../images/ghjb.JPG';
import setaImagem from '../images/down-arrow (1).png'; // Imagem da seta para scroll down

function Home() {
  const [showTitle, setShowTitle] = useState(false);  // Controla o "Hi, I'm"
  const [firstName, setFirstName] = useState('');     // Controla o "Katleen"
  const [lastName, setLastName] = useState('');       // Controla o "Maury"
  const [showJobTitle, setShowJobTitle] = useState(false);  // Controla o "Systems Analyst & Web Developer"
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para alternar o menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);

    if (!menuOpen) {
      document.body.classList.add('menu-open');  // Adiciona classe ao body para impedir scroll
    } else {
      document.body.classList.remove('menu-open');  // Remove classe quando o menu fecha
    }
  };

  useEffect(() => {
    // Exibe o "Hi, I'm" com fade-in
    setTimeout(() => {
      setShowTitle(true);
    }, 500); // 500ms de atraso para o fade-in de "Hi, I'm"

    // Depois de "Hi, I'm", começa a escrever "Katleen Maury"
    const firstNameText = 'Katleen';
    const lastNameText = 'Maury';
    let idxFirstName = 0;
    let idxLastName = 0;

    const typeFirstName = () => {
      if (idxFirstName < firstNameText.length) {
        setFirstName(firstNameText.slice(0, idxFirstName + 1));
        idxFirstName++;
        setTimeout(typeFirstName, 100); // Efeito máquina de escrever
      } else {
        // Depois de "Katleen", começa a escrever "Maury"
        setTimeout(() => {
          typeLastName();
        }, 300); // Pequeno delay antes de "Maury"
      }
    };

    const typeLastName = () => {
      if (idxLastName < lastNameText.length) {
        setLastName(lastNameText.slice(0, idxLastName + 1));
        idxLastName++;
        setTimeout(typeLastName, 100); // Efeito máquina de escrever
      } else {
        // Após escrever "Katleen Maury", mostra o job title com fade-in
        setTimeout(() => {
          setShowJobTitle(true);
        }, 500); // Atraso de 500ms após "Katleen Maury"
      }
    };

    // Inicia o efeito de escrita apenas uma vez
    setTimeout(() => {
      typeFirstName();  // Inicia "Katleen Maury" após o "Hi, I'm"
    }, 2000); // 2000ms de atraso para começar "Katleen Maury" após o "Hi, I'm"
  }, []);

  // Função para scroll suave ao clicar nos links do menu
  const handleMenuClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      toggleMenu(); // Fecha o menu após o clique
    }
  };

  return (
    <div>
      {/* Menu Hamburguer */}
      <nav role="navigation">
        <div id="menuToggle" onClick={toggleMenu}>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>

          <ul id="menu" className={menuOpen ? 'open' : ''}>
            <li>
              <a href="#home" onClick={() => handleMenuClick('home')}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => handleMenuClick('about')}>
                About
              </a>
            </li>
            <li>
              <a href="#portfolio" onClick={() => handleMenuClick('portfolio')}>
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => handleMenuClick('contact')}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Seção de Introdução (Home) */}
      <div className="home-container" id="home">
        <div className="intro-section">
          <div className="text-section">
            {/* Fade-in para "Hi, I'm" */}
            <h1 className={`fade-in-paragraph ${showTitle ? 'visible' : ''}`}>
              Hi, I'm
            </h1>
            {/* Efeito de máquina de escrever para "Katleen Maury" */}
            <h2>
              {firstName}
              <br />
              {lastName}
            </h2>
            {/* Exibe o job title com fade-in depois */}
            <p className={`fade-in-paragraph ${showJobTitle ? 'visible' : ''}`}>
              Systems Analyst & Web Developer
            </p>
          </div>
          <div className="image-wrapper">
            <img
              src={minhaImagem}
              alt="Katleen Maury"
              className="profile-image"
            />
          </div>
        </div>
        {/* Botão de Scroll */}
        <div
          className="scroll-down-container"
          onClick={() =>
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' })
          }
        >
          <img
            src={setaImagem}
            alt="Scroll Down"
            className="scroll-down-arrow"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
