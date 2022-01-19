import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import Swal from "sweetalert2";

import { PointContext } from "./PointContext.jsx";

export const GameContext = React.createContext({});

export function GameWrapper({ children }) {
  const { changeLine, lines } = useContext(PointContext);

  const [playerTurn, setPlayerTurn] = useState(1);

  function changePlayerTurn(turn = 0) {
    if (turn === 0) {
      turn = playerTurn == 1 ? 2 : 1;
    }
    setPlayerTurn(turn);
  }

  function selectLine(id) {
    let theLines = lines.map((line) => {
      if (line.id == id) return { ...line, type: playerTurn };
      return line;
    });
    changeLine(theLines);
    if (lostCondition(theLines)) {
      Swal.fire({
        title: `Player ${playerTurn == 1 ? 2 : 1} Won!!`,
      });
    }
    changePlayerTurn();
  }

  function lostCondition(lines) {
      console.log(lines);
    let similarPoints = [];
    {
      let thePoints = [];
      lines.forEach((line) => {
        if (line.type == playerTurn) {
          let samePoint = thePoints.filter(
            (point) => point.id == line.point1.id
          );
          if (samePoint.length > 0) {
            if (samePoint.length == 1) {
              similarPoints.push(line.point1);
            }
          }
          samePoint = thePoints.filter((point) => point.id == line.point2.id);
          if (samePoint.length > 0) {
            if (samePoint.length == 1) {
              similarPoints.push(line.point2);
            }
          }
          thePoints.push(line.point1, line.point2);
        }
      });
    }
    console.log(similarPoints);
    let theLines = lines.filter((line) => {
      line.point.id;
    });
    console.log(theLines);
    return false;
  }

  return (
    <GameContext.Provider value={{ selectLine }}>
      {children}
    </GameContext.Provider>
  );
}
