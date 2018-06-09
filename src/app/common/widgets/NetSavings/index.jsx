import React, { Component } from "react";
import { Icon, Statistic } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { formatMoney } from "accounting";
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

export class NetSavings extends Component {
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

    let netSavingsColor = "green";
    let netSavingsDirection = "up";

    if (netSavings < 0) {
      netSavingsColor = "red";
      netSavingsDirection = "down";
    }

    return (
      <Statistic size={size}>
        <Statistic.Value>
          <Icon
            className={Styles.icon}
            color={netSavingsColor}
            name={`arrow circle outline ${netSavingsDirection}`}
          />
          {formatMoney(netSavings)}
        </Statistic.Value>
        <Statistic.Label>Monthly Net Savings</Statistic.Label>
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
  ])(NetSavings)
);
