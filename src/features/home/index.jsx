import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid, Segment, Header } from "semantic-ui-react";
import { openModal } from "../../features/modals/modalActions";
import Styles from "./Styles";

const actions = {
  openModal
};

export class HomePage extends Component {
  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };
  render() {
    return (
      <div>
        <div className={Styles.masthead}>
          <Header inverted size="huge" as="h2">
            Gain Total Control of Your Money
          </Header>
          <p>
            Stop living paycheck to paycheck, get out of debt, and save more
            money.
          </p>
          <Button size="big" color="green" onClick={this.handleRegister}>
            Create a FREE Account
          </Button>
        </div>

        <div className={Styles.intro}>
          <Header size="huge" textAlign="center">
            FiTrak helps you make and track financial goals in 3 easy steps:
          </Header>
          <Segment.Group>
            <Segment>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column mobile={16} tablet={8} computer={6}>
                    <img
                      className={Styles.icons}
                      src="/assets/images/budget.jpg"
                      alt="Budget"
                    />
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={8} computer={10}>
                    <Header size="large">1. Create a Budget</Header>
                    <p>
                      The absolute first step to achieving financial
                      independence is creating a budget.
                    </p>
                    <Button
                      size="big"
                      color="green"
                      onClick={this.handleRegister}
                    >
                      Get Started
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>

            <Segment>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column mobile={16} tablet={8} computer={6}>
                    <img
                      className={Styles.icons}
                      src="/assets/images/budget.jpg"
                      alt="Budget"
                    />
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={8} computer={10}>
                    <Header size="large">2. Evaluate Your Debt</Header>
                    <p>
                      Debts can really be a drag on your financial peace of
                      mind. List your debts, and learn how to pay them off.
                    </p>
                    <Button
                      size="big"
                      color="green"
                      onClick={this.handleRegister}
                    >
                      Get Started
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>

            <Segment>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column mobile={16} tablet={8} computer={6}>
                    <img
                      className={Styles.icons}
                      src="/assets/images/budget.jpg"
                      alt="Budget"
                    />
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={8} computer={10}>
                    <Header size="large">3. List Your Savings & Assets</Header>
                    <p>
                      FiTrak analyzes your assets and will help you see how far
                      along the path to financial indepence you've made it, and
                      how far you've got to go.
                    </p>
                    <Button
                      size="big"
                      color="green"
                      onClick={this.handleRegister}
                    >
                      Get Started
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Segment.Group>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(HomePage);
