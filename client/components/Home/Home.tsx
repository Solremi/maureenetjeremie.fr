import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Home.scss";

export default function Home() {
  return (
        <div className="Home">
          <Header />
        <section id="section-hero" className="hero ">
            <div className="hero-body ">
                <div className="container has-text-centered">
                    <figure className="image is-150x150 is-inline-block">
                        <img id="img-main" className="is-rounded" src="/images/MaureenEtJérémie.webp" alt="photo de Maureen et Jérémie, les mariés." />
                    </figure>
                    <h1 id='title-h1' className="title"> Bienvenue sur notre site de mariage</h1>
                </div>
            </div>
        </section>

        <section className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-three-quarters">
                        <h2 className="title is-3 has-text-centered">L' aventure commence !</h2>
                        <ul >
                            <li id="first-paragraphe" className="box">
                                <p>
                                    Avant toute chose, nous souhaitons te remercier.
                                </p>
                                <p>
                                    Si tu es ici, c'est que tu as reçu une invitation pour notre mariage auquel tu as répondu favorablement.  
                                </p>
                            </li>

                            <li className="box">
                                <p>
                                    Salut à toi !
                                </p>
                                <p>
                                     Ici est le seul endroit pas vraiment publique où tu pourras suivre notre parcours jusqu'à la fin et avoir davantage d'informations sur notre grand jour. 
                                </p>

                                <p>
                                    Pensez à ce site comme à votre invitation VIP pour rire et pleurer avec nous (de joie, évidemment) et surtout, pour voir combien de fois nous pouvons changer d'heure de début.
                                </p>
                                <p> 
                                   Alors, mettez vos chaussons les plus confortables, prenez une coupe de champagne [pour les plus aisés (evidemment) sinon une bière fera largement l'affaire] et rejoignez-nous dans cette joyeuse aventure!
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
          <Footer />
        </div>
  );
}
