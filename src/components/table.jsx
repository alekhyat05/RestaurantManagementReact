import React, { Component } from "react";
import Counters from "./counters";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import { Redirect } from "react-router";

class Table extends Component {
  state = { isTableClicked: true };
  render() {
    return (
      <Router>
        <div>
          <button>
            Table 1
            <div>
              <Redirect to="/counters"></Redirect>
              <Route path="/counters" component={Counters} />
            </div>
          </button>
        </div>
      </Router>
    );
  }
}

export default Table;
