import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";

import { PointContext } from "../context/PointContext.jsx";

export default function Main() {
  const { validatePoints } = useContext(PointContext);

  const [number, setNumber] = useState(3);

  function generator() {
    validatePoints(number);
  }

  return (
    <div className="main">
      <h1>
        Hello, Welcome to <span>Try Not To Make Trangle</span> challange!!
      </h1>

      <form>
        <div className="form-floating mb-3">
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
      </form>
      <button role="button" className="btn btn-primary" onClick={generator}>
        Generate
      </button>
    </div>
  );
}
