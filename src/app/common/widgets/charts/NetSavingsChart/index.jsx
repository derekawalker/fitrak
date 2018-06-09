import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Bar } from "react-chartjs-2";
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

export class NetSavingsChart extends Component {
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

    let netSavingsColor = Colors.green;

    if (netSavings < 0) {
      netSavingsColor = Colors.red;
    }

    const data = {
      labels: ["Budget Totals", "Net Savings"],
      datasets: [
        {
          label: "Income",
          data: [incomeTotal.toFixed(2)],
          stack: "a",
          backgroundColor: [Colors.green]
        },
        {
          label: "Savings",
          data: [savingsTotal.toFixed(2)],
          stack: "a",
          backgroundColor: [Colors.olive]
        },
        {
          label: "Expenses",
          data: [-expensesTotal.toFixed(2)],
          stack: "a",
          backgroundColor: [Colors.red]
        },
        {
          label: "Net Savings",
          data: [0, netSavings.toFixed(2)],
          stack: "a",
          backgroundColor: [Colors.green, netSavingsColor]
        }
      ]
    };

    function number_format(number, decimals, dec_point, thousands_sep) {
      // *     example: number_format(1234.56, 2, ',', ' ');
      // *     return: '1 234,56'
      number = (number + "").replace(",", "").replace(" ", "");
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
        dec = typeof dec_point === "undefined" ? "." : dec_point,
        s = "",
        toFixedFix = function(n, prec) {
          var k = Math.pow(10, prec);
          return "" + Math.round(n * k) / k;
        };
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
      s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
      if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
      }
      return s.join(dec);
    }

    const options = {
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            display: true,
            stacked: true,
            ticks: {
              callback: function(value, index, values) {
                return "$ " + number_format(value);
              }
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel =
              chart.datasets[tooltipItem.datasetIndex].label || "";
            return datasetLabel + ": $ " + number_format(tooltipItem.yLabel, 2);
          }
        }
      }
    };

    return (
      <div className={Styles.chart}>
        <Bar data={data} options={options} />
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
  ])(NetSavingsChart)
);
