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
  }

  function changeLine(id, player) {
    currentNode.changeLine(id, player);
    if (currentNode.lostCondition(player)) {
      let playerTxt;
      if (mode == 1) {
        playerTxt = player == 1 ? "Computer" : "Player";
      } else {
        playerTxt = player == 1 ? "Player 2" : "Player 1";
      }
      Swal.fire({
        title: `${playerTxt} Won!!`,
      });
    } else if (currentNode.lines.every((line) => line.type != 0)) {
      Swal.fire({
        title: `Draw!!`,
      });
    } else {
      changePlayerTurn();
    }
    changes();
  }

  function selectLine(id) {
    changeLine(id, playerTurn);
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
    <GameContext.Provider
      value={{ mode, selectLine, modeChanger, changePlayerTurn }}
    >
      {children}
    </GameContext.Provider>
  );
}
