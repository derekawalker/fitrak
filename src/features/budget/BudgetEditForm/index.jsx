import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Input, Select, Grid, Confirm } from "semantic-ui-react";
import { editBudgetItem, deleteBudgetItem } from "../budgetActions";
import { categories } from "../../../app/data/sampleData";
import Styles from "./Styles";

const actions = {
  editBudgetItem,
  deleteBudgetItem
};

export class BudgetEditForm extends Component {
  state = {
    id: this.props.budgetItem.id,
    amount: this.props.budgetItem.amount,
    name: this.props.budgetItem.name,
    category: this.props.budgetItem.category,
    disabled: true,
    confirmOpen: false
  };

  static getDerivedStateFromProps(state, prevState) {
    if (state.budgetItem.amount !== prevState.amount) {
      return {
        disabled: false
      };
    }
    return null;
  }

  handleChange = event => {
    const target = event.target;
    let value = target.value;
    const name = target.name;

    if (name === "amount") {
      value = Number(value);
    }

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { id, name, category, amount } = this.state;

    let amountNum = Number(amount);
    const newItem = {
      name: name,
      category: category,
      amount: amountNum
    };
    const itemId = id;
    this.props.editBudgetItem(newItem, itemId);
    this.setState({
      disabled: true
    });
  };

  handleDelete = event => {
    event.preventDefault();
    this.props.deleteBudgetItem(this.state.id);
    this.handleConfirmClose();
  };

  handleConfirmOpen = () => this.setState({ confirmOpen: true });
  handleConfirmClose = () => this.setState({ confirmOpen: false });

  render() {
    const { budgetItem } = this.props;
    return (
      <Form key={budgetItem.id}>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Form.Field
                control={Input}
                name="name"
                type="text"
                placeholder="Car Payment"
                defaultValue={budgetItem.name}
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Form.Field
                control={Select}
                name="category"
                search
                selection
                fluid
                options={categories}
                defaultValue={budgetItem.category}
                placeholder="Select a category"
                onClick={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Form.Field
                control={Input}
                name="amount"
                type="number"
                step="0.01"
                iconlabel="$"
                placeholder="0.00"
                defaultValue={budgetItem.amount}
                onChange={this.handleChange}
              />
              <input name="id" type="hidden" defaultValue={budgetItem.id} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={3}>
              <div className={Styles.buttons}>
                <Button
                  type="submit"
                  icon="check"
                  positive
                  onClick={this.handleSubmit}
                  disabled={this.state.disabled}
                  className={Styles.save}
                />
                <Button
                  icon="trash"
                  negative
                  basic
                  onClick={this.handleConfirmOpen}
                  className={Styles.delete}
                />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Confirm
          open={this.state.confirmOpen}
          onCancel={this.handleConfirmClose}
          onConfirm={this.handleDelete}
        />
      </Form>
    );
  }
}

export default connect(
  null,
  actions
)(BudgetEditForm);
