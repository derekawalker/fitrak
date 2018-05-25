import React, { Component } from "react";
import { Grid, Divider } from "semantic-ui-react";
import BudgetForm from "./BudgetForm";
import BudgetList from "./BudgetList";

export class BudgetPage extends Component {
  render() {
    return (
      <Grid reversed="computer">
        <Grid.Column mobile={16} computer={6}>
          <BudgetForm />
        </Grid.Column>
        <Grid.Column mobile={16} computer={10}>
          <BudgetList type="income" name="Income" color="green" />
          <Divider hidden />
          <BudgetList type="expense" name="Expenses" color="red" />
          <Divider hidden />
          <BudgetList type="transfer" name="Transfers" color="grey" />
        </Grid.Column>
      </Grid>
    );
  }
}

export default BudgetPage;
