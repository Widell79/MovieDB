import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { login } from "../services/authService";
import { toast } from "react-toastify";

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
      const { data: jwt } = await login(data.username, data.password);
      //access the localStorage in the browser
      localStorage.setItem("token", jwt);
      window.location = "/";
    } catch (exept) {
      if (exept.response && exept.response.status === 400) {
        toast.error("Invalid username or password.");
      } else {
        toast.error("An unexpected error occurrred.");
      }
    }
  };

  render() {
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
