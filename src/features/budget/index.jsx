import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Grid, Divider, Header } from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";
import { formatMoney } from "accounting";
import BudgetForm from "./BudgetForm";
import BudgetList from "./BudgetList";
import Styles from "./Styles";

const mapState = state => ({
  budget: state.firestore.ordered.users || [],
  currentUser: state.firebase.auth.uid,
  loading: state.async.loading
});

let netIncome = 0;
let netSavings = 0;
let incomeTotal = 0;
let expensesTotal = 0;
let savingsTotal = 0;

export class BudgetPage extends Component {
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

    netIncome = incomeTotal - expensesTotal;
    netSavings = incomeTotal + savingsTotal - expensesTotal;

    return (
      <Grid reversed="computer">
        <Grid.Column mobile={16} computer={6}>
          <BudgetForm budget={budget} />
        </Grid.Column>
        <Grid.Column mobile={16} computer={10}>
          <div>
            <Header as="h1">
              Net Savings:{" "}
              <Header
                as="span"
                className={Styles.sameSize}
                color={netSavings >= 0 ? "green" : "red"}
              >
                {formatMoney(netSavings)}
              </Header>
            </Header>
            <Divider />
          </div>
          <div>
            <Header as="h1">
              Net Income:{" "}
              <Header
                as="span"
                className={Styles.sameSize}
                color={netIncome >= 0 ? "green" : "red"}
              >
                {formatMoney(netIncome)}
              </Header>
            </Header>
            <Divider />
          </div>
          <BudgetList
            budget={budget}
            type="income"
            name="Monthly Income"
            color="green"
          />
          <Divider hidden />
          <BudgetList
            budget={budget}
            type="expense"
            name="Monthly Expenses"
            color="red"
          />
          <Divider hidden />
          <BudgetList
            budget={budget}
            type="savings"
            name="Monthly Savings"
            color="olive"
          />
        </Grid.Column>
      </Grid>
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
  ])(BudgetPage)
);
