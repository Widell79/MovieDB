import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./movies";
import Customers from "./customers";
import Rentals from "./rentals";
import NotFound from "./notFound";
import NavBar from "./navBar";

class MainContainer extends Component {
  render() {
    return (
      <>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default MainContainer;
