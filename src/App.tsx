import React from "react";
import "./App.css";
import CardList from "./CardList";

function App(): JSX.Element {
  return (
    <div className="App">
      <h1 className="App-title">Get cards</h1>
      <CardList />
    </div>
  );
}

export default App;
