import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Styles from "./Styles";

export class AuthMenu extends Component {
  render() {
    const { signIn, register } = this.props;
    return (
      <nav className={Styles.container}>
        <NavLink to="/about">About</NavLink>
        <a className={Styles.button} onClick={signIn}>
          Log In
        </a>
        <a className={Styles.button} onClick={register}>
          Register
        </a>
      </nav>
    );
  }
}

export default AuthMenu;
