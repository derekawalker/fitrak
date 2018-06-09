import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Doughnut } from "react-chartjs-2";
import _ from "lodash";
import { Colors } from "../../../styles/variables";
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

export class SavingsPercentageChart extends Component {
  render() {
    const { budget } = this.props;

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

    let percentageColor = Colors.green;

    let p = savingsPercentage;

    switch (true) {
      case p <= 1:
        percentageColor = Colors.red;
        break;
      case p > 1 && p <= 1.70537:
        percentageColor = Colors.violet;
        break;
      case p > 1.70537 && p <= 2.908286837:
        percentageColor = Colors.purple;
        break;
      case p > 2.908286837 && p <= 4.959705123:
        percentageColor = Colors.pink;
        break;
      case p > 4.959705123 && p <= 8.458132326:
        percentageColor = Colors.red;
        break;
      case p > 8.458132326 && p <= 14.42424512:
        percentageColor = Colors.orange;
        break;
      case p > 14.42424512 && p <= 24.59867491:
        percentageColor = Colors.yellow;
        break;
      case p > 24.59867491 && p <= 41.94984223:
        percentageColor = Colors.olive;
        break;
      case p > 41.94984223:
        percentageColor = Colors.green;
        break;
      default:
        percentageColor = Colors.green;
    }

    const data = {
      labels: ["% of Income Saved"],
      datasets: [
        {
          label: "Percentage",
          data: [savingsPercentage, 100 - savingsPercentage],
          backgroundColor: [percentageColor, "rgba(0, 0, 0, .05)"],
          stack: "a"
        },
        {
          label: "Percentage",
          data: [
            1,
            1.70537,
            2.908286837,
            4.959705123,
            8.458132326,
            14.42424512,
            24.59867491,
            41.94984223
          ],
          backgroundColor: [
            Colors.violet,
            Colors.purple,
            Colors.pink,
            Colors.red,
            Colors.orange,
            Colors.yellow,
            Colors.olive,
            Colors.green
          ],
          stack: "b"
        }
      ]
    };
    const options = {
      legend: {
        position: "bottom"
      },
      maintainAspectRatio: false,
      cutoutPercentage: 50,
      rotation: 1 * Math.PI,
      circumference: 1 * Math.PI,
      tooltips: {
        enabled: false
      }
    };

    return (
      <div className={Styles.chart}>
        <Doughnut data={data} options={options} />
      </div>
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
  ])(SavingsPercentageChart)
);
