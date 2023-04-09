import React from 'react';

function App() {
  return (
    <div>
      <header>
        <h1>Mon Portfolio</h1>
        <nav>
          <ul>
            <li><a href="#about">A propos</a></li>
            <li><a href="#projects">Projets</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="about">
          <h2>A propos de moi</h2>
          <p>Je suis un développeur passionné avec X années d'expérience dans le développement web. Mes compétences comprennent le développement front-end avec React, le développement back-end avec Node.js, et bien plus encore.</p>
        </section>
        <section id="projects">
          <h2>Mes projets</h2>
          <ul>
            <li>
              <h3>Projet 1</h3>
              <p>Une brève description du projet 1.</p>
            </li>
            <li>
              <h3>Projet 2</h3>
              <p>Une brève description du projet 2.</p>
            </li>
            <li>
              <h3>Projet 3</h3>
              <p>Une brève description du projet 3.</p>
            </li>
          </ul>
        </section>
        <section id="contact">
          <h2>Contactez-moi</h2>
          <form>
            <label htmlFor="name">Nom :</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email :</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Message :</label>
            <textarea id="message" name="message" required></textarea>
            <button type="submit">Envoyer</button>
          </form>
        </section>
      </main>
      <footer>
        <p>Droit d'auteur © Mon Nom 2023.</p>
      </footer>
    </div>
  );
}

export default App;
