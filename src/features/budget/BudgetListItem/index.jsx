import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { formatMoney } from "accounting";
import _ from "lodash";
import { categories } from "../../../app/data/sampleData";
import BudgetEditForm from "../../../features/budget/BudgetEditForm";
import Styles from "./Styles";

export class BudgetListItem extends Component {
  render() {
    const { item, isEditable } = this.props;

    let budgetRow;

    if (isEditable) {
      budgetRow = (
        <Table.Row key={item.id}>
          <Table.Cell colSpan="3">
            <BudgetEditForm budgetItem={item} />
          </Table.Cell>
        </Table.Row>
      );
    } else {
      budgetRow = (
        <Table.Row key={item.id}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>
            {_.find(categories, _.matchesProperty("value", item.category)).text}
          </Table.Cell>
          <Table.Cell className={Styles.rightCell}>
            {formatMoney(item.amount)}
          </Table.Cell>
        </Table.Row>
      );
    }

    return budgetRow;
  }
}

export default BudgetListItem;
