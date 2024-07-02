import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Guestbook from '../Guestbook/Guestbook';
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
                </Routes>
            </div>
        </Router>
      
    );
}

export default App;