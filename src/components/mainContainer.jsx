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
import Logout from "./logout";
import RegisterForm from "./registerForm";
import { getCurrentUser } from "../services/authService";

class MainContainer extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route
              path="/movies/:id"
              render={(props) => {
                if (!this.state.user) return <Redirect to="/login" />;
                return <MovieForm {...props} />;
              }}
            ></Route>
            <Route path="/movies/new" component={MovieForm}></Route>
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            ></Route>
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
