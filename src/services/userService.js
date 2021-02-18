import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiURL + "/users";

//userinfo from registerForm
export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
