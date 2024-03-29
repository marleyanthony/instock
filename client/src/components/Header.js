import React from "react";
import logo from "../assets/Logo/logo.svg";
import { Link } from "react-router-dom";

function header() {
  return (
    <section className="header">
      <div className="header__colour-block"></div>
      <div className="header__logo-container">
        <img className="header__logo" src={logo} alt="logo" />
      </div>

      <div className="header__wh-inv-container">
        <Link
          to="/warehouse"
          className="header__link-btn header__link-btn--bdRadius"
        >
          <button className="header__wh-btn btn">Warehouses</button>
        </Link>
        <Link to="/inventory" className="header__link-btn">
          <button className="header__inv-btn btn"> Inventory</button>
        </Link>
      </div>
    </section>
  );
}

export default header;
