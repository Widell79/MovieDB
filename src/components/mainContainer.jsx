import React, { Component } from "react";
import Movies from "./movies";

class MainContainer extends Component {
  render() {
    return (
      <main className="container">
        <Movies />
      </main>
    );
  }
}

export default MainContainer;
