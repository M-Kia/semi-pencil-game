import React, { useContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import Swal from "sweetalert2";

import { PointContext } from "./PointContext.jsx";

export const GameContext = React.createContext({});

export function GameWrapper({ children }) {
  const { currentNode, changeCurrentNode, changes } = useContext(PointContext);

  const [playerTurn, setPlayerTurn] = useState(1);
  const [mode, setMode] = useState(1);

  function modeChanger(m) {
    setMode(m);
  }

  function changePlayerTurn(turn = 0) {
    if (turn === 0) {
      turn = playerTurn == 1 ? 2 : 1;
    }
    setPlayerTurn(turn);
    changes();
  }

  function changeLine(id, player) {
    let selectedLine = currentNode.lines.filter(
      (line) => line.id == id && line.type == 0
    );
    if (selectedLine) {
      selectedLine[0].type = player;
      selectedLine[0].point1.degree[player - 1]++;
      selectedLine[0].point2.degree[player - 1]++;
      if (currentNode.lostCondition(player)) {
        Swal.fire({
          title: `${player == 1 ? "Computer" : "Player"} Won!!`,
        });
      }
    } else if (!currentNode.lines.some((line) => line.type == 0)) {
      Swal.fire({
        title: `Draw!!`,
      });
    }
  }

  function selectLine(id) {
    changeLine(id, playerTurn);
    changePlayerTurn();
  }

  useEffect(() => {
    if (playerTurn == 2 && mode == 1) {
      let temp = currentNode.chooseLine();
      // let temp = currentNode.chooseLine(playerTurn == 1 ? 2 : 1);
      changeLine(temp.id, 2);
      // changeLine(temp.id, playerTurn == 1 ? 2 : 1);
      changePlayerTurn();
    }
  }, [playerTurn]);

  return (
    <GameContext.Provider value={{ mode, selectLine, modeChanger, changePlayerTurn }}>
      {children}
    </GameContext.Provider>
  );
}
