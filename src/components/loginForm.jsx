import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { getCurrentUser, login } from "../services/authService";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      //Call the server
      //get the response property data
      const { data } = this.state;
      //get the json web token, jwy
      await login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (exept) {
      if (exept.response && exept.response.status === 400) {
        toast.error("Invalid username or password.");
      } else {
        toast.error("An unexpected error occurrred.");
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
