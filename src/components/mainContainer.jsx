import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./movies";

import NotFound from "./notFound";
import NavBar from "./navBar";
import MovieForm from "./movieForm";
import LoginForm from "./loginForm";
import Logout from "./logout";
import RegisterForm from "./registerForm";
import { getCurrentUser } from "../services/authService";
import ProtectedRoute from "./protectedRoute";

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
            <ProtectedRoute
              path="/movies/:id"
              component={MovieForm}
            ></ProtectedRoute>
            <Route path="/movies/new" component={MovieForm}></Route>
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            ></Route>

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
