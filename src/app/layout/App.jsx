import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ModalManager from "../../features/modals/ModalManager";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import Styles from "./Styles";
import HomePage from "../../features/home";
import LoginPage from "../../features/login";
import SignUpPage from "../../features/signup";
import AboutPage from "../../features/about";
import BudgetPage from "../../features/budget";
import DebtsPage from "../../features/debts";
import AssetsPage from "../../features/assets";
import DashboardPage from "../../features/dashboard";

class App extends Component {
  render() {
    return (
      <div className={Styles.container}>
        <ModalManager />
        <Header />

        <Body>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/budget" component={BudgetPage} />
            <Route path="/debts" component={DebtsPage} />
            <Route path="/assets" component={AssetsPage} />
            <Route path="/dashboard" component={DashboardPage} />
          </Switch>
        </Body>

        <Footer />
      </div>
    );
  }
}

export default App;
