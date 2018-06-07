import React, { Component } from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import Styles from "./Styles";

export class AuthMenu extends Component {
  render() {
    const { signOut, profile } = this.props;
    return (
      <nav className={Styles.container}>
        <NavLink to="/about">About</NavLink>
        <Menu.Item position="right" className={Styles.dropdown}>
          <Image
            avatar
            spaced="right"
            src={profile.photoURL || "/assets/images/user.png"}
          />
          <Dropdown pointing="top right" text={profile.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={NavLink}
                to="/account"
                text="My Account"
                icon="settings"
              />
              <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </nav>
    );
  }
}

export default AuthMenu;
