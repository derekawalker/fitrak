import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import {
  Grid,
  Divider,
  Segment,
  Statistic,
  Icon,
  Popup
} from "semantic-ui-react";
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

const NetIncomePopupNegative = () => (
  <Popup
    inverted
    trigger={<Icon name="exclamation triangle" color="yellow" />}
    content="The most important step you can take right now is to make your net income positive. Figure out which expenses you can reduce, and/or find ways to increase your income."
  />
);

const NetIncomePopupPositive = () => (
  <Popup
    inverted
    trigger={<Icon name="thumbs up" color="green" />}
    content="Great job! A positive net income is the first step to taking control of your finances."
  />
);

const NetSavingsPopupNegative = () => (
  <Popup
    inverted
    trigger={<Icon name="exclamation triangle" color="yellow" />}
    content="It's critical that your monthly net savings is positive. Examine your budget and find ways to divert more money to savings each month. Make increasing this amount your number one priority!"
  />
);

const NetSavingsPopupPositive = () => (
  <Popup
    inverted
    trigger={<Icon name="thumbs up" color="green" />}
    content="Great job! A positive net savings is the key to building wealth and gaining financial freedom."
  />
);

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

    let netIncomeColor = "green";
    let netSavingsColor = "green";
    let netIncomeDirection = "up";
    let netSavingsDirection = "up";
    let NetIncomePopup = <NetIncomePopupPositive />;
    let NetSavingsPopup = <NetSavingsPopupPositive />;

    if (netIncome < 0) {
      netIncomeColor = "red";
      netIncomeDirection = "down";
      NetIncomePopup = <NetIncomePopupNegative />;
    }

    if (netSavings < 0) {
      netSavingsColor = "red";
      netSavingsDirection = "down";
      NetSavingsPopup = <NetSavingsPopupNegative />;
    }

    return (
      <Grid reversed="computer">
        <Grid.Column mobile={16} computer={6}>
          <BudgetForm budget={budget} />
        </Grid.Column>
        <Grid.Column mobile={16} computer={10}>
          <Segment padded>
            <Statistic.Group widths={2} size="small">
              <Statistic>
                <Statistic.Value>
                  <Icon
                    className={Styles.icon}
                    color={netIncomeColor}
                    name={`arrow circle outline ${netIncomeDirection}`}
                  />
                  {formatMoney(netIncome)}
                </Statistic.Value>
                <Statistic.Label>Net Income {NetIncomePopup}</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  <Icon
                    className={Styles.icon}
                    color={netSavingsColor}
                    name={`arrow circle outline ${netSavingsDirection}`}
                  />
                  {formatMoney(netSavings)}
                </Statistic.Value>
                <Statistic.Label>
                  Total Monthly Savings {NetSavingsPopup}
                </Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
          <Divider hidden />
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
