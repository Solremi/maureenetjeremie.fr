import './Login.scss';
import React from 'react';

export default function Login() {
    return (
        <>
        <form method="post">
            <div className="columns is-centered">
                <div className="column is-one-third form-connexion"> 
                    <h1 className="title is-3 has-text-centered">Connecte toi !</h1>
                    <h2 className="subtitle is-5 has-text-centered">
                        Si tu n'es pas encore inscrit, par <a  href="/"><strong id='ici'>ici</strong></a>    
                    </h2> 
                    <div className="field">
                        <label className="label">Prénom</label>
                        <div className="control">
                            <input className="input" type="text" name="firstname" placeholder="Ton prénom" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Mot de passe</label>
                        <div className="control">
                            <input className="input" type="password" name="password" placeholder="Mot de passe" />
                        </div>
                    </div>

                    <div className="control form-button">
                        <button id="button-login" className="button is-primary is-danger">Connexion</button>
                    </div>
                </div>
            </div>
        </form>
        </>
    );
}
