import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";
import { formatMoney } from "accounting";
import _ from "lodash";
import BudgetListItem from "../BudgetListItem";
import Styles from "./Styles";

export class BudgetList extends Component {
  state = {
    column: null,
    data: this.props.budget,
    filteredData: this.props.budget.filter(item => {
      return item.type === this.props.type;
    }),
    sortedData: _.sortBy(
      this.props.budget.filter(item => {
        return item.type === this.props.type;
      }),
      "amount"
    ),
    direction: null,
    isEditable: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.budget !== prevState.data) {
      return {
        budget: nextProps.budget,
        filteredData: nextProps.budget.filter(item => {
          return item.type === nextProps.type;
        }),
        sortedData: _.sortBy(
          nextProps.budget.filter(item => {
            return item.type === nextProps.type;
          }),
          prevState.column
        )
      };
    }
    return null;
  }

  handleSort = clickedColumn => () => {
    const { column, direction, filteredData, sortedData } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        sortedData: _.sortBy(filteredData, [clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      sortedData: sortedData.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });

    return;
  };

  handleEdit = () => {
    this.setState(prevState => ({
      isEditable: !prevState.isEditable
    }));
  };

  render() {
    const {
      column,
      direction,
      filteredData,
      isEditable,
      sortedData
    } = this.state;
    const { color, name } = this.props;
    let typeTotal;
    if (filteredData.length > 0) {
      typeTotal = filteredData
        .map(item => item.amount)
        .reduce((prev, next) => prev + next);
    }

    let rows;

    if (sortedData.length) {
      rows = sortedData.map(budget => (
        <BudgetListItem key={budget.id} item={budget} isEditable={isEditable} />
      ));
    } else {
      rows = filteredData.map(budget => (
        <BudgetListItem key={budget.id} item={budget} isEditable={isEditable} />
      ));
    }

    let icon = "setting";
    if (this.state.isEditable) {
      icon = "close";
    }

    return (
      <div>
        <h2 className={Styles.heading}>
          {name}: {formatMoney(typeTotal)}
          <Icon
            name={icon}
            onClick={this.handleEdit}
            className={Styles.icon}
            color="grey"
          />
        </h2>

        <Table striped sortable verticalAlign="top" color={color}>
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
                className={Styles.rightCell}
              >
                Amount
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{rows}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default BudgetList;
