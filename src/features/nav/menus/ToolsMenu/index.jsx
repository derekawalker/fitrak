import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import Styles from "./Styles";

export class ToolsMenu extends Component {
  render() {
    return (
      <nav className={Styles.container}>
        <NavLink to="/dashboard">
          <Icon name="dashboard" /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/budget">
          <Icon name="list layout" /> <span>Budget</span>
        </NavLink>
        <NavLink to="/debts">
          <Icon name="credit card" /> <span>Debts</span>
        </NavLink>
        <NavLink to="/assets">
          <Icon name="dollar" /> <span>Assets</span>
        </NavLink>
      </nav>
    );
  }
}

export default ToolsMenu;
