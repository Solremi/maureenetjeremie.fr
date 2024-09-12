import React, { useState, useEffect } from "react";
import { intervalToDuration, formatDuration } from "date-fns";
import { fr } from "date-fns/locale";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Home.scss";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const eventDate = new Date('2024-11-02T14:30:00'); // Remplacez cette date par celle de votre événement
    const now = new Date();
    const duration = intervalToDuration({ start: now, end: eventDate });
    return formatDuration(duration, { locale: fr });
  }

  return (
    <div className="Home">
      <Header />
      <section id="section-hero" className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <figure className="image is-150x150 is-inline-block">
              <img
                id="img-main"
                className="is-rounded"
                src="/images/MaureenEtJérémie.webp"
                alt="photo de Maureen et Jérémie, les mariés."
              />
            </figure>
            <h1 id="title-h1" className="title">
              Bienvenue sur notre site de mariage
            </h1>
          </div>
          <div id="compte-a-rebour" className="container  has-text-centered">
                <h2 id="compte-h2" >🚀  Mise à feu dans.. </h2>
                <div className="box has-text-centered ">
                    <h3 className="title is-4">{timeLeft}</h3>
                </div>
            </div>
        </div>
      
      </section>

      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-three-quarters">
              <h2 id="h2-aventure" className="title is-3 has-text-centered">L' aventure commence !</h2>
              <ul>
                <li id="first-paragraphe" className="box">
                  <p>Avant toute chose, nous souhaitons te remercier.</p>
                  <p>
                    Si tu es ici, c'est que tu as reçu une invitation pour notre mariage auquel tu as répondu favorablement.
                  </p>
                </li>

                <li className="box">
                  <p>Salut à toi ! 👋</p>
                  <p>
                    Ici est le seul endroit pas vraiment publique où tu pourras suivre notre parcours jusqu'à la fin et avoir davantage d'informations sur notre grand jour.
                  </p>

                  <p>
                    Pense à ce site comme à ton invitation VIP pour rire et pleurer avec nous (de joie, évidemment) et surtout, pour voir combien de fois nous pouvons changer d'heure de début.
                  </p>
                  <p>
                    Alors, mettez vos chaussons les plus confortables, prenez une coupe de champagne [pour les plus aisés (évidemment) sinon une bière fera largement l'affaire] et rejoignez-nous dans cette joyeuse aventure!
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="section-news" className="hero">
        <div id="news" className="hero-body">
          <h2 id="news-h2">News</h2>
            <div dir="news-container" className="container">
              <div className="container">
                <div className="columns is-centered">
                  <div className="column is-half">
                    <div id="news-box" className="box ">
                      <h3>Pour les kids</h3>
                      <p>Il y aura à disposition deux petites salles dans lesquelles les enfants pourront se reposer. Il vous faudra prévoir des matelas gonflables ou lit parapluie, nous ne pourrons pas fournir, nous avons épuisé notre stock. Si vous êtes en difficulté, n'hésitez pas à nous contacter, nous ferons notre possible pour vous aider.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="columns is-centered">
                  <div className="column is-half">
                    <div id="news-box" className="box ">
                      <h3>Concernant le repas</h3>
                      <p>Afin que votre repas se passe dans les meilleures conditions, merci de nous indiquer par email ou téléphone, si vous avez des allergies alimentaires. Nous essaierons d'adapter le menu pour vous.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
