import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import Swal from "sweetalert2";

import { PointContext } from "./PointContext.jsx";

export const GameContext = React.createContext({});

export function GameWrapper({ children }) {
  const { points, lines, changes } = useContext(PointContext);

  const [playerTurn, setPlayerTurn] = useState(1);

  function changePlayerTurn(turn = 0) {
    if (turn === 0) {
      turn = playerTurn == 1 ? 2 : 1;
    }
    setPlayerTurn(turn);
  }

  function selectLine(id) {
    lines.forEach((line) => {
      if (line.id == id) {
        line.changeType = playerTurn;
      }
    });
    if (lostCondition(lines)) {
      Swal.fire({
        title: `Player ${playerTurn == 1 ? 2 : 1} Won!!`,
      });
      return;
    }
    changePlayerTurn();
    changes();
  }

  function lostCondition(lines, player = -1) {
    if (player == -1) {
      player = playerTurn;
    }
    let theLines = lines.filter(
      (line) =>
        line.type == player &&
        line.point1.degree[player - 1] > 1 &&
        line.point2.degree[player - 1] > 1
    );
    if (theLines < 3) return false;
    let loose = false;
    for (let i = 0; i < theLines.length - 1; i++) {
      for (let j = i + 1; j < theLines.length; j++) {
        if (
          theLines[i].point1.id == theLines[j].point2.id ||
          theLines[i].point2.id == theLines[j].point2.id
        ) {
          let temp = theLines.filter(
            (line, index) =>
              index != j &&
              index != i &&
              (line.point1.id == theLines[j].point1.id ||
                line.point2.id == theLines[j].point1.id)
          );
          if (temp.length > 0) {
            let temp2 = temp.filter(
              (line) =>
                line.point1.id == theLines[i].point1.id ||
                line.point2.id == theLines[i].point1.id ||
                line.point1.id == theLines[i].point2.id ||
                line.poin2.id == theLines[i].point2.id
            );
            if (temp2.length > 0) {
              loose = true;
            }
          }
        } else if (
          theLines[i].point1.id == theLines[j].point1.id ||
          theLines[i].point2.id == theLines[j].point1.id
        ) {
          let temp = theLines.filter(
            (line, index) =>
              index != j &&
              index != i &&
              (line.point1.id == theLines[j].point2.id ||
                line.point2.id == theLines[j].point2.id)
          );
          if (temp.length > 0) {
            let temp2 = temp.filter(
              (line) =>
                line.point1.id == theLines[i].point1.id ||
                line.point2.id == theLines[i].point1.id ||
                line.point1.id == theLines[i].point2.id ||
                line.poin2.id == theLines[i].point2.id
            );
            if (temp2.length > 0) {
              loose = true;
            }
          }
        }
      }
    }
    console.log(theLines);
    return loose;
  }

  return (
    <GameContext.Provider value={{ selectLine }}>
      {children}
    </GameContext.Provider>
  );
}
