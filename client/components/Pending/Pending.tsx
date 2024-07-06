import React, { useState } from 'react';
import './Pending.scss';

export default function Pending() {
    return (
        <div id="container-page" className="hero">

            <div className="hero-body">
                <div className="container">
                    <h1 id="title-h1" className="title is-size-2 has-text-centered">Salle d'attente
                        <img id="iconPending" src="./images/cafe-coffee-cup-svgrepo-com.svg" alt="tasse de café, représentant la salle d'attente" />
                    </h1>
                </div>
            </div>

            <div id="pending-status" className="box has-text-centered">
                <h2 className="is-size-5"> Vous êtes en attente de validation par l'administrateur
                </h2>
            </div>
            <div id="pending-text" className="box has-text-justified">
                <p>
                    <b>Selon la théorie de la relativité du temps par pépère à la langue bien pendante:</b> 
                </p> 
                <p>   
                    Le temps n'est pas absolu et universel, mais dépend de la vitesse et de la gravité. Cela signifie que le temps peut s'écouler différemment pour différents observateurs en fonction de leur vitesse relative et de leur position dans un champ gravitationnel.
                </p>
                <p>
                    La relativité restreinte, publiée par lui-même en 1905, stipule que le temps est relatif et que deux événements simultanés pour un observateur peuvent ne pas l'être pour un autre observateur en mouvement relatif par rapport au premier (hum...).
                </p>
                <p>
                    Cela est dû au fait que la vitesse de la lumière est constante pour tous les observateurs, quel que soit leur mouvement relatif (hum..hum..).
                </p>
                <p>
                    Cette constance de la vitesse de la lumière entraîne une dilatation du temps, ce qui signifie que le temps s'écoule plus lentement pour un objet en mouvement par rapport à un objet au repos.
                </p>
            </div>
            <div id="pending-text" className="box is-flex is-align-items-center is-justify-content-center is-size-5">
                <p>En gros, si tu en as marre d'attendre, va vite faire quelque chose, ça passera plus vite.
                    <img id="iconPending-xoxo" src="./images/bisous-bisous.png" alt="tasse de café, représentant la salle d'attente" />
                </p>
            </div>
        </div>
    );
}
