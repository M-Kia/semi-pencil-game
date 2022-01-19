import React, { useContext, useEffect, useRef, useState } from "react";
import { Line, Circle } from "react-svg-path";

import { GameContext } from "../context/GameContext.jsx";
import { PointContext } from "../context/PointContext.jsx";

function DrawLine({ line, refresh }) {
const {selectLine} = useContext(GameContext);

  // useEffect(() => {
  //   refresh();
  // }, [line]);

  return (
    <Line
      key={line.id}
      className={"line type" + line.type}
      sx={line.point1.x}
      sy={line.point1.y}
      ex={line.point2.x}
      ey={line.point2.y}
      strokeWidth={8}
      strokeLinecap="square"
      onClick={() => {
        // refresh();
        selectLine(line.id)
      }}
    />
  );
}

function DrawCircle({ point }) {
  return (
    <Circle
      key={point.id}
      cx={point.x}
      cy={point.y}
      size={20}
      stroke="black"
      strokeWidth={5}
      fill="black"
    />
  );
}

export default function Shape() {
  const { points, lines } = useContext(PointContext);

  const [refresher, setRefresher] = useState(false);

  function refresh() {
    setRefresher(!refresher);
  }

  useEffect(() => {
    refresh();
  }, [points, lines]);

  return (
    <div
      className="shape"
      style={{ display: points.length > 0 ? "block" : "none" }}
    >
      <svg>
        {lines.map((value) => (
          <DrawLine line={value} refresh={refresh} />
        ))}
        {points.map((value, index) => (
          <DrawCircle point={value} refresh={refresh} index={index} />
        ))}
      </svg>
    </div>
  );
}
