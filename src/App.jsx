import React from "react";
import ReactDom from "react-dom";

import { PointWrapper } from "./context/PointContext.jsx";

import Main from "./components/Main.jsx";
import Shape from "./components/Shape.jsx";
import { GameWrapper } from "./context/GameContext.jsx";

function App() {
  return (
    <PointWrapper>
      <GameWrapper>
        <Main />
        <Shape />
      </GameWrapper>
    </PointWrapper>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
