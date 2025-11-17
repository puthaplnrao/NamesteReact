import React, { useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";

function Header() {
  const [btnText, setbtnText] = useState("Login");
  return (
    <>
      <div className="header">
        <div className="logo-container">
          <img className="logo" src={LOGO_URL} alt="logo" />
        </div>
        <div className="nav-items">
          <ul>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <li
              onClick={() =>
                btnText === "Login" ? setbtnText("Logout") : setbtnText("Login")
              }
            >
              {btnText}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
