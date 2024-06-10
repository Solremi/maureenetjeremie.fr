import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Home.scss";

export default function Home() {
  return (
    <div className="Home">
      <Header />
      <div className="content">
        <h1>Welcome to the Home Page</h1>
      </div>
      <Footer />
    </div>
  );
}
