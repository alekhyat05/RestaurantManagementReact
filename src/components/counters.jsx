import React, { Component } from "react";
import Dinner from "./Dinner";
import { Container, Row, Card, Col, Button } from "react-bootstrap";
import axios from "axios";

class Counters extends Component {
  state = {
    menu: [],
    currentTable: {
      number: 0,
      totalCost: 0,
      orderItems: []
    },
    tableid: [
      {
        number: 1,
        totalCost: 0,
        orderItems: []
      },
      {
        number: 2,
        totalCost: 0,
        orderItems: []
      }
    ]
  };
  handleComponentChange = (indexValue) => {
    let tempTable = { ...this.state.tableid[indexValue] };
    this.setState({
      currentTable: tempTable
    });
  };

  handleItemSelected = (tableInfo) => {
    let tempTable = [...this.state.tableid];
    tempTable[tableInfo.number - 1].orderItems = tableInfo.orderItems;
    this.setState({ tableid: tempTable });
  };

  handleTotalBill = (tableInfo) => {
    let tempTable = [...this.state.tableid];
    tempTable[tableInfo.number - 1].totalCost = tableInfo.totalCost;
    this.setState({ tableid: tempTable });
    this.setState({
      currentTable: tableInfo
    });
  };

  generateBill = () => {
    console.log(" this.state.currentTable", this.state.currentTable);
    axios
      .post(
        "http://localhost:5000/saveBill/" +
          JSON.stringify(this.state.currentTable)
      )
      .then((res) => {
        console.log("Data saved");
        //Clear your current table here and table id table

        let tempTable = [...this.state.tableid];
        tempTable[this.state.currentTable.number - 1].totalCost = 0;
        tempTable[this.state.currentTable.number - 1].orderItems = [];
        this.setState({
          tableid: tempTable
        });

        this.setState({
          currentTable: {
            number: 0,
            totalCost: 0,
            orderItems: []
          }
        });
      });
  };

  componentDidMount() {
    var mealType = "";
    if (this.props.location.mealType != null) {
      sessionStorage.setItem("mealType", this.props.location.mealType);
      mealType = this.props.location.mealType;
    } else {
      mealType = sessionStorage.getItem("mealType");
    }
    axios.get("http://localhost:5000/getMenuInfo/" + mealType).then((res) => {
      console.log("res", res);
      this.setState({ menu: res.data });
    });
  }

  render() {
    console.log("this.props.location.mealType", this.props.location.mealType);
    return (
      <Container>
        <Row className="padding-top-five ">
          {" "}
          {this.state.tableid.map((tag, index) => (
            //md is to divide the number of buttons in one row space
            <Col md={4} key={tag.number}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <Button
                      className="btn-primary"
                      onClick={() => this.handleComponentChange(index)}>
                      Table Number {tag.number}
                    </Button>
                  </Card.Title>
                  <Card.Text>
                    click here to bill for Table {tag.number}{" "}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <hr />
        {this.state.currentTable.number === 0 ? (
          ""
        ) : (
          <Dinner
            menu={this.state.menu[0].Menu}
            tableData={this.state.currentTable}
            onItemSelected={this.handleItemSelected}
            onTotalBill={this.handleTotalBill}
            onGenerateBill={this.generateBill}></Dinner>
        )}
      </Container>
    );
  }
}

export default Counters;
