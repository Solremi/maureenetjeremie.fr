import React from "react";
import './Header.scss';

export default function Header() {
    return (
        <header>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/home">
                    <h2 className="title is-3 has-text-primary-dark">Maureen & Jérémie</h2>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbar" className="navbar-menu">
                    <div className="navbar-end">
                        <a className="navbar-item" href="/home">
                            Home
                        </a>
                        <a className="navbar-item" href="/about">
                            About
                        </a>
                        <a className="navbar-item" href="/contact">
                            Contact
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}

