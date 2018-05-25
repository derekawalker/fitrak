import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Styles from "./Styles";

export class AuthMenu extends Component {
  render() {
    return (
      <nav className={Styles.container}>
        <NavLink to="/about">About</NavLink>
        <NavLink className={Styles.button} to="/login">
          Login
        </NavLink>
        <NavLink className={Styles.button} to="/signup">
          Sign Up
        </NavLink>
      </nav>
    );
  }
}

export default AuthMenu;
