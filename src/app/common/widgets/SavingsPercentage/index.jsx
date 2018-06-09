import React, { Component } from "react";
import { Icon, Statistic } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import _ from "lodash";
import Styles from "./Styles";

const mapState = state => ({
  budget: state.firestore.ordered.users || [],
  currentUser: state.firebase.auth.uid,
  loading: state.async.loading
});

let netSavings = 0;
let incomeTotal = 0;
let expensesTotal = 0;
let savingsTotal = 0;
let savingsPercentage = 0;

export class SavingsPercentage extends Component {
  render() {
    const { budget, size } = this.props;

    incomeTotal = _.sumBy(
      budget.filter(item => {
        return item.type === "income";
      }),
      "amount"
    );

    expensesTotal = _.sumBy(
      budget.filter(item => {
        return item.type === "expense";
      }),
      "amount"
    );

    savingsTotal = _.sumBy(
      budget.filter(item => {
        return item.type === "savings";
      }),
      "amount"
    );

    netSavings = incomeTotal + savingsTotal - expensesTotal;
    savingsPercentage = ((netSavings / incomeTotal) * 100).toFixed(2);

    let percentageColor;
    let percentageLevel;
    let p = savingsPercentage;

    switch (true) {
      case p <= 10:
        percentageColor = "red";
        percentageLevel = "battery empty";
        break;
      case p > 10 && p <= 20:
        percentageColor = "orange";
        percentageLevel = "battery quarter";
        break;
      case p > 20 && p <= 30:
        percentageColor = "yellow";
        percentageLevel = "battery half";
        break;
      case p > 30 && p <= 40:
        percentageColor = "olive";
        percentageLevel = "battery three quarters";
        break;
      case p > 40 && p <= 50:
        percentageColor = "green";
        percentageLevel = "battery full";
        break;
      case p > 50:
        percentageColor = "green";
        percentageLevel = "rocket";
        break;
      default:
        percentageColor = "green";
        percentageLevel = "smile";
    }

    return (
      <Statistic size={size}>
        <Statistic.Value>
          <Icon
            className={Styles.icon}
            color={percentageColor}
            name={`${percentageLevel}`}
          />
          {savingsPercentage}%
        </Statistic.Value>
        <Statistic.Label>Savings Percentage</Statistic.Label>
      </Statistic>
    );
  }
}

export default connect(mapState)(
  firestoreConnect(props => [
    {
      collection: "users",
      doc: props.currentUser,
      subcollections: [{ collection: "budget" }]
    }
  ])(SavingsPercentage)
);
