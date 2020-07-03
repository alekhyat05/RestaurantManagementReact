import React, { Component } from "react";
import { tag } from "postcss-selector-parser";
import Autocomplete from "react-autocomplete";
import { arrayExpression } from "@babel/types";
import { Container, Row, Card, Col, Button } from "react-bootstrap";

class Dinner extends Component {
  state = {
    // table: this.props.match.params,

    testvalue: this.props.value,
    //id: this.props.match.params,
    autoCompleteArray: [],
    text: 0,
    value: ""
  };

  render() {
    console.log("this.props.menu", this.props.menu);
    return (
      <React.Fragment>
        <h1 className="center-text">
          Dinner Cart - Table {this.props.tableData.number}
        </h1>
        <Container>
          <Row>
            <Col md={3}>
              <label>Enter menu item: </label>
            </Col>
            <Col>
              <Autocomplete
                getItemValue={(item) => item.name}
                items={this.props.menu}
                shouldItemRender={(item, value) =>
                  item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
                }
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item.name}
                    style={{ background: isHighlighted ? "blue" : "white" }}>
                    {item.name}
                  </div>
                )}
                value={this.state.value}
                onChange={(e) => this.setState({ value: e.target.value })}
                onSelect={(value) =>
                  this.handleAutoComplete(value)
                }></Autocomplete>
            </Col>
          </Row>

          {this.props.tableData.orderItems.length === 0 ? (
            ""
          ) : (
            <React.Fragment>
              <Row className="padding-top-five">
                <Col>Item</Col>
                <Col>Price</Col>
                <Col>Quantity</Col>
              </Row>

              {this.props.tableData.orderItems.map((tag, index) => (
                <Row key={index}>
                  <Col> {tag.name}</Col>

                  <Col>{tag.price}</Col>
                  <Col>
                    <button onClick={() => this.handleIncrement(index)}>
                      +
                    </button>
                    <span className="badge badge-primary m-2">{tag.count}</span>
                    <button onClick={() => this.handledecrement(index)}>
                      -
                    </button>
                  </Col>
                </Row>
              ))}
              <Row className="padding-top-five"></Row>

              <Row>
                <Col md={3}>Total:</Col>
                <Col>{this.props.tableData.totalCost}</Col>
              </Row>
              <Row>
                <Button onClick={() => this.props.onGenerateBill()}>
                  Generate Bill
                </Button>
              </Row>
            </React.Fragment>
          )}
        </Container>
      </React.Fragment>
    );
  }

  handleAutoComplete = (ev) => {
    this.setState({ value: ev });
    let tempCurrentTable = { ...this.props.tableData };
    let item = {
      name: "",
      price: "",
      count: 0
    };
    let result = this.props.menu.find((obj) => {
      return obj.name === ev;
    });
    item.name = result.name;
    item.price = result.price;
    tempCurrentTable.orderItems.push(item);
    this.props.onItemSelected(tempCurrentTable);
    this.setState({ value: "" });
  };

  handleIncrement = (index) => {
    let dinnerData = [...this.props.tableData.orderItems];
    dinnerData[index].count = dinnerData[index].count + 1;
    this.setState({ autoCompleteArray: dinnerData });
    this.billTotal(dinnerData);
  };

  handledecrement = (ev) => {
    let dinnerClone = [...this.props.tableData.orderItems];
    if (dinnerClone[ev].count != 0) {
      dinnerClone[ev].count = dinnerClone[ev].count - 1;
      this.setState({ dinner: dinnerClone });
      this.billTotal(dinnerClone);
    }
  };

  billTotal = (dinnerData) => {
    var sumTotal = 0;
    for (let i = 0; i < dinnerData.length; i++) {
      var total = dinnerData[i].count * dinnerData[i].price;
      sumTotal = sumTotal + total;
    }
    this.setState({ text: sumTotal });
    let tempCurrentTable = { ...this.props.tableData };
    tempCurrentTable.totalCost = sumTotal;
    this.props.onTotalBill(tempCurrentTable);
  };
}

export default Dinner;
