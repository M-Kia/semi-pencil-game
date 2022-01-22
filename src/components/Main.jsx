import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { RiNumber1, RiNumber2 } from "react-icons/ri";

import { PointContext } from "../context/PointContext.jsx";
import { GameContext } from "../context/GameContext.jsx";
import { CustomNode } from "../utilities/Classes.jsx";

export default function Main() {
  const { validatePoints } = useContext(PointContext);
  const { modeChanger, changePlayerTurn } = useContext(GameContext);

  const [number, setNumber] = useState(3);
  const [mode, setMode] = useState(1);
  const [turn, setTurn] = useState(1);
  const [difficulty, setDifficulty] = useState(1);

  function generator() {
    modeChanger(mode);
    changePlayerTurn(turn);
    CustomNode.difficulty = difficulty;
    validatePoints(number);
  }

  function changeMode(e) {
    setMode(e.target.value);
  }

  function changeTurn(e) {
    setTurn(e.target.value);
  }

  function changeDifficulty(e) {
    setDifficulty(e.target.value);
  }

  return (
    <div className="main">
      <h1 className="mb-5">
        Hello, Welcome to <span>Try Not To Make Trangle</span> challange!!
      </h1>

      <div>
        <p> Choose which mode you want to play.</p>
        <div className="d-flex radioBtn mb-3">
          <label className="mx-2">
            <input
              type="radio"
              name="mode"
              value={1}
              checked={mode == 1}
              onChange={changeMode}
            />
            <FaUser />
          </label>
          <label className="mx-2">
            <input
              type="radio"
              name="mode"
              value={2}
              checked={mode == 2}
              onChange={changeMode}
            />
            <FaUserFriends />
          </label>
        </div>
        <p> Choose which turn you want to play.</p>
        <div className="d-flex radioBtn mb-3">
          <label className="mx-2">
            <input
              type="radio"
              name="turn"
              value={1}
              checked={turn == 1}
              onChange={changeTurn}
            />
            <RiNumber1 />
          </label>
          <label className="mx-2">
            <input
              type="radio"
              name="turn"
              value={2}
              checked={turn == 2}
              onChange={changeTurn}
            />
            <RiNumber2 />
          </label>
        </div>
        <p> Choose which difficulty you want to play.</p>
        <div className="d-flex radioBtn mb-3">
          <label className="mx-2">
            <input
              type="radio"
              name="difficulty"
              value={1}
              checked={difficulty == 1}
              onChange={changeDifficulty}
            />
            <span> Simple </span>
          </label>
          <label className="mx-2">
            <input
              type="radio"
              name="difficulty"
              value={2}
              checked={difficulty == 2}
              onChange={changeDifficulty}
            />
            <span> Complex </span>
          </label>
        </div>
        <div className="form-floating mt-5 mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingNumber"
            placeholder="Number"
            min={3}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <label htmlFor="floatingNumber">Number of Points</label>
        </div>
        <button role="button" className="btn btn-primary" onClick={generator}>
          Generate
        </button>
      </div>
    </div>
  );
}
