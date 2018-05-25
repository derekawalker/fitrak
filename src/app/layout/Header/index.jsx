import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo.svg";
import AuthMenu from "../../../features/nav/menus/AuthMenu";
import Styles from "./Styles";

export class Header extends Component {
  render() {
    return (
      <header className={Styles.wrapper}>
        <div className={Styles.container}>
          <Link className={Styles.identity} to="/">
            <img className={Styles.logo} src={Logo} alt="FiTrak Logo" />
            <span className={Styles.name}>FiTrak</span>
          </Link>
          <AuthMenu />
        </div>
      </header>
    );
  }
}

export default Header;
