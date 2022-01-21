import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import Swal from "sweetalert2";

import { PointContext } from "./PointContext.jsx";

export const GameContext = React.createContext({});

export function GameWrapper({ children }) {
  const { currentNode, changeCurrentNode, changes } = useContext(PointContext);

  const [playerTurn, setPlayerTurn] = useState(1);

  function changePlayerTurn(turn = 0) {
    if (turn === 0) {
      turn = playerTurn == 1 ? 2 : 1;
    }
    setPlayerTurn(turn);
  }

  function selectLine(id) {
    // let selectedLine = lines.filter((line) => line.id == id && line.type == 0);
    // if (selectedLine) {
    //   selectedLine[0].type = playerTurn;
    //   selectedLine[0].point1.degree[playerTurn - 1]++;
    //   selectedLine[0].point2.degree[playerTurn - 1]++;
    // } else return;
    // let tmp = new CustomNode(points, lines, playerTurn, null);

    // currentNode.childrenGenerator(playerTurn);

    let theNode = currentNode.children.find(value => value.id == id);
    theNode.depthChanger();
    changeCurrentNode(theNode);
    if (theNode.isFinal == 1) {
      Swal.fire({
        title: `Player ${playerTurn == 1 ? 2 : 1} Won!!`,
      });
      return;
    } else if (theNode.isFinal == -1){
      Swal.fire({
        title: `Draw!!`,
      });
      return;
    }
    theNode.childrenGenerator();

    changePlayerTurn();
    changes();
  }

  return (
    <GameContext.Provider value={{ selectLine }}>
      {children}
    </GameContext.Provider>
  );
}
