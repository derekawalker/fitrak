import React, { Component } from "react";
import ToolsMenu from "../../../features/nav/menus/ToolsMenu";
import Styles from "./Styles";

export class Body extends Component {
  render() {
    return (
      <div className={Styles.wrapper}>
        <div className={Styles.container}>
          <ToolsMenu />
          <main className={Styles.body}>{this.props.children}</main>
        </div>
      </div>
    );
  }
}

export default Body;
