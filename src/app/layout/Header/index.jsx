import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { Link, withRouter } from "react-router-dom";
import AuthMenu from "../../../features/nav/menus/AuthMenu";
import AnonMenu from "../../../features/nav/menus/AnonMenu";
import { openModal } from "../../../features/modals/modalActions";
import Styles from "./Styles";

const actions = {
  openModal
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export class Header extends Component {
  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <header className={Styles.wrapper}>
        <div className={Styles.container}>
          <Link className={Styles.identity} to="/">
            <img
              className={Styles.logo}
              src="/assets/images/logo.svg"
              alt="FiTrak Logo"
            />
            <span className={Styles.name}>FiTrak</span>
          </Link>
          {authenticated && (
            <AuthMenu profile={profile} signOut={this.handleSignOut} />
          )}
          {!authenticated && (
            <AnonMenu
              register={this.handleRegister}
              signIn={this.handleSignIn}
            />
          )}
        </div>
      </header>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(Header)));
