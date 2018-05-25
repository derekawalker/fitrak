import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteBudgetItem } from "../budgetActions";
import { Table, Button } from "semantic-ui-react";
import { formatMoney } from "accounting";
import _ from "lodash";
import { categories } from "../../../app/data/sampleData";
import Styles from "./Styles";

const mapState = state => ({
  budget: state.budget,
  loading: state.async.loading
});

const actions = {
  deleteBudgetItem
};

let tableFormat;

export class BudgetList extends Component {
  state = {
    column: null,
    data: this.props.budget,
    filteredData: this.props.budget.filter(item => {
      return item.type === this.props.type;
    }),
    direction: null,
    isEditable: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.budget.length !== prevState.data.length) {
      return {
        data: nextProps.budget,
        filteredData: nextProps.budget.filter(item => {
          return item.type === nextProps.type;
        })
      };
    }
    return null;
  }

  handleSort = clickedColumn => () => {
    const { column, direction, data, filteredData } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        filteredData: _.sortBy(filteredData, [clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      filteredData: filteredData.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  handleTableEdit = () => {
    this.setState(prevState => ({
      isEditable: !prevState.isEditable
    }));
  };

  render() {
    const { column, direction, filteredData, isEditable } = this.state;
    const { color, name, type } = this.props;

    // let filteredBudget = budget.filter(item => {
    //   return item.type === type;
    // });

    // let sortedBudget = _.orderBy(
    //   filteredBudget,
    //   ["amount", "name"],
    //   ["desc", "asc"]
    // );

    let tableFormat = filteredData.map((item, index) => (
      <Table.Row key={index}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>
          {_.find(categories, _.matchesProperty("value", item.category)).text}
        </Table.Cell>
        <Table.Cell>{formatMoney(item.amount)}</Table.Cell>
      </Table.Row>
    ));

    if (isEditable) {
      tableFormat = filteredData.map((item, index) => (
        <Table.Row key={index}>
          <Table.Cell>{item.name} Edit</Table.Cell>
          <Table.Cell>
            {_.find(categories, _.matchesProperty("value", item.category)).text}
          </Table.Cell>
          <Table.Cell>{formatMoney(item.amount)}</Table.Cell>
        </Table.Row>
      ));
    }

    return (
      <div>
        <h4 className={Styles.heading}>
          {name}
          <Button icon="setting" onClick={this.handleTableEdit} />
        </h4>

        <Table striped sortable fixed color={color}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "name" ? direction : null}
                onClick={this.handleSort("name")}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "category" ? direction : null}
                onClick={this.handleSort("category")}
              >
                Category
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "amount" ? direction : null}
                onClick={this.handleSort("amount")}
              >
                Amount
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{tableFormat}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default connect(mapState, actions)(BudgetList);
