import React, { Component } from "react";
import Styles from "./Styles";

export class Footer extends Component {
  render() {
    return (
      <footer className={Styles.wrapper}>
        <div className={Styles.container}>
          <p>Copyright &copy; 2018</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
