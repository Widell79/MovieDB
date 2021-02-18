import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import { toast } from "react-toastify";
import { loginWithJwt } from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      //Call the server
      const response = await userService.register(this.state.data);
      loginWithJwt(response.headers["x-auth-token"]);
      toast(`Registration was successful!`);
      window.location = "/";
    } catch (exept) {
      if (exept.response && exept.response.status === 400) {
        toast.error("User already registered.");
      } else {
        toast.error("An unexpected error occurrred.");
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username - (email)")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
