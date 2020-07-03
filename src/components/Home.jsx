import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Container, Row, Card, Col } from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
          <img src="./resto-logoo.png" className="center"></img>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <Link to={{ pathname: "/counters", mealType: "Lunch" }}>
                    Lunch
                  </Link>
                </Card.Title>
                <Card.Text>This is Lunch Menu</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <Link to={{ pathname: "/counters", mealType: "Dinner" }}>
                    Dinner
                  </Link>
                </Card.Title>
                <Card.Text> This is Dinner Menu</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
