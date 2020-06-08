import React from "react";
import "../styles/ControlBoard.css";
import resetImage from "../assets/restart.svg";
export default function ControlBoard({
  handleReset,
  pinsRemaining,
  currentPlayer,
}) {
  return (
    <div className="">
      <div className="cb-header grid-container">
        <div className="reset">
          <h4>Reset</h4>
          <img
            src={resetImage}
            className="restart"
            alt="restart game"
            onClick={() => handleReset()}
          />
        </div>
        <div className="player">
          <h4>Current player:</h4> {currentPlayer}
        </div>
        <div className="score">
          <h4>Pins remaining:</h4> {pinsRemaining}
        </div>
      </div>
    </div>
  );
}
