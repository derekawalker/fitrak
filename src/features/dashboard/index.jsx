import React, { Component } from "react";
import { Card, Image, Divider } from "semantic-ui-react";

import NetSavings from "../../app/common/widgets/NetSavings";
import NetSavingsChart from "../../app/common/widgets/charts/NetSavingsChart";
import SavingsPercentange from "../../app/common/widgets/SavingsPercentage";
import SavingsPercentageChart from "../../app/common/widgets/charts/SavingsPercentageChart";

export class DashboardPage extends Component {
  render() {
    return (
      <div>
        <Divider horizontal>Budget & Savings Rate</Divider>
        <Card.Group centered>
          <Card>
            <NetSavingsChart />
            <Card.Content textAlign="center">
              <Card.Description>
                <NetSavings size="tiny" />
              </Card.Description>
            </Card.Content>
          </Card>

          <Card>
            <SavingsPercentageChart />
            <Card.Content textAlign="center">
              <Card.Description>
                <SavingsPercentange size="tiny" />
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
        <Divider hidden />

        <Divider horizontal>Debts</Divider>
        <Card.Group centered>
          <Card>
            <Image src="/assets/images/budget.jpg" />
            <Card.Content textAlign="center">
              <Card.Description>
                <NetSavings size="tiny" />
              </Card.Description>
            </Card.Content>
          </Card>

          <Card>
            <Image src="/assets/images/budget.jpg" />
            <Card.Content textAlign="center">
              <Card.Description>
                <SavingsPercentange size="tiny" />
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
        <Divider hidden />

        <Divider horizontal>Assets & Wealth</Divider>
        <Card.Group centered>
          <Card>
            <Image src="/assets/images/budget.jpg" />
            <Card.Content textAlign="center">
              <Card.Description>
                <NetSavings size="tiny" />
              </Card.Description>
            </Card.Content>
          </Card>

          <Card>
            <Image src="/assets/images/budget.jpg" />
            <Card.Content textAlign="center">
              <Card.Description>
                <SavingsPercentange size="tiny" />
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
        <Divider hidden />
      </div>
    );
  }
}

export default DashboardPage;
