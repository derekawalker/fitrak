import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import ToolsMenu from "../../../features/nav/menus/ToolsMenu";
import Styles from "./Styles";

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export class Body extends Component {
  render() {
    const { auth } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <div className={Styles.wrapper}>
        {authenticated && (
          <div className={Styles.container}>
            <ToolsMenu />{" "}
            <main className={Styles.body}>{this.props.children}</main>
          </div>
        )}
        {!authenticated && (
          <div className={Styles.container}>
            <main className={Styles.bodyAnon}>{this.props.children}</main>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(connect(mapState)(Body));
