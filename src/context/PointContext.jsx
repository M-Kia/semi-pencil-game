import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { CustomNode } from "../utilities/Classes.jsx";

export const PointContext = React.createContext({});

export function PointWrapper({ children }) {
  const [changesHappend, setChangesHappend] = useState(false);
  const [currentNode, setCurrentNode] = useState(
    new CustomNode([], [], 0, null)
  );

  function changeCurrentNode(node) {
    setCurrentNode(node);
  }

  function changes() {
    setChangesHappend(!changesHappend);
  }

  function validatePoints(number) {
    if (number < 3) {
      Swal.fire({
        title: "Please set correct number!!",
        text: "Number of points should be equal or more than 3.",
        icon: "error",
      });
      return;
    }

    let pointArr = [],
      radi = (2 * Math.PI) / number,
      center = 250,
      radius = 230;
    // width = window.innerWidth,
    // center = width > 1500 ? 450 : 250,
    // radius = width > 1500 ? 430 : 230;

    for (let i = 0; i < number; i++) {
      pointArr.push({
        id: i,
        x: center + radius * Math.cos(radi * i - Math.PI / 2),
        y: center + radius * Math.sin(radi * i - Math.PI / 2),
        degree: [0, 0],
      });
    }
    let lineArr = [];
    for (let i = 0; i < number - 1; i++) {
      for (let j = i + 1; j < number; j++) {
        let p1 = pointArr[i],
          p2 = pointArr[j],
          a = (p1.y - p2.y) / (p1.x - p2.x),
          b = p1.y - a * p1.x;
        lineArr.push({
          id: i * number + j,
          point1: p1,
          point2: p2,
          formula: { a, b },
          type: 0,
        });
      }
    }
    CustomNode.counter = 0;
    setCurrentNode(new CustomNode(pointArr, lineArr, 1, null));
  }

  return (
    <PointContext.Provider
      value={{
        currentNode,
        points: currentNode.points,
        lines: currentNode.lines,
        changesHappend,
        validatePoints,
        changes,
        changeCurrentNode,
      }}
    >
      {children}
    </PointContext.Provider>
  );
}
