import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { Line, Point } from "../utilities/Classes.jsx";

export const PointContext = React.createContext({});

export function PointWrapper({ children }) {
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);
  const [changesHappend, setChangesHappend] = useState(false);

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

    Point.counter = 0;
    Line.counter = 0;
    for (let i = 0; i < number; i++) {
      pointArr.push({
        id: i,
        x: center + radius * Math.cos(radi * i),
        y: center - radius * Math.sin(radi * i),
        degree: [0, 0],
      });
    }
    let lineArr = [];
    for (let i = 0; i < number - 1; i++) {
      for (let j = i + 1; j < number; j++) {
        lineArr.push({
          id: i * number + j,
          point1: pointArr[i],
          point2: pointArr[j],
          type: 0,
        });
      }
    }
    setLines(lineArr);
    setPoints(pointArr);
  }

  return (
    <PointContext.Provider
      value={{ points, lines, changesHappend, validatePoints, changes }}
    >
      {children}
    </PointContext.Provider>
  );
}
