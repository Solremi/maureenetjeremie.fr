import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Guestbook from '../Guestbook/Guestbook';
import Picture from '../Picture/Picture';
import Place from '../Place/Place';
import Quizz from '../Quizz/Quizz';
import NotFound from '../404/404';

import './App.scss';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path = "/home" element = {<Home />} />
                    <Route path = "/" element = {<Signup />} />
                    <Route path = "/login" element = {<Login />} />
                    <Route path = "/guestbook" element = {<Guestbook />} />
                    <Route path = "/pictures" element = {<Picture />} />
                    <Route path = "/ThePlaceToBe" element = {<Place />} />
                    <Route path = "/quizz" element = {<Quizz />} />
                    <Route path = "*" element = {<NotFound />} />
                </Routes>
            </div>
        </Router>
      
    );
}

export default App;