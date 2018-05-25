import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Accordion, Form, Button, Header, Icon } from "semantic-ui-react";
import { combineValidators, isRequired } from "revalidate";
import { createBudgetItem } from "./budgetActions";
import TextInput from "../../app/common/form/TextInput";
import SelectInput from "../../app/common/form/SelectInput";
import { categories } from "../../app/data/sampleData";

const actions = {
  createBudgetItem
};

const type = [
  { key: "income", text: "Income", value: "income" },
  { key: "expense", text: "Expense", value: "expense" },
  { key: "transfer", text: "Transfer", value: "transfer" }
];

const validate = combineValidators({
  name: isRequired({ message: "The item name is required" }),
  category: isRequired({ message: "Please provide a category" }),
  type: isRequired({ message: "Please select a type" }),
  amount: isRequired({ message: "Please enter an amount" })
});

export class BudgetForm extends Component {
  state = { activeIndex: -1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  onFormSubmit = values => {
    values.amount = Number(values.amount);
    const newItem = {
      ...values
    };
    this.props.createBudgetItem(newItem);
  };

  render() {
    const { invalid, submitting, pristine } = this.props;
    const { activeIndex } = this.state;
    return (
      <Accordion styled fluid>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Header as="h4" color="green">
            <Icon name="dropdown" />
            Add a Budget Item
          </Header>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Name</label>
                <Field
                  name="name"
                  type="text"
                  component={TextInput}
                  placeholder="Car Payment"
                />
              </Form.Field>
              <Form.Field>
                <label>Amount</label>
                <Field
                  name="amount"
                  type="number"
                  step="0.01"
                  component={TextInput}
                  placeholder="300.00"
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Type</label>
              <Field
                name="type"
                type="text"
                component={SelectInput}
                options={type}
                placeholder="Select a type"
              />
            </Form.Field>
            <Form.Field>
              <label>Category</label>
              <Field
                name="category"
                type="text"
                fluid
                search
                selection
                component={SelectInput}
                options={categories}
                placeholder="Select a category"
              />
            </Form.Field>

            <Button
              disabled={invalid || submitting || pristine}
              positive
              type="submit"
            >
              Add Item
            </Button>
          </Form>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default connect(null, actions)(
  reduxForm({ form: "budgetForm", enableReinitialize: true, validate })(
    BudgetForm
  )
);
