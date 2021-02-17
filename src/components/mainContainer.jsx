import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./movies";
import Customers from "./customers";
import Rentals from "./rentals";
import NotFound from "./notFound";
import NavBar from "./navBar";
import MovieForm from "./movieForm";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

class MainContainer extends Component {
  render() {
    return (
      <>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies/new" component={MovieForm}></Route>
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
